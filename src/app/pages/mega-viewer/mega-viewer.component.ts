import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from 'megajs';

@Component({
  selector: 'app-mega-viewer',
  templateUrl: './mega-viewer.component.pug',
  styleUrls: ['./mega-viewer.component.scss']
})
export class MegaViewerComponent implements OnInit {
  apiUrl: string = ''
  apiData: any = [];
  apiUrlError: string = '';
  searchInput: string = 'https://mega.nz/folder/CUFTHCwT#2-e8lR-g9Hx6FuBPrRHHUQ';
  viewMode: string = 'card';

  name: string = "";
  prevItem = null;
  currentItem = null;
  cards: any = [];


  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getApiData({ url: this.searchInput });
  }

  getApiData(obj: any) {
    this.prevItem = this.currentItem;
    if (obj.url) {
      File.fromURL(obj.url).loadAttributes((error: any, file: any) => {
        this.name = file.name;
        this.handelItem(file).then(val => {
          this.currentItem = file;
          this.cards = val;
        });
      });
    } else {
      this.name = obj.item.name;
      this.handelItem(obj.item).then(val => {
        this.currentItem = obj.item;
        this.cards = val;
      });
    }
  }

  handelItem(item: any) {
    let returnItems: any[] = [];
    return new Promise((resolve, reject) => {
      item.children.forEach((folderItem: any, index: number) => {
        if (folderItem.directory) {
          returnItems.push({
            name: folderItem.name,
            directory: true,
            url: "",
            item: folderItem
          });
          resolve(returnItems);
        } else {
          folderItem.download((err: any, data: any) => {
            let img = URL.createObjectURL(
              new Blob([data?.buffer], {type: 'image/jpeg'})
            );
            returnItems.push({
              name: folderItem.name,
              directory: false,
              url: this.domSanitizer.bypassSecurityTrustUrl(img)
            });
            resolve(returnItems);
          });
        }
      })
    })
  }

}

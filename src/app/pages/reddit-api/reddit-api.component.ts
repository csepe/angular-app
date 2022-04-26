import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-reddit-api',
  templateUrl: './reddit-api.component.pug',
  styleUrls: ['./reddit-api.component.scss']
})
export class RedditApiComponent implements OnInit {
  apiUrl: string = ''
  apiData: any = [];
  apiUrlError: string = '';
  searchInput: string = 'urbex';
  viewMode: string = 'card';

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getApiData(this.searchInput);
  }

  getApiData(sub: string): void {
    this.apiUrl = `https://www.reddit.com/r/${sub}/top.json?sort=top&t=all&limit=10`;
    this.apiUrlError = '';
    this.httpService.getData(this.apiUrl).subscribe({
      next: (data: any) => {
        this.apiData = data;
      }, 
      error: err => {
        this.apiUrlError = err.message ? err.message : err;
      }
    }
    )
  }

  filterImage(item: any): void {
    item.hidden = true;
  }

  filterFunction(array: any): any[] {
    return array ? array.filter((item: any) => {
      let arr: any = [];
      Object.keys(item).forEach(key => {
        arr.push(item[key].includes(this.searchInput));
      });
      return arr;
    }) : [];
  }

}

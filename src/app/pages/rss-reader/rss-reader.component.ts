import { Component, OnInit } from '@angular/core';
import { parse } from 'rss-to-json';

@Component({
  selector: 'app-rss-reader',
  templateUrl: './rss-reader.component.pug',
  styleUrls: ['./rss-reader.component.scss']
})
export class RssReaderComponent implements OnInit {
  searchInput: string = 'https://index.hu/24ora/rss/';
  feedItems: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    parse(this.searchInput, {}).then((rss: any) => {
      this.feedItems = rss;
    });
  }

}

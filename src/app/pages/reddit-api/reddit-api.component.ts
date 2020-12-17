import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-reddit-api',
  templateUrl: './reddit-api.component.pug',
  styleUrls: ['./reddit-api.component.scss']
})
export class RedditApiComponent implements OnInit {
  apiUrl: string = ''
  apiData: any = [];
  apiUrlError: string = '';
  apiDataCode: any = [];
  searchInput: string = 'urbex';
  data: any;
  item: any;
  viewMode: string = 'card';

  constructor(
    private utils: UtilsService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getApiData(this.searchInput)
  }

  getApiData(sub) {
    this.apiUrl = 'https://www.reddit.com/r/' + sub + '/top.json?sort=top&t=all&limit=50'
    console.log(this.apiUrl)
    this.apiUrlError = ''
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      console.log(data)
        this.apiData = data;
    }, err => {
      console.log(err)
      this.apiUrlError = err.message ? err.message : err;
    }
    )
  }

  filterImage(item) {
    item.hidden = true
    //console.log(item.hidden)
  }

  filterFunction(array): any[] {
    return array ? array.filter(item => {
      let arr = [];
      Object.keys(item).forEach(key => {
        arr.push(item[key].includes(this.searchInput));
      });
      return arr;
    }) : [];
  }

}

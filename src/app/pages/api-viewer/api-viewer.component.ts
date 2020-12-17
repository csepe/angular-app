import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-api-viewer',
  templateUrl: './api-viewer.component.pug',
  styleUrls: ['./api-viewer.component.scss']
})
export class ApiViewerComponent implements OnInit {
  apiUrl: string = 'https://api.abalin.jjnet/today?country=fr'
  apiData: any = [];
  apiUrlError: string = '';
  apiDataCode: any = [];
  searchInput: string = '';
  data: any;
  item: any;
  viewMode: string = 'card';

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getApiData()
  }

  getApiData() {
    console.log(this.apiUrl)
    this.apiUrlError = ''
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      if (data instanceof Array) {
        this.apiData = data;

      } else {
        this.apiData.push(data)
      }
      this.apiDataCode = JSON.stringify(data, null, 4)
      console.log(this.apiData)
    }, err => {
      console.log(err)
      this.apiUrlError = err.message ? err.message : err;
    }
    )
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

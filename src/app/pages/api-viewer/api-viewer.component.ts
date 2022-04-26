import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-api-viewer',
  templateUrl: './api-viewer.component.pug',
  styleUrls: ['./api-viewer.component.scss']
})
export class ApiViewerComponent implements OnInit {
  apiUrl: string = 'https://api.covid19api.com/country/hungary';
  apiData: any = [];
  apiUrlError: string = '';
  apiDataCode: any = [];
  searchInput: string = '';
  viewMode: string = 'card';

  constructor(
    private httpService: HttpService,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.getApiData();
  }

  getApiData(): void {
    this.apiUrlError = '';
    this.httpService.getData(this.apiUrl).subscribe({
      next: (data: any) => {
        if (data instanceof Array) {
          this.apiData = data.slice(-50);
        } else {
          this.apiData.push(data);
        }
        this.apiDataCode = JSON.stringify(data, null, 4);
      }, error: err => {
        this.apiUrlError = err.message ? err.message : err;
      }
    }
    )
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

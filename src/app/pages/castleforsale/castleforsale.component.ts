import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-castleforsale',
  templateUrl: './castleforsale.component.pug',
  styleUrls: ['./castleforsale.component.scss']
})
export class CastleforsaleComponent implements OnInit {
  apiUrl: string = '';
  apiData: any = null;
  searchInput: string = '';
  data
  item

  constructor(
    private utils: UtilsService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.apiUrl = this.utils.env.apiUrl + '/castleforsale';
    this.getApiData();
  }

  getApiData() {
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      this.apiData = data;
    })
  }

  filterFunction(array): any[] {
    if (!array) return [];
    let results = array.filter(item => {
      let arr = [];
      Object.keys(item).forEach(key => {
        arr.push(item[key].toLowerCase().includes(this.searchInput.toLowerCase()));
      });
      return arr.includes(true);
    });
    return results;
  }

}

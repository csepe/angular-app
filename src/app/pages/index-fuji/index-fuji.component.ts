import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-index-fuji',
  templateUrl: './index-fuji.component.pug',
  styleUrls: ['./index-fuji.component.scss']
})
export class IndexFujiComponent implements OnInit {
  apiUrl = '';
  apiData: any = [];
  data: any;
  item: any;

  constructor(
    private httpService: HttpService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.apiUrl = this.utils.env.apiUrl + '/indexfuji';
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      this.apiData = data;
    })
  }

}
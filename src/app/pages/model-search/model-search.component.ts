import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-model-search',
  templateUrl: './model-search.component.pug',
  styleUrls: ['./model-search.component.scss']
})
export class ModelSearchComponent implements OnInit {
  apiUrl: string = ''
  apiData: any = [];
  apiUrlError: string = '';
  apiDataCode: any = [];
  searchInput: string = 'Car';
  data: any;
  item: any;
  viewMode: string = 'card';
  selectedModel: any = null;
  options: any = {
    canvasColor:'skyblue'
  }

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getApiData()
  }

  getApiData() {
    const API_KEY = 'AIzaSyA6dXQszgPWpM_4LrZnmtske6B7C5y6yr8';
    this.apiUrl = `https://poly.googleapis.com/v1/assets?keywords=${this.searchInput}&format=OBJ&key=${API_KEY}`;
    this.apiUrlError = ''
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      this.apiData = data.assets;
      console.log(this.apiData)
    }, err => {
      console.log(err)
      this.apiUrlError = err.message ? err.message : err;
    }
    )
  }

  loadModel(asset: any) {
    console.log(asset)
    this.selectedModel = asset
  }
}

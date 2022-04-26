import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.pug',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  apiUrl: string = ''
  apiData: any = [];
  apiUrlError: string = '';
  searchInput: string = 'lebontják';

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getApiData()
  }

  getApiData(): void {
    this.apiUrl = `https://node-server-seven.vercel.app/api/googleSearch?query=${this.searchInput}`;
    this.apiUrlError = ''
    this.httpService.getData(this.apiUrl).subscribe({
      next: (data: any) => {
        this.apiData = data;
      },
      error: err => {
        console.log(err)
        this.apiUrlError = err.message ? err.message : err;
      }
   });
  }
}

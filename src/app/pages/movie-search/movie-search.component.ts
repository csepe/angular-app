import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.pug',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  apiUrl: string = ''
  apiData: any = [];
  apiUrlError: string = '';
  apiDataCode: any = [];
  searchInput: string = '';
  data: any;
  item: any;
  viewMode: string = 'card';
  genres: any = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Music',
    'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short Film', 'Sport', 'Superhero', 'Thriller', 'War', 'Western']
  genre: string = 'Horror'

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getApiData()
  }

  getApiData() {
    this.apiUrl = 'https://yts.mx/api/v2/list_movies.json?limit=40&genre=' + this.genre.toLowerCase() + '&query_term=' + this.searchInput
    console.log(this.apiUrl)
    this.apiUrlError = ''
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      console.log(data)
      this.apiData = data.data.movies;
    }, err => {
      console.log(err)
      this.apiUrlError = err.message ? err.message : err;
    }
    )
  }

  filterImage(item) {
    item.hidden = true
  }
}

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
  searchInput: string = '';
  viewMode: string = 'card';
  genres: any = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Music',
    'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short Film', 'Sport', 'Superhero', 'Thriller', 'War', 'Western'];
  genre: string = 'Horror';

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getApiData();
  }

  getApiData(): void {
    this.apiUrl = `https://yts.mx/api/v2/list_movies.json?limit=40&genre=${this.genre.toLowerCase()}&query_term=${this.searchInput}`;
    this.apiUrlError = '';
    this.httpService.getData(this.apiUrl).subscribe({
      next: (data: any) => {
        this.apiData = data.data.movies;
      },
      error: err => {
        this.apiUrlError = err.message ? err.message : err;
      }
    })
  }

  filterImage(item: any): void {
    item.hidden = true;
  }
}

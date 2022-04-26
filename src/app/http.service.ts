import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

class CacheItem<T> {
  url: string = '';
  timestampCached: number = 0;
  data!: T;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  cache: CacheItem<any>[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  postData(url: string, body: any){
    return this.http.post(url, body)
  }

  getData(url: string, httpOptions?: any, cacheTime: number = 0, forceRefresh: boolean = false) {
    let cachedItem = this.getCachedItem(url);

    if (cachedItem != undefined && !forceRefresh) {
      let expireDate = cachedItem.timestampCached + cacheTime;
      if (Date.now() < expireDate) {
        return of(cachedItem.data);
      }
    }

    return this.http.get(url, httpOptions).pipe(
      map(data => {
        if (cacheTime) { // if we actually want to cache the result
          if (cachedItem == undefined) {
            cachedItem = new CacheItem();
            cachedItem.url = url;
            this.cache.push(cachedItem);
          }
          cachedItem.data = data;
          cachedItem.timestampCached = Date.now();
        }
        return data;
      })
    );
  }

  private getCachedItem<T>(url: string) {
    return this.cache.find(item => item.url == url);
  }
}
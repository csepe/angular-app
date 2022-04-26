import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-yt-api',
  templateUrl: './yt-api.component.pug',
  styleUrls: ['./yt-api.component.scss']
})
export class YtApiComponent implements OnInit {
  apiUrl = 'https://www.googleapis.com/youtube/v3/channels';
  parts = 'id,snippet,statistics,contentDetails';
  channelID = 'UCipL_B5ruMqLOwBeVuLuiRg';
  apiKey = 'AIzaSyA6dXQszgPWpM_4LrZnmtske6B7C5y6yr8';
  apiData: any = [];
  apiUrlError: string = '';
  searchInput: string = '';
  data: any;
  item: any;
  viewMode: string = 'card';

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getChannelInfo(this.channelID)
  }

  parseChannel(str: any){
    this.channelID = str.split('channel/')[1].slice(0, 24);
    this.getChannelInfo(this.channelID);
  }

  getChannelInfo(channelID: any) {
    let url = this.apiUrl + '?id=' + channelID + '&part=' + this.parts + '&key=' + this.apiKey
    this.apiUrlError = ''
    this.httpService.getData(url).subscribe((data: any) => {
      this.apiData = data;
      this.searchInput = 'https://www.youtube.com/c/'+ data.items[0].snippet.customUrl
      this.getVideosInfo(data.items[0].contentDetails.relatedPlaylists.uploads)
    }, err => {
      console.log(err)
      this.apiUrlError = err.message ? err.message : err;
    })
  }

  getVideosInfo(playlistId: any) {
    let url = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=' + playlistId + '&key=' + this.apiKey + '&part=snippet&maxResults=50'
    this.httpService.getData(url).subscribe((data: any) => {
      this.apiData.videos = data;
    }, err => {
      console.log(err)
      this.apiUrlError = err.message ? err.message : err;
    })
  }

}
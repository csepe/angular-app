import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.pug',
  styleUrls: ['./spotify-player.component.scss']
})
export class SpotifyPlayerComponent implements OnInit {
  ClientID = 'cb40593fdb474b2ebd53960d7dae0bd1'
  ClientSecret = '0c83183a1d1f4e0589297f7df48199cc'
  player: any = {
    title: '',
    trackNum: 0,
    track: null,
    duration: 0,
    progress: 0,
    interval: null
  }

  sources = [{
    title: 'Kalimba',
    url: 'https://www.learningcontainer.com/download/sample-mp3-file/?wpdmdl=1676&refresh=5f8d73b60898c1603105718'
  },
  {
    title: 'Sample OGG',
    url: 'https://www.learningcontainer.com/download/sample-ogg-file/?wpdmdl=1684&refresh=5f8d74094f9d81603105801'
  }]

  constructor(
    private utils: UtilsService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {

  }

  initTrack(source: any) {
    console.log(source)
    this.player.track = new Audio(source.url);
    this.pauseTrack();
    this.player.progress = 0;
    this.player.title = source.title;

    this.player.track.addEventListener('loadeddata', () => {
      this.player.duration = this.player.track.duration.toFixed(0);
    })
    this.player.track.addEventListener('ended', () => {
      clearInterval(this.player.interval);
    })
  }

  playTrack() {
    console.log(this.player.trackNum)
    this.initTrack(this.sources[this.player.trackNum])
    this.player.track.play();
    this.player.interval = setInterval(() => {
      this.player.progress++
    }, 1000)
  }

  pauseTrack() {
    this.player.track.pause();
    clearInterval(this.player.interval);
  }

  prevTrack() {
    this.changeTrack(-1)
  }

  nextTrack() {
    this.changeTrack(1)
  }

  changeTrack(dir: any) {
    this.player.trackNum = this.player.trackNum + dir;
    this.playTrack();
  }




  initSpotify() {
    /*var spotifyApi = new SpotifyWebApi({
      clientId: this.ClientID,
      clientSecret: this.ClientSecret,
      redirectUri: 'http://localhost:4200/callback'
    });

    var code = 'AQA3mO83Inoli0PtuwdYzQY7oCMGL1iP3ZruurYyqd5O3sI3zq5vJXMcYsxTnULujK_euRC0XDBy2CUeBKIvyNEx5laz-UJ68GVhQipfS0ft8gMbzP4IDrdOnkeiAC9aCWjksjOPc8cBDD1gwlELjWKWRL7WJQYDLUtDUMfldGyFEQ'
    spotifyApi.setAccessToken(code);

    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
       function(data) {
         console.log('Artist albums', data.body);
       },
       function(err) {
         console.error(err);
       }
     );*/

    let url = 'https://accounts.spotify.com/authorize?client_id=' + this.ClientID + '&response_type=token&redirect_uri=http://localhost:4200/callback'
    
    let tokenUrl = 'https://accounts.spotify.com/api/token?grant_type=client_credentials'
 
      fetch(tokenUrl, {
        method: 'POST',
        headers: {
          //'Authorization': 'Basic ' + btoa(this.ClientID + ":" + this.ClientSecret)
          'Authorization': 'Basic Y2I0MDU5M2ZkYjQ3NGIyZWJkNTM5NjBkN2RhZTBiZDE6MGM4MzE4M2ExZDFmNGUwNTg5Mjk3ZjdkZjQ4MTk5Y2M='
        }

      }).then(function (data) {
        console.log(data)
      })
        .catch(function (err) {
          console.log(err)
        });
  }

  getUrlParam(param: any) {
    let url = new URL(window.location.href);
    console.log(url)
    return url.searchParams.get(param);
  }



}

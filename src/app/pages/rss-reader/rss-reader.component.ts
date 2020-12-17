import { Component, OnInit } from '@angular/core';
import Parser from 'rss-to-js';
import axios from 'axios';

@Component({
  selector: 'app-rss-reader',
  templateUrl: './rss-reader.component.pug',
  styleUrls: ['./rss-reader.component.scss']
})
export class RssReaderComponent implements OnInit {
  rssUrl: string = 'https://index.hu/24ora/rss/'
  feedItems: any = []
  item: any

  constructor() { }

  ngOnInit(): void {
    const rssParser = new Parser();

    axios.get(this.rssUrl, { responseType: 'text' }).then(res => {
      parseRSS(res.data)
    });

     let parseRSS = async (string) => {
      this.feedItems = await rssParser.parseString(string)
      console.log(this.feedItems)

      this.readText(this.feedItems.items[0].title)
      this.feedItems.items.forEach(item => {
        //this.readText(item.title)
      })
      speechSynthesis.getVoices().forEach(function(voice) {
        console.log(voice.name, voice.default ? voice.default :'');
      });
      
    }

  }

  readText(text) {
    var msg = new SpeechSynthesisUtterance()
    msg.lang = 'hu-HU'
    msg.text = text
    console.log(msg)
    window.speechSynthesis.speak(msg)
  }

}

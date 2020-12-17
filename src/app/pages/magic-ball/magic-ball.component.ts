import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-magic-ball',
  templateUrl: './magic-ball.component.pug',
  styleUrls: ['./magic-ball.component.scss']
})
export class MagicBallComponent implements OnInit {
  magic = Math.floor(Math.sqrt(Math.PI * 1273 / 49))
  title = 'Gondolatolvasó varázsgömb'
  signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
  magicSigns = []
  main = ''
  opacity = 0
  instructions = ['Válass egy számot 10 és 99 között', 'Vond ki a számodból a számjegyek összegét', 'Keresd meg az eredményhez tartozó szimbólumot', 'Kattints a varázsgömbre']

  constructor(
    private utils: UtilsService
  ) {
   }

  ngOnInit(): void {
    this.magicball()
  }

  magicball() {
    this.main = this.utils.randomFromArr(this.signs)
    this.opacity = 0
    this.render()
  }

  result() {
    this.opacity = 1
  }

  render() {
    this.magicSigns = []
    for (let i = 99; i >= 0; i--) {
      let sign = this.utils.randomFromArr(this.signs)
      if (this.utils.sumDigits(i) % this.magic === 0) {
        sign = this.main;
      }
      this.magicSigns.push(sign)
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-magic-ball',
  templateUrl: './magic-ball.component.pug',
  styleUrls: ['./magic-ball.component.scss']
})
export class MagicBallComponent implements OnInit {
  magic: number = Math.floor(Math.sqrt(Math.PI * 1273 / 49));
  title: string = 'Gondolatolvasó varázsgömb';
  signs: string[] = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  magicSigns: string[] = [];
  main: string = '';
  opacity: number = 0;
  instructions: string[] = ['Válass egy számot 10 és 99 között', 'Vond ki a számodból a számjegyek összegét', 'Keresd meg az eredményhez tartozó szimbólumot', 'Kattints a varázsgömbre'];

  constructor(
    private utils: UtilsService
  ) {
   }

  ngOnInit(): void {
    this.magicball();
  }

  magicball(): void {
    this.main = this.utils.randomFromArr(this.signs);
    this.opacity = 0;
    this.render();
  }

  result(): void {
    this.opacity = 1;
  }

  render(): void {
    this.magicSigns = [];
    for (let i = 99; i >= 0; i--) {
      let sign: string = this.utils.randomFromArr(this.signs);
      if (this.utils.sumDigits(i) % this.magic === 0) {
        sign = this.main;
      }
      this.magicSigns.push(sign);
    }
  }
}
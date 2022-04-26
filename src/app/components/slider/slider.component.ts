import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.pug',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input() sliderData: any;
  @ViewChild('slider', { static: true }) slider: any;
  sliderNum: number = 0;

  constructor() { }

  ngAfterViewInit() {
    this.sliderChange();
  }

  sliderSlide(dir: any) {
    if (this.sliderNum === 0) {
      this.sliderNum = this.sliderData.length - 1;
    } else if (
      this.sliderNum ===
      this.sliderData.length - 1
    ) {
      this.sliderNum = 0;
    } else {
      this.sliderNum =
        dir === 1 ? this.sliderNum + 1 : this.sliderNum - 1;
    }
    this.sliderChange();
  };

  sliderChange(){
    this.slider.nativeElement.style.backgroundImage = 'url(http://urbface.com/pics/medium/' + this.sliderData[this.sliderNum][1] + ')';
  }
}

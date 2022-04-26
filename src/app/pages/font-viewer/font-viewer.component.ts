import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
const webFont = require('webfontloader');

enum Styles {
  ital = 'Italic',
  opsz = 'Optical size',
  slnt = 'Slant',
  wght = 'Weight',
  wdth = 'Width',
  CASL = 'Casual',
  CRSV = 'Cursive',
  FILL = 'Fill',
  GRAD = 'Grade',
  MONO = 'Monospace',
  SOFT = 'Softness',
  WONK = 'Wonky',
  fontSize = 'Font size'
}

@Component({
  selector: 'app-font-viewer',
  templateUrl: './font-viewer.component.pug',
  styleUrls: ['./font-viewer.component.scss']
})
export class FontViewerComponent implements OnInit {
  text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  Styles: any = Styles;
  fontStyle: any = {};
  selectedFont: any = {};
  selectedFontName: string = 'Archivo';
  fonts: any[] = [];
  selectableFonts: string[] = [];
  cssFontStyle: any = {
    fontFamily: '',
    fontSize: 60,
    fontStyle: '',
    fontVariationSettings: ''
  };

  constructor(
    private cd: ChangeDetectorRef,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getVariableFontsList();
  }

  getVariableFontsList(): void {
    const url = './../../../assets/fonts.json';
    this.httpService.getData(url).subscribe((data: any) => {
      this.fonts = data;
      data.forEach((font: any) => {
        this.selectableFonts.push(font.family);
      })
      this.selectedFont = this.fonts[0];
      console.log(this.selectedFont)
    })
  }

  changeFont(font: string): void {
    let axes: string[] = [], axesValues: string[] = [];
    this.selectedFontName = font;
    this.selectedFont = this.fonts.filter((item: any) => item.family === font)[0];
    this.selectedFont.axes.unshift({ tag: 'fontSize', min: 8, max: 100, defaultValue: 60 });
    if (Object.keys(this.selectedFont.fonts).some((el: any) => el.length > 2)) {
      this.selectedFont.hasItalic = true;
      this.selectedFont.axes.unshift({ tag: 'ital', min: 0, max: 1, defaultValue: 0 });
    }
    this.selectedFont.axes.forEach((item: any) => {
      if (item.tag !== 'fontSize') {
        axes.push(item.tag);
        if (item.tag !== 'ital') axesValues.push(`${item.min}..${item.max}`);
      }
    })
    /*this.selectedFont.unsupportedAxes.forEach((item:any)=>{
      axes.push(item.tag)
      axesValues.push(`${item.min}..${item.max}`)
    })*/
    webFont.load({
      google: {
        api: 'https://fonts.googleapis.com/css2',
        families: [`${font}:${axes.join(',')}@0,${axesValues.join(',')};1,${axesValues.join(',')}&display=swap`]
      },
      active: () => {
        this.cssFontStyle.fontFamily = this.selectedFontName;
        this.changeStyle('wght', this.selectedFont.axes.filter((item: any) => item.tag === 'wght')?.[0]?.defaultValue);
        this.cd.detectChanges();
        console.log(`${font} have been rendered`);
      },
      inactive: () => console.log(`${font} render error`)
    });
  }

  changeStyle(tag: string, value: string | number | null): void {
    this.fontStyle[tag] = value;
    let style: string = '';
    for (const [key, val] of Object.entries(this.fontStyle)) {
      if (key !== 'fontSize') style += `'${key}' ${val},`;
    }
    style = style.slice(0, -1);
    if (this.fontStyle.fontSize) this.cssFontStyle.fontSize = this.fontStyle?.fontSize + 'px';
    this.cssFontStyle.fontStyle = this.fontStyle?.ital ? 'italic' : 'initial';
    this.cssFontStyle.fontVariationSettings = style;
    //console.log(this.cssFontStyle)
  }

}

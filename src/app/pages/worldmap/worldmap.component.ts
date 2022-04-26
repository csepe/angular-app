import { Component, ElementRef, OnInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from './../../http.service';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.pug',
  styleUrls: ['./worldmap.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorldmapComponent implements OnInit {
  worldMapSvg: SafeHtml = '';
  countryMapSvg: SafeHtml = '';
  worldMapName: string = '';
  countryMapName: string = '';
  loaded: boolean = false;

  constructor(
    private elRef: ElementRef,
    private san: DomSanitizer,
    private httpService: HttpService,
    private renderer: Renderer2,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.showCountry('world').subscribe({
      next: (data: any) => {
        this.worldMapSvg = this.san.bypassSecurityTrustHtml(data)
      }, error: (err: any) => {
        console.log(err)
      }
    });
  }

  ngAfterViewChecked(): void {
    let worldMap = this.elRef.nativeElement.querySelector('#worldMap svg');
    if (worldMap && !this.loaded) {
      this.loaded = true;
      this.mapActions(worldMap);
    }
  }

  mapActions(map: any): void {
    map.querySelectorAll('path').forEach((path: any) => {

      path.addEventListener('click', () => {
        this.countryMapName = path.getAttribute('name') ?? path.getAttribute('class');
        let id = path.getAttribute('id');
        this.showCountry(id).subscribe({
          next: (data: any) => {
            this.countryMapSvg = this.san.bypassSecurityTrustHtml(data);
            this.loaded = false;
            let svgMap = this.elRef.nativeElement.querySelector('#countryMap svg');
            console.log(svgMap)
            changeSvgColor(svgMap);
          }, error: (err: any) => {
            console.log(err);
          }
        });
      })

      path.addEventListener('mouseenter', () => {
        this.worldMapName = path.getAttribute('name') ?? path.getAttribute('class');
        path.style.fill = this.utils.getRandomColor();
      })

      path.addEventListener('mouseleave', () => {
        this.worldMapName = '';
        path.style.fill = '#f2f2f2';
      })

    })

    const changeSvgColor = (elem: any): void => {
      console.log(elem.querySelectorAll('path'))
      elem.querySelectorAll('path').forEach((path: any) => {
        path.style.fill = this.utils.getRandomColor();
      });
    }
  }

  showCountry(code: any): Observable<any> {
    var link = '';
    switch (code) {
      case 'us':
        link = 'demos/resources/svg-library/svgs/us.svg';
        break;
      case 'world':
        link = 'demos/resources/svg-library/svgs/world.svg';
        break;
      case 'europe':
        link = 'demos/resources/svg-library/svgs/europe.svg';
        break;
      default:
        link = 'svg/' + code.toLowerCase() + '/' + code.toLowerCase() + '.svg';
    }
    return this.httpService.getData(`https://simplemaps.com/static/${link}`, { responseType: 'image/svg+xml' });
  }

  ngOnDestroy() {
    this.renderer.destroy();
  }

}


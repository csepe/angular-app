import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from './../../map.service';
import 'pannellum/src/js/pannellum';
import 'pannellum/src/js/libpannellum';

@Component({
  selector: 'app-pano-viewer',
  templateUrl: './pano-viewer.component.pug',
  styleUrls: ['./pano-viewer.component.scss']
})
export class PanoViewerComponent implements OnInit {
  @ViewChild("panoContainer") panoContainer!: ElementRef;
  pannellum: any = (window as any).pannellum;
  selectedPlace: string = 'Budapest Baross út';
  showStreetViewPanoContainer: boolean = true;
  pano: any = null;
  panos: any[] = [
    {
      title: 'cerro-toco-0.jpg',
      url: 'https://pannellum.org/images/cerro-toco-0.jpg'
    },
    {
      title: 'alma.jpg',
      url: 'https://pannellum.org/images/alma.jpg'
    }
  ];

  constructor(
    public mapService: MapService
  ) { }

  ngOnInit(): void {
    this.showPano(this.panos[0].url);
    //this.showStreetViewPano(this.selectedPlace);
  }

  showStreetViewPano(place: string): void {
    if (this.pano) this.pano.destroy();
    if (!this.showStreetViewPanoContainer) this.showStreetViewPanoContainer = true;
    this.mapService.searchStreetViewPanorama(place, document.getElementById('streetViewPanoContainer'));
  }

  showPano(img: string): void {
    this.showStreetViewPanoContainer = false;
    this.pano = this.pannellum.viewer('panoContainer', {
      "type": "equirectangular",
      "panorama": img,
      'autoLoad': true,
      'showZoomCtrl': false,
      'compass': false
    });
  }

  ngOnDestroy() {
    if (this.pano) this.pano.destroy();
  }

}

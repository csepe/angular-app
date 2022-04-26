import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from './../../map.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.pug',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  @ViewChild('drawer', { static: true }) public drawer: any;
  mapData: any
  backgroundColor: any = { 'background-color': '#f1efe9' };
  mapData$: any;
  nearestMarkers: any = [];
  drawerOpened: boolean = false;
  mapControl: any;
  nearestMarker: any;
  menuItem: any;

  constructor(
    public mapService: MapService
  ) {
    this.mapData$ = new BehaviorSubject(this.mapData);
   }

  ngOnInit(): void {
    let mapOptions: any = {
        /*lat: 47.498522,
        lon: 19.041055,
        zoom: 18,
        mapTypeId: 'roadmap',*/
        disableDefaultUI: true,
        center: { lat: 47.4989034, lng: 19.0436576 },
        zoom: 18,
        mapTypeId: "satellite",
        tilt: 45,
        gestureHandling: "greedy"
      },
      mapObject: any = this.mapService.initMap(this.mapElement, mapOptions);

    //this.mapService.showMap(mapId);

    /*this.mapService.getMapKML(mapId).subscribe((data: any) => {
     console.log(this.mapData);
    })*/

    google.maps.event.addListener(mapObject, 'maptypeid_changed', () => {
      this.backgroundColor = { 'background-color': this.mapService.getBackgroundColor() };
    });

    google.maps.event.addListener(mapObject, 'click', (event: any) => {
      if(this.mapService.markers.length){
        this.nearestMarkers = this.mapService.findClosestMarkers(event, 5);
        this.drawer.open();
      }
    });
  }

  sideNavOpened(): void {
    this.mapData = this.mapService.mapData;
  }

  getMapServiceFunction(func: string, param?: any): void {
    (<Record<string, any>>this.mapService)[func](param);
  }
}
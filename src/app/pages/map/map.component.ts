import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from './../../map.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.pug',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  mapData: any
  backgroundColor: any = { 'background-color': '#f1efe9' };
  @ViewChild('map', { static: true }) mapElement;
  mapData$: any;
  nearestMarkers: any = [];
  drawerOpened: boolean = false;
  @ViewChild('drawer', { static: true }) public drawer;
  mapControl
  nearestMarker
  menuItem

  constructor(
    public mapService: MapService
  ) {
    this.mapData$ = new BehaviorSubject(this.mapData);
   }

  ngOnInit() {
    let mapOptions = {
        lat: 47.498522,
        lon: 19.041055,
        zoom: 18,
        mapTypeId: 'roadmap',
        disableDefaultUI: true
      },
      mapObject: any = this.mapService.initMap(this.mapElement, mapOptions);

    //this.mapService.showMap(mapId);

    /*this.mapService.getMapKML(mapId).subscribe((data: any) => {
     console.log(this.mapData);
    })*/

    google.maps.event.addListener(mapObject, 'maptypeid_changed', () => {
      this.backgroundColor = { 'background-color': this.mapService.getBackgroundColor() };
    });

    google.maps.event.addListener(mapObject, 'click', (event) => {
      this.nearestMarkers = this.mapService.findClosestMarkers(event, 5);
      this.drawer.open();
    });

    
  }

  sideNavOpened() {
    this.mapData = this.mapService.mapData;
  }
}
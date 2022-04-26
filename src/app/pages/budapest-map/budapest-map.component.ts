import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from './../../map.service';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './../../utils.service';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-budapest-map',
  templateUrl: './budapest-map.component.pug',
  styleUrls: ['./budapest-map.component.scss']
})
export class BudapestMapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  mapData: any;
  mapData$: any;
  place: any = null;
  sideVisible: boolean = false;
  polylines: any = [];
  markers: any = [];
  map: any = null;

  constructor(
    private httpService: HttpService,
    private utils: UtilsService,
    public mapService: MapService
  ) {
    this.mapData$ = new BehaviorSubject(this.mapData);
  }

  ngOnInit() {
    let mapOptions: any = {
      lat: 47.4989034,
      lon: 19.0436576,
      zoom: 18,
      mapTypeId: 'satellite',
      tilt: 45
    },
      infoWindow: any = new google.maps.InfoWindow(),
      currentPlace: any,
      infoWindowOpened: any = false;

      this.map = this.mapService.initMap(this.mapElement, mapOptions);
      this.httpService.getData(this.utils.env.apiUrl + "/urbface").subscribe((data: any) => {
        processPlaces(data);
      });

    /*fetch(this.utils.env.apiUrl + "/urbface")
      .then(resp => resp.json())
      .then(data => {
        processPlaces(data);
      })
      .catch(error => {
        console.log(error);
      });
*/

    let processPlaces = (data: any) => {
      for (var i = 0; i < this.polylines.length; ++i) {
        var polylineToRemove = this.polylines[i];
        polylineToRemove.setMap(null);
      }
      for (var i = 0; i < this.markers.length; ++i) {
        var markerToRemove = this.markers[i];
        markerToRemove.setMap(null);
      }
      this.polylines = [];
      this.markers = [];


      data.places.forEach((item: any) => {
        let options = {
          map: this.map,
          path: google.maps.geometry.encoding.decodePath(
            item.polyline
          ),
          strokeColor: "#e51d4b",
          strokeOpacity: 1,
          strokeWeight: 4,
          zIndex: item.zindex,
          fillOpacity: 0,
          fillColor: "#23994b",
          itemid: item.id,
          savedzIndex: item.zindex,
          savedColor: "#e51d4b",
          name: item.name,
          id: item.id
        }
        let displayPath: any = new google.maps.Polygon(options);


        google.maps.event.addListener(displayPath, "click", () => {
          this.polylines.forEach((el: any) => {
            el.setOptions({
              fillOpacity: 0
            });
          });
          selectPlace(displayPath.itemid);
          displayPath.setOptions({
            fillOpacity: 0.5
          });
        }
        );

        google.maps.event.addListener(displayPath, "mouseover", () => {
          if (!infoWindowOpened) {
            infoWindow.setContent(displayPath.name);
            infoWindow.setPosition(getPolygonCenter(displayPath));
            infoWindow.open(this.map);
          }
          infoWindowOpened = true;
          displayPath.setOptions({
            fillOpacity: 0.5
          });
        }
        );
        google.maps.event.addListener(displayPath, "mouseout", () => {
          infoWindowOpened = false;
          infoWindow.close();
          if (item.id !== currentPlace)
          displayPath.setOptions({
              fillOpacity: 0
            });
        }
        );
        this.polylines.push(displayPath);
      });
    }

    let getPolygonCenter = (polygon: any) => {
      let polygonBounds = new google.maps.LatLngBounds();
      polygon.getPath().forEach((element: any) => {
        polygonBounds.extend(element);
      });
      return polygonBounds.getCenter();
    }

    let selectPlace = (id: any) => {
      this.place = null;
      currentPlace = id
      this.httpService.getData(this.utils.env.apiUrl + "/urbface/" + id).subscribe((data: any) => {
        showPlace(data);
      })

     /* fetch(this.utils.env.apiUrl + "/urbface/" + id)
        .then(resp => resp.json())
        .then(function (data) {
          showPlace(data);
        })
        .catch(function (error) {
          console.log(error);
        });*/
    };

    let showPlace = (place: any) => {
      if (place && place.data) {
        console.log(place);
        this.place = place.data;
        this.sideVisible = true;
        let side = document.querySelector("#side .side-inner");
        if (side) side.scrollTop = 0;
      }
    };
  };

  toogleLayer(layer: any) {
    layer.forEach((el: any) => {
      el.setMap(el.getMap() ? null : this.map);
    });
  }
  
  hideSide() {
    this.sideVisible = false;
  };
}
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../utils.service';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.pug',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  testColor: any = '#fff'
  accordionsData: any = [];
  @ViewChild(MatAccordion, { static: true }) accordion!: MatAccordion;
  @ViewChild('accordion', { static: true }) accordionElement: any;
  subsubitem: any
  subitem: any
  item: any


  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) info!: MapInfoWindow;
  zoom: any = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  };
  markers: any = [];
  infoContent: any = '';

  constructor(
    private _snackBar: MatSnackBar,
    private utils: UtilsService
  ) { }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.markers.push({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        label: {
          color: 'blue',
          text: 'Marker label ' + (this.markers.length + 1),
        },
        title: 'Marker title ' + (this.markers.length + 1),
        info: 'Marker info ' + (this.markers.length + 1),
        options: {
          animation: google.maps.Animation.BOUNCE,
        },
      });
    });



    this.accordionsData = [
      {
        title: 'Personal data',
        items: [{
          title: 'Personal data',
          items: [{
            title: 'Personal data',
            items: [{
              title: 'Personal data',
              items: []
            }]
          }]
        }]
      },
      {
        title: 'Destination',
        items: [{
          title: 'Personal data',
          items: []
        }, {
          title: 'Personal data',
          items: []
        }]
      }, {
        title: 'Day of the trip',
        items: [{
          title: 'Personal data',
          items: []
        }, {
          title: 'Personal data',
          items: []
        }]
      },
    ];
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }

  click(event: any) {
    console.log(event);
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content;
    this.info.open(marker);
  }

  ngAfterViewInit() {
    let getChilds = (element: any, childClass: any) => {
      if (this.utils.isNode(element) && HTMLCollection.prototype.isPrototypeOf(element)) {
        //console.log(element.children)
        return element.children.classList.contains(childClass)
      }
      if (Array.isArray(element)) {
        console.log(element)
        return element.filter(el => {
          //console.log(el.children)
          return el.children.classList.contains(childClass)
        });
      } else {
        return Array.prototype.filter.call(element.children, el => el.matches(childClass));
      }

    }

    let acc = this.accordionElement.nativeElement
    let level0 = getChilds(acc, '.mat-expansion-panel')

    //console.log(level0)
    let level1 = getChilds(level0[0], '.mat-expansion-panel')
    //console.log(level1)
  }

}


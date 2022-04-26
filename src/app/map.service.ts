import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  gmapElement: any;
  map!: google.maps.Map;
  mapOptions: any;
  markers: any = [];
  markerCoordinates: any = [];
  markersVisible: boolean = true;
  infoWindow: any = null;
  json: any;
  mapData: any;
  mapObjects: any = {
    bounds: new google.maps.LatLngBounds(),
    heatmap: null
  };
  streetViewService: any = null;
  streetViewPanorama: any = null;

  savedMaps: any = {
    bath: '1pfsS5p92Ga6H4IuZtz-PF1mI_a8',
    urbi: '1qsx_FHmtd7NtoBnppAop87TdHws',
    urbi2: '1IN4KV2bF81UJE7ggohwKYUrdyfEuxgzB',
    urbi3: '1AFsD_O8Ms-xVGXfFyc2CccotDocYIxYo',
    test: '1QKITrqaGsjaXHWNZuJJXRP4IpmoHGyGc',
    kezmu: '154PMzE5zZ847CD4JXJvcrcjQAiY'
  }
  mapId: string = this.savedMaps.kezmu

  mapLayerTiles = [
    {
      title: 'Térkép',
      id: 'roadmap',
      icon: 'map'
    },
    {
      title: 'Műhold',
      id: 'satellite',
      icon: 'satellite'
    },
    {
      title: 'Domborzat',
      id: 'terrain',
      icon: 'terrain'
    },
    {
      url: 'http://tile.openstreetmap.org/${z}/${x}/${y}.png',
      title: 'OSM'
    },
    {
      url: 'http://c.tile.stamen.com/watercolor/${z}/${x}/${y}.jpg',
      title: 'Stamen Watercolor'
    },
    {
      url: 'http://a.tile.stamen.com/toner/${z}/${x}/${y}.png',
      title: 'Stamen Toner'
    },
    {
      url: 'https://tiles.wmflabs.org/hikebike/${z}/${x}/${y}.png',
      title: 'wmflabs Hike & Bike'
    },
    {
      url: ' 	http://tile.memomaps.de/tilegen/${z}/${x}/${y}.png',
      title: 'Öpnvkarte'
    }
  ]

  mapControls = [
    {
      title: 'Térkép rétegek',
      id: 'setMapType',
      icon: 'layers',
      menuItems: this.mapLayerTiles
    },
    {
      title: 'Saját pozícióm',
      id: 'getCurrentPosition',
      icon: 'my_location'
    },
    {
      title: 'Térkép forgatása',
      id: 'rotateMap',
      icon: '360'
    },
    {
      title: 'Térkép döntése',
      id: 'setMapTilt',
      icon: 'panorama_wide_angle'
    },
    {
      title: 'Utcanézet',
      id: 'changeStreetView',
      icon: 'streetview'
    },
    {
      title: 'Térkép mentése',
      id: 'getBackgroundColor',
      icon: 'camera_alt'
    },
    {
      title: 'Teljes képernyő',
      id: 'setMapFullscreen',
      icon: 'zoom_out_map'
    },
    {
      title: 'Heatmap',
      id: 'toggleHeatmap',
      icon: 'whatshot'
    },
    {
      title: 'Open in OSM',
      id: 'openInOsm',
      icon: 'map'
    },
    {
      title: 'Open in GM',
      id: 'openInGm',
      icon: 'map'
    }
  ]

  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private utils: UtilsService
  ) { }


  // Init Google map instance
  initMap(gmapElement: any, mapOptions: any,) {
    mapOptions.heading = 0;
    mapOptions.tilt = 45;
    mapOptions.backgroundColor = 'none';
    this.mapOptions = mapOptions;
    if (!this.mapOptions.center) this.mapOptions.center = new google.maps.LatLng(this.mapOptions.lat, this.mapOptions.lon);
    this.gmapElement = gmapElement.nativeElement;
    this.mapObjects.svLayer = new google.maps.StreetViewCoverageLayer();
    if (this.gmapElement) this.map = new google.maps.Map(this.gmapElement, mapOptions);
    this.setCustomMapLayers(this.mapLayerTiles);
    return this.map;
  }


  // Init Google Street view service
  initStreetViewService(): void {
    this.streetViewService = new google.maps.StreetViewService();
  }


  // Init Google Street view panorama service
  initStreetViewPanorama(container: any): void {
    this.streetViewPanorama = new google.maps.StreetViewPanorama(
      container, {
      //position: coord,
      //radius: radius,
      //addressControlOptions: false,
      linksControl: false,
      panControl: false,
      enableCloseButton: false,
      zoomControl: false,
      addressControl: false,
      fullscreenControl: false,
      motionTrackingControl: false
    });
  }


  // Geocode address and show street view if available
  searchStreetViewPanorama(place: any, container: any) {
    let radius: number = 500,
      google_api_key: any = 'AIzaSyDRL-Vp_h_EskZUebRsrN5P64bFcflEjy4',
      selectedMarkerCoords = { lat: 47.514934566576386, lng: 19.043418502953187 }

    if (!this.streetViewService) this.initStreetViewService()

    const geocoder = (place: any) => {
      var geocoder_url = 'https://maps.googleapis.com/maps/api/geocode/xml?address=' + place + '&key=' + google_api_key;
      this.httpService.getData(geocoder_url, { responseType: 'text' }).subscribe({
        next: (data: any) => {
          let parser = new DOMParser()
          let xmlDoc = parser.parseFromString(data, 'text/xml')
          let lat = xmlDoc?.getElementsByTagName('lat')?.[0]?.childNodes[0]?.nodeValue?.trim();
          let lng = xmlDoc?.getElementsByTagName('lng')?.[0]?.childNodes[0]?.nodeValue?.trim();
          selectedMarkerCoords = { lat: Number(lat), lng: Number(lng) };
          getPanoData();
        }, error: (err: any) => {
          console.log(err)
        }
      });
    }
    geocoder(place);

    const getPanoData = () => {
      this.streetViewService.getPanorama({ location: selectedMarkerCoords, radius: radius }, (panoData: any) => {
        console.log(panoData)
        if (panoData && radius <= 10000) {
          if (~panoData.copyright.indexOf('Google')) {
            if (!this.streetViewPanorama) this.initStreetViewPanorama(container);
            console.log(panoData)
            this.streetViewPanorama.setPano(panoData.location.pano);
          } else {
            radius += 300;
            getPanoData();
          }
          console.log(radius)
        }
      });
    }
  }


  // Show KML layer
  showKmlLayer(mapId: any) {
    let url = 'https://www.google.com/maps/d/u/0/kml?mid=' + mapId + '&forcekml=1',
      kmlLayer = new google.maps.KmlLayer({
        url: url,
        preserveViewport: false,
        map: this.map
      });
  }


  // Show KML layer
  showMap(mapId: any) {
    this.getMapKML(mapId).subscribe((data: any) => {
      this.mapData = data;
      console.log(this.mapData);
      this.map.fitBounds(this.mapObjects.bounds);
    })
  }


  // Add marker to map
  addMarker(el: any) {
    let marker: any = null;

    if (el.type === 'Point') {
      let loc = new google.maps.LatLng(el.loc.lng, el.loc.lat);
      marker = new google.maps.Marker({
        position: loc,
        icon: el.color ? this.createIcon(el.color) : el.icon
      });
      this.mapObjects.bounds.extend(loc);
      this.markerCoordinates.push(loc);

    } else if (el.type === 'LineString') {
      marker = new google.maps.Polyline({
        path: el.loc,
        geodesic: true,
        strokeColor: el.color,
        strokeOpacity: 1.0,
        strokeWeight: el.width
      });
      el.loc.forEach((item: any) => {
        this.mapObjects.bounds.extend(new google.maps.LatLng(item.lat, item.lng));
      });

    } else {
      marker = new google.maps.Polygon({
        paths: el.loc,
        strokeColor: el.color,
        strokeOpacity: 0.8,
        strokeWeight: el.width,
        fillColor: el.color,
        fillOpacity: 0.35
      });
      el.loc.forEach((item: any) => {
        this.mapObjects.bounds.extend(new google.maps.LatLng(item.lat, item.lng));
      });
    }

    marker.set('map', this.map);
    marker.set('title', el.name);
    marker.set('desc', el.desc);
    marker.set('type', el.type);
    marker.set('folder', el.folder);
    google.maps.event.addListener(marker, 'click', (event: any) => {
      this.showInfoWindow(marker, event);
    });
    return marker;
  }


  // Show info window on marker click
  showInfoWindow(marker: any, event: any) {
    if (this.infoWindow) this.infoWindow.close();
    this.infoWindow = new google.maps.InfoWindow({
      content: `
      <h3>${marker.title}</h3>
      <p>${urlify(marker.desc) /*this.isValidUrl(marker.desc) ? '<a target="_blank" href="' + marker.desc + '">' + marker.desc + '</a>' : marker.desc*/}</p>
      <p>${event.latLng.lat().toFixed(4)}, ${event.latLng.lng().toFixed(4)}</p>
      `
    });
    this.infoWindow.open(this.map);
    this.infoWindow.setPosition(event.latLng);

    function urlify(text: any) {
      let urlRegex = /(?!<br\/>|<br>)(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, '<a href="$1">$1</a>');
    }
  }


  // Find closest markers to a point
  findClosestMarkers(event: any, n: any) {
    let markers_distances = [];
    for (let i = 0; i < this.mapData.markers.length; i++) {
      let m = this.mapData.markers[i];
      if (m.type === 'Point') {
        let d = google.maps.geometry.spherical.computeDistanceBetween(m.position, event.latLng).toFixed(0);
        markers_distances.push({
          distance: d,
          marker: m
        });
      }
    }
    return markers_distances.sort((a: any, b: any) => { return a.distance - b.distance }).slice(0, n);
  }


  // Get map ID from map Url
  getMapIdFromUrl(url: any) {
    if (url.length === 28) return url
    return this.utils.getUrlParam(url, 'mid') ? this.utils.getUrlParam(url, 'mid') : this.utils.getUrlParam(url, 'mapid')
  }


  // Get Google My Maps KML data
  getMapKML(mapId?: any, options?: any) {
    mapId = mapId ? mapId : this.mapId
    let subject = new Subject<string>(), url: string = ''
    if (options && options.fromFile) {
      url = this.utils.env.apiUrl + '/getMapDataFromFile/' + mapId
    } else {
      url = this.utils.env.apiUrl + '/getMapData/' + mapId
    }

    this.httpService.getData(url).subscribe((data: any) => {
      this.json = data;
      subject.next(this.json);
    })

    /*
        let subject = new Subject<string>();
        //if (!mapId || mapId === this.mapId) {
        if (this.json) {
          subject.next(this.json);
        } else {
          let url = 'https://www.google.com/maps/d/u/0/kml?mid=' + this.mapId + '&forcekml=1'
          console.log(url)
          this.httpService.getData(url, {
            responseType: 'text'
          }).subscribe((data: any) => {
            this.json = this.kmlToJson2(data, this.mapId);
            subject.next(this.json);
          })
        }*/
    //this.mapId = mapId;
    return subject.asObservable();
  }


  // Parse KML to JSON
  kmlToJson2(kml: any, mapId: any) {
    let getNodeValue = (node: any, item: any) => {
      let el = node.getElementsByTagName(item)[0]
      return (el && el.childNodes[0]) ? el.childNodes[0].nodeValue.trim() : '';
    }
    let getNodeType = (node: any) => {
      let types = ['Point', 'LineString', 'LinearRing'], ret;
      types.forEach(el => {
        if (node.getElementsByTagName(el)[0]) ret = el;
      })
      return ret;
    }
    let convertColor = (kmlColor: any) => {
      if (!kmlColor) return '';
      return kmlColor[6] + kmlColor[7] + kmlColor[4] + kmlColor[5] + kmlColor[2] + kmlColor[3]
    }
    let parser = new DOMParser(),
      xmlDoc = parser.parseFromString(kml, 'text/xml'),
      output: any = {
        markers: []
      },
      markerObj

    output.folders = [];
    let folders: any = xmlDoc.getElementsByTagName('Folder');
    for (let folder of folders) {
      let markers: any = folder.getElementsByTagName('Placemark');
      output.folders.push({
        title: getNodeValue(folder, 'name'),
        total: markers.length
      })
      for (let marker of markers) {
        let type = getNodeType(marker), loc: any = [];
        let styleUrl = xmlDoc.getElementById(getNodeValue(marker, 'styleUrl').substr(1) + '-normal')
        if (type === 'Point') {
          loc = {
            lat: getNodeValue(marker, 'coordinates').split(',')[0],
            lng: getNodeValue(marker, 'coordinates').split(',')[1]
          }
        } else {
          let lines = getNodeValue(marker, 'coordinates').split('\n');
          lines.forEach((line: any) => {
            loc.push({
              lat: line.split(',')[1].trim() * 1,
              lng: line.split(',')[0].trim() * 1
            })
          });
        }
        markerObj = {
          name: getNodeValue(marker, 'name'),
          desc: getNodeValue(marker, 'description'),
          loc: loc,
          type: type,
          color: convertColor(getNodeValue(styleUrl, 'color')),
          width: getNodeValue(styleUrl, 'width'),
          icon: getNodeValue(styleUrl, 'href'),
          folder: getNodeValue(folder, 'name')
        }
        output.markers.push(this.addMarker(markerObj));
      }
    }
    output.description = getNodeValue(xmlDoc, 'description');
    output.mapId = mapId;
    output.url = 'https://www.google.com/maps/d/viewer?mid=' + mapId;
    output.kmlUrl = 'https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=' + mapId;
    output.title = getNodeValue(xmlDoc, 'name');
    output.markersTotal = output.markers.length;

    return output;
  }


  // set custom map layers
  setCustomMapLayers(layers: any) {
    layers.forEach((customTile: any) => {
      if (customTile.url) {
        let osmMapTypeOptions = {
          getTileUrl: function (coord: any, z: any) {
            let x = coord.x, y = coord.y
            return eval('`' + customTile.url + '`');
          },
          tileSize: new google.maps.Size(256, 256),
          isPng: true,
          maxZoom: 19,
          minZoom: 0,
          name: customTile.title
        };
        this.map.mapTypes.set(customTile.title, new google.maps.ImageMapType(osmMapTypeOptions));
      }
    });
  }


  // Parse KML to JSON
  kmlToJson(kml: any) {
    let getNodeValue = (node: any, item: any) => {
      let el = node.getElementsByTagName(item)[0]
      return (el && el.childNodes[0]) ? el.childNodes[0].nodeValue.trim() : '';
    }
    let getNodeType = (node: any) => {
      let types = ['Point', 'LineString', 'LinearRing'], ret;
      types.forEach(el => {
        if (node.getElementsByTagName(el)[0]) ret = el;
      })
      return ret;
    }
    let convertColor = (kmlColor: any) => {
      if (!kmlColor) return '';
      return '#' + kmlColor[6] + kmlColor[7] + kmlColor[4] + kmlColor[5] + kmlColor[2] + kmlColor[3]
    }
    let parser = new DOMParser(),
      xmlDoc = parser.parseFromString(kml, 'text/xml'),
      output: any = {
        markers: []
      };

    let markers: any = xmlDoc.getElementsByTagName('Placemark')
    for (let marker of markers) {
      let type = getNodeType(marker), loc: any = [];
      let styleUrl = xmlDoc.getElementById(getNodeValue(marker, 'styleUrl').substr(1) + '-normal')
      if (type === 'Point') {
        loc = {
          lat: getNodeValue(marker, 'coordinates').split(',')[0],
          lng: getNodeValue(marker, 'coordinates').split(',')[1]
        }
      } else {
        let lines = getNodeValue(marker, 'coordinates').split('\n');
        lines.forEach((line: any) => {
          loc.push({
            lat: line.split(',')[1].trim() * 1,
            lng: line.split(',')[0].trim() * 1
          })
        });
      }
      output.markers.push({
        name: getNodeValue(marker, 'name'),
        desc: getNodeValue(marker, 'description'),
        loc: loc,
        type: type,
        color: convertColor(getNodeValue(styleUrl, 'color')),
        width: getNodeValue(styleUrl, 'width'),
        icon: getNodeValue(styleUrl, 'href')
      })
    }
    output.description = getNodeValue(xmlDoc, 'description')
    output.title = getNodeValue(xmlDoc, 'name')
    output.markersTotal = output.markers.length

    return output;
  }


  // Set map type
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }


  openInOsm(): void {
    const center = this.map.getCenter();
    const url = `http://www.openstreetmap.org/?mlat=${center?.lat()}&mlon=${center?.lng()}&zoom=${this.map.getZoom()}`;
    window.open(url, "_blank");
  }

  openInGm(): void {
    const center = this.map.getCenter();
    const url = `https://www.google.hu/maps/@${center?.lat()},${center?.lng()},${this.map.getZoom()}z`;
    window.open(url, "_blank");
  }


  // Toggle heat map
  toggleHeatmap() {
    if (!this.mapObjects.heatmap) this.mapObjects.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.markerCoordinates,
      radius: 20
    });
    this.mapObjects.heatmap.setMap(this.mapObjects.heatmap.getMap() ? null : this.map);
    this.toogleMarkers();
  }


  // Get current client position
  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    });
  }


  // Set tilt of map
  setMapTilt() {
    this.map.getTilt() === 0 ? this.map.setTilt(45) : this.map.setTilt(0);
  }


  // Rotate map
  rotateMap() {
    if (this.map.getTilt() !== 0) {
      let heading = this.map.getHeading() || 0;
      this.map.setHeading(heading + 90);
    }
  }


  // Set map to fullscreen
  setMapFullscreen() {
    let el: any = this.map.getDiv().firstChild;
    if (document.fullscreenElement === el) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }


  // Change to fullscreen view
  changeStreetView() {
    let mapDiv = this.gmapElement.querySelectorAll('.gm-style')[0].childNodes[0];
    if (this.mapObjects.svLayer.getMap()) {
      this.mapObjects.svLayer.setMap(null);
      mapDiv.style.cssText += ';url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default;';
    } else {
      this.mapObjects.svLayer.setMap(this.map);
      mapDiv.style.cssText += ';cursor:crosshair !important;';
    }
    let streetView: any = this.map.getStreetView();

    google.maps.event.addListener(this.map, 'click', (e: any) => {
      streetView.setOptions({ visible: true, position: e.latLng });
      if (!streetView.location) {
        streetView.setOptions({ visible: false });
        this.snackBar.open('Az utcanézet nem elérhető a megadott helyszínen', '', { duration: 1500 });
      } else {
        console.log(streetView.location)
        if (streetView.visible) {
          streetView.setOptions({ visible: false });
        } else {
          streetView.setOptions({ visible: true });
        }
      }
    });
  }


  // Fly to marker
  goToMarker(marker: any) {
    this.map.panTo(marker.position);
  };


  // Get map background color
  getBackgroundColor() {
    let type: any = this.map.getMapTypeId()
    return type !== 'satellite' ? '#f1efe9' : '#203a1d';
  }


  // Create marker icon
  createIcon(color: any, type?: any) {
    if (type === 'svg') {
      return {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, //'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        //fillOpacity: 1,
        strokeColor: '#000',
        //strokeWeight: 1,
        //scale: 1,
      };
    } else {
      return 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color;
    }
  }


  // Sets the map on all markers in the array.
  setMapOnAll(map: any) {
    for (let i = 0; i < this.mapData.markers.length; i++) {
      this.mapData.markers[i].setMap(map);
    }
  }


  // Removes the markers from the map, but keeps them in the array.
  toogleMarkers() {
    this.markersVisible ? this.clearMarkers() : this.showMarkers();
    this.markersVisible = !this.markersVisible;
  }


  // Removes the markers from the map, but keeps them in the array.
  clearMarkers() {
    this.setMapOnAll(null);
  }


  // Shows any markers currently in the array.
  showMarkers() {
    this.setMapOnAll(this.map);
  }


  // Deletes all markers in the array by removing references to them.
  deleteMarkers() {
    this.clearMarkers();
    this.mapData.markers = [];
  }


  // Check if string is URL
  isValidUrl(string: any) {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }
    return true;
  }

}

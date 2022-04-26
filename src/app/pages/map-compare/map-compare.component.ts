import { Component, OnInit } from '@angular/core';
import { MapService } from './../../map.service';

@Component({
  selector: 'app-map-compare',
  templateUrl: './map-compare.component.pug',
  styleUrls: ['./map-compare.component.scss']
})
export class MapCompareComponent implements OnInit {
  map1Url = 'https://www.google.com/maps/d/edit?mid=1OuoijHwW8NnLsDnZA_ZE26axSW_Cv1YO&ll=47.250894645511565%2C19.368941000000024&z=8'
  map2Url = 'https://www.google.com/maps/d/edit?mid=12o8t6Fa3p8hhyr-f4h1PeiQb2egZwwjz&ll=47.14994255740197%2C19.503304500000002&z=8'
  mapData: any
  mapData2: any
  searchInput: any
  folder: any
  marker: any
  differentMarkers: any = []
  srcResult: any
  differenceList: any = []

  constructor(
    public mapService: MapService
  ) { }

  ngOnInit() {
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        console.log(this.srcResult)

        var enc = new TextDecoder("utf-8");
        var arr = new Uint8Array(this.srcResult);
        console.log(enc.decode(arr));

      };
      console.log(inputNode.files[0])
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  compare(map1?: any, map2?: any) {
    let map1Id = this.mapService.getMapIdFromUrl(map1),
    map2Id = this.mapService.getMapIdFromUrl(map2)

    var t0 = performance.now()
    this.mapService.getMapKML(map2Id).subscribe((data: any) => {
      this.mapData = data
      console.log(this.mapData)
      this.mapService.getMapKML(map1Id, { fromFile: false }).subscribe((data2: any) => {
        this.mapData2 = data2
        console.log(this.mapData2)

        this.mapData.markers.forEach((marker1: any) => {
          this.mapData2.markers.forEach((marker2: any) => {
            let m = marker1.name == marker2.name //|| JSON.stringify(marker1.loc) == JSON.stringify(marker2.loc)
            if (m) this.differentMarkers.push(marker1.name)
          })
        })
        console.log(this.differentMarkers)
        var t1 = performance.now()
        console.log('compare finished ' + (t1 - t0) / 1000 + " sec")
        var emm = this.mapData.markers.filter((marker1: any) => {
          return !this.differentMarkers.includes(marker1.name)
        })
        this.differenceList = emm
        console.log(emm)
      })

    })
  }

}
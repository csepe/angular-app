import { Component, OnInit } from '@angular/core';
import { MapService } from './../../map.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-map-info',
  templateUrl: './map-info.component.pug',
  styleUrls: ['./map-info.component.scss']
})
export class MapInfoComponent implements OnInit {
  mapData: any
  searchInput: any
  folder: any
  marker: any

  folders = [
    {
      title: "Névtelen réteg 1",
      markers: [
        'Folder1Marker1', 'Folder1Marker2'
      ]
    },
    {
      title: "Névtelen réteg 2",
      markers: [
        'Folder2Marker1', 'Folder2Marker2'
      ]
    },
    {
      title: "Névtelen réteg 3",
      markers: [
        'Folder3Marker1', 'Folder3Marker2'
      ]
    },
  ]

  constructor(
    public mapService: MapService
  ) { }

  ngOnInit() {
    this.mapService.getMapKML('1IN4KV2bF81UJE7ggohwKYUrdyfEuxgzB').subscribe((data: any) => {
      this.mapData = data
      console.log(this.mapData);
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
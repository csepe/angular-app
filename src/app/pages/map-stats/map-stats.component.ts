import { Component, OnInit } from '@angular/core';
import { MapService } from './../../map.service';

@Component({
  selector: 'app-map-stats',
  templateUrl: './map-stats.component.pug',
  styleUrls: ['./map-stats.component.scss']
})
export class MapStatsComponent implements OnInit {
  mapData: any
  searchInput: any
  folder: any
  marker: any

  constructor(
    public mapService: MapService
  ) { }

  ngOnInit() {
    this.mapService.getMapKML().subscribe((data: any) => {
      this.mapData = data
      console.log(this.mapData);
    })
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
    pure: false
})
export class SearchFilter implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}

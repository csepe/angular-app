import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../http.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.pug',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Budapest&key=380a8e4a86f5478dba3fa54ea03534ba&lang=hu';
  apiData: any = [];
  data: any;
  item: any;
  chartData: any = {
    labels: [],
    datasets: []
  }

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      this.apiData = data
      console.log(data)
      let labels = [], ds1 = [], ds2 = [], ds3 = []
      this.apiData.data.forEach(day => {
        labels.push(day.valid_date)
        ds1.push(day.temp)
        ds2.push(day.pop)
        ds3.push(day.precip)
      })

      this.chartData = {
        title: 'Hőmérséklet és csapadék előrejelzés (Weatherbit API)',
        setLabels: ['Hőmérséklet (°C)', 'Csapadék esélye (%)', 'Csapadék intenzítása (mm)'],
        type: 'logarithmic',
        labels: labels,
        dataSets: [
          { data: ds1 },
          { data: ds2 },
          { data: ds3, type: 'bar' }
        ],
        hasViewIntervals: false
      }
    })
  }
}
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpService } from './../../http.service';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.pug',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  cards: any = [];
  card: any;
  cardsVisible: boolean = false;
  apiUrl: string = '';
  apiUrl2: string = 'https://api.covid19api.com/country/hungary';
  apiData: any = null;
  covidData: any = null;
  covidToday: any = null;
  covidDaily: any = [];
  chartData: any = [];
  chartData2: any = [];
  data: any;
  item: any;

  constructor(
    private utils: UtilsService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    //this.getVizallasData()
    this.getCovidData()

    /*this.apiUrl = this.utils.env.apiUrl + '/indexfuji';
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      this.apiData = data;
    })*/
  }

  getCovidData() {
    this.httpService.getData(this.apiUrl2).subscribe((data: any) => {
      this.covidData = data;
      let lastDay = this.covidData[this.covidData.length - 1], labels = []
      this.covidToday = {
        daily: lastDay.Confirmed - this.covidData[this.covidData.length - 2].Confirmed,
        deaths: lastDay.Deaths,
        date: lastDay.Date
      }
      let lastWeek = this.utils.lastNFromArray(this.covidData, 31)
      //console.log(lastWeek)
      for (var i = 1; i < lastWeek.length; i++) {
        //console.log(lastWeek[i].Confirmed, lastWeek[i - 1].Confirmed);
        this.covidDaily.push(lastWeek[i].Confirmed - lastWeek[i - 1].Confirmed)
        const formattedDate = formatDate(lastWeek[i].Date, 'MM. dd.', 'en-US')
        labels.push(formattedDate)
      }
      //console.log(this.covidDaily)

      this.chartData = {
        setLabels: ['Napi új eset'],
        type: 'logarithmic',
        labels: labels,
        dataSets: [
          { data: this.covidDaily }
        ],
        hasViewIntervals: false,
        hasLegend: false
      }
    })
  }

  getVizallasData() {
    let url = 'https://node-server-seven.vercel.app/api/vizallas', labels: any = [], chartData2dataSets: any = []
    this.httpService.getData(url).subscribe((data: any) => {

      data.forEach((el: any) => {
        labels.push(el.title)
        chartData2dataSets.push(el.value)
      })

      this.chartData2 = {
        setLabels: ['Duna vízállás 2019'],
        type: 'logarithmic',
        labels: labels,
        dataSets: [
          { data: chartData2dataSets }
        ],
        hasViewIntervals: false,
        hasLegend: false
      }
    })
  }
}

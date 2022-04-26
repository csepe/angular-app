import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpService } from './../../http.service';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.pug',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {
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

  constructor(
    private utils: UtilsService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getCovidData();
  }

  getLinks(): void { }

  getCovidData(): void {
    this.httpService.getData(this.apiUrl2).subscribe((data: any) => {
      let infectedTotal = [], infectedDaily = [], deathsTotal = [], deathsDaily = [];
      this.covidData = data;
      let lastDay = this.covidData[this.covidData.length - 1], labels = [];
      this.covidToday = {
        daily: lastDay.Confirmed - this.covidData[this.covidData.length - 2].Confirmed,
        deaths: lastDay.Deaths,
        date: lastDay.Date
      };
      let lastWeek = this.utils.lastNFromArray(this.covidData, 31);

      for (var i = 1; i < lastWeek.length; i++) {
        infectedTotal.push(lastWeek[i].Confirmed);
        infectedDaily.push(lastWeek[i].Confirmed - lastWeek[i - 1].Confirmed);
        deathsTotal.push(lastWeek[i].Deaths);
        deathsDaily.push(lastWeek[i].Deaths - lastWeek[i - 1].Deaths);
        const formattedDate = formatDate(lastWeek[i].Date, 'MM. dd.', 'en-US');
        labels.push(formattedDate);
      }

      this.chartData = {
        setLabels: ['Összes eset', 'Napi új eset'],
        type: 'logarithmic',
        labels: labels,
        dataSets: [
          { data: infectedTotal },
          { data: infectedDaily }
        ],
        hasViewIntervals: false,
        hasLegend: false
      }
      this.chartData2 = {
        setLabels: ['Elhunytak', 'Napi elhunyt'],
        type: 'logarithmic',
        labels: labels,
        dataSets: [
          { data: deathsTotal },
          { data: deathsDaily }
        ],
        hasViewIntervals: false,
        hasLegend: false
      }

    })
  }

}

import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, ChangeDetectorRef, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.pug',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ChartComponent implements AfterViewInit {
  @ViewChild('chart', { static: false }) chartcanvas!: ElementRef;
  //@Output() chartInstance = new EventEmitter();
  @Input() data: any = [];
  myChart: any = null;
  chartLegend: any[] = [];
  chartTitle: string = '';
  showIntervalButton: any = false;
  chartViews: any = [
    {
      name: 'Heti nézet',
      id: 'weekly',
      cols: 7
    },
    {
      name: 'Havi nézet',
      id: 'monthly',
      cols: 30
    },
    {
      name: 'Éves nézet',
      id: 'annual',
      cols: 365
    }
  ];
  selectedView = this.chartViews[2];

  constructor(
    private utils: UtilsService,
    private ref: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    Chart.register(...registerables);
    this.initChart()
  }

  initChart() {
    if (this.data.dataSets) {
      this.chartTitle = this.data.title;
      this.showIntervalButton = this.data.hasViewIntervals;
      let datasets: any = [],
        ctx = this.chartcanvas.nativeElement,
        chartColor = window.getComputedStyle(document.querySelectorAll('mat-toolbar')[0]).getPropertyValue('background-color'),
        colors = ['#ff5757', '#0774f0', '#9c69ab', '#2bc176'];
      ctx = ctx.getContext('2d');

      this.data.dataSets.forEach((el: any, i: any) => {
        let dataset: any = {
          label: this.data.setLabels[i],
          data: this.data.hasViewIntervals ? el.data.slice(Math.max(el.data.length - this.selectedView.cols, 1)) : el.data,
          borderColor: this.data.dataSets.length > 1 ? colors[i] : chartColor,
          backgroundColor: this.data.dataSets.length > 1 ? colors[i] : chartColor,
          fill: false,
          borderWidth: 2,
          datalabels: {
            align: 'start',
            anchor: 'top'
          },
          type: el.type ? el.type : 'line'
        };
        datasets[i] = dataset;
      })

      /*
      let labels = this.data.labels, m = 0
      let today = new Date(labels[0])
      let weeks = [], start = 0
      for (let i = 0; i < labels.length/7; i++) {
        weeks.push({
          start: start,
          width: 5
        })
        start = start+7
      }
      console.log(weeks)
      
      var originalLineDraw = Chart.controllers.line.prototype.draw;
      Chart.helpers.extend(Chart.controllers.line.prototype, {
        draw: function () {
          m++
          var chart = this.chart;
          var highlightWeekRange = chart.config.options.highlightWeekRange;
          if (highlightWeekRange !== undefined) {
            
            var ctx = chart.chart.ctx;

            var xaxis = chart.scales['x-axis-0'];
            var yaxis = chart.scales['y-axis-0'];
            let dayWidth = (xaxis.right - xaxis.left) / labels.length
            let firstRange = dayWidth * (5 - today.getDay() + 1)
            console.log(dayWidth, firstRange)

            var yRangeBeginPixel = yaxis.getPixelForValue(0);
            var yRangeEndPixel = yaxis.getPixelForValue(firstRange);

            let prev = 0
            //for (let i = 1; i < 4; i++) {
              ctx.save();
              ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
              ctx.fillRect(0, yaxis.top, firstRange, yaxis.bottom - yaxis.top);
              ctx.restore();
              //prev = firstRange + (dayWidth * 2)
              //console.log(prev)
           // }
            

          }
          originalLineDraw.apply(this, arguments);
          console.error(m)
        }
      });
     */


      let config: any = {
        type: 'bar',
        data: {
          labels: this.data.hasViewIntervals ? this.data.labels.slice(Math.max(this.data.labels.length - this.selectedView.cols, 1)) : this.data.labels,
          datasets: datasets
        },
        options: {
          // highlightWeekRange: true,
          legendCallback: function (chart: any) {
            let legend = []
            for (var i = 0; i < chart.data.datasets.length; i++) {
              legend.push({
                color: chart.data.datasets[i].backgroundColor,
                label: chart.data.datasets[i].label
              });
            }
            return legend
          },
          title: {
            display: false,
            text: this.data.title ? this.data.title : ''
          },
          animation: this.data.hasOwnProperty('animation') ? this.data.animation : {},
          //animation: false,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              color: 'black',
              display: false,
              formatter: Math.round,
              title: false
            }
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#0d293d'
          },
          legend: {
            display: false,
            position: 'bottom',
            align: 'start',
            labels: {
              boxWidth: 10,
              fontSize: 10,
              padding: 20,
              usePointStyle: true
            }
          },
          scales: {
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawTicks: false
              },
              ticks: {
                padding: 20
              }
            },
            y: {
              grid: {
                drawBorder: false,
                drawTicks: false
              },
              stacked: false,
              type: this.data.type ? this.data.type : 'linear',
              ticks: {
                padding: 20,
                callback: (value: any, index: any, values: any) => {
                  return 'logarithmic' != this.data.type ? value.toLocaleString() : index % 3 && value != values[values.length - 2] ? void 0 : value.toLocaleString()
                },
                beginAtZero: false,
                fontColor: '#8c8c8c'
              }
            }

          }
        }
      };
      this.myChart = new Chart(ctx, config)
      //this.chartLegend = this.myChart.generateLegend()
      this.ref.detectChanges()
    }
  }

  ngOnChanges(changes: any) {
    if (changes.data.currentValue && this.myChart) {
      console.log('change')
      //this.myChart.update()
      this.initChart()
    }
  }

  update() {
    this.myChart.update()
  }

  changeChartInterval() {
    if (this.myChart) {
      this.myChart.data.labels = this.data.labels.slice(Math.max(this.data.labels.length - this.selectedView.cols, 1)),
        this.data.dataSets.forEach(((e: any, n: any) => {
          console.log(e)
          this.myChart.data.datasets[n].data = e.data.slice(Math.max(e.length - this.selectedView.cols, 1))
        }))
      this.myChart.data.labels = this.utils.lastNFromArray(this.myChart.data.labels, this.myChart.data.datasets[0].data.length)
      this.myChart.update()
    }
  }
}
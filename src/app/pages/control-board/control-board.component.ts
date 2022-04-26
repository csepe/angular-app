import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-control-board',
  templateUrl: './control-board.component.pug',
  styleUrls: ['./control-board.component.scss']
})
export class ControlBoardComponent implements OnInit {
  socket: any = null
  testColor: any = '#ff0019'
  rgbLedIntensity: number = 5
  lcdText: string = ''
  soundArray: any[] = []
  chartData: any = {}
  error: string = ''

  constructor() { }

  ngOnInit(): void {
    this.chartData = {
      title: 'Sound sensor',
      setLabels: ['Sound level'],
      labels: ['lol'],
      datasets: [[50]],
      hasViewIntervals: false,
      animation: false
    }
    this.socket = io.io(
      'http://localhost:3000/',
      {
        reconnectionAttempts: 2
      }
    )
    this.socket.on('sound', (socket: any) => {
      let p = socket >> 2
      this.soundArray = [p, ...this.soundArray.slice(0, 9)];
      this.chartData.labels = this.soundArray
      this.chartData.dataSets = [{ data: this.soundArray }]
      this.chartData = { ...this.chartData }
    })
    this.socket.on('connect_error', (error: any) => {
      this.error = error
      console.log(error)
      this.socket.disconnect()
    })
    this.runNode()
  }

  pickedColorChange(): void {
    this.emit('rgbLedColor', this.testColor)
  }

  emit(event: any, value?: any): void {
    this.socket.emit(event, value)
  }

  ngOnDestroy(): void {
    this.socket.disconnect()
  }

  runNode(): void {
  }

}

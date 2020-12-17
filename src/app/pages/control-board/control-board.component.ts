import { Component, OnInit, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-control-board',
  templateUrl: './control-board.component.pug',
  styleUrls: ['./control-board.component.scss']
})
export class ControlBoardComponent implements OnInit {
  socket
  testColor: any = '#ff0019'
  rgbLedIntensity: number = 5
  lcdText: string = ''
  soundArray = []
  chartData: any = {}

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
    this.socket.on('sound', (socket) => {
      this.soundArray = [socket >> 2, ...this.soundArray.slice(0, 9)];
      this.chartData.labels = this.soundArray
      this.chartData.dataSets = [{ data: this.soundArray }]
      this.chartData = { ...this.chartData }
    })
    this.socket.on('connect_error', (error) => {
      console.log(error)
      this.socket.disconnect()
    })
    this.runNode()
  }

  pickedColorChange() {
    this.emit('rgbLedColor', this.testColor)
  }

  emit(event, value?) {
    this.socket.emit(event, value)
  }

  ngOnDestroy() {
    this.socket.disconnect()
  }

  runNode() {
  }

}

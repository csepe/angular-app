import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import iro from '@jaames/iro';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.pug',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  @Input() pickedColor: any;
  @Output() pickedColorChange: EventEmitter<any> = new EventEmitter();
  pickerColor: any = [
    ["#ff7100", "#ff4b14", "#ff1b1b", "#ff144b", "#ff0071"],
    ["#ffb420", "#ff9440", "#ff6d52", "#ff526d", "#ff4094", "#ff20b4"],
    ["#fff231", "#ffd75e", "#ffb880", "#ff8d8d", "#ff80b8", "#ff5ed7", "#ff31f2"],
    ["#ceff2f", "#eaff65", "#fff998", "#ffdbbf", "#ffbfdb", "#ff98f9", "#ea65ff", "#ce2fff"],
    ["#8dff1b", "#a9ff54", "#c6ff8d", "#e2ffc6", "#ffffff", "#e2c6ff", "#c68dff", "#a954ff", "#8d1bff"],
    ["#60ff2f", "#7aff65", "#98ff9f", "#bfffe3", "#bfe3ff", "#989fff", "#7a65ff", "#602fff"],
    ["#31ff3e", "#5eff86", "#80ffc7", "#8dffff", "#80c7ff", "#5e86ff", "#313eff"],
    ["#20ff6b", "#40ffaa", "#52ffe4", "#52e4ff", "#40aaff", "#206bff"],
    ["#00ff8e", "#14ffc8", "#1bffff", "#14c8ff", "#008eff"]
  ];

  constructor(
  ) { }

  ngOnInit(): void {
    var colorPicker = iro.ColorPicker('#picker', {
      width: 200,
      borderWidth: 1,
      borderColor: "#000",
      color: this.pickedColor,
      //layout: [{ component: iro.ui.Wheel }]
    });
    colorPicker.on('color:change', (color: any) => {
      this.pickedColorChange.emit(color.hexString)
    });
  }

  pickColor(color: any) {
    this.pickedColorChange.emit(color)
  }
}

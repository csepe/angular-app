import { Component, OnInit } from '@angular/core';
import { brushes } from './brushes';
import { UtilsService } from './../../utils.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.pug',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements OnInit {
  canvas: any = null
  ctx: any = null
  flag: boolean = false
  prevX: number = 0
  currX: number = 0
  prevY: number = 0
  currY: number = 0
  events: string[] = ["mousemove", "mousedown", "mouseup", "mouseout"]
  points: any[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
  brushes: any = brushes
  activeBrush: any = brushes[0].brushes[0]
  currentColor: string = "#000"
  lineWidth: number = 10
  lastPoint: any = null
  img: any = new Image()
  anim: any = null

  constructor(
    private utils: UtilsService
  ) {
    this.anim = new UtilsService.Animation
  }

  ngOnInit(): void {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.img.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png'
    this.setSize();
    this.paintChangeStyle(this.activeBrush)

    this.events.forEach((el: any) => {
      this.canvas.addEventListener(el, (e: any) => {
        this.findxy(el, e);
      }, false);
    });
  }

  setSize(): void {
    let element = this.canvas.getBoundingClientRect();
    //let w = window.innerWidth - 200, h = window.innerHeight - 64
    this.canvas.width = element.width;
    this.canvas.height = element.height;
  }

  paintSetcolor(obj: any): void {
    this.currentColor = obj.id;
    this.lineWidth = this.currentColor == "white" ? 14 : 2;
  }

  paintSetSize(size: number) {
    this.lineWidth = size;
  }

  paintDraw(e?: any) {
    this.activeBrush.func(e, this)
  }

  paintChangeStyle(style: any) {
    if (style.options && style.options.lineWidth) this.lineWidth = style.options.lineWidth
  }

  paintErase() {
    this.anim.stop()
    this.points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  paintAuto() {
    this.paintErase()
    const animation = () => {
      let range = this.utils.randomInt(10, 100)
      this.prevX = this.currX
      this.prevY = this.currY
      this.currX = this.utils.limitNumber(this.utils.randomInt(this.currX - range, this.currX + range), 0, this.ctx.canvas.width)
      this.currY = this.utils.limitNumber(this.utils.randomInt(this.currY - range, this.currY + range), 0, this.ctx.canvas.height)
      let e: any = { clientX: this.currX, clientY: this.currY }
      this.points.push({ x: e.clientX, y: e.clientY })
      this.paintDraw(e)
    }
    this.anim.start(animation, 60)
  }

  paintRandom() {
    this.paintErase()
    for (let i = 0; i < 100; i++) {
      this.ctx.fillStyle = this.utils.getRandomColor();
      this.ctx.fillRect(
        this.utils.randomInt(0, this.ctx.canvas.width),
        this.utils.randomInt(0, this.ctx.canvas.height),
        this.utils.randomInt(10, 200),
        this.utils.randomInt(10, 200)
      );
    }
  }

  paintSave() {
    this.utils.downloadCanvas(this.canvas)
  }

  setCords(res: any, e: any) {
    this.prevX = this.currX
    this.prevY = this.currY
    let rect = this.canvas.getBoundingClientRect(),
      scaleX = this.canvas.width / rect.width,
      scaleY = this.canvas.height / rect.height;
    this.currX = (e.clientX - rect.left - scrollX) * scaleX
    this.currY = (e.clientY - rect.top - scrollY) * scaleY
    //if (res == "mousedown") {
      this.points = []
      this.points.push({ x: this.currX, y: this.currY })
      this.lastPoint = { x: this.currX, y: this.currY }
    //}
  }

  findxy(res: any, e: any) {
    if (res == "mousedown") {
      /*this.prevX = this.currX
      this.prevY = this.currY

      let rect = this.canvas.getBoundingClientRect(),
      scaleX = this.canvas.width / rect.width,
      scaleY = this.canvas.height / rect.height;

      this.currX = (e.clientX - rect.left - scrollX) * scaleX //e.clientX - this.canvas.offsetLeft
      this.currY = (e.clientY - rect.top - scrollY) * scaleY //e.clientY - this.canvas.offsetTop

      this.points = []
      this.points.push({ x: e.clientX, y: e.clientY })
      this.lastPoint = { x: e.clientX, y: e.clientY }*/
      this.setCords(res, e)
      this.flag = true
    }

    if (res == "mouseup" || res == "mouseout") {
      this.flag = false
    }

    if (res == "mousemove") {
      if (this.flag) {
        /*this.prevX = this.currX
        this.prevY = this.currY
        this.currX = e.clientX - this.canvas.offsetLeft
        this.currY = e.clientY - this.canvas.offsetTop*/
        this.setCords(res, e)
        this.paintDraw(e)
      }
    }
  }
}
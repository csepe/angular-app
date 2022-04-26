
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  env: any = environment;

  constructor() { }

  // Animate function with requestAnimationFrame
  static Animation = class {
    autoAnim: any = null;
    start(animationCallback: Function, fps: number) {
      let fpsInterval: number = 1000 / fps,
        now: number = 0,
        then: number = Date.now(),
        elapsed: number = 0,
        performAnimation = () => {
          this.autoAnim = requestAnimationFrame(performAnimation);
          now = Date.now();
          elapsed = now - then;
          if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            animationCallback(elapsed);
          }
        }
      performAnimation();
    }
    stop() {
      cancelAnimationFrame(this.autoAnim);
      this.autoAnim = null;
    }
  }

  // Get a random integer
  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Get random value from array
  randomFromArr(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Limit number between min and max range
  limitNumber(num: number | string, min: number, max: number): number {
    const MIN: number = min || 1, MAX: number = max || 20, parsed: number = parseInt(num as string);
    return Math.min(Math.max(parsed, MIN), MAX);
  }

  // Sum the digits of a number
  sumDigits(num: number): number {
    let sum: number = 0;
    while (num) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  // Check if URL exists
  urlExists(url: string): Promise<boolean> {
    return fetch(url, { mode: "no-cors" }).then(res => true).catch(err => false);
  }

  // Download canvas as PNG image
  downloadCanvas(canvas: any): void {
    var link = document.getElementById('link');
    link?.setAttribute('download', 'canvas.png');
    link?.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link?.click();
  }

  // Get random hex color
  getRandomColor = (): string => '#' + Math.floor(Math.random() * 16777215).toString(16);

  // Convert hex to rgb color
  hexToRGB(hex: string, alpha: number): string {
    const shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    let result: any = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
      r = parseInt(result[1], 16),
      g = parseInt(result[2], 16),
      b = parseInt(result[3], 16)
    return `rgba(${r},${g},${b},${alpha})`;
  }

  //Returns true if it is a DOM node    
  isNode(o: any): boolean {
    return (
      typeof Node === "object" ? o instanceof Node :
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    );
  }

  //Returns true if it is a DOM element    
  isElement(o: any): boolean {
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    );
  }

  // Invert a hex color
  invertColor(hex: string, bw: boolean): string {
    const padZero = (str: string, len?: number): string => {
      len = len || 2;
      var zeros = new Array(len).join('0');
      return (zeros + str).slice(-len);
    }
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r: any = parseInt(hex.slice(0, 2), 16),
      g: any = parseInt(hex.slice(2, 4), 16),
      b: any = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    }
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    return "#" + padZero(r) + padZero(g) + padZero(b);
  }

  // Ligten-darken hex color
  lightenDarkenColor(hex: string, percent: number): string {
    hex = hex.replace(/^\s*#|\s*$/g, '');
    if (hex.length == 3) {
      hex = hex.replace(/(.)/g, '$1$1');
    }
    var r: number = parseInt(hex.substring(0, 2), 16),//subst(0,2)
      g: number = parseInt(hex.substring(2, 4), 16),//subst(2,2)
      b: number = parseInt(hex.substring(4, 6), 16);//subst(4, 2)
    return '#' +
      ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substring(1) +
      ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substring(1) +
      ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substring(1);
  }

  checkUrlIsImage(url: string): boolean {
    return url.match ? (url.match(/\.(jpeg|jpg|gif|png)$/) != null) : false;
  }

  checkURL(url: string): boolean {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  getUrlParam(url: string, param: string): string {
    let searchParams: any = new URLSearchParams((new URL(url)).search);
    return searchParams.get(param);
  }

  lastNFromArray(array: any[], n: number): any {
    if (array == null) return void 0;
    if (n == null) return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));
  }

  distanceBetween(point1: any, point2: any): number {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  angleBetween(point1: any, point2: any): number {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  midPointBtw(p1: any, p2: any): any {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2
    };
  }

  // Get canas pattern
  getPattern(color: string, type: string): any {
    let patternCanvas: any = document.createElement('canvas'),
      dotWidth: number = 20,
      dotDistance: number = 5,
      patternCtx: any = patternCanvas.getContext('2d');

    if (type == 'dots') {
      patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;
      patternCtx.fillStyle = color;
      patternCtx.beginPath();
      patternCtx.arc(dotWidth / 2, dotWidth / 2, dotWidth / 2, 0, Math.PI * 2, false);
      patternCtx.closePath();
      patternCtx.fill();

    } else if (type == 'lines') {
      patternCanvas.width = patternCanvas.height = 10;
      patternCtx.strokeStyle = color;
      patternCtx.lineWidth = 5;
      patternCtx.beginPath();
      patternCtx.moveTo(0, 5);
      patternCtx.lineTo(10, 5);
      patternCtx.closePath();
      patternCtx.stroke();

    } else {
      patternCanvas.width = 35;
      patternCanvas.height = 20;
      patternCtx.fillStyle = 'red';
      patternCtx.fillRect(0, 0, 5, 20);
      patternCtx.fillStyle = 'orange';
      patternCtx.fillRect(5, 0, 10, 20);
      patternCtx.fillStyle = 'yellow';
      patternCtx.fillRect(10, 0, 15, 20);
      patternCtx.fillStyle = 'green';
      patternCtx.fillRect(15, 0, 20, 20);
      patternCtx.fillStyle = 'lightblue';
      patternCtx.fillRect(20, 0, 25, 20);
      patternCtx.fillStyle = 'blue';
      patternCtx.fillRect(25, 0, 30, 20);
      patternCtx.fillStyle = 'purple';
      patternCtx.fillRect(30, 0, 35, 20);

    }
    return patternCanvas;
  }

}

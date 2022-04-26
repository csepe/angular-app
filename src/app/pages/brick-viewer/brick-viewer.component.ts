import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpService } from './../../http.service';
import * as THREE from 'three';
import { LDrawLoader } from 'three/examples/jsm/loaders/LDrawLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-brick-viewer',
  templateUrl: './brick-viewer.component.pug',
  styleUrls: ['./brick-viewer.component.scss']
})
export class BrickViewerComponent implements AfterViewInit {
  src: string = 'http://omr.ldraw.org/media/LDraw%20models/1632-1 - Motor Boat/1632-1 - Motor Boat.mpd'
  step: number = 1
  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  loader: any = new LDrawLoader();
  model: any;
  controls!: OrbitControls;
  numConstructionSteps?: number;
  @ViewChild('canvas', { static: false }) canvas: any;
  apiUrl: any
  apiData: any

  constructor(
    private httpService: HttpService
  ) { }

  getApiData() {
    this.apiUrl = 'https://node-app-api.glitch.me/api/brick/car'
    this.httpService.getData(this.apiUrl).subscribe((data: any) => {
      console.log(data)
      this.apiData = data;
      this.loadModel(this.apiData[1].url)
    }, err => {
      console.log(err)
    })
  }

  ngAfterViewInit(): void {
    console.log(THREE)
    this.canvas = this.canvas.nativeElement
    let width = this.canvas.getBoundingClientRect().width,
      height = this.canvas.getBoundingClientRect().height
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true
    })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xdeebed);

    this.camera.position.set(150, 200, 250);
    this.camera.lookAt(0, 1.5, 0)


    const ambientLight = new THREE.AmbientLight(0xdeebed, 0.4);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1000, 1200, 1500);
    this.scene.add(directionalLight);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () =>
      requestAnimationFrame(this.animate)
    );
    (this.loader as any).separateObjects = true;
    this.animate()

    const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x00ff00 }))
    this.scene.add(cube)
    console.log(this.scene)
    this.loader.setCrossOrigin("")
    //this.loader.crossOrigin = "anonymous"
    this.getApiData()
  }

  restart() {
    this.step! = 1;
  }

  stepBack() {
    this.step! -= 1;
  }

  stepForward() {
    this.step! += 1;
  }

  resetCamera() {
    this.controls.reset();
  }

  private loadModel(src: any) {
    if (src === null) return
    this.loader.setPath('').load(src, (newModel: any) => {
      console.log(newModel)
      if (this.model !== undefined) {
        this.scene.remove(this.model)
        this.model = undefined
      }
      this.model = newModel
      this.model.rotation.x = Math.PI
      this.scene.add(this.model)
      this.numConstructionSteps = this.model.userData.numConstructionSteps
      this.step = this.numConstructionSteps!
      const bbox = new THREE.Box3().setFromObject(this.model)
      this.controls.target.copy(bbox.getCenter(new THREE.Vector3()))
      this.controls.update()
      this.controls.saveState()
    },
      undefined
    )
  }

  private updateObjectsVisibility() {
    this.model &&
      this.model.traverse((c: any) => {
        if (c.isGroup && this.step) {
          c.visible = c.userData.constructionStep <= this.step;
        }
      });
    requestAnimationFrame(this.animate);
  }

  private animate = () => {
    this.renderer.render(this.scene, this.camera)
  }
}
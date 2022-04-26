import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import * as THREE from 'three';
// @ts-ignore
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-three-canvas',
  templateUrl: './three-canvas.component.pug',
  styleUrls: ['./three-canvas.component.scss']
})
export class ThreeCanvasComponent implements AfterViewInit {
  defaults: any = {
    canvasColor: 'skyblue',
    gridHelper: true,
    antialias: true,
    alpha: true,
    rotateSpeed: 0.4,
    autoRotate: true,
    autoRotateSpeed: 10,
    camera: {
      position: {
        x: 5,
        y: 3,
        z: 5
      },
      lookAt: {
        x: 0,
        y: 1.5,
        z: 0
      }
    }
  }

  options: any = {}
  @Input() model: any;
  @Input() inputOptions: any;
  @ViewChild('canvasContainer', { static: false }) canvasContainer: any;
  @ViewChild('canvas', { static: false }) canvas: any;
  container: any
  camera: any
  renderer: any
  scene: any

  constructor() { }

  ngOnChanges(changes: any) {
    if (changes.model.currentValue) this.addModel(changes.model.currentValue)
  }

  ngAfterViewInit() {
    console.log(this.inputOptions)
    this.options = { ...this.defaults, ...this.inputOptions }
    this.canvas = this.canvas.nativeElement
    let width = this.canvasContainer.nativeElement.getBoundingClientRect().width,
      height = this.canvasContainer.nativeElement.getBoundingClientRect().height,
      camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 100),
      renderer = new THREE.WebGLRenderer({
        antialias: this.options.antialias,
        canvas: this.canvas,
        alpha: this.options.alpha
      })
    this.scene = new THREE.Scene()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    camera.position.set(this.options.camera.position.x, this.options.camera.position.y, this.options.camera.position.z)
    camera.lookAt(this.options.camera.lookAt.x, this.options.camera.lookAt.y, this.options.camera.lookAt.z)

    if (this.options.gridHelper) this.scene.add(new THREE.GridHelper(10, 10))

    this.container = new THREE.Group()
    this.scene.add(this.container)

    let controls = new OrbitControls(camera, renderer.domElement)
    controls.rotateSpeed = this.options.rotateSpeed
    controls.autoRotate = this.options.autoRotate
    controls.autoRotateSpeed = this.options.autoRotateSpeed
    controls.addEventListener("change", () => {
      if (renderer) renderer.render(this.scene, camera)
    })

    //const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x00ff00 }))
    //this.container.add(cube)

    renderer.render(this.scene, camera)
    renderer.setAnimationLoop(() => {
      renderer.render(this.scene, camera)
    })

    let animate = () => {
      var time = performance.now() / 10000
      camera.position.x = Math.sin(time) * 5
      camera.position.z = Math.cos(time) * 5
      camera.lookAt(this.scene.position)
      renderer.render(this.scene, camera)
      controls.update()
      requestAnimationFrame(animate)
    }
    //requestAnimationFrame(animate)


    let addLight = () => {
      let ambientLight = new THREE.AmbientLight('#fff', 0.5),
        pointLight = new THREE.PointLight('#fff', 1)
      pointLight.position.set(25, 50, 25)
      this.scene.add(ambientLight)
      this.scene.add(pointLight)
    }
    addLight()

    let onWindowResize = () => {
      let width = this.canvasContainer.nativeElement.getBoundingClientRect().width,
        height = this.canvasContainer.nativeElement.getBoundingClientRect().height
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", onWindowResize, false);

  }

  addModel(asset: any) {
    let getImageColor = () => {
      let img = new Image, canvas = document.createElement('canvas')
      img.crossOrigin = "anonymous"
      img.src = asset.thumbnail.url
      img.onload = () => {
        canvas.getContext('2d')!.drawImage(img, 0, 0, 512, 384)
        let pixelData = canvas.getContext('2d')!.getImageData(0, 0, 1, 1).data
        this.options.canvasColor = `radial-gradient(ellipse at center, rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]},0.5) 0%,rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]},1) 100%)`
      }
    }

    let format = asset.formats.find((format: any) => format.formatType === 'OBJ')
    if (format !== undefined) {
      let obj = format.root,
        mtl = format.resources.find((resource: any) => resource.url.endsWith('mtl')),
        path = obj.url.slice(0, obj.url.indexOf(obj.relativePath)),
        loader = new MTLLoader()

      loader.setCrossOrigin(true)
      loader.setMaterialOptions({ ignoreZeroRGBs: true })
      loader.setTexturePath(path)
      loader.load(mtl.url, (materials: any) => {
        materials.preload();
        let loader = new OBJLoader()
        loader.setMaterials(materials)
        loader.load(obj.url, (object: any) => {

          let box = new THREE.Box3()
          box.setFromObject(object)
          let center = new THREE.Vector3(), size = new THREE.Vector3()
          box.getCenter(center)
          center.y = box.min.y
          object.position.sub(center)
          let scaler = new THREE.Group()
          scaler.add(object)
          scaler.scale.setScalar(6 / box.getSize(size).length())
          while (this.container.children.length) {
            this.container.remove(this.container.children[0])
          }
          getImageColor()
          this.container.add(scaler)
        })
      })
    }

  }
}

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
  Input
} from "@angular/core"

import * as THREE from "three"
import "three/examples/js/EnableThreeExamples"
const _THREE = require("three")
import "three/examples/js/loaders/STLLoader"
import "three/examples/js/controls/OrbitControls"
import "three/examples/js/loaders/ColladaLoader"
import "three/examples/js/loaders/VTKLoader"
import { MessageService } from "primeng/components/common/messageservice"
import { Loader, Vector3, Geometry, Object3D } from "three"

@Component({
  selector: "app-three",
  templateUrl: "./three.component.html",
  styleUrls: ["./three.component.scss"]
})
export class ThreeComponent implements AfterViewInit {
  private renderer: THREE.WebGLRenderer
  private camera: THREE.PerspectiveCamera
  private cameraTarget: THREE.Vector3
  public scene: THREE.Scene

  public fieldOfView = 60
  public nearClippingPane = 1
  public farClippingPane = 1100

  public cameraControls: THREE.OrbitControls

  @ViewChild("canvas") private canvasRef: ElementRef
  // @Input() objectUrl: string

  private ambientLight: THREE.Light
  private light: THREE.Light

  private diffuseColor = new THREE.Color()
  private specularColor = new THREE.Color()

  effectController = {
    shininess: 40.0,
    ka: 0.17,
    kd: 0.51,
    ks: 0.2,
    metallic: true,
    hue: 0.121,
    saturation: 0.73,
    lightness: 0.66,
    lhue: 0.04,
    lsaturation: 0.01, // non-zero so that fractions will be shown
    llightness: 1.0,
    // bizarrely, if you initialize these with negative numbers, the sliders
    // will not show any decimal places.
    lx: 0.32,
    ly: 0.39,
    lz: 0.7,
    newTess: 15,
    bottom: true,
    lid: true,
    body: true,
    fitLid: false,
    nonblinn: false,
    newShading: "glossy"
  }

  private materialColor = new THREE.Color()

  private gouraudMaterial = new THREE.MeshLambertMaterial({
    color: this.materialColor,
    side: THREE.DoubleSide
  })

  constructor(private msgService: MessageService) {
    this.materialColor.setRGB(1.0, 1.0, 1.0)
    this.render = this.render.bind(this)
    this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this)
  }

  private setCanvasSize() {
    this.canvas.style.width = "100%"
    this.canvas.style.height = "100%"
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement
  }

  private createScene() {
    this.scene = new THREE.Scene()
    this.scene.add(this.ambientLight)
    this.scene.add(this.light)
    // const loader = new THREE.STLLoader()
    // loader.load("assets/model/teapot.STL", this.onModelLoadingCompleted)
    // loader.load(this.objectUrl, this.onModelLoadingCompleted)
  }

  loader(ext: string, format: string): any {
    switch (ext) {
      case "stl":
        return new THREE.STLLoader()
      case "vtk":
      case "vtp":
        return new THREE.VTKLoader()
      default:
        // FIXME : Throw error here
        return undefined
    }
  }

  @Input()
  set load(data: { url: string; ext: string; format: string }) {
    this.loader(data.ext, data.format).load(
      data.url,
      this.onModelLoadingCompleted
    )
  }

  private onModelLoadingCompleted(geometry: Geometry) {
    geometry.computeFaceNormals()
    geometry.computeVertexNormals()

    const obj = new THREE.Object3D()
    const mesh = new THREE.Mesh(geometry, this.gouraudMaterial)
    obj.add(mesh)
    this.fitCameraToObject(obj, 0, this.cameraControls)
    this.scene.add(obj)

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)

    this.render()
    // this.oss.dispatch({
    //   type: INDETERMINATE_PROGRESS_BAR,
    //   payload: { visible: false, title: "" }
    // })
  }

  private createLight() {
    // let light = new THREE.PointLight(0xffffff, 1, 1000)
    // light.position.set(0, 0, 100)
    // this.scene.add(light)

    // light = new THREE.PointLight(0xffffff, 1, 1000)
    // light.position.set(0, 0, -100)
    // this.scene.add(light)

    this.ambientLight = new THREE.AmbientLight(0x333333)
    this.light = new THREE.DirectionalLight(0xffffff, 1.0)
  }

  private createCamera() {
    const aspectRatio = this.getAspectRatio()
    this.camera = new THREE.PerspectiveCamera()
  }

  private getAspectRatio(): number {
    const height = this.canvas.clientHeight
    if (height === 0) {
      return 0
    }

    return this.canvas.clientWidth / this.canvas.clientHeight
  }

  private setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: this.canvas,
      antialias: true
    })
    this.renderer.setPixelRatio(devicePixelRatio)

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)

    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setClearColor(0xffffff, 1)
    this.renderer.autoClear = true
  }

  public render() {
    this.diffuseColor.setHSL(
      this.effectController.hue,
      this.effectController.saturation,
      this.effectController.lightness
    )
    if (this.effectController.metallic) {
      // make colors match to give a more metallic look
      this.specularColor.copy(this.diffuseColor)
    } else {
      // more of a plastic look
      this.specularColor.setRGB(1, 1, 1)
    }
    this.diffuseColor.multiplyScalar(this.effectController.kd)

    this.gouraudMaterial.color.copy(this.diffuseColor)

    this.specularColor.multiplyScalar(this.effectController.ks)

    this.ambientLight.color.setHSL(
      this.effectController.hue,
      this.effectController.saturation,
      this.effectController.lightness * this.effectController.ka
    )
    this.light.position.set(
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z
    )

    this.light.color.setHSL(
      this.effectController.lhue,
      this.effectController.lsaturation,
      this.effectController.llightness
    )
    this.renderer.render(this.scene, this.camera)
  }

  public addControls() {
    this.cameraControls = new THREE.OrbitControls(this.camera, this.canvas)
    this.cameraControls.rotateSpeed = 1.0
    this.cameraControls.zoomSpeed = 1.2
    this.cameraControls.addEventListener("change", this.render)
  }

  @HostListener("window:resize", ["$event"])
  public onResize(event: Event) {
    this.setCanvasSize()
    this.camera.aspect = this.getAspectRatio()
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight)
    this.render()
  }

  /* LIFECYCLE */
  ngAfterViewInit() {
    this.setCanvasSize()
    this.createLight()
    this.createCamera()
    this.addControls()
    this.setupRenderer()
    this.createScene()
  }

  fitCameraToObject(
    object: Object3D,
    offset: number,
    orbitControls: THREE.OrbitControls
  ) {
    const boundingBox = new THREE.Box3()
    boundingBox.setFromObject(object)

    let center: Vector3 = new Vector3()
    let size: Vector3 = new Vector3()
    center = boundingBox.getCenter(center)
    size = boundingBox.getSize(size)

    // get the max side of the bounding box
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = this.camera.fov * (Math.PI / 180)
    let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2))

    // offset the camera as desired - usually a value of ~ 1.25 is good to prevent
    // object filling the whole canvas
    if (offset !== undefined && offset !== 0) cameraZ *= offset

    this.camera.position.set(center.x, center.y, cameraZ)

    // set the far plane of the camera so that it easily encompasses the whole object
    const minZ = boundingBox.min.z
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ

    this.camera.far = cameraToFarEdge * 3

    this.camera.aspect = this.getAspectRatio()
    this.camera.updateProjectionMatrix()

    if (orbitControls !== undefined) {
      // set camera to rotate around center of loaded object
      orbitControls.target = center

      // prevent camera from zooming out far enough to create far plane cutoff
      orbitControls.maxDistance = cameraToFarEdge * 2
    }
  }
}

import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-three-demo",
  templateUrl: "./three-demo.component.html",
  styleUrls: ["./three-demo.component.scss"]
})
export class ThreeDemoComponent implements OnInit {
  tabs: ViewTab[] = [
    new ViewTab(
      ".stl ascii",
      "assets/data/teapot.stl",
      "stl",
      "ascii",
      true,
      true
    ),
    new ViewTab(".vtp xml", "assets/data/test.vtp", "vtp", "xml"),
    new ViewTab(".vtp xml (cube)", "assets/data/cube.vtp", "vtp", "xml"),
    new ViewTab(".vtp binary", "assets/data/cube_binary.vtp", "vtp", "binary"),
    new ViewTab(".vtk ascii", "assets/data/bunny.vtk", "vtk", "ascii")
  ]

  constructor() {}

  ngOnInit() {}

  selectTab(event: any) {
    this.tabs.forEach((t: ViewTab) => (t.selected = false))
    const tab = this.tabs[event.index]
    tab.selected = true
    tab.rendered = true
  }
}

export class ViewTab {
  name: string
  url: string
  ext: string
  format: string
  data3d: Data3D
  selected: boolean
  rendered: boolean

  constructor(
    name: string,
    url: string,
    ext: string,
    format: string,
    selected: boolean = false,
    rendered: boolean = false
  ) {
    this.name = name
    this.data3d = new Data3D(url, ext, format)
    this.selected = selected
    this.rendered = rendered
  }
}

export class Data3D {
  url: string
  ext: string
  format: string

  constructor(url: string, ext: string, format: string) {
    this.url = url
    this.ext = ext
    this.format = format
  }
}

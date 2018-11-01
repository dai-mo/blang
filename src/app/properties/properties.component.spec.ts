/*
Copyright (c) 2017-2018 brewlabs SAS
*/
import { TestBed, async } from "@angular/core/testing"
import { PropertiesComponent } from "./properties.component"
describe("PropertiesComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesComponent]
    }).compileComponents()
  }))
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(PropertiesComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(PropertiesComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual("app")
  }))
  it("should render title in a h1 tag", async(() => {
    const fixture = TestBed.createComponent(PropertiesComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to app!"
    )
  }))
})

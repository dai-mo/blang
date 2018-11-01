/*
Copyright (c) 2017-2018 brewlabs SAS
*/
import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { ItemListPanelComponent } from "./item-list-panel.component"

describe("ItemListPanelComponent", () => {
  let component: ItemListPanelComponent
  let fixture: ComponentFixture<ItemListPanelComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ItemListPanelComponent]
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})

import {
  FieldGroup,
  Field,
  ItemStatus,
  Item,
  ItemConf
} from "./../../model/fields"

import { Observable } from "rxjs/Observable"

import { SelectItem } from "primeng/primeng"
import { Component, OnInit, Input } from "@angular/core"

// import { ItemConf, ItemStatus, FieldGroup, Field } from "../../model/fields"

@Component({
  selector: "app-item-list-panel",
  templateUrl: "./item-list-panel.component.html",
  styleUrls: ["./item-list-panel.component.scss"]
})
export class ItemListPanelComponent implements OnInit {
  @Input() itemConf: ItemConf
  @Input() finaliseLabel: string

  private itemStatus = ItemStatus
  items: SelectItem[]
  selectedItemValue: { id: string; status: string }
  selectedItemFieldGroups: FieldGroup[]
  selectedItemSpecificFields: Field[]

  constructor() {
    this.items = []
  }

  ngOnInit(): void {
    if (this.itemConf !== undefined) {
      let itemConfList: Item[]
      if (this.itemConf.showFirstItemOnly) {
        itemConfList = [this.itemConf.items[0]]
        this.select(this.itemConf.items[0].id)
      } else itemConfList = this.itemConf.list()
      itemConfList.forEach(fe =>
        this.items.push({
          label: fe.name,
          value: {
            id: fe.id,
            status: fe.status
          }
        })
      )
    }
  }

  select(itemId: string) {
    if (this.itemConf !== undefined) {
      this.itemConf.select(itemId)
      this.selectedItemFieldGroups = this.itemConf.fieldGroups(itemId)
      this.selectedItemSpecificFields = this.itemConf.specificFields(itemId)
    }
  }

  finalise() {
    if (this.itemConf !== undefined) {
      this.itemConf.finalise()
    }
  }

  cancel() {
    this.itemConf.cancel()
  }
}
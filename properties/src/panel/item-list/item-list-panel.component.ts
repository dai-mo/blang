import { FieldGroup, Field, ItemStatus, ItemConf } from "./../../model/fields"

import { Observable } from "rxjs/Observable"

import { SelectItem } from "primeng/primeng"
import { Component, OnInit, Input } from "@angular/core"

import { MessageService } from "primeng/components/common/messageservice"

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

  constructor(private messageService: MessageService) {
    this.items = []
  }

  ngOnInit(): void {
    if (this.itemConf !== undefined) {
      this.itemConf.list().forEach(fe =>
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
    this.itemConf.select(itemId)
    this.selectedItemFieldGroups = this.itemConf.fieldGroups(itemId)
    this.selectedItemSpecificFields = this.itemConf.specificFields(itemId)
  }

  finalise() {
    this.itemConf.finalise(this.messageService)
  }

  cancel() {
    this.itemConf.cancel()
  }
}

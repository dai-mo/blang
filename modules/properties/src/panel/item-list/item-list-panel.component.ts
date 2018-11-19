/*
Copyright (c) 2017-2018 brewlabs SAS

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import {
  FieldGroup,
  Field,
  ItemStatus,
  Item,
  ItemConf
} from "./../../model/fields"

import { Observable } from "rxjs/Observable"

import { SelectItem } from "primeng/primeng"
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core"
import { DynamicItem } from "../../dynamic/dynamic-item"
import { DynamicDirective } from "../../dynamic/dynamic.directive"
import { DynamicService } from "../../dynamic/dynamic.service"

@Component({
  selector: "app-item-list-panel",
  templateUrl: "./item-list-panel.component.html",
  styleUrls: ["./item-list-panel.component.scss"]
})
export class ItemListPanelComponent implements OnInit, AfterViewInit {
  @Input() itemConf: ItemConf
  @Input() finaliseLabel: string
  @Input() dynamicItem: DynamicItem

  dynamicDirective: DynamicDirective
  @ViewChild(DynamicDirective)
  set content(dynamicDirective: DynamicDirective) {
    this.dynamicDirective = dynamicDirective
    const dd = this.dynamicDirective
    this.dynamicService.loadComponent(this.dynamicItem, this.dynamicDirective)
    this.changeDetectorRef.detectChanges()
  }

  private itemStatus = ItemStatus
  items: SelectItem[]
  selectedItemValue: { id: string; status: string }
  selectedItemFieldGroups: FieldGroup[]
  selectedItemSpecificFields: Field[]

  constructor(
    private dynamicService: DynamicService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
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

  ngAfterViewInit(): void {}

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

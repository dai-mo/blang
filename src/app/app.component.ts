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
import { ItemStatus } from "./../../modules/properties/src/model/fields"
import { MessageService } from "primeng/components/common/messageservice"
import { Component } from "@angular/core"
import {
  FieldGroup,
  Field,
  FieldVisibilityLevel,
  PossibleValue,
  ItemConf,
  Item
} from "../../modules/properties/src/public_api"

import * as SI from "seamless-immutable"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  nonEditableFields: FieldGroup
  batchFields: FieldGroup
  editableReactiveFields: FieldGroup
  requiredBatchFields: FieldGroup
  requiredReactiveFields: FieldGroup
  listItemConf: SampleListItemConf
  dialogListItemConf: SampleDialogListItemConf
  dialogSingleItemConf: SampleDialogSingleItemConf
  dialogSingleItemListConf: SampleDialogSingleItemListConf

  tabs = [
    "Non Editable Forms",
    "Batch Forms",
    "Reactive Forms",
    "Required Batch Forms",
    "Required Reactive Forms",
    "Item List",
    "Dialogs"
  ]

  constructor(private messageService: MessageService) {
    const testData = new TestData(messageService)

    this.nonEditableFields = testData.nonEditableFieldGroup()
    this.batchFields = testData.batchFieldGroup()
    this.editableReactiveFields = testData.editableReactiveFieldGroup()
    this.requiredBatchFields = testData.requiredBatchFieldGroup()
    this.requiredReactiveFields = testData.requiredReactiveFieldGroup()
    this.listItemConf = new SampleListItemConf(this.messageService)
    this.dialogListItemConf = new SampleDialogListItemConf(this.messageService)
    this.dialogSingleItemConf = new SampleDialogSingleItemConf(
      this.messageService
    )
    this.dialogSingleItemListConf = new SampleDialogSingleItemListConf(
      this.messageService
    )
  }

  openListDialog() {
    this.dialogListItemConf = new SampleDialogListItemConf(this.messageService)
    this.dialogListItemConf.isItemListDialogVisible = true
  }

  openSingleItemDialog() {
    this.dialogSingleItemConf = new SampleDialogSingleItemConf(
      this.messageService
    )
    this.dialogSingleItemConf.isSingleItemDialogVisible = true
  }

  openSingleItemListDialog() {
    this.dialogSingleItemListConf = new SampleDialogSingleItemListConf(
      this.messageService
    )
    this.dialogSingleItemListConf.isSingleItemListDialogVisible = true
  }

  submit(event: any, fieldGroup: FieldGroup) {
    fieldGroup.doSubmit((data: any) => {
      this.messageService.add({
        severity: "info",
        summary: "Form Data",
        detail: "<pre>" + JSON.stringify(data, null, 2) + "</pre>"
      })
    })
  }
}

export class TestData {
  constructor(private messageService: MessageService) {}

  invalid = (name: string, data: any) =>
    this.messageService.add({
      severity: "warn",
      summary: "Input Validation",
      detail: name + " is invalid"
    })

  checkbox(editable: boolean, required: boolean, name: string = "checkbox") {
    return new Field(
      name,
      name,
      name,
      true,
      [],
      true,
      editable,
      required,
      FieldVisibilityLevel.OpenField
    )
  }

  text(
    value: string,
    editable: boolean,
    required: boolean,
    name: string = "text"
  ) {
    return new Field(
      name,
      name,
      name,
      value,
      [],
      value,
      editable,
      required,
      FieldVisibilityLevel.OpenField
    )
  }

  list(
    value: string,
    editable: boolean,
    required: boolean,
    name: string = "list"
  ) {
    return new Field(
      name,
      name,
      name,
      value,
      [
        new PossibleValue("Cogito", "Cogito", "Cogito"),
        new PossibleValue("ergo", "ergo", "ergo"),
        new PossibleValue("sum", "sum", "sum")
      ],
      value,
      editable,
      required,
      FieldVisibilityLevel.OpenField
    )
  }

  range(editable: boolean, required: boolean, name: string = "range") {
    return new Field(
      name,
      name,
      name,
      "low",
      [
        new PossibleValue("low", "low", "low"),
        new PossibleValue("medium", "medium", "medium"),
        new PossibleValue("high", "high", "high")
      ],
      "low",
      editable,
      required,
      FieldVisibilityLevel.OpenField,
      true
    )
  }

  nonEditableFieldGroup(): FieldGroup {
    return new FieldGroup(
      "Non Editable Field Group",
      [
        this.checkbox(false, true),
        this.text("Cogito ergo sum", false, true),
        this.list("ergo", false, true),
        this.range(false, true)
      ],
      this.invalid
    )
  }

  batchFieldGroup(): FieldGroup {
    return new FieldGroup(
      "Editable Batch Field Group",
      [
        this.checkbox(true, false),
        this.text("Cogito ergo sum", true, false),
        this.list("ergo", true, false),
        this.range(true, false)
      ],
      this.invalid
    )
  }

  editableReactiveFieldGroup(): FieldGroup {
    return new FieldGroup(
      "Reactive Field Group",
      [
        this.checkbox(true, false),
        this.text("Cogito ergo sum", true, false),
        this.list("ergo", true, false),
        this.range(true, false)
      ],
      this.invalid,
      true,
      (data: any) => {
        this.messageService.add({
          severity: "info",
          summary: "Form Data",
          detail: "<pre>" + JSON.stringify(data, null, 2) + "</pre>"
        })
      }
    )
  }

  requiredBatchFieldGroup(
    checkBoxName: string = "checkBox",
    textName = "text",
    listName = "list",
    rangeName = "range"
  ): FieldGroup {
    return new FieldGroup(
      "Required Batch Fields",
      [
        this.checkbox(true, true, checkBoxName),
        this.text("", true, true, textName),
        this.list("", true, true, listName),
        this.range(true, true, rangeName)
      ],
      this.invalid
    )
  }

  requiredReactiveFieldGroup(): FieldGroup {
    return new FieldGroup(
      "Required Reactive Fields",
      [
        this.checkbox(true, true),
        this.list("", true, true),
        this.range(true, true)
      ],
      this.invalid,
      true,
      (data: any) => {
        this.messageService.add({
          severity: "info",
          summary: "Form Data",
          detail: "<pre>" + JSON.stringify(data, null, 2) + "</pre>"
        })
      }
    )
  }

  itemConfWithMultipleFieldGroups(): ItemConf {
    return new SampleListItemConf(this.messageService)
  }
}

export class SampleListItemConf extends ItemConf {
  testData: TestData

  constructor(private messageService: MessageService) {
    super()
    this.testData = new TestData(this.messageService)
    this.items = this.fieldGroupItems()
  }

  fieldGroupItems(): Item[] {
    let i = 0
    const items: Item[] = []
    for (i = 0; i < 15; i++) {
      const name = "item" + i.toString()
      const fg1 = this.testData.requiredBatchFieldGroup(
        "checkboxA",
        "textA",
        "listA",
        "rangeA"
      )
      fg1.label = i.toString() + " " + fg1.label
      const fg2 = this.testData.requiredBatchFieldGroup(
        "checkboxB",
        "textB",
        "listB",
        "rangeB"
      )
      fg2.label = i.toString() + " " + fg2.label
      items.push(new Item(name, name, name, ItemStatus.OK, [fg1, fg2]))
    }
    return items
  }

  postFinalise(data?: any): void {
    this.messageService.add({
      severity: "info",
      summary: "Form Data",
      detail: "<pre>" + JSON.stringify(data, null, 2) + "</pre>"
    })
  }

  cancel(): void {
    this.messageService.add({
      severity: "info",
      summary: "Form Data",
      detail: "Submission Cancelled"
    })
  }
}

export class SampleDialogListItemConf extends SampleListItemConf {
  isItemListDialogVisible = false

  postFinalise(data?: any): void {
    this.isItemListDialogVisible = false
    super.postFinalise(data)
  }

  cancel(): void {
    this.isItemListDialogVisible = false
    super.cancel()
  }
}

export class SampleDialogSingleItemConf extends SampleListItemConf {
  isSingleItemDialogVisible = false

  fieldGroupItems(): Item[] {
    this.showFirstItemOnly = true
    const items: Item[] = []

    const fg1 = this.testData.requiredBatchFieldGroup(
      "checkboxA",
      "textA",
      "listA",
      "rangeA"
    )

    const fg2 = this.testData.requiredBatchFieldGroup(
      "checkboxB",
      "textB",
      "listB",
      "rangeB"
    )

    items.push(new Item(name, name, name, ItemStatus.OK, [fg1, fg2]))

    return items
  }

  postFinalise(data?: any): void {
    this.isSingleItemDialogVisible = false
    super.postFinalise(data)
  }

  cancel(): void {
    this.isSingleItemDialogVisible = false
    super.cancel()
  }
}

export class SampleDialogSingleItemListConf extends SampleListItemConf {
  isSingleItemListDialogVisible = false

  fieldGroupItems(): Item[] {
    this.showFirstItemOnly = false
    const items: Item[] = []

    const name = "item"

    const fg1 = this.testData.requiredBatchFieldGroup(
      "checkboxA",
      "textA",
      "listA",
      "rangeA"
    )

    items.push(new Item(name, name, name, ItemStatus.OK, [fg1]))

    return items
  }

  postFinalise(data?: any): void {
    this.isSingleItemListDialogVisible = false
    super.postFinalise(data)
  }

  cancel(): void {
    this.isSingleItemListDialogVisible = false
    super.cancel()
  }
}

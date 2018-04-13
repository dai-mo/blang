import { ItemStatus } from "./../../properties/src/model/fields"
import { MessageService } from "primeng/components/common/messageservice"
import { Component } from "@angular/core"
import {
  FieldGroup,
  Field,
  FieldVisibilityLevel,
  PossibleValue,
  ItemConf,
  Item
} from "../../properties/src/public_api"

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
  }

  openListDialog() {
    this.dialogListItemConf = new SampleDialogListItemConf(this.messageService)
    this.dialogListItemConf.isItemListDialogVisible = true
  }

  submit(event: any, fieldGroup: FieldGroup) {
    fieldGroup.doSubmit(this.messageService, (data: any) => {
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
    return new FieldGroup("Non Editable Field Group", [
      this.checkbox(false, true),
      this.text("Cogito ergo sum", false, true),
      this.list("ergo", false, true),
      this.range(false, true)
    ])
  }

  batchFieldGroup(): FieldGroup {
    return new FieldGroup("Editable Batch Field Group", [
      this.checkbox(true, false),
      this.text("Cogito ergo sum", true, false),
      this.list("ergo", true, false),
      this.range(true, false)
    ])
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
    return new FieldGroup("Required Batch Fields", [
      this.checkbox(true, true, checkBoxName),
      this.text("", true, true, textName),
      this.list("", true, true, listName),
      this.range(true, true, rangeName)
    ])
  }

  requiredReactiveFieldGroup(): FieldGroup {
    return new FieldGroup(
      "Required Reactive Fields",
      [
        this.checkbox(true, true),
        this.list("", true, true),
        this.range(true, true)
      ],
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
  constructor(private messageService: MessageService) {
    super()
    this.items = this.fieldGroupItems()
  }

  fieldGroupItems(): Item[] {
    const testData = new TestData(this.messageService)
    let i = 0
    const items: Item[] = []
    for (i = 0; i < 15; i++) {
      const name = "item" + i.toString()
      const fg1 = testData.requiredBatchFieldGroup(
        "checkboxA",
        "textA",
        "listA",
        "rangeA"
      )
      fg1.label = i.toString() + " " + fg1.label
      const fg2 = testData.requiredBatchFieldGroup(
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

  cancel(): void {
    this.isItemListDialogVisible = false
    super.cancel()
  }
}

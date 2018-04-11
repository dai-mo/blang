import { MessageService } from "primeng/components/common/messageservice"
import { Component } from "@angular/core"
import {
  FieldGroup,
  Field,
  FieldVisibilityLevel,
  PossibleValue
} from "../../properties/src/public_api"

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

  tabs = [
    "Non Editable Forms",
    "Batch Forms",
    "Reactive Forms",
    "Required Batch Forms",
    "Required Reactive Forms",
    "Dialogs"
  ]

  constructor(private messageService: MessageService) {
    this.nonEditableFields = this.nonEditableFieldGroup()
    this.batchFields = this.batchFieldGroup()
    this.editableReactiveFields = this.editableReactiveFieldGroup()
    this.requiredBatchFields = this.requiredBatchFieldGroup()
    this.requiredReactiveFields = this.requiredReactiveFieldGroup()
  }

  checkbox(editable: boolean, required: boolean) {
    return new Field(
      "checkbox",
      "checkbox",
      "checkbox",
      true,
      [],
      true,
      editable,
      required,
      FieldVisibilityLevel.OpenField
    )
  }

  text(value: string, editable: boolean, required: boolean) {
    return new Field(
      "text",
      "text",
      "text",
      value,
      [],
      value,
      editable,
      required,
      FieldVisibilityLevel.OpenField
    )
  }

  list(editable: boolean, required: boolean) {
    return new Field(
      "list",
      "list",
      "list",
      "ergo",
      [
        new PossibleValue("Cogito", "Cogito", "Cogito"),
        new PossibleValue("ergo", "ergo", "ergo"),
        new PossibleValue("sum", "sum", "sum")
      ],
      "ergo",
      editable,
      required,
      FieldVisibilityLevel.OpenField
    )
  }

  range(editable: boolean, required: boolean) {
    return new Field(
      "range",
      "range",
      "range",
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
      this.list(false, true),
      this.range(false, true)
    ])
  }

  batchFieldGroup(): FieldGroup {
    return new FieldGroup("Editable Batch Field Group", [
      this.checkbox(true, false),
      this.text("Cogito ergo sum", true, false),
      this.list(true, false),
      this.range(true, false)
    ])
  }

  editableReactiveFieldGroup(): FieldGroup {
    return new FieldGroup(
      "Reactive Field Group",
      [
        this.checkbox(true, false),
        this.text("Cogito ergo sum", true, false),
        this.list(true, false),
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

  requiredBatchFieldGroup(): FieldGroup {
    return new FieldGroup("Required Batch Fields", [
      this.checkbox(true, true),
      this.text("", true, true),
      this.list(true, true),
      this.range(true, true)
    ])
  }

  requiredReactiveFieldGroup(): FieldGroup {
    return new FieldGroup(
      "Required Reactive Fields",
      [
        this.checkbox(true, true),
        this.text("", true, true),
        this.list(true, true),
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

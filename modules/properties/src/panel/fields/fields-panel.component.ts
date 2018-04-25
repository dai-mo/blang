import { FieldGroup, Field, FieldUIType } from "../../model/fields"
import { Component, OnInit, Input } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"

import * as SI from "seamless-immutable"

@Component({
  selector: "app-fields-panel",
  templateUrl: "./fields-panel.component.html",
  styleUrls: ["./fields-panel.component.scss"]
})
export class FieldsPanelComponent implements OnInit {
  @Input() fieldGroup: FieldGroup
  fields: Field[]

  fieldUIType = FieldUIType

  ngOnInit() {
    this.fields = this.fieldGroup.fields
  }

  onUpdate() {
    if (this.fieldGroup.isReactive) this.fieldGroup.doReactiveSubmit()
  }

  onRangeUpdate(event: any, field: Field) {
    if (this.fieldGroup.isReactive) this.onUpdate()
  }

  isValid(field: Field): boolean {
    if (!field.isEditable) return true
    if (field.isRequired) return this.fieldGroup.form.controls[field.name].valid
  }
}

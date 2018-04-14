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

  collect = function(): any {
    // this.fields.filter((f: Field) => f.isRange).forEach((f: Field) => {
    //   this.updateRange(f)
    // })
    let formValue = SI.from(this.fieldGroup.form.value)
    this.fields
      .filter((f: Field) => f.isRange)
      .forEach(
        (f: Field) =>
          (formValue = formValue.set(
            f.name,
            f.possibleValues[this.fieldGroup.form.value[f.name]].value
          ))
      )
    return formValue
  }.bind(this)

  ngOnInit() {
    this.fields = this.fieldGroup.fields
    this.fieldGroup.setCollector(this.collect)
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

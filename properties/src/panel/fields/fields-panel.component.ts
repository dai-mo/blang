import { FieldGroup, Field, FieldUIType } from "../../model/fields"
import { Component, OnInit, Input } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
  selector: "app-fields-panel",
  templateUrl: "./fields-panel.component.html",
  styleUrls: ["./fields-panel.component.scss"]
})
export class FieldsPanelComponent implements OnInit {
  @Input() itemFieldGroup: FieldGroup
  fields: Field[]
  form: FormGroup
  fieldUIType = FieldUIType

  collect = function(): any {
    return this.form.value
  }.bind(this)

  ngOnInit() {
    this.fields = this.itemFieldGroup.fields
    this.itemFieldGroup.setCollector(this.collect)
    this.form = this.toFormGroup(this.fields)
  }

  toFormGroup(fields: Field[]): FormGroup {
    const group: any = {}

    fields.forEach((field: Field) => {
      if (field.isEditable)
        group[field.name] = field.isRequired
          ? new FormControl(field.value, Validators.required)
          : new FormControl(field.value)
    })

    return new FormGroup(group)
  }
}

import { FieldGroup, Field, FieldUIType } from "../../model/fields"
import { Component, OnInit, Input } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { MessageService } from "primeng/components/common/messageservice"

@Component({
  selector: "app-fields-panel",
  templateUrl: "./fields-panel.component.html",
  styleUrls: ["./fields-panel.component.scss"]
})
export class FieldsPanelComponent implements OnInit {
  @Input() fieldGroup: FieldGroup
  fields: Field[]

  fieldUIType = FieldUIType

  constructor(private messageService: MessageService) {}

  collect = function(): any {
    this.fields.filter((f: Field) => f.isRange).forEach((f: Field) => {
      this.updateRange(f)
    })
    return this.fieldGroup.form.value
  }.bind(this)

  ngOnInit() {
    this.fields = this.fieldGroup.fields
    this.fieldGroup.setCollector(this.collect)
  }

  onUpdate() {
    if (this.fieldGroup.isReactive)
      this.fieldGroup.doReactiveSubmit(this.messageService)
  }

  onRangeUpdate(event: any, field: Field) {
    if (this.fieldGroup.isReactive) this.onUpdate()
  }

  private updateRange(field: Field) {
    const index = this.fieldGroup.form.value[field.name]
    field.value = field.possibleValues[index].value
    this.fieldGroup.form.value[field.name] = field.value
  }

  isValid(field: Field): boolean {
    if (!field.isEditable) return true
    if (field.isRequired) return this.fieldGroup.form.controls[field.name].valid
  }
}

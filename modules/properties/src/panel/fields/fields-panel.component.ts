/*
Copyright (c) 2017-2018 brewlabs SAS
*/
import { DynamicService } from "./../../dynamic/dynamic.service"
import { DynamicItem } from "./../../dynamic/dynamic-item"
import { FieldGroup, Field, FieldUIType } from "../../model/fields"
import { Component, OnInit, Input, ViewChild } from "@angular/core"

import * as SI from "seamless-immutable"
import { DynamicDirective } from "../../dynamic/dynamic.directive"

@Component({
  selector: "app-fields-panel",
  templateUrl: "./fields-panel.component.html",
  styleUrls: ["./fields-panel.component.scss"]
})
export class FieldsPanelComponent implements OnInit {
  @Input() fieldGroup: FieldGroup

  fields: Field[]

  fieldUIType = FieldUIType

  constructor() {}

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

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


import { Component, OnInit } from "@angular/core"
import { FieldUIType, Field, DynamicComponent } from "../../../../../modules/properties/src/public_api"

@Component({
  selector: "app-dynamic-fields",
  templateUrl: "./dynamic-fields.component.html",
  styleUrls: ["./dynamic-fields.component.scss"]
})
export class DynamicFieldsComponent implements OnInit, DynamicComponent {
  data: Field
  fieldUIType = FieldUIType

  constructor() {}

  ngOnInit() {}
}

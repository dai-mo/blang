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
  embeddedFieldGroup: FieldGroup

  tabs = ["Non Editable", "Editable Forms", "Dialogs"]

  constructor() {
    this.embeddedFieldGroup = this.nonEditableFieldGroup()
  }
  nonEditableFieldGroup(): FieldGroup {
    const necb = new Field(
      "checkbox",
      "read only checkbox",
      "checkbox",
      true,
      [],
      true,
      false,
      true,
      FieldVisibilityLevel.OpenField
    )

    const netext = new Field(
      "netext",
      "read only text",
      "netext",
      "Cogito ergo sum",
      [],
      "Cogito ergo sum",
      false,
      true,
      FieldVisibilityLevel.OpenField
    )

    const nelist = new Field(
      "netext",
      "read only text",
      "netext",
      "Cogito ergo sum",
      [
        new PossibleValue("Cogito", "Cogito", "Cogito"),
        new PossibleValue("ergo", "ergo", "ergo"),
        new PossibleValue("sum", "sum", "sum")
      ],
      "Cogito ergo sum",
      false,
      true,
      FieldVisibilityLevel.OpenField
    )

    return new FieldGroup("Non Editable Field Group", [necb, netext])
  }
}

import { Component } from "@angular/core"
import { FieldGroup, Field, FieldVisibilityLevel } from "@blang/properties"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  embeddedFieldGroup: FieldGroup

  constructor() {
    this.embeddedFieldGroup = this.sampleFieldGroup()
  }
  sampleFieldGroup(): FieldGroup {
    const field1 = new Field(
      "checkbox",
      "read only switch",
      "checkbox",
      true,
      [],
      true,
      false,
      true,
      FieldVisibilityLevel.OpenField
    )

    return new FieldGroup("Test Field Group", [field1])
  }
}

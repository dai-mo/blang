import { FieldsPanelComponent } from "./panel/fields/fields-panel.component"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CheckboxModule, ListboxModule } from "primeng/primeng"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    ListboxModule
  ],
  declarations: [FieldsPanelComponent],
  exports: [FieldsPanelComponent]
})
export class PropertiesModule {}

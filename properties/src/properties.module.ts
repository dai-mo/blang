import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FieldsPanelComponent } from "./panel/fields/fields-panel.component"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import {
  CheckboxModule,
  ListboxModule,
  SliderModule,
  DropdownModule
} from "primeng/primeng"

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    ListboxModule,
    DropdownModule,
    SliderModule
  ],
  declarations: [FieldsPanelComponent],
  exports: [FieldsPanelComponent]
})
export class PropertiesModule {}

/*
Copyright (c) 2017-2018 brewlabs SAS
*/
import { DynamicComponent } from "./dynamic/dynamic.component"
import { DynamicDirective } from "./dynamic/dynamic.directive"
import { ItemListDialogComponent } from "./dialog/item-list/item-list-dialog.component"
import { ItemListPanelComponent } from "./panel/item-list/item-list-panel.component"
import { FieldsPanelComponent } from "./panel/fields/fields-panel.component"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import {
  CheckboxModule,
  ListboxModule,
  SliderModule,
  DropdownModule,
  TabViewModule,
  ButtonModule,
  DialogModule
} from "primeng/primeng"
import { MessageService } from "primeng/components/common/messageservice"

import { MatSliderModule } from "@angular/material/slider"
import { FlexLayoutModule } from "@angular/flex-layout"

@NgModule({
  imports: [
    CommonModule,
    TabViewModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    ListboxModule,
    DropdownModule,
    SliderModule,
    DialogModule,

    // Angular Material imports
    MatSliderModule,

    // third party imports
    FlexLayoutModule
  ],
  providers: [MessageService],
  declarations: [
    FieldsPanelComponent,
    ItemListPanelComponent,
    ItemListDialogComponent,
    DynamicDirective
  ],
  exports: [
    FieldsPanelComponent,
    ItemListPanelComponent,
    ItemListDialogComponent,
    DynamicDirective
  ]
})
export class PropertiesModule {}

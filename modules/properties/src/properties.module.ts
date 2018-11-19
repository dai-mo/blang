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

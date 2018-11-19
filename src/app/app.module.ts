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
import { MatSliderModule } from "@angular/material/slider"
import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import { AppComponent } from "./app.component"

import {
  TabViewModule,
  CheckboxModule,
  SliderModule,
  ButtonModule,
  GrowlModule,
  InputTextModule,
  DropdownModule
} from "primeng/primeng"
import {
  PropertiesModule,
  DynamicService
} from "../../modules/properties/src/public_api"
import { MessageService } from "primeng/components/common/messageservice"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { PropertiesComponent } from "./properties/properties.component"
import { HomeComponent } from "./home/home.component"
import { Routes, RouterModule } from "@angular/router"
import { DynamicFieldsComponent } from "./properties/dynamic/dynamic-fields/dynamic-fields.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "properties", component: PropertiesComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    HomeComponent,
    DynamicFieldsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PropertiesModule,
    MatSliderModule,
    TabViewModule,
    CheckboxModule,
    SliderModule,
    ButtonModule,
    InputTextModule,
    GrowlModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [MessageService, DynamicService],
  entryComponents: [DynamicFieldsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

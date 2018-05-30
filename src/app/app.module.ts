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

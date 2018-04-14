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
import { PropertiesModule } from "../../properties/src/public_api"
import { MessageService } from "primeng/components/common/messageservice"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

@NgModule({
  declarations: [AppComponent],
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
    FlexLayoutModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}

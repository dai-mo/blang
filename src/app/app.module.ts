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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PropertiesModule,
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

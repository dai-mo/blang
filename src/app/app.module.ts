import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"

import { TabViewModule, CheckboxModule } from "primeng/primeng"
import { PropertiesModule } from "../../properties/src/public_api"

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PropertiesModule, TabViewModule, CheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

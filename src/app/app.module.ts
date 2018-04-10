import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { PropertiesModule } from "@blang/properties"

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PropertiesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

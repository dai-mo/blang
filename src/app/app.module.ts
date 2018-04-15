import { ThreeModule } from "./../../viewer/three/src/three.module"
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
import { PropertiesComponent } from "./properties/properties.component"
import { HomeComponent } from "./home/home.component"
import { Routes, RouterModule } from "@angular/router"

import { ThreeDemoComponent } from "./viewer/three-demo/three-demo.component"

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "properties", component: PropertiesComponent },
  { path: "viewer-three", component: ThreeDemoComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    HomeComponent,
    ThreeDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PropertiesModule,
    ThreeModule,
    MatSliderModule,
    TabViewModule,
    CheckboxModule,
    SliderModule,
    ButtonModule,
    InputTextModule,
    GrowlModule,
    FlexLayoutModule,

    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}

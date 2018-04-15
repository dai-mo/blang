import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { MatSliderModule } from "@angular/material/slider"
import { FlexLayoutModule } from "@angular/flex-layout"

import { MessageService } from "primeng/components/common/messageservice"
import { PropertiesModule } from "@blang/properties"

import { ThreeComponent } from "./three.component"

@NgModule({
  imports: [CommonModule, PropertiesModule],
  providers: [MessageService],
  declarations: [ThreeComponent],
  exports: [ThreeComponent]
})
export class ThreeModule {}

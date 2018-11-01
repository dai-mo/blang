/*
Copyright (c) 2017-2018 brewlabs SAS
*/
import { DynamicComponent } from "./dynamic.component"
import { Type } from "@angular/core"

export class DynamicItem {
  constructor(public component: Type<DynamicComponent>) {}
}

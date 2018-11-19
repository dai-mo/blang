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
import { DynamicDirective } from "./dynamic.directive"
import {
  Injectable,
  ComponentFactoryResolver,
  ChangeDetectorRef
} from "@angular/core"
import { DynamicItem } from "./dynamic-item"
import { DynamicComponent } from "./dynamic.component"

@Injectable()
export class DynamicService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  loadComponent(dynamicItem: DynamicItem, dynamicDirective: DynamicDirective) {
    if (dynamicItem !== undefined && dynamicDirective !== undefined) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        dynamicItem.component
      )

      const viewContainerRef = dynamicDirective.viewContainerRef
      viewContainerRef.clear()

      const componentRef = viewContainerRef.createComponent(componentFactory)
      componentRef.instance.data = dynamicDirective.data
    }
  }
}

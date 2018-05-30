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

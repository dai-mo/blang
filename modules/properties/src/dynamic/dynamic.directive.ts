import { Directive, ViewContainerRef, Input } from "@angular/core"

@Directive({
  selector: "[dynamic]"
})
export class DynamicDirective {
  @Input() data: any
  constructor(public viewContainerRef: ViewContainerRef) {}
}

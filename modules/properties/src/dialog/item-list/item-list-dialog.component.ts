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
import { Component, OnInit, Input } from "@angular/core"
import { ItemConf } from "../../model/fields"
import { DynamicItem } from "../../dynamic/dynamic-item";
@Component({
  selector: "app-item-list-dialog",
  templateUrl: "./item-list-dialog.component.html",
  styleUrls: ["./item-list-dialog.component.scss"]
})
export class ItemListDialogComponent implements OnInit {
  @Input() isVisible = false
  @Input() dialogHeader: string
  @Input() dialogItemConf: ItemConf
  @Input() finaliseLabel: string
  @Input() dynamicItem: DynamicItem

  constructor() {}

  ngOnInit() {}
}

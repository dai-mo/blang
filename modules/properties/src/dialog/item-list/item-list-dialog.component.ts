/*
Copyright (c) 2017-2018 brewlabs SAS
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

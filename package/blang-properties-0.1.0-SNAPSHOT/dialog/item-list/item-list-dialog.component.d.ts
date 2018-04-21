import { OnInit } from "@angular/core";
import { ItemConf } from "../../model/fields";
export declare class ItemListDialogComponent implements OnInit {
    isVisible: boolean;
    dialogHeader: string;
    dialogItemConf: ItemConf;
    finaliseLabel: string;
    constructor();
    ngOnInit(): void;
}

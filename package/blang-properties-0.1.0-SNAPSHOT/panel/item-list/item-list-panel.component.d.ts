import { FieldGroup, Field, ItemConf } from "./../../model/fields";
import { SelectItem } from "primeng/primeng";
import { OnInit } from "@angular/core";
export declare class ItemListPanelComponent implements OnInit {
    itemConf: ItemConf;
    finaliseLabel: string;
    private itemStatus;
    items: SelectItem[];
    selectedItemValue: {
        id: string;
        status: string;
    };
    selectedItemFieldGroups: FieldGroup[];
    selectedItemSpecificFields: Field[];
    constructor();
    ngOnInit(): void;
    select(itemId: string): void;
    finalise(): void;
    cancel(): void;
}

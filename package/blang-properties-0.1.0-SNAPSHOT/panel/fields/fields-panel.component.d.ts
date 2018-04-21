import { FieldGroup, Field, FieldUIType } from "../../model/fields";
import { OnInit } from "@angular/core";
export declare class FieldsPanelComponent implements OnInit {
    fieldGroup: FieldGroup;
    fields: Field[];
    fieldUIType: typeof FieldUIType;
    collect: any;
    ngOnInit(): void;
    onUpdate(): void;
    onRangeUpdate(event: any, field: Field): void;
    isValid(field: Field): boolean;
}

import { FormGroup, FormControl } from "@angular/forms";
import { SelectItem } from "primeng/primeng";
export declare enum FieldType {
    STRING = 0,
    NUMBER = 1,
    BOOLEAN = 2,
    UNKNOWN = 3,
}
export declare enum FieldUIType {
    UNKNOWN = 0,
    TEXT = 1,
    BOOLEAN = 2,
    LIST = 3,
    RANGE = 4,
}
export declare class PossibleValue {
    value: string | number;
    displayName: string;
    description: string;
    constructor(value: string | number, displayName: string, decscription: string);
}
export declare enum FieldVisibilityLevel {
    ClosedField = 0,
    OpenField = 100,
}
export declare class Field {
    name: string;
    label: string;
    description: string;
    defaultValue: string | number | boolean;
    possibleValues: PossibleValue[];
    value: string | number | boolean;
    isEditable: boolean;
    selectItems: SelectItem[];
    isRequired: boolean;
    level: FieldVisibilityLevel;
    isRange: boolean;
    valueIndex: number;
    collector: () => any;
    active: boolean;
    static fieldType(type: string): FieldType;
    constructor(name: string, label: string, description?: string, defaultValue?: string | number | boolean, possibleValues?: PossibleValue[], value?: string | number | boolean, isEditable?: boolean, isRequired?: boolean, level?: FieldVisibilityLevel, isRange?: boolean);
    resolveValue(): void;
    valueToString(value: string | number | boolean): string;
    updateValue(value: string): void;
    setCollector(collector: () => any): void;
    fieldUIType(): FieldUIType;
    isHiddenField(): boolean;
}
export declare class FieldGroup {
    label: string;
    fields: Field[];
    isReactive: boolean;
    active: boolean;
    collector: () => any;
    submit: (data: any) => void;
    invalid: (key: string, data: any) => void;
    form: FormGroup;
    constructor(label: string, fields?: Field[], invalid?: (key: string, data: any) => void, isReactive?: boolean, submit?: (data: any) => void);
    add(field: Field): void;
    setCollector(collector: () => any): void;
    isValid(): boolean;
    doSubmit(submit: (data: any) => any): void;
    doReactiveSubmit(): void;
    control(field: Field): FormControl;
    toFormGroup(fields: Field[]): FormGroup;
}
export declare enum ItemStatus {
    OK = 0,
    WARNING = 1,
}
export declare enum ItemType {
    THREED_OBJECT = 0,
    VIEWER_SETTINGS = 1,
}
export declare class Item {
    id: string;
    name: string;
    description: string;
    status: ItemStatus;
    fieldGroups: FieldGroup[];
    specificFields: Field[];
    constructor(id: string, name: string, description: string, status?: ItemStatus, fieldGroups?: FieldGroup[], specificFields?: Field[]);
}
export declare abstract class ItemConf {
    selectedItemId: string;
    items: Item[];
    hideCancel: boolean;
    showFirstItemOnly: boolean;
    constructor(showFirstItemOnly?: boolean);
    list(): Item[];
    find(itemId: string): Item;
    fieldGroups(itemId: string): FieldGroup[];
    selectedItemFieldGroups(): FieldGroup[];
    specificFields(itemId: string): Field[];
    selectedItemSpecificFields(): Field[];
    hasItems(): boolean;
    isSelected(): boolean;
    select(itemId: string): void;
    finalise(): void;
    abstract postFinalise(data?: any): void;
    abstract cancel(): void;
}

import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'seamless-immutable';
import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule, ListboxModule, SliderModule, DropdownModule, TabViewModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const FieldType = {
    STRING: 0,
    NUMBER: 1,
    BOOLEAN: 2,
    UNKNOWN: 3,
};
FieldType[FieldType.STRING] = "STRING";
FieldType[FieldType.NUMBER] = "NUMBER";
FieldType[FieldType.BOOLEAN] = "BOOLEAN";
FieldType[FieldType.UNKNOWN] = "UNKNOWN";
/** @enum {number} */
const FieldUIType = {
    UNKNOWN: 0,
    TEXT: 1,
    BOOLEAN: 2,
    LIST: 3,
    RANGE: 4,
};
FieldUIType[FieldUIType.UNKNOWN] = "UNKNOWN";
FieldUIType[FieldUIType.TEXT] = "TEXT";
FieldUIType[FieldUIType.BOOLEAN] = "BOOLEAN";
FieldUIType[FieldUIType.LIST] = "LIST";
FieldUIType[FieldUIType.RANGE] = "RANGE";
class PossibleValue {
    /**
     * @param {?} value
     * @param {?} displayName
     * @param {?} decscription
     */
    constructor(value, displayName, decscription) {
        this.value = value;
        this.displayName = displayName;
        this.description = this.description;
    }
}
/** @enum {number} */
const FieldVisibilityLevel = {
    ClosedField: 0,
    OpenField: 100,
};
FieldVisibilityLevel[FieldVisibilityLevel.ClosedField] = "ClosedField";
FieldVisibilityLevel[FieldVisibilityLevel.OpenField] = "OpenField";
class Field {
    /**
     * @param {?} name
     * @param {?} label
     * @param {?=} description
     * @param {?=} defaultValue
     * @param {?=} possibleValues
     * @param {?=} value
     * @param {?=} isEditable
     * @param {?=} isRequired
     * @param {?=} level
     * @param {?=} isRange
     */
    constructor(name, label, description = "", defaultValue = "", possibleValues = [], value = "", isEditable = false, isRequired = false, level = FieldVisibilityLevel.ClosedField, isRange = false) {
        this.level = FieldVisibilityLevel.ClosedField;
        this.valueIndex = 0;
        this.active = false;
        this.name = name;
        this.label = label;
        this.description = description;
        this.defaultValue = defaultValue;
        this.possibleValues = possibleValues;
        this.value = value;
        this.isRange = this.isEditable = isEditable;
        this.isRequired = isRequired;
        this.level = level;
        this.isRange = isRange;
        this.resolveValue();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    static fieldType(type) {
        switch (type) {
            case "STRING":
                return FieldType.STRING;
            case "NUMBER":
                return FieldType.NUMBER;
            case "BOOLEAN":
                return FieldType.BOOLEAN;
            default:
                return FieldType.UNKNOWN;
        }
    }
    /**
     * @return {?}
     */
    resolveValue() {
        if (this.possibleValues.length > 0) {
            // FIXME: Setting the fields value to empty in case of a list of possible
            //        values essentially encodes the fact that users will always have to
            //        choose from the list. This runs counter to the Nifi model where
            //        a processor property definition with a list of possbile values
            //        should have a default value and that too a default value that
            //        belongs to the list of possible values. We should ideally be able to
            //        accomodate both situations.
            // this.value = ""
            this.possibleValues = this.possibleValues.filter(pv => pv.value !== "");
            this.selectItems = this.possibleValues.map((pv) => {
                return { label: pv.displayName, value: pv.value };
            });
            this.valueIndex = this.possibleValues.findIndex((pv) => pv.value === this.value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    valueToString(value) {
        if (typeof value === "string") {
            return value;
        }
        if (typeof value === "number") {
            return value.toString();
        }
        if (typeof value === "boolean") {
            return value.toString();
        }
        return undefined;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        this.value = value;
    }
    /**
     * @param {?} collector
     * @return {?}
     */
    setCollector(collector) {
        this.collector = collector;
    }
    /**
     * @return {?}
     */
    fieldUIType() {
        if (this.possibleValues.length > 0) {
            if (this.isRange)
                return FieldUIType.RANGE;
            else
                return FieldUIType.LIST;
        }
        if (typeof this.value === "string") {
            return FieldUIType.TEXT;
        }
        if (typeof this.value === "boolean") {
            return FieldUIType.BOOLEAN;
        }
        return FieldUIType.UNKNOWN;
    }
    /**
     * @return {?}
     */
    isHiddenField() {
        return this.level === FieldVisibilityLevel.ClosedField;
    }
}
class FieldGroup {
    /**
     * @param {?} label
     * @param {?=} fields
     * @param {?=} invalid
     * @param {?=} isReactive
     * @param {?=} submit
     */
    constructor(label, fields = [], invalid = (key, data) => { }, isReactive = false, submit = (data) => { }) {
        this.fields = [];
        this.active = false;
        this.label = label;
        if (fields === undefined)
            this.fields = [];
        else
            this.fields = fields;
        this.isReactive = isReactive;
        this.form = this.toFormGroup(this.fields);
        this.submit = submit;
        this.invalid = invalid;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    add(field) {
        this.fields.push(field);
    }
    /**
     * @param {?} collector
     * @return {?}
     */
    setCollector(collector) {
        this.collector = collector;
    }
    /**
     * @return {?}
     */
    isValid() {
        let /** @type {?} */ valid = true;
        for (const /** @type {?} */ name of Object.keys(this.form.controls)) {
            const /** @type {?} */ control = this.form.controls[name];
            if (control.invalid) {
                // messageService.add({
                //   severity: "warn",
                //   summary: "Input Validation",
                //   detail: name + " is invalid"
                // })
                this.invalid(name, control.value);
                valid = false;
            }
        }
        return valid;
    }
    /**
     * @param {?} submit
     * @return {?}
     */
    doSubmit(submit) {
        if (this.isValid())
            submit(this.collector());
    }
    /**
     * @return {?}
     */
    doReactiveSubmit() {
        this.doSubmit(this.submit);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    control(field) {
        return field.isRequired
            ? new FormControl(field.value, Validators.required)
            : new FormControl(field.value);
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    toFormGroup(fields) {
        const /** @type {?} */ group = {};
        fields.filter((f) => f.isEditable).forEach((field) => {
            group[field.name] = this.control(field);
        });
        return new FormGroup(group);
    }
}
/** @enum {number} */
const ItemStatus = {
    OK: 0,
    WARNING: 1,
};
ItemStatus[ItemStatus.OK] = "OK";
ItemStatus[ItemStatus.WARNING] = "WARNING";
/** @enum {number} */
const ItemType = {
    THREED_OBJECT: 0,
    VIEWER_SETTINGS: 1,
};
ItemType[ItemType.THREED_OBJECT] = "THREED_OBJECT";
ItemType[ItemType.VIEWER_SETTINGS] = "VIEWER_SETTINGS";
class Item {
    /**
     * @param {?} id
     * @param {?} name
     * @param {?} description
     * @param {?=} status
     * @param {?=} fieldGroups
     * @param {?=} specificFields
     */
    constructor(id, name, description, status = ItemStatus.OK, fieldGroups = [], specificFields = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.fieldGroups = fieldGroups;
        this.specificFields = specificFields;
    }
}
/**
 * @abstract
 */
class ItemConf {
    /**
     * @param {?=} showFirstItemOnly
     */
    constructor(showFirstItemOnly = false) {
        this.items = [];
        this.hideCancel = false;
        this.showFirstItemOnly = false;
        this.showFirstItemOnly = showFirstItemOnly;
    }
    /**
     * @return {?}
     */
    list() {
        return this.items;
    }
    /**
     * @param {?} itemId
     * @return {?}
     */
    find(itemId) {
        return this.items.find((item) => item.id === itemId);
    }
    /**
     * @param {?} itemId
     * @return {?}
     */
    fieldGroups(itemId) {
        return this.find(itemId).fieldGroups;
    }
    /**
     * @return {?}
     */
    selectedItemFieldGroups() {
        return this.fieldGroups(this.selectedItemId);
    }
    /**
     * @param {?} itemId
     * @return {?}
     */
    specificFields(itemId) {
        return this.find(itemId).specificFields;
    }
    /**
     * @return {?}
     */
    selectedItemSpecificFields() {
        return this.specificFields(this.selectedItemId);
    }
    /**
     * @return {?}
     */
    hasItems() {
        return this.items.length > 0;
    }
    /**
     * @return {?}
     */
    isSelected() {
        return this.selectedItemId !== undefined || this.showFirstItemOnly;
    }
    /**
     * @param {?} itemId
     * @return {?}
     */
    select(itemId) {
        this.selectedItemId = itemId;
        const /** @type {?} */ sefgs = this.selectedItemFieldGroups();
        if (sefgs !== undefined && sefgs.length > 0)
            sefgs[0].active = true;
        else {
            const /** @type {?} */ sesfs = this.selectedItemSpecificFields();
            if (sesfs !== undefined && sesfs.length > 0)
                sesfs[0].active = true;
        }
    }
    /**
     * @return {?}
     */
    finalise() {
        const /** @type {?} */ sisfs = this.selectedItemSpecificFields();
        const /** @type {?} */ sifgs = this.selectedItemFieldGroups();
        let /** @type {?} */ allValid = true;
        sifgs.forEach((fg) => {
            allValid = fg.isValid();
        });
        if (!allValid)
            return;
        const /** @type {?} */ initial = {};
        let /** @type {?} */ updatedProperties = from(initial);
        if (sisfs !== undefined && sisfs.length > 0)
            sisfs.forEach(sisf => {
                updatedProperties = updatedProperties.merge(sisf.collector());
            });
        if (sifgs !== undefined && sifgs.length > 0)
            sifgs.forEach(sefg => {
                updatedProperties = updatedProperties.merge(sefg.collector());
            });
        this.postFinalise(updatedProperties);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ItemListDialogComponent {
    constructor() {
        this.isVisible = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
ItemListDialogComponent.decorators = [
    { type: Component, args: [{
                selector: "app-item-list-dialog",
                template: `<p-dialog *ngIf="isVisible" [(visible)]="isVisible" class="dialog-container" [header]="dialogHeader" modal="modal" [closable]="false"
  [responsive]="true">
  <input [style.display]="'none'" />
  <app-item-list-panel class="dialog-panel" [itemConf]="dialogItemConf" [finaliseLabel]="finaliseLabel"></app-item-list-panel>
</p-dialog>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
ItemListDialogComponent.ctorParameters = () => [];
ItemListDialogComponent.propDecorators = {
    "isVisible": [{ type: Input },],
    "dialogHeader": [{ type: Input },],
    "dialogItemConf": [{ type: Input },],
    "finaliseLabel": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ItemListPanelComponent {
    constructor() {
        this.itemStatus = ItemStatus;
        this.items = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.itemConf !== undefined) {
            let /** @type {?} */ itemConfList;
            if (this.itemConf.showFirstItemOnly) {
                itemConfList = [this.itemConf.items[0]];
                this.select(this.itemConf.items[0].id);
            }
            else
                itemConfList = this.itemConf.list();
            itemConfList.forEach(fe => this.items.push({
                label: fe.name,
                value: {
                    id: fe.id,
                    status: fe.status
                }
            }));
        }
    }
    /**
     * @param {?} itemId
     * @return {?}
     */
    select(itemId) {
        if (this.itemConf !== undefined) {
            this.itemConf.select(itemId);
            this.selectedItemFieldGroups = this.itemConf.fieldGroups(itemId);
            this.selectedItemSpecificFields = this.itemConf.specificFields(itemId);
        }
    }
    /**
     * @return {?}
     */
    finalise() {
        if (this.itemConf !== undefined) {
            this.itemConf.finalise();
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        this.itemConf.cancel();
    }
}
ItemListPanelComponent.decorators = [
    { type: Component, args: [{
                selector: "app-item-list-panel",
                template: `<div fxLayout="row" fxLayoutGap="15px">
  <div *ngIf="!itemConf.showFirstItemOnly" fxFlex="0 1 33%">
    <p-listbox class="item-list" [options]="items" [(ngModel)]="selectedItemValue" (onChange)="select($event.value.id)" filter="filter"
      [style]="{'width': '100%'}" [listStyle]="{'min-height': '300px', 'max-height': '300px'}">
    </p-listbox>
  </div>
  <div *ngIf="itemConf.isSelected()" fxFlex="0 1 66%">
    <p-tabView [style]="{'height': '340px'}">
      <p-tabPanel *ngFor="let fieldGroup of itemConf.selectedItemFieldGroups()" [header]="fieldGroup.label" [selected]="fieldGroup.active">
        <app-fields-panel [fieldGroup]="fieldGroup"></app-fields-panel>
      </p-tabPanel>
    </p-tabView>
  </div>
</div>
<p-footer>
  <div class="ui-dialog-footer ui-widget-content ui-helper-clearfix footer">
    <button pButton type="button" (click)="finalise()" [disabled]="!itemConf.isSelected()" label="{{finaliseLabel}}">
    </button>
    <button pButton type="button" (click)="cancel()" [hidden]="itemConf.hideCancel" label="Cancel">
    </button>
  </div>
</p-footer>
`,
                styles: [`.footer{border:none;padding:2px}`]
            },] },
];
/** @nocollapse */
ItemListPanelComponent.ctorParameters = () => [];
ItemListPanelComponent.propDecorators = {
    "itemConf": [{ type: Input },],
    "finaliseLabel": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FieldsPanelComponent {
    constructor() {
        this.fieldUIType = FieldUIType;
        this.collect = function () {
            let /** @type {?} */ formValue = from(this.fieldGroup.form.value);
            this.fields
                .filter((f) => f.isRange)
                .forEach((f) => (formValue = formValue.set(f.name, f.possibleValues[this.fieldGroup.form.value[f.name]].value)));
            return formValue;
        }.bind(this);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.fields = this.fieldGroup.fields;
        this.fieldGroup.setCollector(this.collect);
    }
    /**
     * @return {?}
     */
    onUpdate() {
        if (this.fieldGroup.isReactive)
            this.fieldGroup.doReactiveSubmit();
    }
    /**
     * @param {?} event
     * @param {?} field
     * @return {?}
     */
    onRangeUpdate(event, field) {
        if (this.fieldGroup.isReactive)
            this.onUpdate();
    }
    /**
     * @param {?} field
     * @return {?}
     */
    isValid(field) {
        if (!field.isEditable)
            return true;
        if (field.isRequired)
            return this.fieldGroup.form.controls[field.name].valid;
    }
}
FieldsPanelComponent.decorators = [
    { type: Component, args: [{
                selector: "app-fields-panel",
                template: `<div>
  <form [formGroup]="fieldGroup.form">
    <div *ngFor="let field of fields" [ngSwitch]="field.fieldUIType()" class="value-padding">
      <div class="ui-g-4">
        <label [attr.for]="field.name">{{field.label}}</label>
      </div>
      <div>
        <div class="ui-g" *ngSwitchCase="fieldUIType.TEXT">
          <div *ngIf="!(field.isEditable)" class="ui-g-8">
            <span [id]="field.name">{{field.value}}</span>
          </div>
          <div *ngIf="field.isEditable" class="ui-g-8">
            <span class="md-inputfield">
              <input [id]="field.name" pInputText type="text" class="value ui-inputtext ui-corner-all ui-state-default ui-widget" [formControlName]="field.name"
                [(ngModel)]="field.value" />
            </span>
          </div>
        </div>
        <div class="ui-g" *ngSwitchCase="fieldUIType.BOOLEAN">
          <div *ngIf="!(field.isEditable)" class="ui-g-8">
            <span [id]="field.name">{{field.value ? 'true' : 'false'}}</span>
          </div>
          <div *ngIf="field.isEditable" class="ui-g-8">
            <p-checkbox [id]="field.name" [(ngModel)]="field.value" binary="true" [formControlName]="field.name" (onChange)=onUpdate()>
            </p-checkbox>
          </div>
        </div>
        <div class="ui-g" *ngSwitchCase="fieldUIType.LIST">
          <div *ngIf="!(field.isEditable)" class="ui-g-8">
            <span [id]="field.name">{{field.value}}</span>
          </div>
          <div *ngIf="field.isEditable" class="ui-g-8">
            <p-dropdown [id]="field.name" [style]="{'width':'250px'}" [options]="field.selectItems" [(ngModel)]="field.value" [formControlName]="field.name"
              (onChange)=onUpdate() placeholder="Select ..." showClear="false"></p-dropdown>
          </div>
        </div>
        <div class="ui-g" *ngSwitchCase="fieldUIType.RANGE">
          <div *ngIf="!(field.isEditable)" class="ui-g-8">
            <span [id]="field.name">{{field.value}}</span>
          </div>
          <div *ngIf="field.isEditable" class="ui-g-8">
            <mat-slider [id]="field.name" [(ngModel)]="field.valueIndex" class="value" (change)="onRangeUpdate($event, field)" [step]="1"
              [min]="0" [max]="field.possibleValues.length - 1" [tick-interval]="1" [formControlName]="field.name"></mat-slider>
            <div class="value">
              <span>{{field.possibleValues[field.valueIndex].value}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
`,
                styles: [`.value{width:250px;text-align:center}.value-padding{padding:5px}.ng-invalid{border-color:red}.ng-valid{border-color:#000}`]
            },] },
];
/** @nocollapse */
FieldsPanelComponent.ctorParameters = () => [];
FieldsPanelComponent.propDecorators = {
    "fieldGroup": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PropertiesModule {
}
PropertiesModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TabViewModule,
                    ButtonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    CheckboxModule,
                    ListboxModule,
                    DropdownModule,
                    SliderModule,
                    DialogModule,
                    MatSliderModule,
                    FlexLayoutModule
                ],
                providers: [MessageService],
                declarations: [
                    FieldsPanelComponent,
                    ItemListPanelComponent,
                    ItemListDialogComponent
                ],
                exports: [
                    FieldsPanelComponent,
                    ItemListPanelComponent,
                    ItemListDialogComponent
                ]
            },] },
];
/** @nocollapse */
PropertiesModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { PropertiesModule, FieldType, FieldUIType, PossibleValue, FieldVisibilityLevel, Field, FieldGroup, ItemStatus, ItemType, Item, ItemConf, ItemListDialogComponent as ɵc, FieldsPanelComponent as ɵa, ItemListPanelComponent as ɵb };
//# sourceMappingURL=blang-properties.js.map

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/forms'), require('seamless-immutable'), require('@angular/core'), require('@angular/common'), require('primeng/primeng'), require('primeng/components/common/messageservice'), require('@angular/material/slider'), require('@angular/flex-layout')) :
	typeof define === 'function' && define.amd ? define('@blang/properties', ['exports', '@angular/forms', 'seamless-immutable', '@angular/core', '@angular/common', 'primeng/primeng', 'primeng/components/common/messageservice', '@angular/material/slider', '@angular/flex-layout'], factory) :
	(factory((global.blang = global.blang || {}, global.blang.properties = {}),global.ng.forms,global.seamlessImmutable,global.ng.core,global.ng.common,global.primeng,global.messageservice,global.ng.material.slider,global.ng['flex-layout']));
}(this, (function (exports,forms,seamlessImmutable,core,common,primeng,messageservice,slider,flexLayout) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */









function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

var FieldType = {
    STRING: 0,
    NUMBER: 1,
    BOOLEAN: 2,
    UNKNOWN: 3,
};
FieldType[FieldType.STRING] = "STRING";
FieldType[FieldType.NUMBER] = "NUMBER";
FieldType[FieldType.BOOLEAN] = "BOOLEAN";
FieldType[FieldType.UNKNOWN] = "UNKNOWN";
var FieldUIType = {
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
var PossibleValue = (function () {
    function PossibleValue(value, displayName, decscription) {
        this.value = value;
        this.displayName = displayName;
        this.description = this.description;
    }
    return PossibleValue;
}());
var FieldVisibilityLevel = {
    ClosedField: 0,
    OpenField: 100,
};
FieldVisibilityLevel[FieldVisibilityLevel.ClosedField] = "ClosedField";
FieldVisibilityLevel[FieldVisibilityLevel.OpenField] = "OpenField";
var Field = (function () {
    function Field(name, label, description, defaultValue, possibleValues, value, isEditable, isRequired, level, isRange) {
        if (description === void 0) { description = ""; }
        if (defaultValue === void 0) { defaultValue = ""; }
        if (possibleValues === void 0) { possibleValues = []; }
        if (value === void 0) { value = ""; }
        if (isEditable === void 0) { isEditable = false; }
        if (isRequired === void 0) { isRequired = false; }
        if (level === void 0) { level = FieldVisibilityLevel.ClosedField; }
        if (isRange === void 0) { isRange = false; }
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
    Field.fieldType = function (type) {
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
    };
    Field.prototype.resolveValue = function () {
        var _this = this;
        if (this.possibleValues.length > 0) {
            this.possibleValues = this.possibleValues.filter(function (pv) { return pv.value !== ""; });
            this.selectItems = this.possibleValues.map(function (pv) {
                return { label: pv.displayName, value: pv.value };
            });
            this.valueIndex = this.possibleValues.findIndex(function (pv) { return pv.value === _this.value; });
        }
    };
    Field.prototype.valueToString = function (value) {
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
    };
    Field.prototype.updateValue = function (value) {
        this.value = value;
    };
    Field.prototype.setCollector = function (collector) {
        this.collector = collector;
    };
    Field.prototype.fieldUIType = function () {
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
    };
    Field.prototype.isHiddenField = function () {
        return this.level === FieldVisibilityLevel.ClosedField;
    };
    return Field;
}());
var FieldGroup = (function () {
    function FieldGroup(label, fields, invalid, isReactive, submit) {
        if (fields === void 0) { fields = []; }
        if (invalid === void 0) { invalid = function (key, data) { }; }
        if (isReactive === void 0) { isReactive = false; }
        if (submit === void 0) { submit = function (data) { }; }
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
    FieldGroup.prototype.add = function (field) {
        this.fields.push(field);
    };
    FieldGroup.prototype.setCollector = function (collector) {
        this.collector = collector;
    };
    FieldGroup.prototype.isValid = function () {
        var valid = true;
        try {
            for (var _a = __values(Object.keys(this.form.controls)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var name = _b.value;
                var control = this.form.controls[name];
                if (control.invalid) {
                    this.invalid(name, control.value);
                    valid = false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return valid;
        var e_1, _c;
    };
    FieldGroup.prototype.doSubmit = function (submit) {
        if (this.isValid())
            submit(this.collector());
    };
    FieldGroup.prototype.doReactiveSubmit = function () {
        this.doSubmit(this.submit);
    };
    FieldGroup.prototype.control = function (field) {
        return field.isRequired
            ? new forms.FormControl(field.value, forms.Validators.required)
            : new forms.FormControl(field.value);
    };
    FieldGroup.prototype.toFormGroup = function (fields) {
        var _this = this;
        var group = {};
        fields.filter(function (f) { return f.isEditable; }).forEach(function (field) {
            group[field.name] = _this.control(field);
        });
        return new forms.FormGroup(group);
    };
    return FieldGroup;
}());
var ItemStatus = {
    OK: 0,
    WARNING: 1,
};
ItemStatus[ItemStatus.OK] = "OK";
ItemStatus[ItemStatus.WARNING] = "WARNING";
var ItemType = {
    THREED_OBJECT: 0,
    VIEWER_SETTINGS: 1,
};
ItemType[ItemType.THREED_OBJECT] = "THREED_OBJECT";
ItemType[ItemType.VIEWER_SETTINGS] = "VIEWER_SETTINGS";
var Item = (function () {
    function Item(id, name, description, status, fieldGroups, specificFields) {
        if (status === void 0) { status = ItemStatus.OK; }
        if (fieldGroups === void 0) { fieldGroups = []; }
        if (specificFields === void 0) { specificFields = []; }
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.fieldGroups = fieldGroups;
        this.specificFields = specificFields;
    }
    return Item;
}());
var ItemConf = (function () {
    function ItemConf(showFirstItemOnly) {
        if (showFirstItemOnly === void 0) { showFirstItemOnly = false; }
        this.items = [];
        this.hideCancel = false;
        this.showFirstItemOnly = false;
        this.showFirstItemOnly = showFirstItemOnly;
    }
    ItemConf.prototype.list = function () {
        return this.items;
    };
    ItemConf.prototype.find = function (itemId) {
        return this.items.find(function (item) { return item.id === itemId; });
    };
    ItemConf.prototype.fieldGroups = function (itemId) {
        return this.find(itemId).fieldGroups;
    };
    ItemConf.prototype.selectedItemFieldGroups = function () {
        return this.fieldGroups(this.selectedItemId);
    };
    ItemConf.prototype.specificFields = function (itemId) {
        return this.find(itemId).specificFields;
    };
    ItemConf.prototype.selectedItemSpecificFields = function () {
        return this.specificFields(this.selectedItemId);
    };
    ItemConf.prototype.hasItems = function () {
        return this.items.length > 0;
    };
    ItemConf.prototype.isSelected = function () {
        return this.selectedItemId !== undefined || this.showFirstItemOnly;
    };
    ItemConf.prototype.select = function (itemId) {
        this.selectedItemId = itemId;
        var sefgs = this.selectedItemFieldGroups();
        if (sefgs !== undefined && sefgs.length > 0)
            sefgs[0].active = true;
        else {
            var sesfs = this.selectedItemSpecificFields();
            if (sesfs !== undefined && sesfs.length > 0)
                sesfs[0].active = true;
        }
    };
    ItemConf.prototype.finalise = function () {
        var sisfs = this.selectedItemSpecificFields();
        var sifgs = this.selectedItemFieldGroups();
        var allValid = true;
        sifgs.forEach(function (fg) {
            allValid = fg.isValid();
        });
        if (!allValid)
            return;
        var initial = {};
        var updatedProperties = seamlessImmutable.from(initial);
        if (sisfs !== undefined && sisfs.length > 0)
            sisfs.forEach(function (sisf) {
                updatedProperties = updatedProperties.merge(sisf.collector());
            });
        if (sifgs !== undefined && sifgs.length > 0)
            sifgs.forEach(function (sefg) {
                updatedProperties = updatedProperties.merge(sefg.collector());
            });
        this.postFinalise(updatedProperties);
    };
    return ItemConf;
}());
var ItemListDialogComponent = (function () {
    function ItemListDialogComponent() {
        this.isVisible = false;
    }
    ItemListDialogComponent.prototype.ngOnInit = function () { };
    return ItemListDialogComponent;
}());
ItemListDialogComponent.decorators = [
    { type: core.Component, args: [{
                selector: "app-item-list-dialog",
                template: "<p-dialog *ngIf=\"isVisible\" [(visible)]=\"isVisible\" class=\"dialog-container\" [header]=\"dialogHeader\" modal=\"modal\" [closable]=\"false\"\n  [responsive]=\"true\">\n  <input [style.display]=\"'none'\" />\n  <app-item-list-panel class=\"dialog-panel\" [itemConf]=\"dialogItemConf\" [finaliseLabel]=\"finaliseLabel\"></app-item-list-panel>\n</p-dialog>\n",
                styles: [""]
            },] },
];
ItemListDialogComponent.ctorParameters = function () { return []; };
ItemListDialogComponent.propDecorators = {
    "isVisible": [{ type: core.Input },],
    "dialogHeader": [{ type: core.Input },],
    "dialogItemConf": [{ type: core.Input },],
    "finaliseLabel": [{ type: core.Input },],
};
var ItemListPanelComponent = (function () {
    function ItemListPanelComponent() {
        this.itemStatus = ItemStatus;
        this.items = [];
    }
    ItemListPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.itemConf !== undefined) {
            var itemConfList = void 0;
            if (this.itemConf.showFirstItemOnly) {
                itemConfList = [this.itemConf.items[0]];
                this.select(this.itemConf.items[0].id);
            }
            else
                itemConfList = this.itemConf.list();
            itemConfList.forEach(function (fe) { return _this.items.push({
                label: fe.name,
                value: {
                    id: fe.id,
                    status: fe.status
                }
            }); });
        }
    };
    ItemListPanelComponent.prototype.select = function (itemId) {
        if (this.itemConf !== undefined) {
            this.itemConf.select(itemId);
            this.selectedItemFieldGroups = this.itemConf.fieldGroups(itemId);
            this.selectedItemSpecificFields = this.itemConf.specificFields(itemId);
        }
    };
    ItemListPanelComponent.prototype.finalise = function () {
        if (this.itemConf !== undefined) {
            this.itemConf.finalise();
        }
    };
    ItemListPanelComponent.prototype.cancel = function () {
        this.itemConf.cancel();
    };
    return ItemListPanelComponent;
}());
ItemListPanelComponent.decorators = [
    { type: core.Component, args: [{
                selector: "app-item-list-panel",
                template: "<div fxLayout=\"row\" fxLayoutGap=\"15px\">\n  <div *ngIf=\"!itemConf.showFirstItemOnly\" fxFlex=\"0 1 33%\">\n    <p-listbox class=\"item-list\" [options]=\"items\" [(ngModel)]=\"selectedItemValue\" (onChange)=\"select($event.value.id)\" filter=\"filter\"\n      [style]=\"{'width': '100%'}\" [listStyle]=\"{'min-height': '300px', 'max-height': '300px'}\">\n    </p-listbox>\n  </div>\n  <div *ngIf=\"itemConf.isSelected()\" fxFlex=\"0 1 66%\">\n    <p-tabView [style]=\"{'height': '340px'}\">\n      <p-tabPanel *ngFor=\"let fieldGroup of itemConf.selectedItemFieldGroups()\" [header]=\"fieldGroup.label\" [selected]=\"fieldGroup.active\">\n        <app-fields-panel [fieldGroup]=\"fieldGroup\"></app-fields-panel>\n      </p-tabPanel>\n    </p-tabView>\n  </div>\n</div>\n<p-footer>\n  <div class=\"ui-dialog-footer ui-widget-content ui-helper-clearfix footer\">\n    <button pButton type=\"button\" (click)=\"finalise()\" [disabled]=\"!itemConf.isSelected()\" label=\"{{finaliseLabel}}\">\n    </button>\n    <button pButton type=\"button\" (click)=\"cancel()\" [hidden]=\"itemConf.hideCancel\" label=\"Cancel\">\n    </button>\n  </div>\n</p-footer>\n",
                styles: [".footer{border:none;padding:2px}"]
            },] },
];
ItemListPanelComponent.ctorParameters = function () { return []; };
ItemListPanelComponent.propDecorators = {
    "itemConf": [{ type: core.Input },],
    "finaliseLabel": [{ type: core.Input },],
};
var FieldsPanelComponent = (function () {
    function FieldsPanelComponent() {
        this.fieldUIType = FieldUIType;
        this.collect = function () {
            var _this = this;
            var formValue = seamlessImmutable.from(this.fieldGroup.form.value);
            this.fields
                .filter(function (f) { return f.isRange; })
                .forEach(function (f) { return (formValue = formValue.set(f.name, f.possibleValues[_this.fieldGroup.form.value[f.name]].value)); });
            return formValue;
        }.bind(this);
    }
    FieldsPanelComponent.prototype.ngOnInit = function () {
        this.fields = this.fieldGroup.fields;
        this.fieldGroup.setCollector(this.collect);
    };
    FieldsPanelComponent.prototype.onUpdate = function () {
        if (this.fieldGroup.isReactive)
            this.fieldGroup.doReactiveSubmit();
    };
    FieldsPanelComponent.prototype.onRangeUpdate = function (event, field) {
        if (this.fieldGroup.isReactive)
            this.onUpdate();
    };
    FieldsPanelComponent.prototype.isValid = function (field) {
        if (!field.isEditable)
            return true;
        if (field.isRequired)
            return this.fieldGroup.form.controls[field.name].valid;
    };
    return FieldsPanelComponent;
}());
FieldsPanelComponent.decorators = [
    { type: core.Component, args: [{
                selector: "app-fields-panel",
                template: "<div>\n  <form [formGroup]=\"fieldGroup.form\">\n    <div *ngFor=\"let field of fields\" [ngSwitch]=\"field.fieldUIType()\" class=\"value-padding\">\n      <div class=\"ui-g-4\">\n        <label [attr.for]=\"field.name\">{{field.label}}</label>\n      </div>\n      <div>\n        <div class=\"ui-g\" *ngSwitchCase=\"fieldUIType.TEXT\">\n          <div *ngIf=\"!(field.isEditable)\" class=\"ui-g-8\">\n            <span [id]=\"field.name\">{{field.value}}</span>\n          </div>\n          <div *ngIf=\"field.isEditable\" class=\"ui-g-8\">\n            <span class=\"md-inputfield\">\n              <input [id]=\"field.name\" pInputText type=\"text\" class=\"value ui-inputtext ui-corner-all ui-state-default ui-widget\" [formControlName]=\"field.name\"\n                [(ngModel)]=\"field.value\" />\n            </span>\n          </div>\n        </div>\n        <div class=\"ui-g\" *ngSwitchCase=\"fieldUIType.BOOLEAN\">\n          <div *ngIf=\"!(field.isEditable)\" class=\"ui-g-8\">\n            <span [id]=\"field.name\">{{field.value ? 'true' : 'false'}}</span>\n          </div>\n          <div *ngIf=\"field.isEditable\" class=\"ui-g-8\">\n            <p-checkbox [id]=\"field.name\" [(ngModel)]=\"field.value\" binary=\"true\" [formControlName]=\"field.name\" (onChange)=onUpdate()>\n            </p-checkbox>\n          </div>\n        </div>\n        <div class=\"ui-g\" *ngSwitchCase=\"fieldUIType.LIST\">\n          <div *ngIf=\"!(field.isEditable)\" class=\"ui-g-8\">\n            <span [id]=\"field.name\">{{field.value}}</span>\n          </div>\n          <div *ngIf=\"field.isEditable\" class=\"ui-g-8\">\n            <p-dropdown [id]=\"field.name\" [style]=\"{'width':'250px'}\" [options]=\"field.selectItems\" [(ngModel)]=\"field.value\" [formControlName]=\"field.name\"\n              (onChange)=onUpdate() placeholder=\"Select ...\" showClear=\"false\"></p-dropdown>\n          </div>\n        </div>\n        <div class=\"ui-g\" *ngSwitchCase=\"fieldUIType.RANGE\">\n          <div *ngIf=\"!(field.isEditable)\" class=\"ui-g-8\">\n            <span [id]=\"field.name\">{{field.value}}</span>\n          </div>\n          <div *ngIf=\"field.isEditable\" class=\"ui-g-8\">\n            <mat-slider [id]=\"field.name\" [(ngModel)]=\"field.valueIndex\" class=\"value\" (change)=\"onRangeUpdate($event, field)\" [step]=\"1\"\n              [min]=\"0\" [max]=\"field.possibleValues.length - 1\" [tick-interval]=\"1\" [formControlName]=\"field.name\"></mat-slider>\n            <div class=\"value\">\n              <span>{{field.possibleValues[field.valueIndex].value}}</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n",
                styles: [".value{width:250px;text-align:center}.value-padding{padding:5px}.ng-invalid{border-color:red}.ng-valid{border-color:#000}"]
            },] },
];
FieldsPanelComponent.ctorParameters = function () { return []; };
FieldsPanelComponent.propDecorators = {
    "fieldGroup": [{ type: core.Input },],
};
var PropertiesModule = (function () {
    function PropertiesModule() {
    }
    return PropertiesModule;
}());
PropertiesModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    primeng.TabViewModule,
                    primeng.ButtonModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule,
                    primeng.CheckboxModule,
                    primeng.ListboxModule,
                    primeng.DropdownModule,
                    primeng.SliderModule,
                    primeng.DialogModule,
                    slider.MatSliderModule,
                    flexLayout.FlexLayoutModule
                ],
                providers: [messageservice.MessageService],
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
PropertiesModule.ctorParameters = function () { return []; };

exports.PropertiesModule = PropertiesModule;
exports.FieldType = FieldType;
exports.FieldUIType = FieldUIType;
exports.PossibleValue = PossibleValue;
exports.FieldVisibilityLevel = FieldVisibilityLevel;
exports.Field = Field;
exports.FieldGroup = FieldGroup;
exports.ItemStatus = ItemStatus;
exports.ItemType = ItemType;
exports.Item = Item;
exports.ItemConf = ItemConf;
exports.ɵc = ItemListDialogComponent;
exports.ɵa = FieldsPanelComponent;
exports.ɵb = ItemListPanelComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=blang-properties.umd.js.map

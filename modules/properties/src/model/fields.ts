import { FormGroup, FormControl, Validators } from "@angular/forms"
import { SelectItem } from "primeng/primeng"
import * as SI from "seamless-immutable"

export enum FieldType {
  STRING,
  NUMBER,
  BOOLEAN,
  UNKNOWN
}

export enum FieldUIType {
  UNKNOWN,
  TEXT,
  BOOLEAN,
  LIST,
  RANGE
}

export class PossibleValue {
  value: string | number
  displayName: string
  description: string

  constructor(
    value: string | number,
    displayName: string,
    decscription: string
  ) {
    this.value = value
    this.displayName = displayName
    this.description = this.description
  }
}

export enum FieldVisibilityLevel {
  ClosedField = 0,
  OpenField = 100
}

export class Field {
  name: string
  label: string
  description: string
  defaultValue: string | number | boolean
  possibleValues: PossibleValue[]
  value: string | number | boolean
  isEditable: boolean
  selectItems: SelectItem[]
  isRequired: boolean
  level: FieldVisibilityLevel = FieldVisibilityLevel.ClosedField
  isRange: boolean
  valueIndex = 0

  collector: () => any
  active = false

  static fieldType(type: string): FieldType {
    switch (type) {
      case "STRING":
        return FieldType.STRING
      case "NUMBER":
        return FieldType.NUMBER
      case "BOOLEAN":
        return FieldType.BOOLEAN
      default:
        return FieldType.UNKNOWN
    }
  }

  constructor(
    name: string,
    label: string,
    description: string = "",
    defaultValue: string | number | boolean = "",
    possibleValues: PossibleValue[] = [],
    value: string | number | boolean = "",
    isEditable: boolean = false,
    isRequired: boolean = false,
    level: FieldVisibilityLevel = FieldVisibilityLevel.ClosedField,
    isRange: boolean = false
  ) {
    this.name = name
    this.label = label
    this.description = description
    this.defaultValue = defaultValue
    this.possibleValues = possibleValues
    this.value = value
    this.isRange = this.isEditable = isEditable
    this.isRequired = isRequired
    this.level = level
    this.isRange = isRange
    this.resolveValue()
  }

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
      this.possibleValues = this.possibleValues.filter(pv => pv.value !== "")
      this.selectItems = this.possibleValues.map((pv: PossibleValue) => {
        return { label: pv.displayName, value: pv.value }
      })
      this.valueIndex = this.possibleValues.findIndex(
        (pv: PossibleValue) => pv.value === this.value
      )
    }
  }

  valueToString(value: string | number | boolean): string {
    if (typeof value === "string") {
      return value
    }

    if (typeof value === "number") {
      return value.toString()
    }

    if (typeof value === "boolean") {
      return value.toString()
    }

    return undefined
  }

  updateValue(value: string) {
    this.value = value
  }

  setCollector(collector: () => any) {
    this.collector = collector
  }

  fieldUIType(): FieldUIType {
    if (this.possibleValues.length > 0) {
      if (this.isRange) return FieldUIType.RANGE
      else return FieldUIType.LIST
    }

    if (typeof this.value === "string" || typeof this.value === "number") {
      return FieldUIType.TEXT
    }

    if (typeof this.value === "boolean") {
      return FieldUIType.BOOLEAN
    }

    return FieldUIType.UNKNOWN
  }

  isHiddenField(): boolean {
    return this.level === FieldVisibilityLevel.ClosedField
  }
}

export class FieldGroup {
  label: string
  fields: Field[] = []
  isReactive: boolean
  active = false

  submit: (data: any) => void
  invalid: (key: string, data: any) => void

  form: FormGroup

  constructor(
    label: string,
    fields: Field[] = [],
    invalid: (key: string, data: any) => void = (key: string, data: any) => {},
    isReactive: boolean = false,
    submit: (data: any) => void = (data: any) => {}
  ) {
    this.label = label
    if (fields === undefined) this.fields = []
    else this.fields = fields
    this.isReactive = isReactive
    this.form = this.toFormGroup(this.fields)
    this.submit = submit
    this.invalid = invalid
  }
  disabled = "true"
  add(field: Field) {
    this.fields.push(field)
  }

  collect() {
    let formValue = SI.from(this.form.getRawValue())
    this.fields.forEach((f: Field) => {
      if (f.isRange && f.isEditable)
        formValue = formValue.set(
          f.name,
          f.possibleValues[this.form.value[f.name]].value
        )
      if (typeof f.value === "number")
        formValue = formValue.set(f.name, Number(f.value))
    })
    return formValue
  }

  isValid(): boolean {
    let valid = true
    for (const name of Object.keys(this.form.controls)) {
      const control = this.form.controls[name]
      if (control.invalid) {
        this.invalid(name, control.value)
        valid = false
      }
    }
    return valid
  }

  doSubmit(submit: (data: any) => any) {
    if (this.isValid()) submit(this.collect())
  }

  doReactiveSubmit() {
    this.doSubmit(this.submit)
  }

  control(field: Field) {
    const isDisabled = !field.isEditable
    return field.isRequired
      ? new FormControl(
          { value: field.value, disabled: isDisabled },
          Validators.required
        )
      : new FormControl({ value: field.value, disabled: isDisabled })
  }

  toFormGroup(fields: Field[]): FormGroup {
    const group: any = {}

    fields.forEach((field: Field) => {
      group[field.name] = this.control(field)
    })

    return new FormGroup(group)
  }
}

export enum ItemStatus {
  OK,
  WARNING
}

export enum ItemType {
  THREED_OBJECT,
  VIEWER_SETTINGS
}

export class Item {
  id: string
  name: string
  description: string
  status: ItemStatus
  fieldGroups: FieldGroup[]
  specificFields: Field[]

  constructor(
    id: string,
    name: string,
    description: string,
    status: ItemStatus = ItemStatus.OK,
    fieldGroups: FieldGroup[] = [],
    specificFields: Field[] = []
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.status = status
    this.fieldGroups = fieldGroups
    this.specificFields = specificFields
  }
}

export abstract class ItemConf {
  selectedItemId: string
  items: Item[] = []

  hideCancel = false
  showFirstItemOnly = false

  constructor(showFirstItemOnly = false) {
    this.showFirstItemOnly = showFirstItemOnly
  }

  list(): Item[] {
    return this.items
  }

  find(itemId: string): Item {
    return this.items.find((item: Item) => item.id === itemId)
  }

  fieldGroups(itemId: string): FieldGroup[] {
    return this.find(itemId).fieldGroups
  }

  selectedItemFieldGroups(): FieldGroup[] {
    return this.fieldGroups(this.selectedItemId)
  }

  specificFields(itemId: string): Field[] {
    return this.find(itemId).specificFields
  }

  selectedItemSpecificFields(): Field[] {
    return this.specificFields(this.selectedItemId)
  }

  hasItems(): boolean {
    return this.items.length > 0
  }

  isSelected(): boolean {
    return this.selectedItemId !== undefined || this.showFirstItemOnly
  }

  select(itemId: string): void {
    this.selectedItemId = itemId
    const sefgs = this.selectedItemFieldGroups()

    if (sefgs !== undefined && sefgs.length > 0) sefgs[0].active = true
    else {
      const sesfs = this.selectedItemSpecificFields()
      if (sesfs !== undefined && sesfs.length > 0) sesfs[0].active = true
    }
  }

  finalise(): void {
    const sisfs = this.selectedItemSpecificFields()
    const sifgs = this.selectedItemFieldGroups()

    let allValid = true
    sifgs.forEach((fg: FieldGroup) => {
      allValid = fg.isValid()
    })
    if (!allValid) return

    const initial: any = {}
    let updatedProperties = SI.from(initial)

    if (sisfs !== undefined && sisfs.length > 0)
      sisfs.forEach(sisf => {
        updatedProperties = updatedProperties.merge(sisf.collector())
      })

    if (sifgs !== undefined && sifgs.length > 0)
      sifgs.forEach(sefg => {
        updatedProperties = updatedProperties.merge(sefg.collect())
      })

    this.postFinalise(updatedProperties)
  }

  abstract postFinalise(data?: any): void

  abstract cancel(): void
}

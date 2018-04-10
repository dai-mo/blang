import { SelectItem } from "primeng/primeng"

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
  VALUE_LIST,
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
  collector: () => any
  active = false
  level: FieldVisibilityLevel = FieldVisibilityLevel.ClosedField

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
    level: FieldVisibilityLevel = FieldVisibilityLevel.ClosedField
  ) {
    this.name = name
    this.label = label
    this.description = description
    this.defaultValue = defaultValue
    this.possibleValues = possibleValues
    this.value = value
    this.isEditable = isEditable
    this.isRequired = isRequired
    this.level = level
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
      this.value = ""
      this.possibleValues = this.possibleValues.filter(pv => pv.value !== "")
      this.selectItems = this.possibleValues.map((pv: PossibleValue) => {
        return { label: pv.displayName, value: pv.value }
      })
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
    if (typeof this.value === "string") {
      if (this.possibleValues.length > 0) return FieldUIType.VALUE_LIST
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
  active = false
  collector: () => any

  constructor(label: string, fields: Field[] = []) {
    this.label = label
    if (fields === undefined) this.fields = []
    else this.fields = fields
  }

  add(field: Field) {
    this.fields.push(field)
  }

  setCollector(collector: () => any) {
    this.collector = collector
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
  type: ItemType
  status: ItemStatus
  state?: any
  fieldGroups: FieldGroup[]
  specificFields: Field[]

  constructor(
    id: string,
    name: string,
    description: string,
    type: ItemType,
    status: ItemStatus = ItemStatus.OK,
    fieldGroups: FieldGroup[] = [],
    specificFields: Field[] = [],
    state?: any
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.type = type
    this.status = status
    this.fieldGroups = fieldGroups
    this.specificFields = specificFields
    this.state = state
  }
}

export abstract class ItemConf {
  selectedItemId: string
  items: Item[] = []

  hideCancel = false

  constructor() {}

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

  selectedEntitySpecificFields(): Field[] {
    return this.specificFields(this.selectedItemId)
  }

  hasItems(): boolean {
    return this.items.length > 0
  }

  isSelected(): boolean {
    return this.selectedItemId !== undefined
  }

  select(itemId: string): void {
    this.selectedItemId = itemId
    const sefgs = this.selectedItemFieldGroups()

    if (sefgs !== undefined && sefgs.length > 0) sefgs[0].active = true
    else {
      const sesfs = this.selectedEntitySpecificFields()
      if (sesfs !== undefined && sesfs.length > 0) sesfs[0].active = true
    }
  }

  abstract finalise(data?: any): void

  abstract cancel(): void
}

import {
  FieldGroup,
  Field,
  ItemConf,
  Item,
  ItemStatus
} from "@blang/properties"

export class ThreejsSettings {
  public static fieldGroup(): FieldGroup {
    const fields: Field[] = []
    fields.push(
      new Field("metallic", "metallic", "", "false", [], "false", true, true)
    )
    return new FieldGroup("threejs-settings", fields)
  }
}

export class ThreejsConf extends ItemConf {
  settings: FieldGroup
  constructor() {
    super()

    this.settings = ThreejsSettings.fieldGroup()

    const settingsItem = new Item(
      "threejs-settings",
      "threejs settings",
      "Settings for the Threejs viewer",
      ItemStatus.OK,
      [this.settings]
    )
    this.items.push(settingsItem)
  }

  postFinalise(data?: any): void {}

  cancel(): void {}
}

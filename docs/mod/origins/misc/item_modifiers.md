# Item Modifiers

Item Modifiers are technical JSON files that can be created inside data packs and are used to apply loot table functions into existing item stacks by either using the `/item` command, or the [Modify (Item Action Type)](../types/action/item_action_types#modify). Item Modifiers are stored inside the `data/<namespace>/item_modifier` folder.

### `origins:add_power`

Adds a power to an item stack that will only be applied to the player if the item is held/equipped in the specified equipment slot.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../../types/basic_concepts#identifier) | | The namespace and ID of the power that will be added to the entity. |
| `slot` | [Equipment Slot Group](https://minecraft.wiki/w/Equipment_slot) | | Determines if the item should add the power to the entity if held/equipped in the specified slot. Accepts `head`, `chest`, `legs`, `feet`, `mainhand`, `offhand`, `any`, `hand`, or `armor`. |
| `hidden` | [Boolean](../../types/basic_concepts#boolean) | `false` | Determines if the tooltip for the power should be hidden or not. |
| `negative` | [Boolean](../../types/basic_concepts#boolean) | `false` | Determines if the color of the tooltip should be blue (false) or red (true). |

<details>
<summary>Example</summary>

```json
{
    "function": "origins:add_power",
    "power": "origins:arcane_skin",
    "slot": "chest",
    "negative": true
}
```

This example will add the `origins:arcane_skin` power to the entity if the entity were to wear the item that this item modifier has been applied to on their chest equipment slot.

</details>

### `origins:remove_power`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../../types/basic_concepts#identifier) | | The namespace and ID of the power that will be removed from the item. |
| `slot` | [Equipment Slot Group](https://minecraft.wiki/w/Equipment_slot) | | The equipment slot to remove the power from. Accepts `head`, `chest`, `legs`, `feet`, `mainhand`, `offhand`, `any`, `hand`, or `armor`. |

<details>
<summary>Example</summary>

```json
{
    "function": "origins:remove_power",
    "power": "origins:arcane_skin",
    "slot": "chest"
}
```

This example will remove the `origins:arcane_skin` power from the item if it's applicable to the `chest` equipment slot.

</details>

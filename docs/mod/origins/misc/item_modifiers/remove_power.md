# Remove Power

Removes a power from an item stack.

**Type ID:** `origins:remove_power`

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../../types/basic_concepts#identifier) | | The namespace and ID of the power that will be removed from the item. |
| `slot` | [Equipment Slot Group](https://minecraft.wiki/w/Equipment_slot) | | The equipment slot to remove the power from. Accepts `head`, `chest`, `legs`, `feet`, `mainhand`, `offhand`, `any`, `hand`, or `armor`. |

### Examples

```json
{
    "function": "origins:remove_power",
    "power": "origins:arcane_skin",
    "slot": "chest"
}
```

This example will remove the `origins:arcane_skin` power from the item if it's applicable to the `chest` equipment slot.

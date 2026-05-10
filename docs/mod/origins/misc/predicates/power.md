# Power (Predicate)

:::danger Not yet implemented

This predicate is **not yet implemented** in the Origins (NeoForge). It will be available in a future update. The documentation below is from the Fabric version and may change.

:::

Checks if the entity has the specified power.

**Type ID:** `apoli:power`

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../../types/basic_concepts#identifier) | | The namespace and ID of the power to check for. |
| `source` | [Identifier](../../types/basic_concepts#identifier) | *optional* | If specified, checks if the specified power is from this power source. |

### Examples

```json
{
    "condition": "apoli:power",
    "power": "origins:arcane_skin"
}
```

This example will check if the player has the `origins:arcane_skin` power.

```json
{
    "condition": "apoli:power",
    "power": "origins:water_breathing",
    "source": "origins:merling"
}
```

This example will check if the player has the `origins:water_breathing` power from the `origins:merling` power source.

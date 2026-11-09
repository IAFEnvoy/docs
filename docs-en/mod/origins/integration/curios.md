# Curios

:::caution Unstable
This integration is newly implemented and currently unstable.
:::

Enabled when [Curios](https://www.curseforge.com/minecraft/mc-mods/curios) is
installed.

## `origins_integration:modify_curios`

[Entity Action Type](../types/action/entity_action_types)

Runs an item action on equipped Curios stacks.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | String | optional | Curio slot type to process; omitting it processes every slot type |
| `item_action` | Item Action | **required** | Action run for each processed stack |
| `limit` | Integer | `0` | Maximum stacks to process; `0` means unlimited |

## `origins_integration:equipped_curio_count`

[Entity Condition Type](../types/condition/entity_condition_types)

Compares the count of non-empty equipped Curio stacks.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | String | optional | Curio slot type to count; omitting it counts all types |
| `comparison` | Comparison | **required** | Comparison to apply to the count |

## `origins_integration:curio_slot_count`

[Entity Condition Type](../types/condition/entity_condition_types)

Compares the number of available Curio slots.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | String | optional | Curio slot type to count; omitting it counts all types |
| `comparison` | Comparison | **required** | Comparison to apply to the slot count |

## `origins_integration:is_curio`

[Item Condition Type](../types/condition/item_condition_types)

Checks whether an item stack is accepted as a Curio.

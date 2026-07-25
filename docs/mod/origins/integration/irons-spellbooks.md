# Iron's Spells 'n Spellbooks

:::caution Unstable
This integration is newly implemented and currently unstable.
:::

Enabled when Iron's Spells 'n Spellbooks is installed.

## `origins_integration:modify_mana`

[Entity Action Type](../types/action/entity_action_types)

Changes current mana through an Origins `modifier`.

## `origins_integration:cast_iron_spell`

[Entity Action Type](../types/action/entity_action_types)

Starts a normal Iron's spell cast.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `spell` | Resource Location | **required** | Spell registry id |
| `level` | Integer | `1` | Requested spell level, clamped to the spell's supported range |

## `origins_integration:mana`

[Entity Condition Type](../types/condition/entity_condition_types)

Compares Iron's current mana. Set `percentage` to `true`
to compare mana as a fraction of maximum mana.

## `origins_integration:casting`

[Entity Condition Type](../types/condition/entity_condition_types)

Checks whether the entity is currently casting an Iron's
spell.

## `origins_integration:iron_mana_regeneration`

[Power Type](../types/power)

Restores or drains Iron's mana at an interval.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | Float | **required** | Mana added each interval; negative values drain mana |
| `percentage` | Boolean | `false` | Interpret amount as a fraction of maximum mana |
| `interval` | Integer | `20` | Ticks between updates |

## `origins_integration:mastered_iron_spells`

[Power Type](../types/power)

Declares an additional list of Iron's spell ids in `spells` for the
holder. Spell containers stored in any active Origins `inventory` power also
count as mastered.

## `origins_integration:cast_mastered_iron_spell`

[Entity Action Type](../types/action/entity_action_types)

Casts a `spell` only if it is listed by an active
`mastered_iron_spells` power. `level` defaults to `1`.

## `origins_integration:action_on_iron_spell`

[Power Type](../types/power)

Runs `entity_action` at `phase: "start"` or `"end"` for Iron's spell
casting. Optional `spell` restricts it to one spell id.

## `origins_integration:action_on_iron_mana_change`

[Power Type](../types/power)

Runs `entity_action` when mana changes. Optional top-level
`comparison` and `compare_to` filter the signed mana delta.

## `origins_integration:modify_iron_cast_time`

[Power Type](../types/power)

Applies an Origins `modifier` to the duration of every Iron's spell
cast by the holder.

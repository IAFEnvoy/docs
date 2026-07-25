# Ars Nouveau

:::caution Unstable
This integration is newly implemented and currently unstable.
:::

Enabled when Ars Nouveau is installed.

## `origins_integration:cast_ars_spell`

[Entity Action Type](../types/action/entity_action_types)

Casts the serialized Ars Nouveau `spell` as the entity.

## `origins_integration:modify_ars_mana`

[Entity Action Type](../types/action/entity_action_types)

Changes a player's Ars Nouveau mana through an Origins
`modifier`.

## `origins_integration:ars_mana`

[Entity Condition Type](../types/condition/entity_condition_types)

Compares Ars Nouveau mana. Set `percentage` to `true` to
compare against maximum mana.

## `origins_integration:record_ars_spell`

[Power Type](../types/power)

Persistently records the holder's most recently cast Ars Nouveau
spell.

## `origins_integration:cast_recorded_ars_spell`

[Entity Action Type](../types/action/entity_action_types)

Casts the spell recorded by an active `record_ars_spell`
power.

## `origins_integration:modify_ars_spell`

[Power Type](../types/power)

Inserts Glyph ids into the current cast. `begin`, `after_cast`, and
`end` are optional lists of Glyph resource locations.

## `origins_integration:modify_ars_spell_condition`

[Power Type](../types/power)

Lets selected conditional glyphs use an Origins `target_condition`
as their trigger. `glyphs` is a required list of glyph ids. The current 1.21.1
implementation supports Ars Nouveau's Flare and Cold Snap conditional damage
checks.

## `origins_integration:action_on_ars_mana_change`

[Power Type](../types/power)

Runs `entity_action` when the holder's Ars Nouveau mana changes.
Optional `comparison` and `compare_to` filter the signed mana delta.

## `origins_integration:ars_glyphs`

[Power Type](../types/power)

Treats the holder as knowing its listed `glyphs` while active
without permanently unlocking them in Ars Nouveau player data. Glyph items
stored in any active Origins `inventory` power are also treated as known.

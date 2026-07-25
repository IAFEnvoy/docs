# Eidolon RePraised

:::caution Unstable
This integration is newly implemented and currently unstable.
:::

Enabled when Eidolon RePraised is installed.

## `origins_integration:modify_eidolon_mana`

[Entity Action Type](../types/action/entity_action_types)

Changes Eidolon magic through an Origins `modifier`.

## `origins_integration:enthrall`

[Bi-entity Action Type](../types/action/bientity_action_types)

Turns the target living entity into an Eidolon thrall of
the actor.

## `origins_integration:action_on_eidolon_spell`

[Power Type](../types/power)

Runs `entity_action` at `phase: "start"` or `"end"` of an Eidolon
spell. Optional `spell` restricts it to a spell id.

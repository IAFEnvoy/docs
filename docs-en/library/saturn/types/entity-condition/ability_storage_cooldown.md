---
title: "Remaining ability cooldown"
sidebar_position: 10
---

`saturn:ability_storage_cooldown`

Checks the current remaining cooldown duration of an ability.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ability_storage_cooldown` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `remaining` | Number or range object | no | omitted | Range of the remaining amount, or a runtime remaining value. |

## JSON example

```json
{
  "type": "saturn:ability_storage_cooldown",
  "ability": "example:heal"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.AbilityStorageCooldownCondition`. This page is based on the Codec in the current 26.1.2 source.

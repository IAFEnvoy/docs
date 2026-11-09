---
title: "Ability toggle state"
sidebar_position: 10
---

`saturn:ability_storage_toggle`

Checks the toggle value of the given ability storage.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ability_storage_toggle` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |
| `expected` | Boolean | no | `true` | The expected toggle value. |

## JSON example

```json
{
  "type": "saturn:ability_storage_toggle",
  "ability": "example:heal"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.AbilityStorageToggleCondition`. This page is based on the Codec in the current 26.1.2 source.

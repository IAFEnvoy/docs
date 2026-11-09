---
title: "Attribute modifier"
sidebar_position: 10
---

`saturn:modifier`

Provides attribute modifiers to the entity while the ability is active.

The ability type is written at the top level of the ability definition, alongside common fields such as costs and condition; do not nest another type object. For the common fields of an ability file, see [Ability definitions](../../data/ability.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:modifier` |
| `modifiers` | [Attribute modifiers](../../data/common.md#attribute-modifiers) array | no | `[]` | List of attribute modifier entries. |

Each entry of modifiers is an [attribute modifier](../../data/common.md#attribute-modifiers), not a simple mapping from attribute IDs to numbers.

## JSON example

```json
{
  "type": "saturn:modifier"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.ability.type.ModifierAbilityType`. This page is based on the Codec in the current 26.1.2 source.

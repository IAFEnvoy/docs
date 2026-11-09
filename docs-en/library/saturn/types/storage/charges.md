---
title: "Charge storage"
sidebar_position: 10
---

`saturn:charges`

Stores the maximum charges, the recharge interval and the charges currently remaining.

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:charges` |
| `maximum` | [Number provider](../number/index.md) | yes | — | Maximum value or upper bound. |
| `recharge_ticks` | [Number provider](../number/index.md) | yes | — | Ticks required to restore one charge. |
| `last_change` | Integer | no | `0` | Game tick of the last charge change. |
| `remaining` | Number | no | omitted | Remaining amount range or runtime remaining value. |

## JSON example

```json
{
  "type": "saturn:charges",
  "maximum": 1,
  "recharge_ticks": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.storage.builtin.ChargesDataStorage`. This page is based on the Codec in the current 26.1.2 source.

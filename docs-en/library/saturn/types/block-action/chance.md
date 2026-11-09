---
title: "Chance"
sidebar_position: 10
---

`saturn:chance`

Decides whether the action fires based on a given chance.

Acts on the world and block position given by the context. It is not a standalone data pack file; embed it in a field that requires a BlockAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:chance` |
| `action` | [Block action](index.md) | yes | — | The sub-action to run; its kind must match what this field expects. |
| `chance` | Number | yes | — | Hit chance; 0 never fires, 1 always fires. Codec range: `0.0F, 1.0F`. |
| `fail_action` | [Block action](index.md) | no | `{"type":"saturn:no_op"}` | Action to run when the chance check fails. |

## JSON example

```json
{
  "type": "saturn:chance",
  "action": {
    "type": "saturn:no_op"
  },
  "chance": 1
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.action.builtin.block.meta.ChanceAction`. This page is based on the Codec in the current 26.1.2 source.

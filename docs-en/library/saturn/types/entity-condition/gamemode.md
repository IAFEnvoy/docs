---
title: "Game mode"
sidebar_position: 10
---

`saturn:gamemode`

Checks the game mode of a player.

Checks a single entity. The condition array means all conditions must hold; these conditions are not the same as the vanilla advancement JSON player predicate.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:gamemode` |
| `gamemode` | Enum string | yes | — | Player game mode. Available values: `survival`, `creative`, `adventure`, `spectator`. |

## JSON example

```json
{
  "type": "saturn:gamemode",
  "gamemode": "survival"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.condition.builtin.entity.GamemodeCondition`. This page is based on the Codec in the current 26.1.2 source.

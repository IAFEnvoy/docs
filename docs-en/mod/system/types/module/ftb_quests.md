---
title: "FTB quests"
sidebar_position: 10
---

`system:ftb_quests`

Provides quest search, details, submission, claiming, gift packs and guide book lookup.

This type is written into the `server` object of a module definition, with `type` selecting the implementation. A system's `modules` reference module configuration IDs and cannot hold implementation type objects directly. For the common structure see [Module definition](../../data/module.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:ftb_quests` |

Requires FTB Quests and its dependencies. The Codec stays safely registered and module assembly is skipped when the dependency is absent; the release package does not ship this module configuration, so you must provide it yourself.

## JSON example

```json
{
  "type": "system:ftb_quests"
}
```

This example is the `server` value of a module definition; the complete file can also set `client` and `order`.

## Java entry point

`com.iafenvoy.system.module.builtin.QuestSystemModule`. This page is based on the Codec in the current 26.1.2 source.

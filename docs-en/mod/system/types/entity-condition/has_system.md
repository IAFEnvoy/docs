---
title: "Has system"
sidebar_position: 10
---

`system:has_system`

Checks whether the player has bound and initialized a system; the system ID can be filtered.

Registered in Saturn's entity condition registry and can be combined with Saturn's composition nodes of the same kind. The entity must be a server-side player, and the System runtime must be ready.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:has_system` |
| `system` | Resource ID | no | omitted | System definition ID to match; omitting it matches any bound system. |

## JSON example

```json
{
  "type": "system:has_system"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.system.data.condition.HasSystemCondition`. This page is based on the Codec in the current 26.1.2 source.

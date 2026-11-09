---
title: "Remove module"
sidebar_position: 10
---

`system:remove_module`

Persistently disables a module for a bound player.

Registered in Saturn's entity action registry and can be combined with Saturn's composition nodes of the same kind. The entity must be a server-side player, and the System runtime must be ready.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:remove_module` |
| `module` | Resource ID | yes | — | Module configuration ID in the dynamic system_module registry. |

## JSON example

```json
{
  "type": "system:remove_module",
  "module": "system:lottery"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.system.data.action.RemoveModuleAction`. This page is based on the Codec in the current 26.1.2 source.

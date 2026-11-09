---
title: "Advancement workflow"
sidebar_position: 10
---

`system:advancement`

Listens to the rules in system-advancements.json and runs unlock marker and fixed reward workflows.

This type is written into the `server` object of a module definition, with `type` selecting the implementation. A system's `modules` reference module configuration IDs and cannot hold implementation type objects directly. For the common structure see [Module definition](../../data/module.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:advancement` |

## JSON example

```json
{
  "type": "system:advancement"
}
```

This example is the `server` value of a module definition; the complete file can also set `client` and `order`.

## Java entry point

`com.iafenvoy.system.module.builtin.AdvancementSystemModule`. This page is based on the Codec in the current 26.1.2 source.

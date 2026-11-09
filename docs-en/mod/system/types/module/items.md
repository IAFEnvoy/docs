---
title: "Item query"
sidebar_position: 10
---

`system:items`

Queries items and recipe sources and builds item and source cards.

This type is written into the `server` object of a module definition, with `type` selecting the implementation. A system's `modules` reference module configuration IDs and cannot hold implementation type objects directly. For the common structure see [Module definition](../../data/module.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:items` |

## JSON example

```json
{
  "type": "system:items"
}
```

This example is the `server` value of a module definition; the complete file can also set `client` and `order`.

## Java entry point

`com.iafenvoy.system.module.builtin.ItemSystemModule`. This page is based on the Codec in the current 26.1.2 source.

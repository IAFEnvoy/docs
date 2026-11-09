---
title: "Inbox"
sidebar_position: 10
---

`system:inbox`

Shows pending entitlements and performs item delivery.

This type is written into the `server` object of a module definition, with `type` selecting the implementation. A system's `modules` reference module configuration IDs and cannot hold implementation type objects directly. For the common structure see [Module definition](../../data/module.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:inbox` |

## JSON example

```json
{
  "type": "system:inbox"
}
```

This example is the `server` value of a module definition; the complete file can also set `client` and `order`.

## Java entry point

`com.iafenvoy.system.module.builtin.InboxSystemModule`. This page is based on the Codec in the current 26.1.2 source.

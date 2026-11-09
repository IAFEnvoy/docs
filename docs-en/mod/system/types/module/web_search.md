---
title: "Web search"
sidebar_position: 10
---

`system:web_search`

Provides DeepSeek Search and Fetch capabilities after explicit authorization.

This type is written into the `server` object of a module definition, with `type` selecting the implementation. A system's `modules` reference module configuration IDs and cannot hold implementation type objects directly. For the common structure see [Module definition](../../data/module.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:web_search` |

The release package does not grant the search module by default. Even after an administrator configures and enables it, each request must still explicitly allow network access; Search and Fetch are each estimated at 5 CNY per 1000 successful requests.

## JSON example

```json
{
  "type": "system:web_search"
}
```

This example is the `server` value of a module definition; the complete file can also set `client` and `order`.

## Java entry point

`com.iafenvoy.system.module.builtin.SearchSystemModule`. This page is based on the Codec in the current 26.1.2 source.

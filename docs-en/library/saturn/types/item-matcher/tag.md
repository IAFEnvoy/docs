---
title: "Tag match"
sidebar_position: 10
---

`saturn:tag`

Matches items in the given tag.

Used for ItemMatcher entry fields such as `items`. Multiple entries are combined as a union; items, tags, wildcards, regex and vanilla ingredients are supported.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tag` |
| `tag` | Tag ID (without #) | yes | — | Registry tag, or the NBT data declared on this page. |

## JSON example

```json
{
  "type": "saturn:tag",
  "tag": "minecraft:logs"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.matcher.builtin.TagEntry`. This page is based on the Codec in the current 26.1.2 source.

---
title: "Regex match"
sidebar_position: 10
---

`saturn:regex`

Matches by a regular expression on the item ID.

Used for ItemMatcher entry fields such as `items`. Multiple entries are combined as a union; items, tags, wildcards, regex and vanilla ingredients are supported.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:regex` |
| `pattern` | String | yes | — | Pattern used to match the item resource ID. |

## JSON example

```json
{
  "type": "saturn:regex",
  "pattern": "minecraft:.*_planks"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.util.matcher.builtin.RegexEntry`. This page is based on the Codec in the current 26.1.2 source.

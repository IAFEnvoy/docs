---
title: "Specific resource"
sidebar_position: 10
---

`saturn:resource`

Reads the current value or bounds of the given resource from the captured resources.

The full set of EntityValueGetter parameters determines the query identity. It reads only the passed view or an already captured snapshot; a missing value is not the same as a known 0, false, or empty collection.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource` |
| `resource` | Resource ID | yes | — | A registered Saturn resource ID. |
| `value` | Enum string | no | `"current"` | Selects the projected field to read; it is not an information expression. Available values: `current`, `minimum`, `maximum`. |

## JSON example

```json
{
  "type": "saturn:resource",
  "resource": "example:mana",
  "value": "current"
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.data.information.getter.builtin.ResourceGetter`. This page is based on the Codec in the current 26.1.2 source.

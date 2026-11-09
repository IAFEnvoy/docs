---
title: "Player Information Groups"
sidebar_position: 8
---

File: `data/<namespace>/saturn/information_group/<path>.json`. A group selects which information rows it includes; the rows themselves do not declare the group they belong to.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `title` | Translatable text component | yes | — | A bare string is interpreted as a translation key; text / translate can also be written explicitly. |
| `order` | Integer | no | `0` | Groups sort ascending, then by ID. |
| `rows` | Array of information row IDs / #tags | yes | — | References the information_row registry. |

## Example

```json title="data/example/saturn/information_group/status.json"
{
  "title": {
    "text": "Host status"
  },
  "order": 0,
  "rows": [
    "example:health",
    "#example:extra"
  ]
}
```

```json title="data/example/tags/saturn/information_row/extra.json"
{
  "replace": false,
  "values": [
    "example:health"
  ]
}
```

Members of tags are deduplicated after expansion. The group `order` and the row `order` sort separately; the System module `order` instead puts larger values first, so do not mix the two up. Custom tags take effect only once they are referenced and are not added to all groups automatically.

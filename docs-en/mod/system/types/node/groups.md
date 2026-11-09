---
title: "Groups container"
sidebar_position: 10
---

`system:groups`

Builds groups from the current query results; after a selection only the content inside the group is shown.

Nodes are written into the `body` or `children` of a resource pack card template. Besides their own fields, all nodes share `id`, `style`, `when`, `unless` and `repeat`; see [Common node fields](../../cards/node-common.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:groups` |
| `source` | String | yes | — | Input collection, resource path or context parameter; see this page for how it is used. |
| `filter` | String | no | `""` | State key read by index, used to filter the collection. |
| `group` | String | yes | — | Group ID parameter of each result. |
| `group_label` | String | no | `""` | Group label parameter of each result. |
| `section` | String | no | `""` | Upper-level section parameter of the group. |
| `section_label` | String | no | `""` | Upper-level section label parameter. |
| `orientation` | String | no | `"vertical"` | Group navigation orientation, vertical or horizontal. |
| `options` | Object array | no | `[]` | Predefined groups; each item contains id and label. |
| `children` | Card node array | yes | — | Child node array. |

## options entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | String | yes | — | Preset group ID. |
| `label` | String | yes | — | Display label; may contain placeholders. |

## JSON example

```json
{
  "type": "system:groups",
  "source": "{{entries}}",
  "group": "{{entries.*.group}}",
  "children": [
    {
      "type": "system:grid",
      "source": "{{entries}}",
      "columns": 3,
      "max_row": 3,
      "children": [
        {
          "type": "system:text",
          "text": "{{entries.*.name}}"
        }
      ]
    }
  ],
  "group_label": "{{entries.*.group_label}}"
}
```

Placed in the `body` of a card template or the `children` of a container. Placeholders come from server snapshots and client build events; changing only the JSON does not produce the missing data or business handlers.

## Java entry point

`com.iafenvoy.system.screen.card.node.container.GroupsNode`. This page is based on the Codec in the current 26.1.2 source.

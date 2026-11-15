---
title: "Online job definition"
sidebar_position: 8
---

Registry: `system:online_job`. Definitions load only on the server; clients receive card snapshots for their queries. The registry name is singular, while the module type remains `system:online_jobs`.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | Translation-key string or text component | yes | — | Job name. |
| `description` | Translation-key string or text component | no | Empty text | Job description. |
| `duration` | Positive long integer | yes | — | Online seconds; multiplying by 20 must fit in a long tick count. |
| `items` | ItemStackTemplate array | yes | — | Output bundle containing 1–36 entries. |
| `enabled` | Boolean | no | `true` | Whether new runs may start. |
| `order` | Integer | no | `0` | Higher values appear first; ties are sorted by ID. |

## Example

```json title="data/example/system/online_job/gather_wood.json"
{
  "label": "example.job.wood",
  "description": "example.job.wood.description",
  "duration": 60,
  "items": [{ "id": "minecraft:oak_log", "count": 4 }],
  "enabled": true,
  "order": 30
}
```

Names and descriptions use [inline translation keys](./index.md#translated-text), with language files supplied by a client resource pack.

```json title="data/example/tags/system/online_job/gathering.json"
{
  "replace": false,
  "values": ["example:gather_wood"]
}
```

Set `"jobs": "#example:gathering"` in the [online jobs module](../types/module/online_jobs.md). The default module selects only `#system:default`; adding a definition alone does not include it in that selection.

Jobs advance by online ticks, without requiring actual gathering or consuming input materials. A started run snapshots its definition, so later edits to outputs or removal of the definition do not change that run. Reopen the world or restart the server after editing definitions; tags follow vanilla reload rules.

## Java entry point

`com.iafenvoy.system.data.catalog.OnlineJobEntry`, registered under `SystemResourceKeys.ONLINE_JOB`.

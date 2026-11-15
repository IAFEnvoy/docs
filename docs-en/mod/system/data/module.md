---
title: "Module definition"
sidebar_position: 2
---

Registry: `system:system_module`. An entry combines a server type, a client entry point and a display order into a configurable module instance.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `server` | Server module object | no | omitted | Dispatched by type; extra fields are read by the Codec of the specific module. |
| `client` | Client implementation ID | no | omitted | Selects a registered client implementation; the server does not load the corresponding client classes. |
| `order` | Integer | no | `0` | Higher comes first; only affects the order of interface entry points. |

## Example

```json title="data/example/system/system_module/daily.json"
{
  "order": 80,
  "server": {
    "type": "system:signin",
    "rewards": [
      "#example:starter",
      "example:daily_iron"
    ]
  },
  "client": "system:signin"
}
```

Referenced rewards or tags must be defined separately. The system sets `"modules": ["example:daily"]`. The same implementation can have multiple configurations with different parameters; server workflows choose by the configuration enabled for the player, and when several candidates are enabled at once they are sorted by configuration ID and the first one is taken, so conditions should be mutually exclusive.

The rewards of sign-in, the offers of the shop and the pools of the lottery all accept a single ID, a #tag or a mixed array. Omitting the field adds no restriction, and an empty array means there are no selectable entries; the built-in configurations explicitly select `#system:default` of their respective catalogs. When multiple configurations are enabled, their available catalogs are unioned.

A server-only module can provide only server; a client-only contribution can provide only client. Equal `order` values keep the original assembly order; when the same client implementation is merged for display, the largest order is used. The built-ins are player information 100, quests 90, sign-in 80, inbox 70, shop 60, wallet 55, lottery 50, workshop 45, and item query and online jobs 40.

For the concrete server fields, see the [module type catalog](../types/module/index.md). Player overrides can be managed with `/system module add/remove <player> <module ID>`; `/system module list [player]` shows modules and completes their IDs.

The [online jobs module](../types/module/online_jobs.md) also accepts IDs, #tags or mixed arrays in `jobs`, but multiple variants use the first selected workflow configuration rather than merging their candidates.

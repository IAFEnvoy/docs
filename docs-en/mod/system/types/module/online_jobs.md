---
title: "Online jobs"
sidebar_position: 10
---

`system:online_jobs` provides jobs timed while the player is online. The module type is plural; the job data registry is singular: `system:online_job`.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:online_jobs`. |
| `jobs` | ID, #tag or mixed array | no | Whole registry | Jobs that may be started; `[]` allows none. |

## Complete module example

```json title="data/example/system/system_module/jobs.json"
{
  "order": 40,
  "server": { "type": "system:online_jobs", "jobs": "#system:default" },
  "client": "system:online_jobs"
}
```

See [Module definition](../../data/module.md) for common fields and [Online job definition](../../data/online-job.md) for entries and tags. The built-in configuration is in the default module tag. Workflow selection uses the first enabled variant and its `jobs` selection; mutually exclusive conditions are recommended for variants.

## Player actions

Enter `/jobs` or `/作业` in the System input box, or choose Online Jobs. Start a job with `/work <ID>` or `/开工 <ID>`. Only one job can run at a time. When it completes, manually credit its output to the inbox, then claim the items into inventory. Another job may start after crediting, without first emptying the inbox.

Timing uses successfully dispatched online module ticks, at 20 ticks per second. Logging out or disabling all variants pauses progress. Completed jobs do not repeat automatically. An unfinished job may be cancelled, losing its progress. Cards show a query snapshot and provide a refresh button. Variants share one ledger and do not accelerate timing; claim and cancel buttons are bound to a run ID, so an old button cannot affect a new job.

## Java entry point

`com.iafenvoy.system.module.builtin.OnlineJobsSystemModule`, with persistence through `module.builtin.storage.OnlineJobsDataStorage`.

---
title: "Storage capacity"
sidebar_position: 2
---

File: `config/system/system-storage.json`. Side: **server**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `businessBytes` | Integer | no | `4194304` | Business file budget per player, in bytes. |
| `chatBytes` | Integer | no | `33554432` | Chat file budget per player, in bytes. |
| `journalBytes` | Integer | no | `786432` | Execution journal budget, constrained by the total business file budget. |
| `journalEntries` | Integer | no | `8192` | Maximum number of execution journal entries. |
| `taskBytes` | Integer | no | `262144` | Task log budget, in bytes. |
| `taskEntries` | Integer | no | `4096` | Maximum number of task log entries. |
| `conversationEntries` | Integer | no | `256` | Maximum number of retained conversations. |
| `conversationDays` | Integer | no | `30` | Number of days conversations are retained. |

Storage capacity is applied at startup. The execution journal and the task log share the business file space, so the actual budgets are constrained downwards to leave room for other business content; changing the capacity cannot restore records that have already been pruned. Self-managed world save files are located in `<world>/system/`, use compressed NBT, and are not migrated from old paths.

## Bundled default file

```json title="config/system/system-storage.json"
{
  "businessBytes": 4194304,
  "chatBytes": 33554432,
  "journalBytes": 786432,
  "journalEntries": 8192,
  "taskBytes": 262144,
  "taskEntries": 4096,
  "conversationEntries": 256,
  "conversationDays": 30
}
```

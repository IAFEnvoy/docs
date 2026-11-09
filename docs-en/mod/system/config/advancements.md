---
title: "Advancement-triggered workflows"
sidebar_position: 7
---

File: `config/system/system-advancements.json`. Side: **server**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `rules` | Array | no | `[]` | List of bindings between advancement IDs and existing Agent actions; System's own listener is still used for now. |

## rules entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | Resource ID | yes | — | Stable identifier of the rule. |
| `advancementId` | Resource ID | yes | — | ID of the vanilla / mod advancement whose completion is watched. |
| `action` | AgentAction object | yes | — | Dispatched by type to the parameters of an existing workflow; the format is defined by that workflow. |

The default rules are empty. This is not a general replacement for Saturn EntityAction, and it does not accept the JSON of Saturn triggers automatically. Saturn has added an advancement-completion trigger, but System does not connect to it here yet.

## Bundled default file

```json title="config/system/system-advancements.json"
{
  "rules": []
}
```

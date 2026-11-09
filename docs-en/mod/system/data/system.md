---
title: "System definition"
sidebar_position: 1
---

Registry: `system:system`. Defines the system name, description, enabled modules and the free chat personality.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | Translation key | yes | — | System name, translated by the client according to the player language. |
| `description` | Translation key | yes | — | System description. |
| `modules` | Module reference array | no | `[]` | Module configuration ID, #tag, or an object containing id and condition. |
| `personality_prompt` | Prompt ID | no | omitted | Appended to the free chat prompt; does not affect dedicated business prompts. |

## Example

```json title="data/example/system/system/daily.json"
{
  "name": "example.system.daily.name",
  "description": "example.system.daily.description",
  "personality_prompt": "example:personality/daily",
  "modules": [
    "#example:basic",
    {
      "id": "system:shop",
      "condition": {
        "type": "system:has_module",
        "module": "system:signin"
      }
    }
  ]
}
```

`example:personality/daily` corresponds to `data/example/system/prompts/personality/daily.txt`. The name and description also require translations from the client resource pack:

```json title="assets/example/lang/zh_cn.json"
{
  "example.system.daily.name": "Sign-in system",
  "example.system.daily.description": "Provides the host with items and resources every day."
}
```

## Module references

`id` references a [module configuration](./module.md), not an Agent workflow or a server-side implementation class. `condition` uses Saturn [entity conditions](../../../library/saturn/types/entity-condition/index.md); omitting it means unconditional. Tag members are evaluated individually, and overlapping references are unioned; a manual disable takes priority over the definition, and a manual addition can override the condition.

Create `data/example/tags/system/system_module/basic.json`, for example:

```json
{
  "replace": false,
  "values": [
    "system:player",
    "system:items",
    "system:signin",
    "system:inbox"
  ]
}
```

Bind it with `/system grant example:daily [player]`. Currently a player has at most one system; the old binding must be revoked before switching systems. The core, binding and usage infrastructure is not disabled by ordinary module conditions.

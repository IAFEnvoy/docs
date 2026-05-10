---
sidebar_position: 2
---

# Creating a Custom Power

This guide walks through building a power from scratch. We'll create a power that sets undead mobs on fire when hit — a "Holy Fire" ability.

## Prerequisites

Finish [Creating a Custom Origin](define_origin) first so you have an origin to attach your power to.

## Step 1 — Pick a Power Type

A power's behavior is determined by its `type`. For "do something to the entity I just hit", the right choice is [`origins:target_action_on_hit`](../types/power/action#originstarget_action_on_hit).

Create the file and start with the skeleton:

```json title='data/example/origins/power/holy_fire.json'
{
  "type": "origins:target_action_on_hit",
  "name": "Holy Fire",
  "description": "Your strikes set the undead ablaze.",
  "cooldown": 1,
  "entity_action": {}
}
```

| Field | Why |
|-------|-----|
| `type` | Tells Origins which power logic to use |
| `name` / `description` | Shown in the origin GUI (optional — uses translation keys if omitted) |
| `cooldown` | *(Power specific)* Minimum ticks between activations (`1` = every hit) |
| `entity_action` | *(Power specific)* The effect applied to the target |

## Step 2 — Define the Entity Action

An `entity_action` is itself a typed object. We want [`origins:set_on_fire`](../types/action/entity_action_types#originsset_on_fire):

```json title='data/example/origins/power/holy_fire.json'
{
  //...
  "entity_action": {
    "type": "origins:set_on_fire",
    "duration": 4
  }
}
```

This works, but it burns **everything** you hit — not just undead.

## Step 3 — Add a Target Condition

Filter the target with `target_condition`, an Entity Condition:

```json title='data/example/origins/power/holy_fire.json'
{
  //...
  "entity_action": {
    "type": "origins:set_on_fire",
    "duration": 4
  },
  "target_condition": {
    "type": "origins:entity_type",
    "entity_type": "minecraft:zombie"
  }
}
```

Now only zombies burn. To cover all undead, switch to an `or` condition with multiple `entity_type` checks, or use an entity type tag:

```json
"target_condition": {
  "type": "origins:in_tag",
  "tag": "minecraft:skeletons"
}
```

## Step 4 — Attach to Your Origin

Add the power ID to corresponding origin's `powers` List or tag:

```json title='data/example/tags/origins/power/supermorph.json'
{
  "replace": false,
  "values": [
    "example:holy_fire"
  ]
}
```

Run `/reload` and test it in-game.

## Step 5 — Polish

Add badges, refine the condition, or make the power toggleable. Here is the final version with badges:

```json title='data/example/origins/power/holy_fire.json'
{
  "type": "origins:target_action_on_hit",
  "name": "Holy Fire",
  "description": "Your strikes set the undead ablaze.",
  "badges": ["origins:active"],
  "cooldown": 20,
  "entity_action": {
    "type": "origins:set_on_fire",
    "duration": 6
  },
  "target_condition": {
    "type": "origins:in_tag",
    "tag": "minecraft:undead"
  }
}
```

---

## How the Pipeline Works

Every Origins JSON type follows the same pattern:

```json
{
  "type": "origins:<category>/<name>",
  // ...fields specific to that type
}
```

1. **Power types** are at the top level of a power file.
2. **Entity actions** are nested inside powers (in `entity_action`, `rising_action`, etc.).
3. **Entity conditions** filter when powers or actions apply.
4. **Block / item / damage / biome conditions** appear wherever relevant fields accept them.

The type reference is your map:

| Reference | Location |
|-----------|----------|
| All power types | [Power Types](../../types/power/) |
| All entity actions | [Entity Action Types](../../types/action/entity_action_types) |
| All entity conditions | [Entity Condition Types](../../types/condition/entity_condition_types) |

Browse them to get a feel for what's possible.

---
title: Bi-entity Conditions (bientity_condition_type)
description: Every built-in bi-entity condition type registered by the mod, and the JSON fields each type accepts.
---

# Bi-entity Conditions (bientity_condition_type)

<span id="bi-entity-conditions-bientity-condition-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/condition/bientity-condition.md).
:::

A **bi-entity condition** checks the relationship between two entities: an **actor** and a **target**. The pair comes from whichever field declares the condition, so the condition itself cannot pick entities — it only describes what to check about the two it is given. Most types tell the two ends apart, and swapping actor and target changes the result.

Bi-entity conditions are a Java (built-in) registry with fixed `type` ids: a data pack can neither add entries nor remove them. `type` picks one built-in type and its value is one of the ids listed on this page, written with the `mxt` namespace. Only Java code or the KubeJS bridge can introduce custom condition types — see the [KubeJS API](../../../kubejs/api-reference.md). A field name followed by `?` is optional; every other field is required.

## Common Structure {#common-structure}

`type` and every other key sit on the same level:

```json
{
  "type": "mxt:distance",
  "maximum": 8
}
```

A condition is used as a value inside other definitions, so it usually lands under a field such as `bientity_condition`:

```json
"bientity_condition": {
  "type": "mxt:actor_condition",
  "condition": {
    "type": "mxt:entity_type",
    "entity_type": "minecraft:player"
  }
}
```

Anywhere a bi-entity condition is wanted, an array of conditions is accepted too. The array is shorthand for `mxt:and` and passes only when every entry passes:

```json
"bientity_condition": [
  { "type": "mxt:can_see" },
  { "type": "mxt:distance", "maximum": 16 }
]
```

The array shorthand only works where a condition itself is expected: inside the `conditions` of `mxt:and` and `mxt:or`, every entry still has to be a condition object, not another array.

Seven types — `mxt:always`, `mxt:never`, `mxt:js`, `mxt:and`, `mxt:or`, `mxt:not` and `mxt:chance` — do not look at the entities at all; they answer with a constant, call a script, or combine other conditions. Every other type looks at the actor and target it is handed.

:::info Directed and Undirected Use
Most bi-entity conditions tell the actor from the target, so swapping the two entities changes the result. `mxt:undirected` runs a nested condition once in each direction and passes when either one holds; `mxt:mutual` is its counterpart and passes only when **both** directions hold — that is what "the two of them are friends with each other" is written as. `mxt:both` / `mxt:either` deliberately apply the same entity condition to both ends. Nested entity checks use the [entity condition types](./entity_condition_types.md).
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) lists each type's fields interactively, handy for checking a field name without digging through the tables here.
:::

## Condition Types {#condition-types}

### `mxt:friend` {#mxt-friend}

Passes when the actor treats the target as one of its own.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

```json
{"type": "mxt:friend"}
```

### `mxt:element_overcomes` {#mxt-element-overcomes}

Passes when at least one of the actor's spirit root elements overcomes one of the target's spirit root elements.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

```json
{"type": "mxt:element_overcomes"}
```

It only asks whether that overcoming relation exists, not what it is worth — the multiplier of the relation belongs to the [damage system](../../../technical/damage.md), so content that only needs the pairing writes `1.0`.

### `mxt:element_adapted_to` {#mxt-element-adapted-to}

Passes when the actor is adapted to (`adapted_to`) an element the target carries.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

```json
{"type": "mxt:element_adapted_to"}
```

It is the defensive mirror of `mxt:element_overcomes`, answering "do I resist you"; again it only asks whether the relation exists, and the multiplier still belongs to the [damage system](../../../technical/damage.md).

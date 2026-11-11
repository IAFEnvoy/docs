---
title: Entity Conditions (entity_condition_type)
description: Every built-in entity condition type registered by the mod, with the JSON fields that each type accepts.
---

# Entity Conditions (entity_condition_type)

<span id="entity-conditions-entity-condition-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/condition/entity-condition.md).
:::

An **entity condition** checks the state of a single entity and returns `true` or `false`. The entity under test comes from whichever definition declares the condition; the condition itself only describes what to check.

Entity conditions are a Java (built-in) registry with fixed `type` ids, so a data pack can neither add nor remove entries. Only Java code or the KubeJS bridge can introduce custom condition types — see the [KubeJS API](../../../kubejs/api-reference.md).

`type` picks one of the built-in types listed on this page, written with the `mxt` namespace. A field name followed by `?` is optional; every other listed field must be present. The Field column lists the JSON keys taken straight from that type's codec.

## Meta Conditions {#meta-conditions}

`type` sits on the same level as every other key:

```json
{
  "type": "mxt:health",
  "comparison": "<",
  "compare_to": 10
}
```

A condition is used as a value inside other definitions, so it usually lands under a field such as `condition`:

```json
"condition": {
  "type": "mxt:has_spirit_root",
  "spirit_root": "example:azure_root"
}
```

Anywhere an entity condition is accepted, an array of conditions is accepted too. The array is shorthand for `mxt:and` and passes only when every entry passes:

```json
"condition": [
  { "type": "mxt:sneaking" },
  { "type": "mxt:on_block", "condition": {"type": "mxt:block_tag", "tag": "minecraft:logs"} }
]
```

| Type | Fields | Description |
| --- | --- | --- |
| `mxt:always` | — | Always passes. |
| `mxt:never` | — | Always fails. |
| `mxt:and` | `conditions` | Passes only when every nested entity condition passes. |
| `mxt:or` | `conditions` | Passes when at least one nested entity condition passes. |
| `mxt:not` | `condition` | Negates the nested entity condition. |
| `mxt:chance` | `chance` | Passes randomly with the given probability, between `0` and `1`. |
| `mxt:js` | `id`, `params?` | Calls an entity condition handler registered through the KubeJS bridge. |

The `id` of `mxt:js` is the callback registered with `MxtConditions.entity(...)`; a missing callback counts as `false`.

:::info Comparison Fields
Several types compare a value against a number. When a type lists `comparison` and `compare_to` as two separate keys they sit directly on the condition object, as in the example above. A few types name a single `comparison` key instead, whose value is one nested comparison object holding `comparison` and `compare_to`; those types say so in their own description. The operators are `==`, `!=`, `<`, `<=`, `>` and `>=`, and `compare_to` itself is always a plain number.
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) lists each type's fields interactively, handy for confirming a field name without digging through the tables here.
:::

## State, Identity and Cultivation {#state-identity-and-cultivation}

### `mxt:has_curse` {#mxt-has-curse}

Checks whether the entity holds one [curse](../../json/curse.md) that satisfies **every** filter given.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `curse?` | Curse id or `#` tag | Any | Has to be this definition. |
| `tags?` | `#` tag or array | Any | The held instance has to carry every listed tag at once. |
| `stacks?` | `{min?, max?}` | Any | Stack range. |
| `remaining_ticks?` | `{min?, max?}` | Any | Remaining-tick range. |

```json
{"type": "mxt:has_curse", "stacks": {"min": 2}, "remaining_ticks": {"min": 1}}
```

`stacks` and `remaining_ticks` are both closed `{min?, max?}` windows. A curse that never expires counts as infinite, so it answers a `min` but never a `max`. With no filter written at all, the question is whether any curse is held.

### `mxt:has_spirit_root` {#mxt-has-spirit-root}

Checks whether the entity currently holds the given [spirit root](../../json/spirit_root.md).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `spirit_root` | Entry, `#` tag or array | **required** | The spirit root to ask about. |

```json
{"type": "mxt:has_spirit_root", "spirit_root": "#example:fire_roots"}
```

`spirit_root` takes an entry, a `#` tag or an array of them, so "any fire root" is one tag. It reads the ledger the body holds; whether one is in effect is the [spirit root and physique switch](../../json/spirit_root.md).

### `mxt:has_physique` {#mxt-has-physique}

Checks whether the entity currently holds the given [physique](../../json/physique.md).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `physique` | Physique id | **required** | The physique to ask about. |

### `mxt:realm` {#mxt-realm}

Compares the entity's [realm stage](../../json/realm_stage.md) against `realm`. It **only asks about the chain `realm` itself belongs to**: two stages on that one chain compare by in-chain index, and a realm of any other aura never satisfies it.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `realm` | Realm stage | **required** | The realm to compare against, and the chain the question is about. |
| `comparison?` | `==` / `!=` / `<` / `<=` / `>` / `>=` | `==` | How to compare, by in-chain index. |
| `min_minor_stage?` | Integer | Any | Requires the highest minor stage reached in that realm to be at least this, `0`-based. |

```json
{"type": "mxt:realm", "realm": "example:foundation", "comparison": ">="}
```

**A body that has not entered that chain yet counts as standing on its first realm** (that is, a mortal): so naming the first realm passes for a mortal too, and a lower bound such as `>=` holds the same way; once the body has entered the chain, what is compared is really the stage it currently stands on.

`min_minor_stage` uses the same numbering as the `minor_stage` formula variable. It reads the **minor-stage record that only ever grows**, so a gate such as "has reached minor stage 500 of qi refining" still holds after breaking through; pair it with `comparison: "=="` to mean "is currently inside that minor stage".

### `mxt:has_realm` {#mxt-has-realm}

Passes for entities that have entered a realm chain for the given [aura](../../json/aura.md).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `aura` | Aura id | **required** | The aura whose realm chain is asked about. |

### `mxt:technique` {#mxt-technique}

Checks which [techniques](../../json/technique.md) the entity has **learned**.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `techniques?` | Entry, `#` tag or array | Empty list | The techniques to ask about. |
| `match?` | `any` / `all` | `any` | `any` is satisfied by one hit; `all` requires every written entry. |

```json
{"type": "mxt:technique", "techniques": ["example:azure_sword"], "match": "all"}
```

An empty list means "has learned any technique at all". An empty list with `all` is refused at load rather than quietly becoming a condition that always passes. It reads what was learned, not what is in effect, since techniques have no enable switch (only spirit roots and physiques do); write `mxt:not` around one for "has no technique".

### `mxt:cultivating` {#mxt-cultivating}

Checks whether the entity is **cultivating**, optionally inside one named [method](../../json/cultivation.md).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action?` | Method id | Any | Names one `cultivation`; only a body running that one passes. |

```json
{"type": "mxt:cultivating"}
{"type": "mxt:cultivating", "action": "example:azure_meditation"}
```

The state is written the moment cultivation starts, so the answer is the same for the whole run rather than becoming true only after a settlement. It naturally belongs to "should the session carry on" (`tick_condition`) — **before starting it is necessarily false**, so never use it to ask "can this body cultivate right now"; to ask whether a partner can share in the results, ask what that partner **holds** through `mxt:partner`.

### `mxt:progression` {#mxt-progression}

Checks how far a progression the body holds has climbed.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `level` | Progression level ID | **required** | Names one level. |
| `comparison?` | `==` / `!=` / `<` / `<=` / `>` / `>=` | `==` | How to compare, by the in-chain index the server cached. |
| `owner?` | Owner definition ID, or an array | Every progression the body holds | Narrows the question to certain owners. |

```json
{"type": "mxt:progression", "level": "example:stage_three", "comparison": ">=", "owner": "example:azure_sword"}
```

Without `owner` every progression the body holds is asked and one hit is enough. It takes owner definition IDs only — one or an array — and does not accept a `#` tag. It reads **the level the body reached**, which is the owner's `default_level` while it never advanced; an owner without a `default_level`, or one whose chain the cache could not index, never answers true.

### `mxt:contract` {#mxt-contract}

Reads the contract record a body carries.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bound?` | Boolean | `true` | Whether it carries a contract record at all. |
| `type?` | Contract type ID, `#` tag or an array | `[]` | Narrows the question to certain contract types. |
| `behavior?` | Order ID or an array | `[]` | Whether the order in force is one of them (`mxt:follow` / `mxt:wander` / `mxt:stay` / `mxt:recall`). |

```json
{"type": "mxt:contract"}
```

A body with no record answers `false` to `bound: true` and `true` to `bound: false`. Writing `bound: false` together with `type` or `behavior` is rejected at **load time** - "no contract" contradicts "which contract it is, and which order it is under". The typical use is "only spirit beasts may grow": write `{"type": "mxt:contract"}` as that level's `condition`.

### `mxt:has_element` {#mxt-has-element}

Passes when one of the elements named by the entity's **enabled** spirit roots is listed in `elements`.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `elements` | Element entry, `#` tag or array | **required** | The elements to ask about. |

```json
{"type": "mxt:has_element", "elements": "#example:fire"}
```

"Any fire root" is one `#` tag, and later spirit roots of the same kind need no edit here. The `elements` of an element condition always takes at least one entry: an empty list or array is refused at load instead of turning into a condition that always passes or always fails.

### `mxt:in_secret_realm` {#mxt-in-secret-realm}

Answers whether the entity is inside one [secret realm instance](../../json/secret_realm.md).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `definition?` | One `mxt:secret_realm` definition or `#` tag | Any | Restricts which definition counts. |
| `role?` | `any` / `owner` / `guest` | `any` | What standing to count as. |

`any` means merely being inside, `owner` means being the owner, and `guest` means being inside without being the owner. Outside every instance it is always `false`, so both `owner` and `guest` imply being inside.

### `mxt:element_attachment` {#mxt-element-attachment}

Reads how much of an element has accumulated on the entity (the `mxt:element_attachment` attachment, see [element_reaction](../../json/element_reaction.md)).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `elements` | Map of element id to window | **required** | Every entry is one element id to a `max`／`min` window, and every entry has to pass. |
| `elements.<id>.max` | Double | **required** | Upper bound on that element's accumulation. |
| `elements.<id>.min` | Double | Any | Lower bound on that element's accumulation. |

```json
{"type": "mxt:element_attachment", "elements": {"#example:fire": {"min": 20, "max": 100}}}
```

An empty map is refused at load rather than passing everywhere. This is the read-only side of the accumulation system: an effect can depend on how much fire a body carries without any reaction firing.

## Environment and Position {#environment-and-position}

### `mxt:aura_range` {#mxt-aura-range}

Compares the aura concentration at the server-resolved entity position against per-aura requirements.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `aura` | Map of aura id to requirement | **required** | Every entry is one aura id to a `max`／`min` requirement. |
| `aura.<id>.max` | [Number provider](../../../../../library/saturn/types/number.md) | **required** | Upper bound on that aura's concentration. |
| `aura.<id>.min` | [Number provider](../../../../../library/saturn/types/number.md) | `0` | Lower bound on that aura's concentration. |

```json
{"type": "mxt:aura_range", "aura": {"example:fire_qi": {"min": 10, "max": 100}}}
```

Each written aura is compared against the concentration at the entity's position, and all of them have to hold.

### `mxt:aura_element` {#mxt-aura-element}

Tests the aura at the entity's position by **element** rather than by named aura.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `elements` | Map of element id to requirement | **required** | Every entry is one element id to a `max`／`min` requirement, and every entry has to pass. |
| `elements.<id>.max` | [Number provider](../../../../../library/saturn/types/number.md) | **required** | Upper bound on that element's concentration. |
| `elements.<id>.min` | [Number provider](../../../../../library/saturn/types/number.md) | `0` | Lower bound on that element's concentration. |

Every **live** aura at the position that carries that element is summed first and then compared, and every entry has to pass. Adding another aura of the same element to a zone satisfies the requirement without touching the query.

### `mxt:formation_member` {#mxt-formation-member}

Passes when the entity owns any registered [formation](../../json/formation.md) in the current dimension (being anywhere on the **ownership list** counts).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

### `mxt:formation_owner` {#mxt-formation-owner}

Passes when the entity is **one of** the owners of the formation currently being evaluated (ownership is a set of UUIDs, and any of them counts).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

Outside a formation context it is always `false`.

### `mxt:formation_ally` {#mxt-formation-ally}

Passes when **any** owner of the formation currently being evaluated treats the entity as an ally.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

## Health, State and Values {#health-state-and-values}

### `mxt:pill_toxicity` {#mxt-pill-toxicity}

Compares the pill toxicity accumulated on the entity.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | Comparison operator | **required** | `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Double | **required** | The number to compare against. |

```json
{"type": "mxt:pill_toxicity", "comparison": ">=", "compare_to": 100}
```

Same shape as `mxt:health`. An entity that has never taken a pill reads `0` and does not gain an empty record for it. What raises toxicity, where the threshold sits and what is left after an overdose are on [pill](../../json/pill.md); to write the number directly, use `mxt:modify_pill_toxicity`.

### `mxt:has_equipped_item` {#mxt-has-equipped-item}

Passes when a stack the entity wears or holds satisfies an [item condition](./item_condition_types.md).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item_condition?` | [Item condition](./item_condition_types.md) | No condition | The condition to test against every stack. |
| `slots?` | Slot name or array | Every vanilla slot and every Curios slot | Restricts which slots are checked. |

```json
{"type": "mxt:has_equipped_item", "item_condition": {"type": "mxt:item_tag", "tag": "#example:swords"}}
```

This is the natural way to bind a passive `mxt:modifier` to gear. `slots` takes vanilla equipment slot names (`mainhand`, `offhand`, `head`, `chest`, `legs`, `feet`, `body`) or Curios slots with a `curios:` prefix (`curios:back_weapon`); leave it out and every vanilla slot and every Curios slot is asked. A name that matches nothing simply never passes.

## Reincarnation Lifespan {#reincarnation-lifespan}

### `reincarnation:lifespan` {#reincarnation-lifespan-1}

Compares a finite lifespan. `field` defaults to remaining; total, fraction and spent are also supported. fraction is remaining/total (0 for a zero total); spent is total-remaining. An unlimited ledger returns false.

```json
{"type":"reincarnation:lifespan","field":"fraction","comparison":"<","compare_to":0.1}
```

### `reincarnation:lifespan_state` {#reincarnation-lifespan-state}

`state` is required: finite includes zero, unlimited includes unaccounted and closed ledgers, unaccounted means never granted life, and expired means a remainder of zero.

```json
{"type":"reincarnation:lifespan_state","state":"expired"}
```

### `reincarnation:generation` {#reincarnation-generation}

Compares a server player's visible life number, starting at 1. Non-players return false.

```json
{"type":"reincarnation:generation","comparison":">=","compare_to":2}
```

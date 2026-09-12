---
title: "Number Provider Types"
description: "The shorthand forms, built-in number providers, formula functions and formula variables used by MiXianTu number fields."
sidebar_position: 5
---

# Number Provider Types

Every value that must change with level, realm or event context is a `NumberProvider`. Evaluation happens on the **server**; the client only uses the synchronized result.

---

## Shorthand

A JSON number is automatically parsed as a constant:

```json
"amount": 5
```

A JSON string is automatically parsed as an expression:

```json
"amount": "4 + level * 0.5"
```

Anything else is a structured provider object with an inlined `type`:

```json
"amount": {
  "type": "mxt:constant",
  "value": 5
}
```

---

## Structured Expressions

```json
{
  "type": "mxt:expression",
  "expression": "base_damage * multiplier",
  "params": {
    "base_damage": 8,
    "multiplier": "1 + level * 0.1"
  }
}
```

The values inside `params` are themselves `NumberProvider`s and override the context variables of the same name. An unregistered variable inside an expression is treated as `0`. A formula syntax error fails the datapack reload; a runtime `NaN` or infinity logs a one-line warning and returns `0`.

Parameter names must be valid variable names: the first character is a letter or `_`, and the rest may be letters, digits or `_`. Every key in `params` must actually appear in the expression, otherwise the load is rejected.

---

## Built-In Providers

### `mxt:constant`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | Double | **required** | Fixed value; must be finite |

A JSON number is equivalent to this type.

```json
{"type": "mxt:constant", "value": 12}
```

### `mxt:expression`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `expression` | String | **required** | exp4j expression |
| `params` | Object of `NumberProvider` | `{}` | Values that override context variables of the same name |

```json
{
  "type": "mxt:expression",
  "expression": "heal + bonus",
  "params": {"bonus": "level * 0.5"}
}
```

### `mxt:context_variable`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `variable` | String | **required** | Name of the context variable to read |
| `fallback` | Double | `0` | Value used when the context does not contain the variable |

```json
{"type": "mxt:context_variable", "variable": "absorbed_aura", "fallback": 0}
```

### `mxt:sum`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `summands` | List of `NumberProvider` | **required** | The values to add; at least one entry |

```json
{"type": "mxt:sum", "summands": [1, "level * 0.25", {"type": "mxt:uniform", "min": 0, "max": 2}]}
```

### `mxt:uniform`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `min` | `NumberProvider` | **required** | Lower bound |
| `max` | `NumberProvider` | **required** | Upper bound |

The value is drawn from the `RandomSource` carried by the passed context. Equal bounds return that bound directly, and `min` greater than `max` logs a warning and returns `0`.

```json
{"type": "mxt:uniform", "min": 2, "max": "2 + level"}
```

### `mxt:binomial`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `n` | `NumberProvider` | **required** | Number of Bernoulli trials; an integer from `0` to `16384` |
| `p` | `NumberProvider` | **required** | Success probability from `0` to `1` |

Returns the number of successes. Out-of-range parameters log a warning and return `0`.

```json
{"type": "mxt:binomial", "n": 5, "p": 0.35}
```

### `mxt:weighted_list`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `distribution` | List of entries | **required** | At least one entry |

Each entry has its own fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `NumberProvider` | **required** | The value produced by this entry |
| `weight` | Integer | **required** | Positive integer weight; larger weights are picked more often |

```json
{
  "type": "mxt:weighted_list",
  "distribution": [
    {"data": 1, "weight": 3},
    {"data": "level * 2", "weight": 1}
  ]
}
```

### `mxt:conditional`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `branches` | List of branches | `[]` | Branches checked in order |
| `fallback` | Number or expression string | none | Value used when there is no `Player` or no branch matched; `0` when omitted |

Each branch has its own fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | `EntityCondition` | **required** | Condition tested against the player |
| `value` | `NumberProvider` | **required** | Value returned when the condition passes |

`fallback` only accepts a number or an expression string, not an arbitrary provider object.

```json
{
  "type": "mxt:conditional",
  "branches": [
    {"condition": {"type": "mxt:sneaking"}, "value": 4},
    {"condition": {"type": "mxt:has_realm", "resource": "example:qi"}, "value": "level + 1"}
  ],
  "fallback": 1
}
```

### `mxt:js`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | String | **required** | Callback ID registered with `MxtValues.number(...)` |
| `params` | Object | `{}` | Arbitrary JSON passed to the callback |

Calls a KubeJS number provider extension. When no callback is registered for `id`, the provider logs a warning and returns `0`. See the [KubeJS API Reference](../../kubejs/api-reference.md).

```json
{"type": "mxt:js", "id": "example:luck_roll", "params": {"base": 3}}
```

---

## Aura Concentration Sources

Two numbers describing the aura at a position are provided by the separate `resource_value_provider_type` family rather than by `number_provider_type`:

| `type` | Description |
|--------|-------------|
| `mxt:environment_concentration` | The environmental template concentration at the current position. Only environmental sources such as biome, dimension and zone are counted; chunk storage and aura released by blocks or formations are excluded. |
| `mxt:actual_concentration` | The final resolved concentration at the current position, including the environment, chunk storage and every active source such as blocks and formations. |

The full list of resource value providers is in [Other Type Families](./other_types.md#resource_value_provider_type).

The `RandomSource` of an entity or a `Level` is passed to the random providers first. Do not re-roll a random value on the client to decide a game result; the client only displays the synchronized server result.

---

## Formula Functions

Formulas are evaluated with exp4j. The mod registers these additional functions into the built-in `mxt:formula_function` registry:

| Function | Arguments | Description |
|----------|-----------|-------------|
| `round(x)` | 1 | Rounds to the nearest whole number |
| `clamp(x, min, max)` | 3 | Limits `x` to the inclusive range `min..max` |
| `min(a, b)` | 2 | Smaller of the two values |
| `max(a, b)` | 2 | Larger of the two values |

The standard exp4j functions are also available: `abs`, `acos`, `asin`, `atan`, `cbrt`, `ceil`, `cos`, `cosh`, `exp`, `floor`, `log`, `log10`, `sin`, `sinh`, `sqrt`, `tan` and `tanh`. The constants `pi` and `e` are recognized as well.

---

## Formula Variables

Formulas read named variables. An explicit value in the context always wins over the variable registry, an unknown name resolves to `0`, and `params` overrides any name.

Which names exist depends on **where the formula is evaluated**: every resource, cultivation and ability formula runs with an entity context, bi-entity formulas add the `target_` set, and each trigger adds a few names of its own. Only rely on the names that the context in question provides.

### Registry Variables

The built-in `mxt:formula_variable` registry provides two names that work in every context:

| Variable | Description |
|----------|-------------|
| `zero` | Always `0` |
| `random` | A new random double between `0` and `1`, drawn from the authoritative `RandomSource` of the context |

### Entity Variables

Whenever a context is built from a living entity (resource regeneration, cultivation, abilities, contracts, forging, alchemy), these names are added:

| Variable | Description |
|----------|-------------|
| `caster_health` | Current health of the entity |
| `caster_max_health` | Maximum health of the entity |
| `caster_level` | Experience level of the entity when it is a player, otherwise `0` |
| `caster_<resource>` | Current value of every resource the entity holds |
| `caster_<attribute>` | Current value of every synchronized attribute of the entity |

Bi-entity contexts (`target_condition`, `bi_entity_action`, and the aura ability's target action) add the same set a second time with the `target_` prefix: `target_health`, `target_max_health`, `target_level`, `target_<resource>` and `target_<attribute>`.

`<resource>` and `<attribute>` are the registry ID with the namespace and path joined by `_`; `/`, `.` and `-` inside the path also become `_`:

| ID | Variable |
|----|----------|
| `mxt:spirit_power` | `caster_mxt_spirit_power` |
| `example:fire/qi` | `caster_example_fire_qi` |
| `minecraft:max_health` | `caster_minecraft_max_health` |
| `minecraft:attack_damage` | `caster_minecraft_attack_damage` |

Only synchronized attributes are exposed, so an attribute that the client does not need is not available in a formula.

:::warning `caster_level` is not the realm
`caster_level` is the vanilla experience level. The realm rank is the separate `level` / `realm_rank` variable described below, and it only exists in a resource context.
:::

### Resource and Cultivation Variables

Formulas evaluated for one resource — `resource.max`, `resource.regen`, the resource conversions, resource costs, realm stages, breakthrough conditions and resource bars — add the cultivation state of that resource on top of the entity context:

| Variable | Description |
|----------|-------------|
| `realm` | Rank of the current realm in this resource's chain; `0` when the chain does not match |
| `realm_rank` | Same value as `realm` |
| `level` | Same value as `realm`, kept as a shorthand for realm formulas |
| `absorbed_aura` | Accumulated cultivation progress of this resource; `0` when the chain does not match |
| `cultivation_progress` | Same value as `absorbed_aura` |

A resource definition can therefore write:

```json
{
  "max": "100 + realm_rank * 50 + absorbed_aura * 0.5",
  "regen": "0.25 + realm_rank * 0.1"
}
```

### Ability Variables

| Variable | Available when | Description |
|----------|----------------|-------------|
| `element_modifier` | The ability declares a non-empty `element_affinity` | The element affinity multiplier computed for the caster, usable to scale damage or costs by element match |

Abilities of the `aura` type also evaluate the target action once per affected entity with two extra names:

| Variable | Description |
|----------|-------------|
| `aura_radius` | The radius resolved for this aura pulse |
| `distance` | Distance in blocks between the caster and the current target |

### Trigger Variables

Abilities with a `triggered` type are evaluated when the trigger fires, and the trigger adds these names to the entity context:

| Trigger | Variables added | Description |
|---------|-----------------|-------------|
| `tick` | — | Entity context only |
| `attack` | `target_is_living`, `target_health` | `target_is_living` is `1` when the attacked entity is a living entity |
| `hurt` | `damage` | Damage that was actually inflicted on the caster |
| `kill` | `target_health` | Health of the killed entity at the moment of death |
| `death` | `victim_health` | Health of the dying entity, floored at `0` |
| `block_break`, `block_use` | `block_x`, `block_y`, `block_z` | Coordinates of the block involved |
| `item_use` | `use_duration` | Ticks the used item took to finish |
| `equip` | `equipment_slot` | Ordinal of the changed equipment slot |
| `breakthrough` | `breakthrough` | Always `1`, so it can be used as a flag |

### Variables From Other Systems

| Variable | Provided by | Description |
|----------|-------------|-------------|
| `damage` | Contract combat actions | Damage the contracted spirit beast just dealt |
| `aura_tribulation_modifier` | Tribulation phases | Local aura influence, taken from the `tribulation_modify` rule of the aura zone |

### Custom Variables

`mxt:expression` accepts `params`, whose values are themselves `NumberProvider`s and replace the context variable of the same name:

```json
{
  "type": "mxt:expression",
  "expression": "realm_rank * scale + bonus",
  "params": {
    "scale": 1.5,
    "bonus": "caster_minecraft_attack_damage * 0.5"
  }
}
```

Use `params` when one formula must depend on a value that the current context does not provide, or when the same expression is reused in several tables with different constants.

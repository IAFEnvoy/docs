---
title: Ability Types (ability_type)
description: The fourteen ability types in saturn:ability_type, which fields each one reads and when it runs.
---

# Ability Types (ability_type)

<span id="ability-types-ability-type" />

:::info Shared with Saturn
`empty`, `active`, `triggered`, `channelled`, `targeted`, `aura`, `interval`, `modifier` and `upkeep` are registered by Saturn; this page documents only MiXianTu's four own types. The shared types are in [Saturn's ability types](../../../../../library/saturn/types/ability.md).
:::

The **top-level** `type` of an ability definition comes from this table:

```json
{"type": "mxt:active", "costs": [{"id": "example:qi", "amount": 10}], "cooldown": 40}
```

The common fields — the handful every type reads — are on the [ability definition](../../../../../library/saturn/data/ability.md) page. This page records only the keys each type **itself** reads. A key that is listed nowhere is read by nobody even when it is written.

## Overview {#overview}

| `type` | What it does | Needs a key |
| --- | --- | --- |
| [`mxt:empty`](../../../../../library/saturn/types/ability.md#saturnempty) | Does nothing | No |
| [`mxt:active`](../../../../../library/saturn/types/ability.md#saturnactive) | One press, one run | **Yes** |
| [`mxt:triggered`](../../../../../library/saturn/types/ability.md#saturntriggered) | One run when a signal arrives | No |
| [`mxt:channelled`](../../../../../library/saturn/types/ability.md#saturnchannelled) | Hold to keep it up, one run per beat | **Yes** |
| [`mxt:targeted`](../../../../../library/saturn/types/ability.md#saturntargeted) | One press, the payload ability on each of a batch of targets | **Yes** |
| [`mxt:aura`](../../../../../library/saturn/types/ability.md#saturnaura) | Every so often, one run on every entity in radius | No |
| [`mxt:interval`](../../../../../library/saturn/types/ability.md#saturninterval) | Runs itself over and over on a cadence | No |
| [`mxt:modifier`](../../../../../library/saturn/types/ability.md#saturnmodifier) | Passive attribute bonuses | No |
| [`mxt:mount`](#mxt-mount) | Declares the artifact a flying mount | No |
| [`mxt:flight_control`](#mxt-flight-control) | One press to take off, one to land | **Yes** |
| [`mxt:storage`](#mxt-storage) | One press opens a carried storage | **Yes** |
| [`mxt:upkeep`](../../../../../library/saturn/types/ability.md#saturnupkeep) | A periodic price | No |
| [`mxt:word`](#mxt-word) | The two whitelisted effects | No |

**Needs a key** only affects the wheel: only pressable types enter the wheel pool, and no other type does. Commands, scripts and item-carried abilities cast a type of any kind directly.

## The Four Action Fields {#action-fields-by-type}

`entity_action`, `target_selector`, `target_condition` and `bi_entity_action` are written at the top level of the ability (beside `type`), with the defaults `mxt:no_op` / `mxt:self` / `mxt:always` / `mxt:no_op`. Only the five types that run actions read them: `mxt:active`, `mxt:triggered`, `mxt:channelled`, `mxt:aura` and `mxt:interval`.

The order inside one run never changes: `entity_action` first, then `target_selector` picks targets, every target is tested by `target_condition`, and only a target that passes runs `bi_entity_action`. One target failing does not affect the others, and an action that throws only logs a line rather than stopping the rest.

Each of the five types runs this set at **its own moment**:

| Type | When it runs the four keys |
| --- | --- |
| `mxt:active` | On the press (with a `cast_time`, the tick it finishes). |
| `mxt:triggered` | Once the trigger fires, the chance passes and the costs are paid. |
| `mxt:channelled` | Once on activation, then once per `tick_interval` after each upkeep deduction succeeds. |
| `mxt:aura` | A pulse that comes due on `interval` **finds entities by radius one by one**, and each entity only runs `target_condition` + `bi_entity_action` (a pulse reads neither `target_selector` nor `entity_action`); fired one-off (a command, a script, a talisman) it runs the whole set once through the ordinary path. |
| `mxt:interval` | Runs the whole set on its own `interval`; fired one-off by a command or a script it runs once through the ordinary path. |

Every other type reads **none of it**: `mxt:word` carries a terminal payload of its own (its `effect` field), `mxt:targeted` only picks targets (it runs the payload's one-target half), and `mxt:modifier` / `mxt:mount` / `mxt:flight_control` / `mxt:storage` / `mxt:upkeep` / `mxt:empty` have no such layer either.

`mxt:targeted` also writes a key called `target_selector`, but that is its own "who does this cast reach", not half of the set above.

## Which Fields Each Type Reads {#which-fields-each-type-reads}

| `type` | Its own fields |
| --- | --- |
| `mxt:mount` | `speed`, `seats`, `sit`, `render`, `entity_type`, `display`, `width`, `height`, `step_height`, `seat_offsets`, `mount_action`, `trail` |
| `mxt:flight_control` | `hand`, `speed_multiplier`, `cooldown` |
| `mxt:storage` | `slots`, `cooldown` |
| `mxt:word` | `effect`, `requires_operator`, `amount`, `cooldown` |

`cooldown` and `damage_condition` are read by only some types, so they are not in the common field table — but they are still written beside `type` in JSON.

- **`cooldown`** (`NumberProvider`, default `0`): the cooldown length, written into the `mxt:cooldown` state. Every path that pays reads it — `mxt:active` / `mxt:triggered` / `mxt:channelled` / `mxt:aura` / `mxt:word` / `mxt:targeted` / `mxt:flight_control` / `mxt:storage`. A type that pays nothing reads nothing from it.
- **`damage_condition`** (`DamageCondition`, default `mxt:always`): **only `mxt:triggered` reads it**. Subscribing to the `mxt:hurt` signal tests this condition first and skips that signal while it fails. Written on any other type it is a key nobody reads; to pick a situation, use `condition`.

## State Kinds {#state-kinds}

Which state kinds an ability can store is decided by its `type`; a data pack does not declare it. This table decides whether `mxt:modify_ability_storage` and the six `mxt:ability_storage_*` conditions accept a value:

| `type` | Declared state kinds |
| --- | --- |
| `mxt:flight_control` | `mxt:active_state`, `mxt:cooldown` |
| `mxt:storage` | `mxt:active_state`, `mxt:cooldown`, `mxt:container` |
| `mxt:word` | `mxt:active_state`, `mxt:cooldown`, and `mxt:charges` when `charges` is written |

The fields of those six kinds, how they are written and how they are read are on [Ability Casting](../../../technical/ability.md).

## `mxt:mount` {#mxt-mount}

**A `mxt:mount` is how an artifact declares itself a flying mount**: once it is in the artifact's `abilities`, the flying skill can take it from either hand and fly it — how fast, how many seats, what fuel it burns and what it looks like are all answered here. It is **never activated**: it reads only its own fields, the top-level `costs` (the fuel of every tick) and `condition` (re-read every tick, and failing it lands).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `speed` | `NumberProvider` | **required** | Mount speed |
| `seats` | int | `1` | Total seats including the driver, from `1` to `4` |
| `sit` | bool | `false` | Riding pose, shared by the whole vehicle |
| `render` | Renderer | `mxt:item` | Which renderer draws the mount |
| `entity_type` | entity type id | `mxt:flying_sword` | Which entity type flies it; it has to implement the [mount contract](../../../java/interfaces/mount/vehicle.md), and a wrong id fails at load |
| `display` | `{translation, rotation, scale}` | absent means the renderer's own default pose | How the mount sits relative to the mount's origin |
| `width` | double | `0.35` | Collision box width |
| `height` | double | `0.12` | Collision box height |
| `step_height` | double | `0` | Step height |
| `seat_offsets` | `Vec3` list | spread behind by `0.8` per seat, the first at `0.65` high | Where each seat lands, in blocks |
| `mount_action` | `{on_mount, on_dismount, tick}` | all three are `mxt:no_op` | The mount's own three behaviours |
| `trail` | Object | absent means no trail | Trail particles |

**`entity_type` swaps "which entity flies it"**: leave it out and the framework's own `mxt:flying_sword` is used; write it and the id is looked up in the vanilla entity type registry, where a wrong id fails at **load**. Whether the body can carry a flight is the entity's own answer — the type has to implement the [mount contract](../../../java/interfaces/mount/vehicle.md), or take-off is refused (the action bar still reports "cannot be boarded", and the log names the type, once per type). **A different entity type is a different set of behaviour**: movement, landing, seats, boarding, size, saved data and drawing all live on that entity, and the definition's `width` / `height` / `seat_offsets` / `sit` / `step_height` / `render` / `display` have to be read by it as well — which is why "boat / palanquin / airship" is an addon registering one entity type and one renderer, with a pack naming it.

`costs` is the fuel of every tick: the artifact's own store of the same aura is spent first, and only the remainder falls to the driver; fractions are allowed.

`render` picks **which renderer** draws it: `mxt:item` by default (the item model of the carried item), `mxt:geckolib` (a GeckoLib model and its animations, which needs GeckoLib on the client), or a type a content mod registered. `display` is optional; leave it out and the renderer uses its own default pose (`[0,0,0]` / `[90,0,-45]` / `[2,2,2]` on the item track, no rotation and `1` on the GeckoLib track). Its fields have the same names and meanings as a vanilla item model's `display`: `translation` is written in 1/16 blocks and stored in blocks, `rotation` is degrees combined as `rotationXYZ`, and `scale` is a factor (a negative value mirrors, which is legal). The three `render.type` values, the GeckoLib asset paths and the seven poses are on [Mount Renderers](./mount-render.md). Changing the collision box takes effect at once.

The last `seat_offsets` entry written is reused for any seats past the list. `seats` is the total head count including the driver; the driver has to be a player, and any other seat is taken by right-clicking the mount. The driver steers with the movement keys: jump climbs, the descend key sinks, sprinting gives 1.5x horizontal speed, and forward/back/left/right follow the look direction by default (**Server Config → Flight → Fly Where You Look**); sneaking is still the vanilla dismount. Movement is computed on the server only.

All three behaviours of `mount_action` run on the **driver**: the moment the flight starts, the moment it lands (before the seat is given up), and every tick (once the fuel is paid).

`trail`'s fields are `particle` (required) plus `interval` (default `1`, `1`–`200`), `count` (default `1`, `0`–`256`), `speed` (default `0`), `spread` (default `[0.2, 0.1, 0.2]`), `offset_x` / `offset_y` / `offset_z` (default `0` / `0.1` / `0`) and `moving_only` (default `false`). `particle` has to be written as an object, for example `{"type": "minecraft:end_rod"}`; a bare id string is a load error. `spread` and `offset_*` are measured in **blocks** (unlike `mxt:spawn_particles`, which scales by the entity's size); with `moving_only` on, it only emits on a tick where it really moved.

Load-time refusals: `seats` outside `1`–`4`, more than four `seat_offsets` entries or a non-finite vector among them, a non-positive or non-finite `width` / `height`, a negative or non-finite `step_height`, a non-finite `speed` / `spread` / `offset_*` on `trail`, and an out-of-range `trail.interval` / `trail.count`.

Hitting a block or the ground lands the flight.

## `mxt:flight_control` {#mxt-flight-control}

One press takes the flying artifact out of the main hand, then the off hand, and takes off; a second press lands. A technique usually grants it.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `hand` | `main` / `off` / `either` | `either` | Which hand the mount is looked for in |
| `speed_multiplier` | `NumberProvider` | `1` | Multiplied into the mount's `speed` |
| `cooldown` | `NumberProvider` | `0` | Cooldown length |

It reads `costs`, `condition`, `cooldown` and the display fields. It reads none of `cast_time` / `charges` / the four action fields / `damage_condition` / element affinity.

Neither it nor `mxt:storage` spends a charge.

## `mxt:storage` {#mxt-storage}

One press opens the carried item's own storage. It needs an item to carry it.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slots` | `NumberProvider` | **required** | Storage slot count |
| `cooldown` | `NumberProvider` | `0` | Cooldown length |

How the slot count settles: `floor(value)` → clamped to the 32-bit integer range, `0` at the bottom → anything `≤ 0` counts as 0 (a press then reports `INVALID_FORMULA`) → rows `clamp((slots + 8) / 9, 0, 6)` → capacity = rows x 9, **54 slots at most**.

Failure reasons on a press: not a server-side player = `UNAVAILABLE`, nothing carried in hand = `NO_CARRIER`, not the owner = `NOT_OWNED`.

The contents live in the item component `mxt:storage`, as one record under this ability's own id. Two storage abilities on one carrier keep two separate boxes.

It spends no charge either.

## `mxt:word` {#mxt-word}

A terminal payload: it executes no target behaviour of its own.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `effect` | `self_heal` / `purge_self_curses` | **required** | The effect; an unknown value is a load error |
| `requires_operator` | Boolean | `true` | The caster has to be a player with gamemaster permission |
| `amount` | `NumberProvider` | `0` | The magnitude passed to the effect, only meaningful for `self_heal` |
| `cooldown` | `NumberProvider` | `0` | Cooldown length |

`effect` is a fixed whitelist; a data pack cannot add a third value. It is not an arbitrary command string and has nothing to do with the action fields on an ability — for anything else, write an ability with an `entity_action` (such as `mxt:heal`).

`amount` has to evaluate finite, non-negative and no larger than a single-precision float allows, or this cast is refused with `PERMISSION_DENIED`. Failing `requires_operator` refuses it the same way.

It is not a pressable type; it is cast by a command or a script.
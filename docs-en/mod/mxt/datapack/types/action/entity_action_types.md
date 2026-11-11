---
title: Entity Actions (entity_action_type)
description: Every built-in entity action type registered by the mod, and the JSON fields each type accepts.
---

# Entity Actions (entity_action_type)

<span id="entity-actions-entity-action-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/action/entity-action.md).
:::

An **entity action** performs one operation on a single entity. Whatever definition declares the action supplies the entity it acts on; the action itself only describes what to do with it. `type` is written on the action object, side by side with its fields, and its value is one of the ids listed on this page, written with the `mxt` namespace.

Entity actions are a Java (built-in) registry: `type` ids are fixed, and a data pack can neither add entries nor remove them. Adding a custom type means writing Java, or going through the KubeJS bridge — see the [KubeJS API](../../../kubejs/api-reference.md).

```json
{
  "type": "mxt:heal",
  "amount": 4
}
```

Actions are values inside other definitions, so they usually appear nested under a field such as `entity_action`:

```json
"entity_action": {
  "type": "mxt:apply_effect",
  "effect": "minecraft:speed",
  "duration_ticks": 200
}
```

Anywhere an entity action is accepted, an array is accepted too. The array is shorthand for `mxt:sequence` and runs its entries in the order they are written:

```json
"entity_action": [
  { "type": "mxt:extinguish" },
  { "type": "mxt:heal", "amount": 2 }
]
```

A key marked **required** in the Default column of the tables below must be written; every other entry is the value used when the key is left out. An optional action field left out defaults to `mxt:no_op`, so a miss such as writing `condition` but forgetting `action` is not reported at load — that entry simply does nothing.

:::info Field Types Are Shared
Many fields accept a [number provider](../../../../../library/saturn/types/number.md) instead of a fixed number, and several types reference the shared [data types](../shared_data_types.md). Where a field takes a nested action or condition, that value uses the ids of the matching family.
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) lists a type's fields interactively, which is handy for checking a field name without scrolling through the tables on this page.
:::

## Action Types {#action-types}

### `mxt:damage` {#mxt-damage}

Applies damage to the entity.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | Number provider | **required** | The damage amount, in points. |
| `damage_type` | Damage type id | none | The source this hit is built with. |
| `element` | Element id, or a list of `#tag` entries | `[]` | The element this hit is declared as. |

```json
{ "type": "mxt:damage", "amount": 4, "damage_type": "minecraft:magic" }
```

It is **unowned**, so no spirit-root element relation is settled and no attacker is recorded: the right shape for costs such as recoil, pill toxicity and environmental ticks. When it lands on somebody other than the caster, the caster is recorded as the attacker instead.

`damage_type` builds the source of this hit and `element` declares its element: with only `element` written, the first type that element claims is taken; with both written, the **first use** of this strike checks that the element really claims that type, logging one line for each mismatch. See the [damage system](../../../technical/damage.md).

Settled on the server only; a non-finite evaluated amount, or one of `0` or less, means nothing happens.

### `mxt:attach_element` {#mxt-attach-element}

Adds to (or subtracts from) one element's accumulation on the entity.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `element` | Element id | **required** | Which element's accumulation to add to or subtract from. |
| `amount` | Number provider | **required** | How much to add; a negative amount cleanses. |

```json
{ "type": "mxt:attach_element", "element": "example:fire", "amount": -5 }
```

Does nothing when the evaluated amount is not finite or is `0`. A positive amount goes through the **same** reaction pipeline a strike does, and enough of it fires an [element_reaction](../../json/element_reaction.md) — which is why a lava bath, taking a pill or a curse feeding fire over time all use it.

### `mxt:grant_spirit_root` {#mxt-grant-spirit-root}

Grants one [spirit root](../../json/spirit_root.md) to the entity.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `spirit_root` | Spirit root id | **required** | The spirit root to grant. |

```json
{ "type": "mxt:grant_spirit_root", "spirit_root": "example:azure_root" }
```

Does nothing when the target is not a living entity.

### `mxt:grant_physique` {#mxt-grant-physique}

Grants one [physique](../../json/physique.md) once its holder condition, stacking and exclusivity checks all pass.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `physique` | Physique id | **required** | The physique to grant. |

```json
{ "type": "mxt:grant_physique", "physique": "example:flame_body" }
```

Does nothing when the target is not a living entity, and grants nothing when any one check fails.

### `mxt:remove_spirit_root` {#mxt-remove-spirit-root}

Removes a held spirit root together with the abilities it granted.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `spirit_root` | Spirit root id | **required** | The spirit root to remove. |

```json
{ "type": "mxt:remove_spirit_root", "spirit_root": "example:azure_root" }
```

Does nothing when the target is not a living entity.

### `mxt:remove_physique` {#mxt-remove-physique}

Removes a held physique together with the abilities and attribute sources it granted.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `physique` | Physique id | **required** | The physique to remove. |

```json
{ "type": "mxt:remove_physique", "physique": "example:flame_body" }
```

Does nothing when the target is not a living entity.

### `mxt:apply_curse` {#mxt-apply-curse}

Applies a data pack [curse](../../json/curse.md) through the authoritative curse transaction.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `curse` | Curse id | **required** | The curse to apply. |
| `stacks` | Number provider | `1` | How many stacks to apply. |
| `duration_ticks` | Number provider | none | How many ticks it lasts; left out, the curse decides for itself. |

```json
{ "type": "mxt:apply_curse", "curse": "example:burning_meridian", "stacks": 2 }
```

Nothing is applied when `stacks` is not finite, is below `1` or is above `256`; `stacks` is rounded to the nearest integer. A `duration_ticks` that is not finite, is negative or exceeds `Long.MAX_VALUE` is treated as if the key were absent.

### `mxt:apply_curses` {#mxt-apply-curses}

Applies several independently configured curses through the standard transaction.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `curses` | Curse entry array | **required** | Each entry is applied on its own. |

```json
{
  "type": "mxt:apply_curses",
  "curses": [
    { "curse": "example:burning_meridian", "stacks": 2 },
    { "curse": "example:weak_spirit", "duration_ticks": 600 }
  ]
}
```

:::info Entry Shape and Defaults
Each entry carries **no** `type` key of its own:

| Entry Field | Type | Default | Description |
| --- | --- | --- | --- |
| `curse` | Curse id | **required** | The curse to apply. |
| `stacks` | Number provider | `1` | How many stacks to apply. |
| `duration_ticks` | Number provider | none | How many ticks it lasts; left out, the curse decides for itself. |
:::

Entries do not affect each other: one entry that is not applied never stops the entries after it.

### `mxt:remove_curse` {#mxt-remove-curse}

Removes one named curse under the `cleansed` reason, so its `on_cleanse` runs.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `curse` | Curse id | **required** | The curse to remove. |

```json
{ "type": "mxt:remove_curse", "curse": "example:burning_meridian" }
```

### `mxt:remove_curses_by_tag` {#mxt-remove-curses-by-tag}

The cure side of the cleanse model: removes every held curse carrying **any one** of the given `mxt:curse` tags, under the same `cleansed` reason.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tags` | Tag array | **required** | Written as `"#namespace:path"`. |

```json
{ "type": "mxt:remove_curses_by_tag", "tags": ["#example:minor_curses"] }
```

A curse definition never declares what may cleanse it.

### `mxt:spawn_sword_aura` {#mxt-spawn-sword-aura}

Spawns a sword aura at the activation's launch position. Its tip follows the acting entity's look direction and its speed comes from `speed`; the blade and the outer flames have separate ARGB colours.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `speed` | Number provider | `1` | Speed along the look direction; it must evaluate to a finite positive number. |
| `blade_color` | ARGB colour | `#C778D9FF` | Inner blade colour; the top byte is opacity. |
| `aura_color` | ARGB colour | `#CC78D9FF` | Outer aura colour; the top byte is opacity. |
| `radial_flame` | Boolean | `false` | When `true`, flames flow outward from the blade; otherwise they flow upward. |
| `length` | Float | `1.65` | Blade length, `0.01`–`32`. |
| `blade_width` | Float | `0.26` | Blade width, `0.01`–`32`. |
| `thickness` | Float | `0.08` | Blade thickness, `0.01`–`32`. |
| `handle_length` | Float | `0.44` | Handle length, `0.01`–`32`. |
| `guard_width` | Float | `0.52` | Guard width, `0.01`–`32`. |
| `scale` | Float | `1` | Overall scale, `0.01`–`32`. |
| `lifetime` | Integer | `80` | Lifetime in ticks, `1`–`72000`. |
| `collide_action` | Entity action | none | The action run when the aura hits a solid block. Writing it is what makes the sword disappear on impact; without it the sword passes through blocks. |

```json
{
  "type": "mxt:spawn_sword_aura",
  "speed": 1.5,
  "blade_color": "#C778D9FF",
  "aura_color": "#CC78D9FF",
  "radial_flame": false,
  "length": 1.65,
  "blade_width": 0.26,
  "thickness": 0.08,
  "handle_length": 0.44,
  "guard_width": 0.52,
  "scale": 1.0,
  "lifetime": 80
}
```

Spawns on the server only. The spawn point is the activation's launch position and the direction is the acting entity's look direction. The colour fields accept ARGB colours and do not read a separate opacity field. A dimension outside its range is refused at load; a `speed` that evaluates to a non-finite or non-positive value spawns nothing.

A sword spawned with `collide_action` checks the solid block it is about to enter every tick: on a hit it runs that action at the impact point and then disappears. The action runs as the entity that fired the sword, so `caster_*` formula variables read it and actions that land on the acting entity, `mxt:damage` among them, hit it as well. Its position is the impact point, which is where sounds, particles, explosions and block actions happen. When that entity can no longer be resolved (disconnected, its chunk unloaded) the action does not run and the sword still disappears. The behaviour is kept on the server only, is never sent to clients and does not change how the sword is drawn.

### `mxt:explode` {#mxt-explode}

Creates an explosion at the entity's position.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | Float | **required** | The explosion power. |
| `interaction` | Vanilla explosion interaction type | `mob` | For example `mob` or `none`. |
| `indestructible` | Block condition | none | Matching blocks are protected from the explosion. |
| `create_fire` | Boolean | `false` | Whether the explosion leaves fire behind. |

```json
{ "type": "mxt:explode", "power": 3.0, "create_fire": true }
```

Explodes on the server only. Nothing happens when `power` is not finite or is negative. The caster is recorded as the cause of this explosion.

### `mxt:spawn_lightning` {#mxt-spawn-lightning}

Strikes a coloured lightning bolt at the acting position plus an offset; what the bolt does afterwards is up to the vanilla bolt's own behaviour — colour aside, it **is the vanilla lightning bolt**: damage, ignition, lightning-rod charging, copper oxidation, thunder, the sky flash, and the villager-to-witch, pig-to-zombified-piglin and charging-creeper conversions all work as usual.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `offset_x` | Number provider | `0` | The X offset from the acting position. |
| `offset_y` | Number provider | `0` | The Y offset from the acting position. |
| `offset_z` | Number provider | `0` | The Z offset from the acting position. |
| `color` | Colour | `0x737380` | The bolt colour, written as `#RRGGBB` (an integer or an `[r,g,b]` float array is accepted too); always treated as opaque. |
| `alpha` | Float | `0.3` | The glow strength, `0`–`1`. |
| `thickness` | Float | `1` | The strand thickness, `0.1`–`4`. |
| `palette` | RGB colour array | `[]` | A gradient of at most `16` entries. |
| `damage` | Number provider | `5` | The lightning damage, matching vanilla. |
| `visual_only` | Boolean | `false` | When `true`, the bolt is decorative only: it strikes but settles no damage and sets nothing on fire. |
| `cause` | Boolean | `true` | Attributes it to the player. |

```json
{ "type": "mxt:spawn_lightning", "color": "#8A2BE2", "damage": 8 }
```

Inside a tribulation timeline those fields go under that beat's `action`:

```json
{
  "timeline": [
    {
      "type": "mxt:action",
      "action": {
        "type": "mxt:spawn_lightning",
        "palette": ["#7A5CFF", "#66CCFF"],
        "alpha": 0.45,
        "thickness": 1.6,
        "damage": 12
      }
    },
    { "type": "mxt:idle", "duration": 20 }
  ]
}
```

It needs no fields at all: the bolt lands on the acting position itself, since the offsets default to `0`.

`cause` attributes the bolt to the player, who then becomes the source of the damage it deals, and it can trigger the vanilla `channeled_lightning` advancement; for `cause` to take effect the acting entity itself has to be a player.

All four number fields (the three offsets and `damage`) must evaluate to finite values, otherwise no bolt is struck. A `damage` that evaluates negative is treated as `0`.

It is an `EntityAction`, so a tribulation timeline, the success and failure behaviours, per-entity formation behaviours, abilities, contracts and secret realms — any `EntityAction` slot — can use it.

To strike a bolt directly without touching a data pack, use `/mxt lightning` (top-level alias `/lightning`); its arguments match the table above one to one (a gradient is written `palette 7A5CFF,66CCFF` in the command, without `#`). See [Commands](../../../player-guide/commands.md).

:::info Colours and Gradients
`color` accepts the same form as an aura colour (`#RRGGBB`; an integer or an `[r,g,b]` float array is accepted too), and its default is the vanilla cold white (rounded to 8 bits per channel); `alpha` is `0..1`, and `thickness` is `0.1..4`.

`alpha` is **brightness**, not opacity: vanilla lightning uses additive blending, and the vertex colour's `RGB × alpha` is its glow strength, so turning it up gives a harsher bolt and turning it down a dimmer one.

`palette` **replaces** the single `color` with a gradient: it is a group of RGB colours written the same way as `color`, the first at the top of the strand and the last at the ground, at most 16 entries. Rendering takes a colour per segment from the bolt column's nine horizontal seams, interpolating linearly between adjacent entries (one entry = flat colour, two = a gradient between the ends, more = several gradient segments); the four overlay layers and the two forks read the same set of seams, so a fork matches the trunk at the height where it leaves. `alpha` is still one glow value shared by the whole bolt rather than one per colour.

An illegal colour or a list longer than 16 fails at **decode time** instead of being dropped silently: a typo in a gradient should be visible.
:::

### `reincarnation:add_lifespan` {#reincarnation-add-lifespan}

Raises both the target's remaining lifespan and the total granted in this life. Requires the optional Reincarnation mod.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | Number provider | **required** | Non-negative amount to grant, in ticks. |

```json
{ "type": "reincarnation:add_lifespan", "amount": 2400 }
```

Constants and formulas are checked when the action runs; a non-finite or negative result does nothing. Valid results are rounded with `Math.round`. An amount of `0` leaves the ledger unchanged and never opens one for an unaccounted target. Non-living targets are ignored.

**Writes still work while the lifespan master switch is off**; that switch controls natural ageing. See [Lifespan](../../../player-guide/lifespan.md).

### `reincarnation:remove_lifespan` {#reincarnation-remove-lifespan}

Spends the target's remaining lifespan, clamped to `0`, without reducing the total granted in this life. Requires the optional Reincarnation mod.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | Number provider | **required** | Non-negative amount to spend, in ticks. |

```json
{ "type": "reincarnation:remove_lifespan", "amount": 1200 }
```

Validation, rounding, zero amounts and non-living targets follow the same rules as the grant action. Removal also works while the lifespan master switch is off.

### `mxt:modify_pill_toxicity` {#mxt-modify-pill-toxicity}

Rewrites the pill toxicity accumulated on the target.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | String | `add` | `add` or `set`. |
| `amount` | Number provider | **required** | The amount. |

```json
{ "type": "mxt:modify_pill_toxicity", "mode": "add", "amount": -30 }
```

This is the **only** write in a data pack that puts numbers of your own choosing into the toxicity ledger. A negative `add` is how a pack clears toxicity, and the value never goes below `0`; a hard-coded constant under `set` must be non-negative or loading reports an error. A non-living target is a silent no-op, and a non-finite evaluated amount does nothing.

Toxicity is normally accumulated by the consumption rules of [pill](../../json/pill.md); **Server Config → Alchemy → Natural toxicity decay per second** defaults to `0`, which means it never fades on its own.

### `reincarnation:unlimited_lifespan` {#reincarnation-unlimited-lifespan}

Closes the ledger until an explicit grant reopens it. No fields.

```json
{"type":"reincarnation:unlimited_lifespan"}
```

### `reincarnation:reincarnate` {#reincarnation-reincarnate}

Queues rebirth. `mode` defaults to configured; new_life archives and replaces a player, reset keeps its entity and life number. Non-player beings always reset in place. `reason` is an optional chat component.

```json
{"type":"reincarnation:reincarnate","mode":"new_life","reason":{"text":"Rebirth pill"}}
```

### `mxt:cultivate` {#mxt-cultivate}

Makes the target **start cultivating**.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action?` | Method id | Let the pick decide | Names one [`cultivation`](../../json/cultivation.md); with none written the applicable method of the highest `priority` is picked. |

```json
{ "type": "mxt:cultivate" }
{ "type": "mxt:cultivate", "action": "example:azure_meditation" }
```

This is the **same start path** the player's own cultivation key uses: a named method still has to pass its own `start_condition` and `cultivate_condition` ("does this tick yield anything"; `tick_condition` answers "does the session carry on" and takes no part in the pick), and when nothing applies, nothing happens.

**There is no return value, so every failure is silent**: already cultivating, still on cooldown, or conditions unmet all just mean "it did not start". To say something, branch in the data pack with `mxt:if_else` and [`mxt:cultivating`](../condition/entity_condition_types.md).

Server side only; a non-living target is a silent no-op. Together with the player's key this is the only way to start a body cultivating.

### `mxt:stop_cultivating` {#mxt-stop-cultivating}

Makes the target **stop the method it is running**, writing that method's own `cooldown`.

No fields; the whole action is written as `{"type": "mxt:stop_cultivating"}`.

It is the same path the player's own key uses to stop (including returning a floating item, clearing breakthrough listeners and lifting the movement restriction). A target that is not cultivating is a silent no-op; server side only, and living entities only.

:::info Nested Values
`mxt:if_else` takes an [entity condition](../condition/entity_condition_types.md); `mxt:passenger_action` and `mxt:riding_action` take an entity action, a [bi-entity action](./bientity_action_types.md) and a [bi-entity condition](../condition/bientity_condition_types.md); `mxt:explode` filters protected blocks with a [block condition](../condition/block_condition_types.md).
:::

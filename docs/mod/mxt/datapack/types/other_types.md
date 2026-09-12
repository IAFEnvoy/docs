---
title: "Other Type Families"
description: "The smaller built-in type registries of MiXianTu, with the registered IDs and JSON fields of every family."
sidebar_position: 7
---

# Other Type Families

These built-in registries share the same rules as actions and conditions: a datapack selects an existing entry through a `type` field but can never add one. Where a family has no JSON fields, the type ID alone is the whole entry.

---

## `trigger_type`

Trigger matchers decide which runtime events an ability or a breakthrough condition reacts to. Each built-in trigger is a fieldless matcher; the registry entry itself supplies the signal identifier it compares against.

| `type` | Description |
|--------|-------------|
| `mxt:tick` | A periodic entity tick |
| `mxt:attack` | The entity attacked another entity |
| `mxt:hurt` | The entity took damage |
| `mxt:kill` | The entity killed another entity |
| `mxt:block_break` | The entity broke a block |
| `mxt:block_use` | The entity used a block |
| `mxt:item_use` | The entity finished using an item |
| `mxt:equip` | The entity's equipment changed |
| `mxt:death` | The entity died |
| `mxt:breakthrough` | The entity completed a breakthrough |
| `mxt:js` | A matcher a server script decides |

```json
{"type": "mxt:triggered", "triggers": [{"type": "mxt:item_use"}]}
```

None of the built-in triggers has additional fields.

`mxt:js`:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `signal` | Identifier | **required** | The signal this matcher listens to; subscriptions are indexed by it |
| `id` | String | **required** | Callback ID registered with `MxtTriggers.matcher(...)` |
| `params` | Object | `{}` | Arbitrary JSON passed to the callback |

```json
{"type": "mxt:triggered", "triggers": [{"type": "mxt:js", "signal": "example:pill_taken", "id": "example:on_pill"}]}
```

This is the only way a data pack can react to a **custom** signal id: raise it from a server script with `MxtTriggers.publish`, and either subscribe a script to it or declare this trigger on an ability or on a resource's breakthrough conditions. The callback only decides whether the signal that reached the subscription fires, so a missing callback never matches. See the [KubeJS API Reference](../../kubejs/api-reference.md).

---

## `cost_type`

A cost can be checked and then consumed from a player.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:resource` | `resource`, `amount` | Consumes a datapack resource from the player's resource attachment |
| `mxt:item` | `items`, `amount` | Consumes matching items from the player's inventory |
| `mxt:js` | `id`, `params?` | Checked and paid by a server script callback |

`mxt:resource`:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `resource` | `Holder<resource>` | **required** | The resource to consume |
| `amount` | `NumberProvider` | **required** | Amount to consume; must evaluate to a finite positive number |

`mxt:item`:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `ItemMatcher` | **required** | Which items may be consumed; see [ItemMatcher](./shared_data_types.md#itemmatcher) |
| `amount` | `NumberProvider` | **required** | Number of matching items to consume, rounded up; a non-positive or non-finite result means the cost cannot be paid |

```json
{"type": "mxt:item", "items": "#minecraft:logs", "amount": 8}
```

`mxt:js`:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | String | **required** | Callback ID registered with `MxtCosts.register(...)` |
| `params` | Object | `{}` | Arbitrary JSON passed to the callback |

```json
{"type": "mxt:js", "id": "example:quest_token", "params": {"count": 3}}
```

A script cost is checked and then paid on the server, and it needs a player: a cost that is not a `resource` cost makes the whole ability require one. The callback receives the payer and the params, not the ability's formula context, because `Cost` is evaluated with a player alone.

A `costs` array also accepts the plain `{"id": ..., "amount": ...}` shorthand, which is read as `mxt:resource`. The shorthand is kept for compatibility; new entries should write the type explicitly.

---

## `badge_type`

Badges are reserved display metadata. They load and validate, but no compendium, selection screen or gameplay object consumes them yet.

| `type` | Fields | Default | Description |
|--------|--------|---------|-------------|
| `mxt:empty` | none | - | Empty placeholder badge |
| `mxt:sprite` | `sprite` | **required** | Shows a texture only |
| `mxt:tooltip` | `sprite`, `text` | `text` is an empty text | A texture with a hover tooltip |
| `mxt:keybind` | `sprite`, `text`, `key` | `text=""`, `key="key.mxt.primary_active"` | Records a client key mapping |
| `mxt:crafting_recipe` | `sprite`, `recipe`, `from_power`, `prefix`, `suffix` | `from_power=false` | Reserved recipe hint metadata |

```json
{
  "type": "mxt:tooltip",
  "sprite": "mxt:textures/gui/badge/info.png",
  "text": "badge.example.info"
}
```

---

## `ability_type`

The nested `ability` object of an ability definition uses this registry. The ID is written as `ability.type`.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:empty` | none | No lifecycle of its own |
| `mxt:active` | `slot` | Fired explicitly from a hotbar slot |
| `mxt:triggered` | `triggers`, `chance` | Fired when one of its triggers matches |
| `mxt:modifier` | `query_tags` | Passive modifier ability addressed through query tags |
| `mxt:aura` | `interval`, `radius` | Repeats around the actor on an interval |
| `mxt:channelled` | `tick_interval`, `upkeep_costs` | Runs once on activation and then once per interval while its upkeep is paid |
| `mxt:composite` | `abilities`, `all_required` | Delegates to child abilities rather than acting itself |
| `mxt:word` | `effect`, `requires_operator`, `amount` | Terminal, code-whitelisted word effect |

| `type` | Field | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `mxt:active` | `slot` | String | `primary` | Hotbar slot name; must not be blank |
| `mxt:triggered` | `triggers` | List of `Trigger` | `[]` | Trigger matchers that fire this ability |
| `mxt:triggered` | `chance` | `NumberProvider` | `1` | Chance that a matching trigger actually fires |
| `mxt:modifier` | `query_tags` | List of `Identifier` | `[]` | Tags used to query this modifier ability |
| `mxt:aura` | `interval` | `NumberProvider` | `20` | Ticks between aura applications |
| `mxt:aura` | `radius` | `NumberProvider` | `4` | Aura radius |
| `mxt:channelled` | `tick_interval` | `NumberProvider` | `1` | Ticks between upkeep payments |
| `mxt:channelled` | `upkeep_costs` | List of `ResourceCost` | `[]` | Resources paid on every upkeep tick |
| `mxt:composite` | `abilities` | List of `Holder<ability>` | **required** | Child abilities; invalid optional entries are ignored |
| `mxt:composite` | `all_required` | Boolean | `true` | When `false`, only the first child runs |
| `mxt:word` | `effect` | Enum | **required** | `self_heal` or `purge_self_curses` |
| `mxt:word` | `requires_operator` | Boolean | `true` | Whether the actor must be an operator |
| `mxt:word` | `amount` | `NumberProvider` | `0` | Magnitude passed to the word effect |

`mxt:empty` has no fields. `mxt:word` is a terminal payload that never executes target behaviour, and datapacks cannot supply an arbitrary command string for it.

```json
{
  "ability": {
    "type": "mxt:channelled",
    "tick_interval": 20,
    "upkeep_costs": [{"id": "example:qi", "amount": 1}]
  }
}
```

---

## `ability_component_type`

Components add cooldown, charge, toggle, timer and targeting state to an ability.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:empty` | none | No state component |
| `mxt:cooldown` | `ticks` | Adds a plain cooldown |
| `mxt:charges` | `maximum`, `recharge_ticks` | Adds limited charges that recharge over time |
| `mxt:toggle` | `default` | Adds an on/off state |
| `mxt:timer` | `duration` | Adds a running duration |
| `mxt:resource` | `resource` | Ties the component state to a resource |
| `mxt:target_lock` | `range` | Locks onto a target within a range |

| `type` | Field | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `mxt:cooldown` | `ticks` | `NumberProvider` | **required** | Cooldown length in ticks |
| `mxt:charges` | `maximum` | `NumberProvider` | **required** | Maximum number of charges |
| `mxt:charges` | `recharge_ticks` | `NumberProvider` | **required** | Ticks needed to regain one charge |
| `mxt:toggle` | `default` | Boolean | `false` | Initial toggle state |
| `mxt:timer` | `duration` | `NumberProvider` | **required** | Timer length in ticks |
| `mxt:resource` | `resource` | `Holder<resource>` | **required** | The resource backing this component |
| `mxt:target_lock` | `range` | `NumberProvider` | **required** | Maximum lock-on range |

```json
{"type": "mxt:charges", "maximum": 3, "recharge_ticks": "100 - level * 5"}
```

---

## `ability_target_selector_type`

Selects which entities an ability's bi-entity behaviour applies to.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:self` | none | Selects only the ability actor |
| `mxt:area` | `radius`, `include_actor` | Selects entities in an actor-centred area |
| `mxt:js` | `id`, `params?` | Selects the entities a server script returns |

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `radius` | `NumberProvider` | **required** | Area radius, capped at `128`; a negative or non-finite value selects nothing |
| `include_actor` | Boolean | `false` | Whether the actor is included in the selection |

```json
{"type": "mxt:area", "radius": 6, "include_actor": true}
```

`mxt:js` takes an `id` registered with `MxtAbilities.selector(...)` and an optional `params` object:

```json
{"type": "mxt:js", "id": "example:nearest_three", "params": {"range": 12}}
```

The callback runs on the server while the ability executes and returns an array of entities. Selection happens for every execution of the ability, so a missing callback selects nobody and logs a warning.

---

## `curse_type`

The `type` of a curse definition selects its lifecycle policy. All four types are fieldless; the duration itself comes from the `duration_ticks` field of the curse definition.

| `type` | Description |
|--------|-------------|
| `mxt:timed` | Expires after the configured duration; the duration must be positive |
| `mxt:permanent` | Never expires |
| `mxt:triggered` | Application and removal are driven by the owning event bridge; a non-positive duration means no expiry |
| `mxt:empty` | No lifecycle at all |

```json
{"type": "mxt:timed", "duration_ticks": 600}
```

---

## `resource_bar_context`

A context extracts the value, minimum, maximum and last-changed tick for a bar, and decides its layout and display name. Unlike the other families, a context is selected by **ID string**, not by a `type` object, and it is written into the `context` field of an inline resource bar. Contexts have no JSON fields and can only be extended from Java or KubeJS.

| ID | Description |
|----|-------------|
| `mxt:self_hud` | Self HUD layout; reads the resource stored on the entity |
| `mxt:target_overlay` | Target overlay layout; reads the resource stored on the entity |
| `mxt:boss_overlay` | Boss overlay layout; reads the resource stored on the entity |
| `mxt:environment_concentration` | Self HUD layout; reads the environmental aura template only, on the client |
| `mxt:actual_concentration` | Self HUD layout; reads the fully resolved concentration, on the client |

```json
{
  "bars": [
    {
      "context": "mxt:self_hud",
      "anchor": "left",
      "renderer": {"type": "mxt:boss_bar", "bar_index": 1}
    }
  ]
}
```

The concentration contexts report no values until the client has received aura data, and they are named after the resource, so `resource.example.qi=Spirit Qi` is displayed as environmental or actual aura concentration for that resource.

---

## `resource_bar_render_data_type`

The `renderer` field of a resource bar selects one of these draw modes. Unless a mode overrides the size, the default footprint is 71x8.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:boss_bar` | `sprite_location`, `bar_index`, `icon_index`, `inverted` | Origins-style 71x8 bar with an icon |
| `mxt:textured_bar` | `background_sprite`, `fill_sprite`, `width`, `height`, `fill_color`, `show_value` | Two independent textures |
| `mxt:segmented_bar` | `segments`, `gap`, `full_color`, `empty_color` | Discrete segments |
| `mxt:radial_bar` | `radius`, `thickness`, `start_angle`, `end_angle`, `fill_color` | Radial bar |
| `mxt:text_only` | `format`, `color`, `show_maximum` | Text only |
| `mxt:missing` | none | Placeholder render data with no visuals |

| `type` | Field | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `mxt:boss_bar` | `sprite_location` | Identifier | `mxt:textures/gui/resource_bar.png` | Sprite sheet |
| `mxt:boss_bar` | `bar_index` | Integer | `0` | Bar index in the sheet, `0..24` |
| `mxt:boss_bar` | `icon_index` | Integer | `bar_index` | Icon index in the sheet, `0..24` |
| `mxt:boss_bar` | `inverted` | Boolean | `false` | Reverses the fill direction |
| `mxt:textured_bar` | `background_sprite` | Identifier | **required** | Background texture |
| `mxt:textured_bar` | `fill_sprite` | Identifier | **required** | Fill texture |
| `mxt:textured_bar` | `width` | Integer | **required** | Width, `1..1024` |
| `mxt:textured_bar` | `height` | Integer | **required** | Height, `1..1024` |
| `mxt:textured_bar` | `fill_color` | RGB color | `#FFFFFF` | Fill tint |
| `mxt:textured_bar` | `show_value` | Boolean | `false` | Whether the numeric value is drawn |
| `mxt:segmented_bar` | `segments` | Integer | **required** | Number of segments, `1..256` |
| `mxt:segmented_bar` | `gap` | Integer | `1` | Gap between segments, `0..32` |
| `mxt:segmented_bar` | `full_color` | RGB color | `#FFFFFF` | Color of a filled segment |
| `mxt:segmented_bar` | `empty_color` | RGB color | `#555555` | Color of an empty segment |
| `mxt:radial_bar` | `radius` | Integer | **required** | Radius, `1..512` |
| `mxt:radial_bar` | `thickness` | Integer | **required** | Thickness, `1..128` |
| `mxt:radial_bar` | `start_angle` | Double | `0` | Start angle in degrees |
| `mxt:radial_bar` | `end_angle` | Double | `360` | End angle in degrees |
| `mxt:radial_bar` | `fill_color` | RGB color | `#FFFFFF` | Fill tint |
| `mxt:text_only` | `format` | String | `%current%` | Text format |
| `mxt:text_only` | `color` | RGB color | `#FFFFFF` | Text color |
| `mxt:text_only` | `show_maximum` | Boolean | `false` | Whether the maximum is shown next to the value |

A segmented bar is `segments * 8 + (segments - 1) * gap` pixels wide, and a radial bar occupies `radius * 2 + thickness` pixels in both directions. Colors accept `#RRGGBB` or an integer from `0` to `16777215`. Rendering runs on the client and only ever displays server-synchronized resource values.

```json
{"type": "mxt:segmented_bar", "segments": 10, "gap": 2, "full_color": "#66CCFF"}
```

---

## `resource_bar_visibility_type`

Visibility is a pure display policy: it decides whether a bar is drawn and never affects resource accounting.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:always` | none | Always visible |
| `mxt:non_full` | none | Visible while the current value is below the maximum |
| `mxt:non_zero` | none | Visible while `maximum - minimum` is positive, and hidden when the difference is zero or negative |
| `mxt:recently_changed` | `hold_ticks` | Visible for a while after the value last changed |
| `mxt:resource_range` | `min`, `max` | Visible while the current value is inside a range |
| `mxt:and` | `values` | Visible when every nested visibility is visible |
| `mxt:or` | `values` | Visible when any nested visibility is visible |
| `mxt:not` | `value` | Inverts a nested visibility |

| `type` | Field | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `mxt:recently_changed` | `hold_ticks` | Long | `60` | Ticks to keep the bar visible after a change; must be non-negative |
| `mxt:resource_range` | `min` | Double | **required** | Inclusive lower bound; must be finite |
| `mxt:resource_range` | `max` | Double | **required** | Inclusive upper bound; must be finite and not below `min` |
| `mxt:and` | `values` | List of `ResourceBarVisibility` | **required** | The nested visibilities |
| `mxt:or` | `values` | List of `ResourceBarVisibility` | **required** | The nested visibilities |
| `mxt:not` | `value` | `ResourceBarVisibility` | **required** | The nested visibility to invert |

```json
{
  "type": "mxt:and",
  "values": [
    {"type": "mxt:non_full"},
    {"type": "mxt:resource_range", "min": 1, "max": 50}
  ]
}
```

---

## `resource_value_provider_type`

A resource value provider resolves one number for a resource, usually for a resource bar or for script evaluation.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:current` | none | The value stored on the entity |
| `mxt:max` | none | The `max` of the resource definition |
| `mxt:regen` | none | The `regen` of the resource definition |
| `mxt:missing` | none | The amount missing to the maximum, never below `0` |
| `mxt:environment_concentration` | none | The environmental template concentration at the position, excluding chunk storage and block or formation contributions |
| `mxt:actual_concentration` | none | The final resolved concentration at the position, including every active source |
| `mxt:constant` | `value` | A fixed `NumberProvider` |
| `mxt:js` | `id`, `params` | A KubeJS resource value callback |

| `type` | Field | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `mxt:constant` | `value` | `NumberProvider` | **required** | The value to resolve |
| `mxt:js` | `id` | String | **required** | Callback ID registered with `MxtValues.resourceValue(...)` |
| `mxt:js` | `params` | Object | `{}` | Arbitrary JSON passed to the callback |

The two concentration providers read world state and therefore need the owning entity; called without one they resolve to `0`. A missing `mxt:js` callback logs a warning and resolves to `0`.

```json
{"type": "mxt:constant", "value": "level * 10"}
```

---

## `aura_maximum_type`

This registry resolves the environmental storage limit of one aura chunk. Block contributions and formation bonuses are applied separately at runtime.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:fixed` | `value` | A fixed maximum |
| `mxt:initial_multiplier` | `multiplier` | The initial aura of the chunk multiplied by a factor |
| `mxt:unlimited` | none | No upper limit |

| `type` | Field | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `mxt:fixed` | `value` | Double | **required** | Fixed maximum, `0` or greater |
| `mxt:initial_multiplier` | `multiplier` | Double | `1` | Factor applied to the non-negative initial aura |

A bare non-negative number is shorthand for `{"type": "mxt:fixed", "value": ...}`. Omitting the field entirely on the owning definition means the maximum equals the initial environmental aura of the chunk.

```json
{"type": "mxt:initial_multiplier", "multiplier": 2}
```

---

## `item_matcher_entry_type`

These entries make up an [ItemMatcher](./shared_data_types.md#itemmatcher). An item ID and an item tag also have shorthand forms that omit `type`.

| `type` | Fields | Description |
|--------|--------|-------------|
| `mxt:item` | `item` | Matches one exact item |
| `mxt:tag` | `tag` | Matches every item in an item tag |
| `mxt:wildcard` | `pattern` | Matches item IDs with `*` and `?` wildcards |
| `mxt:regex` | `pattern` | Matches item IDs with a regular expression |

| `type` | Field | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `mxt:item` | `item` | Identifier | **required** | Item registry ID; the shorthand form is the bare ID string |
| `mxt:tag` | `tag` | Item tag ID | **required** | Tag reference; the shorthand form is the `#`-prefixed string |
| `mxt:wildcard` | `pattern` | String | **required** | `*` matches any run of characters and `?` matches one character; must not be empty |
| `mxt:regex` | `pattern` | String | **required** | A full regular expression matched against the item ID; must not be empty |

Wildcard and regex entries are matched against the item ID, such as `minecraft:apple`, not against display names.

```json
"items": [
  "minecraft:apple",
  {"type": "mxt:wildcard", "pattern": "minecraft:*_sword"},
  {"type": "mxt:regex", "pattern": "othermod:(ruby|jade)_gem"}
]
```

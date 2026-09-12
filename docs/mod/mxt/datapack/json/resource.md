---
title: "Resource (resource)"
description: "Defines an entity resource such as cultivation progress, spirit power or stamina, together with its inline resource bars."
---

# Resource (resource)

A `resource` defines a numeric entity resource that can be gained, consumed, converted or displayed, such as cultivation progress, spirit power or stamina.

## File Location

Resource files go in `data/<namespace>/mxt/resource/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/resource/qi.json` has the ID `example:qi`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `default_value` | `NumberProvider` | **required** | The current value when the attachment is first created. |
| `min` | `NumberProvider` | `0` | Lower bound of the resource. |
| `max` | `NumberProvider` | **required** | Dynamic upper bound; realm and absorbed aura variables may be used. |
| `regen` | `NumberProvider` | `0` | Natural regeneration per tick. |
| `burst_amount` | `NumberProvider` | `0` | When greater than `0` the resource can be consumed by the Fire Spirit Power keybind and is used as the value of each spirit power ray. Each datapack should configure only one default spirit power resource with this value greater than `0`. |
| `icon` | `HotbarIcon` | none | Optional hotbar icon for the spirit power entries; it must define exactly one of `texture` (a 16x16 GUI texture) or `item`. |
| `particle_color` | `RGBColor` | `#FFFFFF` | Particle colour used by spirit power rays. May be written as `#RRGGBB` or as an integer in `0..16777215`. |
| `aura_type` | `Holder<element>` | none | The element marker of this resource. It is used for aura type checks and shown next to the resource name, for example by `/mxt aura query`. |
| `cultivation_to_resource` | Object | `multiplier=1,max_per_tick=1` | Draws resource recovery from the cultivation progress counter. |
| `resource_to_cultivation` | Object | `multiplier=1,max_per_tick=1` | Converts the resource back into cultivation progress, only while in cultivation mode. |
| `bars` | `List<ResourceBar>` | `[]` | Inline resource bars; when empty, the resource is not displayed. |
| `first_realm` | `Holder<realm_stage>` | none | The first realm of the realm chain this resource belongs to; it is only used to determine the target realm of a mortal's first breakthrough. |
| `start_exp` | `NumberProvider` | `0` | The cultivation progress required for a mortal's first breakthrough, and at the same time the cultivation progress cap of the mortal stage; once reached it no longer increases and only a breakthrough can be attempted. |
| `start_cultivate_conditions` | `CultivateConditions` | empty object | Resource-level conditions checked when a mortal starts cultivating and before the first breakthrough; useful for conflict or identity restrictions. All resources that have a first realm must be satisfied before cultivation can start. |
| `use_condition` | `EntityCondition` | `mxt:always_true` | Controls whether the entity can actively consume the resource and decides whether the resource bars are shown; it does not affect cultivation, environmental absorption, natural regeneration or breakthrough. |
| `show_cultivation_info` | Boolean | `true` | Whether the character information panel shows the realm and cultivation progress of this resource. |

A `CultivateConditions` object contains `conditions`, optional `triggers` and an optional `action`. Starting cultivation and the breakthrough entry point check `conditions` immediately (all of them must be satisfied); only after the breakthrough stage is reached does the current resource register runtime subscriptions from `triggers` and attempt a breakthrough once a matching event fires. Subscriptions are never serialised directly: they are rebuilt from the cultivation state after a save is loaded or the data tables are loaded.

`cultivation_to_resource` and `resource_to_cultivation` use the following two fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `multiplier` | `NumberProvider` | `1` | Multiplier that converts the source value into the target value. |
| `max_per_tick` | `NumberProvider` | `1` | Maximum source value consumed per tick; the limit applies to the source, not the target. |

### bars

`bars` is an inline array of `resource`, not a separate datapack registry.

`context` uses IDs from the built-in `mxt:resource_bar_context` registry. A context object extracts the current value, the minimum, the maximum and the time of the last change from the entity or the client state, and generates the display name from the resource ID that was passed in. Aura concentration contexts are split into `mxt:environment_concentration` (environment only) and `mxt:actual_concentration` (all sources); for example, when the language key of `example:qi` reads aura, the two contexts display environment aura concentration and actual aura concentration respectively. Built-in contexts also include `mxt:self_hud`, `mxt:target_overlay` and `mxt:boss_overlay`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `context` | `ResourceBarContext` | `mxt:self_hud` | Context built-in registry; extracts values, generates names and decides the layout. |
| `anchor` | `left` / `right` | **required** | Left or right column of the self HUD. |
| `order` | Integer | `0` | Within the same column, a smaller value is closer to the vanilla hotbar. |
| `visibility` | `ResourceBarVisibility` | `mxt:always` | Whether the bar is shown. |
| `renderer` | `ResourceBarRenderer` | **required** | How the bar is drawn. |
| `value_display` | `none` / `current` / `current_and_maximum` / `percentage` | `none` | How the numeric text is displayed. |
| `maximum` | Positive Double | context maximum | Overrides only the display maximum of the bar; it does not change the server or context values. |

Built-in renderers include `mxt:boss_bar`, `mxt:textured_bar`, `mxt:segmented_bar`, `mxt:radial_bar` and `mxt:text_only`. `mxt:boss_bar` accepts `sprite_location`, `bar_index`, `icon_index` and `inverted`, and uses `mxt:textures/gui/resource_bar.png` by default. Rendering is hooked in through the NeoForge GUI Layer; bars only appear in the left or right column and never occupy the centre of the screen.

Renderer parameters:

| `type` | Fields | Default | Description |
|--------|--------|---------|-------------|
| `mxt:boss_bar` | `sprite_location`, `bar_index`, `icon_index`, `inverted` | see above | Origins-style 71x8 bar and icon. |
| `mxt:textured_bar` | `background_sprite`, `fill_sprite`, `width`, `height`, `fill_color`, `show_value` | `fill_color=#ffffff,show_value=false` | Uses two separate textures. Width and height range from `1` to `1024`. |
| `mxt:segmented_bar` | `segments`, `gap`, `full_color`, `empty_color` | `gap=1,full_color=#ffffff,empty_color=#555555` | Segmented bar; `segments` ranges from `1` to `256`. |
| `mxt:radial_bar` | `radius`, `thickness`, `start_angle`, `end_angle`, `fill_color` | `start_angle=0,end_angle=360,fill_color=#ffffff` | Radial bar. |
| `mxt:text_only` | `format`, `color`, `show_maximum` | `%current%,#ffffff,false` | Text only; the format supports `%current%`. |

Visibility types: `mxt:always`, `mxt:non_full`, `mxt:non_zero`, `mxt:recently_changed` (`hold_ticks` defaults to `60`), `mxt:resource_range` (requires `min` and `max`), `mxt:and`, `mxt:or` and `mxt:not`. `mxt:non_zero` is shown only while `maximum - minimum > 0`; when the difference is zero or negative the bar is hidden.

## Example

Formulas in this table can use the resource and cultivation variables of this resource (`realm`, `realm_rank`, `level`, `absorbed_aura`, `cultivation_progress`) on top of the entity variables; the full list is in [Formula Variables](../types/formula_variables.md).

```json
{
  "default_value": 0,
  "max": "100 + realm_rank * 20 + absorbed_aura * 0.1",
  "regen": 0.25,
  "burst_amount": 10,
  "particle_color": "#66CCFF",
  "cultivation_to_resource": {"multiplier": 1, "max_per_tick": 2},
  "resource_to_cultivation": {"multiplier": 0.5, "max_per_tick": 1},
  "bars": [
    {
      "context": "mxt:self_hud",
      "anchor": "left",
      "order": 0,
      "renderer": {"type": "mxt:boss_bar", "bar_index": 1}
    }
  ],
  "first_realm": "example:foundation",
  "start_exp": 100,
  "use_condition": {
    "type": "mxt:has_realm",
    "resource": "example:qi"
  },
  "show_cultivation_info": true
}
```

:::info Server-authoritative
Cultivation absorption by default only restores the resource that belongs to the current realm, and reverse conversion is allowed only while in the cultivation state. `max` and `regen` are evaluated on the server; the client takes no part in the settlement.
:::

:::info Aura concentration providers
The resource value providers `mxt:environment_concentration` and `mxt:actual_concentration` are computed on the server and synced to the client. The first returns only the environment template concentration, the second returns the final concentration including chunk stock, block and formation sources.
:::

:::note Display Names
Data-driven definitions no longer fill in a `translation_key`. Display names are generated automatically from the definition identifier through the vanilla `Identifier.toLanguageKey`, for example `example:qi` corresponds to `resource.example.qi` in the `resource` category; `/` in the path becomes `.`. Datapack authors only need to provide that key in their language file.
:::

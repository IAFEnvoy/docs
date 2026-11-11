---
title: "Common Data Types"
sidebar_position: 1
---

## Resource IDs and references

Resource IDs use `namespace:path`, for example `example:mana`. When you reference dynamic registry entries such as abilities or resources, the corresponding definition must already exist. Behaviour objects such as actions, conditions and costs are dispatched by `type`, and their types are registered by Java; a data pack cannot declare a new Java type out of nowhere.

## Number providers

Fields that require a NumberProvider support three forms: a constant number, a formula string, and a number object with a `type`. Formulas are parsed by exp4j, and variables are supplied by the execution context; they are not JavaScript. Do not assume that any player field can be used directly as a formula variable.

```json
{
  "amount": 10
}
```

```json
{
  "amount": "2 + 3"
}
```

```json
{
  "amount": {
    "type": "saturn:uniform",
    "min": 1,
    "max": 5
  }
}
```

See [Number providers](../types/number.md) for the full types. Time parameters follow the description of their field; fields marked as ticks mean 20 ticks per second at the normal 20 TPS.

## Actions and conditions

An action field of the same kind accepts either a single object with a `type` or an array expressing sequential actions; a condition field of the same kind accepts either an object or an array meaning that all conditions must hold. Do not mix entity actions, block actions and item actions.

```json
[
  {
    "type": "saturn:heal",
    "amount": 2
  },
  {
    "type": "saturn:extinguish"
  }
]
```

The common fields for numeric comparison are `comparison` and `compare_to`, flattened into the condition object that uses them:

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `comparison` | String | yes | — | `<`, `<=`, `>`, `>=`, `==`, `!=`. |
| `compare_to` | Number | yes | — | The value on the right-hand side. |

## Text components

For standard Minecraft text components, prefer writing `{"text":"text"}` or `{"translate":"example.key"}` explicitly. Some Saturn fields use TRANSLATABLE_COMPONENT, in which case a bare string means a translation key; for standard Component fields, a bare string means literal text. Each page notes the difference.

## Items and icons

Item stack templates use the vanilla ItemStackTemplate: `id`, an optional `count` (default 1) and `components`. The template is read when data loads, and the stack is created only when it is used. `IconReference` accepts either a texture ID string or an item stack template object; **a bare item ID string is treated as a texture ID**, so use an object for item icons.

```json
{
  "icon": {
    "id": "minecraft:diamond",
    "count": 1
  }
}
```

## Weighted entries

Weighted actions and number distributions use the following entry structure. The selection probability is this entry's weight divided by the total weight, and the type of `value` is determined by the enclosing field.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `value` | Value specified by the enclosing field | yes | — | For example an action or a number provider. |
| `weight` | Integer | no | `1` | Negative numbers are treated as 0; the specific total-weight fallback is decided by the type that uses it. |

```json
{
  "type": "saturn:choice",
  "actions": [
    {
      "value": {
        "type": "saturn:heal",
        "amount": 2
      },
      "weight": 3
    },
    {
      "value": {
        "type": "saturn:extinguish"
      },
      "weight": 1
    }
  ]
}
```

When the total weight of an action is 0, one entry is chosen uniformly from the non-empty list; the `weighted_list` number provider returns 0 when its total weight is non-positive. System lottery pools use positive integer weights under their own rules instead.

## Attribute modifiers

Each entry of `modifiers` in the ability `modifier` uses the following structure, with the vanilla modifier fields flattened alongside `attribute` and `value`.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `attribute` | Attribute ID | yes | — | For example minecraft:max_health. |
| `id` | Resource ID | yes | — | Stable identifier of the modifier. |
| `amount` | Number | yes | — | Vanilla modifier amount. |
| `operation` | String | yes | — | add_value, add_multiplied_base, add_multiplied_total. |
| `value` | Number provider | no | omitted | When present, replaces amount at runtime. |

```json
{
  "attribute": "minecraft:max_health",
  "id": "example:bonus_health",
  "amount": 4,
  "operation": "add_value"
}
```

## Tags

Tags for dynamic registries go in `data/<namespace>/tags/<registry namespace>/<registry path>/<path>.json`. Only fields documented as supporting tags accept `#example:group`; ordinary Holder or resource ID fields do not expand tags automatically.

```json title="data/example/tags/saturn/resource/magic.json"
{
  "replace": false,
  "values": [
    "example:mana"
  ]
}
```

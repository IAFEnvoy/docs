---
title: Triggers (trigger_type)
description: Every built-in entry, field, default and decision rule of the saturn:trigger_type trigger matchers.
---

# Triggers (trigger_type)

<span id="triggers-trigger-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/trigger.md).
:::

Trigger matchers decide which runtime events an ability, a breakthrough condition and an event rule respond to. A built-in signal matcher hard-codes one signal id per entry and, at dispatch, answers whether the signal that arrived is that one; `mxt:js` is the exception, since its signal comes from the definition itself. `type` is written on the trigger object and takes one of the ids listed below, always in the `mxt` namespace. The whole family is dispatched by the built-in `saturn:trigger_type` registry: a data pack picks an entry, it never adds one.

A trigger object is written under the `trigger` field of an [event rule](../../../../../library/saturn/data/trigger.md); an ability and a breakthrough condition write a list of triggers in a `triggers` array:

```json
{"type": "mxt:triggered", "triggers": [{"type": "mxt:item_use"}]}
```

Apart from `mxt:js`, none of these matchers takes a field: the whole entry is that one `{"type": ...}` layer.

### `mxt:breakthrough` {#mxt-breakthrough}

The entity completed a breakthrough.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | Takes no fields. |

```json
{"type": "mxt:breakthrough"}
```

### `mxt:progression_level` {#mxt-progression-level}

An owner reached a new progression level. Published after the advancement has been committed, so a reactor reads the new level.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | Takes no fields. |

```json
{"type": "mxt:progression_level"}
```

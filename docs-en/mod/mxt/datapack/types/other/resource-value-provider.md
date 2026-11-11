---
title: Resource Value Providers (resource_value_provider_type)
description: The eight sources of the resource_value_provider_type family, their fields, defaults and boundaries.
---

# Resource Value Providers (resource_value_provider_type)

<span id="resource-value-providers-resource-value-provider-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/resource-value.md).
:::

A value provider resolves one number for a value: the current value, the defined maximum, the regeneration speed, how far it is from the maximum, and the two aura concentrations. It is not written in a resource bar — scripts evaluate it: hand the object to `MxtValues.evaluateResource(entity, resource, definition)`, and register the callback of `mxt:js` with `MxtValues.resourceValue(id, callback)`, see the [KubeJS API reference](../../../kubejs/api/values.md).

This family is registered by the mod, so its `type` ids are fixed: a data pack picks one and cannot add a new one. Only Java code or the KubeJS bridge can introduce a custom one.

### `mxt:regen` {#mxt-regen}

The `regen` of that value's aura definition, that is the natural regeneration per tick.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

```json
{"type": "mxt:regen"}
```

### `mxt:environment_concentration` {#mxt-environment-concentration}

The environmental template concentration at the position, excluding chunk storage and block or formation contributions.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

```json
{"type": "mxt:environment_concentration"}
```

### `mxt:actual_concentration` {#mxt-actual-concentration}

The concentration finally resolved at the position, including every effective source.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| — | — | — | No fields. |

```json
{"type": "mxt:actual_concentration"}
```

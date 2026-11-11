---
title: "Cost"
sidebar_position: 11
---

# Cost

A cost definition can be used by abilities, the System shop and the lottery. Preparing and trialing do not charge; the actual payment is submitted by the caller; see [Costs and Payment](../guides/costs.md).

### `saturn:item` {#saturnitem}

Selects payable inventory items by item matcher entry and consumes the amount.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item` |
| `items` | Array of [item matcher entries](./item-matcher.md) | yes | — | Item matcher entries, item predicates or an item list. |
| `amount` | [Number provider](./number.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:item",
  "items": [
    "minecraft:emerald"
  ],
  "amount": 2
}
```

</details>

### `saturn:resource` {#saturnresource}

Deducts the given amount of a Saturn resource.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource` |
| `resource` | Resource ID | yes | — | A registered Saturn resource ID. |
| `amount` | [Number provider](./number.md) | yes | — | Amount or value; a number provider may be a number, a formula string or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:resource",
  "resource": "example:mana",
  "amount": 10
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:js` {#saturnjs}

Calls a callback registered by KubeJS and passes the params argument.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:js` |
| `id` | String | yes | — | Identifier of the callback, option or entry. |
| `params` | Object | no | `{}` | Parameter object passed to the script or formula. |

Registered only when KubeJS is installed. JSON only selects an existing callback; it never executes a JavaScript string inside the JSON directly.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

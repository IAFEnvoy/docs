---
title: "Script callback"
sidebar_position: 10
---

`saturn:js`

Calls a callback registered by KubeJS and passes the params argument.

Operates on the item stack and its holder from the context. It is not an item definition file; embed it in a field that requires an ItemAction.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:js` |
| `id` | String | yes | — | Identifier of the callback, option or entry. |
| `params` | Object | no | `{}` | Parameter object passed to the script or formula. |

Registered only when KubeJS is installed. JSON only selects an existing callback; it never executes a JavaScript string inside the JSON directly.

## JSON example

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`com.iafenvoy.saturn.compat.kubejs.type.action.JsItemAction`. This page is based on the Codec in the current 26.1.2 source.

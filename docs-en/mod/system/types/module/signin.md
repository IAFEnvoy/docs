---
title: "Daily sign-in"
sidebar_position: 10
---

`system:signin`

Provides sign-in, reward selection and reward crediting.

This type is written into the `server` object of a module definition, with `type` selecting the implementation. A system's `modules` reference module configuration IDs and cannot hold implementation type objects directly. For the common structure see [Module definition](../../data/module.md).

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `system:signin` |
| `rewards` | ID, #tag or mixed array | no | omitted | Optional sign-in reward IDs, #tags or a mixed array. |

Omitting the field adds no catalog restriction here; an explicit empty array means there are no selectable entries. The built-in module configurations use `#system:default` of their respective catalogs. The selectable entries of all enabled configurations of the same kind are unioned, and permissions are checked again before charging and claiming.

## JSON example

```json
{
  "type": "system:signin",
  "rewards": "#system:default"
}
```

This example is the `server` value of a module definition; the complete file can also set `client` and `order`.

## Java entry point

`com.iafenvoy.system.module.builtin.SignInSystemModule`. This page is based on the Codec in the current 26.1.2 source.

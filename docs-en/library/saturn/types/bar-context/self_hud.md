---
title: "Self HUD"
sidebar_position: 10
---

`saturn:self_hud`

Shows the current player's own resources.

ResourceBar.context uses a string ID rather than an object with a type. Whether the context is actually drawn still depends on the host interface.

## JSON fields

This type uses a string ID directly and has no extra JSON fields.

## JSON example

```json
"saturn:self_hud"
```

This is a value to embed in the corresponding field, not a standalone loadable data pack file. The `example:` references in the examples must be replaced with defined entries.

## Java entry point

`SaturnResourceBarContexts`. This page is based on the Codec in the current 26.1.2 source.

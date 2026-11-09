---
sidebar_position: 8
title: editor.yml
description: Prefill options for the mod editor — licenses, architectures, and tags
---

# editor.yml

Provides dropdown prefill options for the **Mod Meta Editor** (`/mod-editor.html`). Every option list can be **selected from the dropdown or typed manually** — the values below are suggestions, not a whitelist.

The file is read on every `/api/config` request, so editing it takes effect after a page refresh — no server restart required.

## Full Example

```yaml
# Prefill options for the mod editor
license_options:
  - MIT
  - LGPL-3.0
  - All Rights Reserved

architecture_options:
  - Fabric-Loom
  - Architectury-Loom
  - ModDevGradle
  - Stonecutter

tag_options:
  - Library
  - Addon
  - KubeJS
  - Adventure and RPG
```

## Fields

| Field | Type | Used by |
|-------|------|---------|
| `license_options` | string[] | License — single-select suggestion list |
| `architecture_options` | string[] | Architecture — multi-select; picked values become chips with an `×` to remove |
| `tag_options` | string[] | Tags — multi-select; picked values become chips with an `×` to remove |

Multi-select fields support free typing too — press **Enter** or `,` to add a custom value as a chip. The dropdown filters as you type and hides values already chosen.

:::tip Suggested default
The checked-in defaults are generated from the mods already present in the database, plus common Minecraft modding tags. Extend them freely — every option list also accepts arbitrary custom input.
:::

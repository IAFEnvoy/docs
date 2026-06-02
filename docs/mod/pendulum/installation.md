---
sidebar_position: 1
---

# Installation

## Version Support

| Minecraft | Fabric | Forge | NeoForge | Status          |
|-----------|--------|-------|----------|-----------------|
| 1.20.1    | ✅      | ✅     |          | Fully Supported |
| 1.21.1    | ✅      | ❌     | ✅        | Fully Supported |
| 26.1.2    | 🔨     | ❌     | 🔨       | In development  |

## Install the Mod

1. Download the Pendulum `.jar` file for your Minecraft version
2. Drop it in `.minecraft/mods/` (dependencies `Rhino` and `Jupiter` are bundled)
3. Launch the game

## Optional: Baritone

`Baritone` adds automated pathfinding, mining, farming, and schematic building.

:::tip
`Baritone` provide powerful tools for navigation and automation. Agents will prefer to use `Baritone` if available.
:::

- Install [Baritone](https://github.com/cabaletta/baritone/releases)
- Drop it in `mods/` alongside Pendulum
- If Baritone is present, the `baritone` / `br` global object is automatically available
- If absent, all `br.*` calls will produce an error message

## Verify

Type in chat:

```
/pendulum status
```

Expected output: `Idle — no script running.`

```
/pendulum help
```

Should display the full API overview.

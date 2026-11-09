---
title: Server Configuration
description: "Server configuration entries, defaults, limits and scope."
---

# Server Configuration

<span id="server-configuration" />

This page collects the **server configuration** entries: they are grouped into tabs, and they take effect as soon as they are changed — the server reads the current value every time instead of caching it. **None of them is a command**, and only **Server Config → Tab → Entry** is written here, never a config file path or a raw key.

For Client Config → World Effects → Scene Depth Enhancement, see [Light Beam](./light-beam.md#scene-depth-enhancement).

## Talisman {#talisman}

The ten entries the talisman workstation uses, plus the cooldown that governs firing one by hand. The clock is always **the game tick when the server receives a packet**; a timestamp or an amount a client reports is never read.

| Entry | Default | What it governs |
| --- | --- | --- |
| **Server Config → Talisman → Minimum Stroke Interval** | `300` (ms) | The least time between two strokes, and between "the drawing opened" and the first stroke; `0` disables it. A stroke below it is **refused**. It stops hundreds of strokes arriving at once, but **not** a script that traces at a human pace. |
| **Server Config → Talisman → Rejected Strokes Allowed** | `3` | Reject more strokes than this in one drawing and the session fails, consuming the materials. Only "too fast" and "not enough pigment" count; "the brush is no longer on the cursor" does not. |
| **Server Config → Talisman → Points Per Stroke** | `512` | The point cap of one stroke; a stroke over it is refused. |
| **Server Config → Talisman → Points Per Drawing** | `4096` | The accumulated point cap of one drawing; a submission over it is refused whole with a warning. |
| **Server Config → Talisman → Strokes Per Drawing** | `64` | The stroke cap of one drawing, same as above. |
| **Server Config → Talisman → Brush Capacity** | `4000` | How much pigment one brush holds, in pixels of stroke length. A 90×210 talisman usually sums to 400–1200 pixels, so the default traces about 3–5 of them. |
| **Server Config → Talisman → Pigment Per Portion** | `1000` | How much pigment one item from the `#mxt:brush_pigment` tag (cinnabar by default) feeds into a brush. |
| **Server Config → Talisman → Pigment Rate** | `1.0` | Pigment per pixel of stroke length. |
| **Server Config → Talisman → Pigment Per Stroke Floor** | `1` | The least one stroke costs, so a tap is never free. |
| **Server Config → Talisman → Pigment Per Stroke Cap** | `0` | The most one stroke may take; `0` means no cap. |
| **Server Config → Talisman → Use Cooldown** | `20` (ticks) | The item cooldown after firing a talisman by hand; `0` disables it. It is counted per item and covers every talisman the player holds, and a hand pour is refused while it runs. |

**The scoring parameters are not settings**: `pattern.tolerance` and `judgement` are written with the talisman recipe in its JSON, see [Talisman Scoring](../technical/talisman-scoring.md) and [talisman_drawing (the talisman recipe)](../datapack/json/talisman_drawing.md).

## Alchemy {#alchemy}

| Entry | Default | What it governs |
| --- | --- | --- |
| **Server Config → Alchemy → Natural toxicity decay per second** | `0` | How much toxicity a body that already has some loses per second, a finite non-negative number. `0` means it never fades on its own; a positive value subtracts once per 20 accumulated active entity ticks. Nothing decays while offline, and a body that never took a pill gains no attachment. |

## Souls {#souls}

| Entry | Default | What it governs |
| --- | --- | --- |
| **Server Config → Souls → Create souls on death** | on | Capture snapshots and create souls when creatures or players die. Disabling this does not affect command creation. |
| **Server Config → Souls → Soul lifetime** | `6000` (game ticks) | About 5 minutes at 20 TPS; `0` keeps souls permanently, range 0–2147483647. Time passes while chunks are unloaded; expiry is checked in the entity tick. Changes affect existing souls. See [Souls](./soul.md). |

## Debug {#debug}

| Entry | Default | What it governs |
| --- | --- | --- |
| **Server Config → Debug → Debug Mode** | off | Opens the doors kept for reproducing something: trading with yourself, formula failures logged with the whole stack trace, the information panel reporting entries it cannot fit, and the internal trace log printed line by line. Development environments force it on. |

## Command Aliases {#command-aliases}

Every entry on the **Command Aliases** tab is one top-level alias command - the entry shows the command itself - and all of them are on by default. Turning one off removes only its top-level spelling; the `/mxt` entries stay complete. See [Commands](./commands.md) for the list.


## Rifts {#rifts}

| Entry | Default | What it governs |
| --- | --- | --- |
| **Server Config → Portals → Maximum portals per dimension** | `1024` | Maximum portals per dimension (1–4096). |
| **Server Config → Portals → Maximum portals per section** | `32` | Maximum overlapping portal bounds per section (1–128). |
| **Server Config → Portals → Maximum vertices per portal** | `128` | Maximum vertices per portal (3–128). |
| **Server Config → Portals → Player portal limit** | `8` | Owned portals in loaded dimensions allowed for token summons (1–128); administrator commands bypass this limit. |

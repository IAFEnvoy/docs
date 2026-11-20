---
title: Drawing Server Configuration
---

Talisman Workstations requires Jupiter. Its independent server configuration entry is **Talisman Workstations**. Reading and editing server configuration require operator permission. The addon owns the following eight settings.

| Entry | Default | What it governs |
| --- | --- | --- |
| **Server Config → Talisman → Minimum Stroke Interval** | `300` (ms) | The least time between two strokes, and between "the drawing opened" and the first stroke; `0` disables it. A stroke below it is **refused**. It stops hundreds of strokes arriving at once, but **not** a script that traces at a human pace. |
| **Server Config → Talisman → Rejected Strokes Allowed** | `3` | Reject more strokes than this in one drawing and the session fails, consuming the materials. Only "too fast" and "not enough pigment" count; "the brush is no longer on the cursor" does not. |
| **Server Config → Talisman → Points Per Stroke** | `512` | The point cap of one stroke; a stroke over it is refused. |
| **Server Config → Talisman → Points Per Drawing** | `4096` | The accumulated point cap of one drawing; a submission over it is refused whole with a warning. |
| **Server Config → Talisman → Strokes Per Drawing** | `64` | The stroke cap of one drawing, same as above. |
| **Server Config → Talisman → Pigment Rate** | `1.0` | Pigment per pixel of stroke length. |
| **Server Config → Talisman → Pigment Per Stroke Floor** | `1` | The least one stroke costs, so a tap is never free. |
| **Server Config → Talisman → Pigment Per Stroke Cap** | `0` | The most one stroke may take; `0` means no cap. |

Timing uses the server game tick at packet receipt. Scoring parameters belong to the drawing recipe.

Talisman use cooldown, brush capacity and pigment per portion govern shared items. They remain in the [MiXianTu server configuration](../../player-guide/config.md#talisman) and also apply without this addon installed.

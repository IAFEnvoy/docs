---
title: Talisman Stroke Editor
description: Edit pattern.strokes and validate load-time geometry constraints.
hide_table_of_contents: true
---

import MxtToolFrame from '@site/src/components/MxtToolFrame';

# Talisman Stroke Editor

<span id="talisman-stroke-editor" />

`pattern.strokes` is a list of strokes, each containing points normalised to `[0,1]²` on the fixed `90 × 210` canvas. The editor uses the same ratio and default paper and stroke colours, `#FFFE85` and `#FF0000`, as the workstation.

<div className="mxt-tool-open"><a href="/en/docs/mod/mxt/addons/talisman/tools/talisman-strokes-full" target="_blank" rel="noopener">Open the editor in a new window</a></div>

<MxtToolFrame tool="talisman-strokes" host="mxt-tool-talisman" />

## Drawing Controls {#how-to-draw}

- **Polyline**: click to add vertices. Press `Enter`, right-click or double-click to finish a stroke; press `Esc` to cancel it.
- **Freehand**: hold and drag to draw. On release, Ramer-Douglas-Peucker simplification uses the toolbar ε to remove redundant points.
- `Ctrl+Z` / `Ctrl+Y` undo or redo. The list supports deleting individual strokes, and `Clear` empties the canvas.
- `Snap to whole pixels` aligns coordinates with whole pixels; `Grid` displays grid lines; `Stroke order` displays stroke starts and numbers, matching `pattern.show_order: true` in game.
- `Load from JSON` accepts a stroke array or a complete `pattern` object.
- `Zoom` changes only the display scale; the canvas remains `90 × 210`. `Decimals` specifies the decimal places in exported coordinates.

## Validation and Readouts {#what-it-reports}

- **Stroke order and pigment**: the list reports each stroke's pixel length, approximately one pigment unit per pixel under the default settings.
- **Geometry validation**: the loader rejects strokes with fewer than 2 points, more than `256` strokes, more than `4096` points per stroke, or entirely coincident points. The editor reports these constraints before export.

Scoring normalises translation and scale but preserves rotation. Overall position and size therefore do not affect the score, while orientation does. Resampling uses a `2`-pixel step, and simplification uses `0.5 × tolerance` (`6.3` pixels at the default `0.06`), removing finer detail.

## Export Format {#what-it-writes}

```json
[
  [[0.5, 0.05], [0.5, 0.95]],
  [[0.1, 0.5], [0.9, 0.5]]
]
```

Use the exported array as `pattern.strokes`. The editor generates geometry only; configure `pattern.tolerance`, `pattern.guide`, `pattern.show_order`, `talisman`, `result` and grade thresholds in the recipe.

## Next {#next}

- [talisman_drawing](../datapack/talisman_drawing.md) — every field of the recipe, `pattern` and the grades included.
- [Author a Talisman Drawing](../tutorial/author-a-talisman-drawing.md) — the whole flow starting from one drawing.
- [Talisman Scoring](../technical/talisman-scoring.md) — how the score resamples, normalises and weights.

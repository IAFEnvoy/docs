---
title: Formation Figure Editor
description: Edit circles and polylines and export a mxt:formation_shape definition.
hide_table_of_contents: true
---

import MxtToolFrame from '@site/src/components/MxtToolFrame';

# Formation Figure Editor

<span id="formation-figure-editor" />

A formation's `mxt:particle` module references a separate `mxt:formation_shape` definition through `shape`. The client uses it to generate particles. Save the definition as `data/<namespace>/mxt/formation_shape/<name>.json`.

The editor creates the definition's `strokes`; `Copy JSON` exports the complete `{"strokes": [...]}` object. Coordinates are expressed in units of the formation radius, with `1` on the outer ring, allowing the figure to scale with each formation. The canvas uses a top-down view: `+X` points right (east), `+Z` down (south), and north is up. Axis endpoints display their direction and coordinate.

<div className="mxt-tool-open"><a href="/en/docs/mod/mxt/tools/formation-figure-full" target="_blank" rel="noopener">Open the editor in a new window</a></div>

<MxtToolFrame tool="formation-figure" host="mxt-tool-formation" />

## Drawing Controls {#how-to-draw}

- **Polyline**: click to add vertices. Press `Enter`, right-click or double-click to finish a stroke; press `Esc` to cancel it.
- **Circle**: press to set the centre and drag to set the radius. The centre may be placed anywhere, with a snap target at the formation centre. Drag the centre or start point afterwards to adjust position, radius and orientation.
- **Editing**: drag vertices to adjust geometry. In the list, `⇄` reverses the stroke and its growth direction, while `✕` deletes it. `Ctrl+Z` / `Ctrl+Y` undo or redo.
- **Snapping**: supports the `0.05` grid, outer ring (`r = 1`) and N equal circle divisions. Division rays originate at the formation centre, starting east at ray 0 with `360/N` degrees between rays. Ring and division snapping take precedence over the grid to avoid rounding a vertex twice.
- **Generators**: `Star N/K` creates a &#123;N/K&#125; star with one stroke per closed cycle. `5/2`, `6/2` and `8/2` correspond to `mxt:five`, `mxt:six` (two triangles) and `mxt:eight` (two squares); `K = 1` creates a regular N-gon. `N-gon` creates one closed polyline, and `Rays` creates `N` ray strokes. All generator operations support undo.
- **Colour**: every stroke requires `color`, specified as a hexadecimal colour or a list of `{"at": …, "color": …}` gradient stops. `at` increases along the stroke from start to end; endpoint colours extend beyond the stop range. New strokes use the `new strokes` colour. Click the selected stroke's gradient strip below the toolbar to add a stop, drag markers to reposition them, or use `+ stop` / `− stop` to add or remove stops.
- **Growth interval**: `start` / `end` specify the stroke's interval within the overall progress and must satisfy `start < end`. For example, `start: 0.5` begins drawing halfway through the animation. Separate intervals produce sequential growth. The inputs constrain each other to prevent invalid intervals.
- **Particle spacing and size**: each stroke has its own `spacing` (in blocks) and `size`, defaulting to `0.33` and `2`. Default values are omitted from the exported definition.

## Calculation and Preview {#what-it-computes}

- **Point count**: each stroke requires `ceil(stroke length in blocks / spacing) + 1` points, with length converted using the preview `radius`. The readout represents the points requested for one client frame. Each stroke is capped at `2048` points; excess points are truncated from its end and reported by the tool.
- **Growth progress**: each stroke maps progress to its own interval, so strokes sharing an interval grow together. The slider controls overall progress; `Play` uses `duration_ticks` at 20 ticks per second.
- **Playback controls**: `speed`, `loop` and the clock affect only the preview. `1×` matches the game speed, and the clock displays `elapsed / duration_ticks`. `duration_ticks` belongs to the formation module and is not exported in the figure definition.
- **Line display**: `lines` draws to the current progress, advancing circles by angle and polylines by arc length. Disable `dust` to display only lines. Undrawn sections remain visible as grey outlines so the figure can be edited at any progress value.

## Export Format {#what-it-writes}

```json
{
  "strokes": [
    {"type": "mxt:circle", "radius": 1, "color": [{"at": 0, "color": "#80c0ff"}, {"at": 1, "color": "#ffffff"}]},
    {"type": "mxt:polyline", "points": [[1, 0], [-0.809, 0.588], [0.309, -0.951], [0.309, 0.951], [-0.809, -0.588], [1, 0]], "color": "#ffd76a"}
  ]
}
```

`type` must include its namespace. A bare `"circle"` resolves to `minecraft:circle` and fails definition loading. The editor accepts this shorthand on import and exports the completed `mxt:circle` ID.

The formation `radius` and preview switches are not exported; they are used only to calculate preview point counts and particle sizes.

## Related Documentation {#next}

- [formation_shape](../datapack/json/formation_shape.md): fields, stroke properties and geometry rules.
- [mxt:particle module](../datapack/types/other/formation-action.md): `shape` references and `duration_ticks` / `interval_ticks` configuration.
- [Define a Formation](../tutorial/define-a-formation.md): a complete formation example.

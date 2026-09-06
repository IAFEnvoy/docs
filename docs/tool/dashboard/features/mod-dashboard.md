---
sidebar_position: 1
title: Mod Dashboard
description: List view, scatter plot, detail cards, and the mod metadata editor
---

# Mod Dashboard

## Data Sources

The dashboard aggregates data from:

| Source | Content |
|--------|---------|
| CurseForge | Download counts |
| GitHub | Issues, Pull Requests |
| Codacy | Code complexity / maintenance difficulty (cached in `data/mods.db`) |

Mod **status**, **colors**, **loaders**, and version-support **emoji** come from `config/status_config.json` and `config/configuration.json`. There is no category grouping any more — filtering is done by **status** and free-text **search** only.

## List View

- **Search**: matches name, ID, description, and type tags
- **Status filter**: filter by maintenance status (order from `status_config.json`)
- **Sort**: by downloads, name, status order, or Issue+PR count

Each mod card shows, top to bottom:

1. Logo + name
2. Description — clamped to 2 lines; hover shows the full text
3. Chips row — version tag, maintenance status, **maintenance difficulty**, then all type tags. The row is clamped to 2 lines; overflow becomes an ellipsis and hovering the row shows the full chip list
4. Footer stats — CurseForge downloads and GitHub open Issues/PRs

Co-author is intentionally **not** shown on cards anymore — it appears in the detail card only.

## Scatter Plot View

X-axis: maintenance difficulty, Y-axis: popularity (log10 of total downloads).

- Hover a dot for details; click to open the detail card
- Status-colored legend, optional name labels toggle

## Detail Card

Opened by clicking a card or a scatter dot. Contains:

- Full description + status / difficulty / tag chips
- **MOD ID** and **CF ID** with copy buttons
- CurseForge / GitHub / Wiki links
- Co-author list (only shown here)
- Version support matrix — each row is a Minecraft version, each column a loader (Fabric / Forge / NeoForge…). Loader headers are colored via `colors.loader`, cells use the `icons.versions` emoji (✅ supported / ⚠️ partial / …)
- Issues / PRs tab (filterable, paginated), with 🚀 dispatch to the AI Agent

## Mod Meta Editor (Admin)

Reachable from **🛠 Admin → Edit Mods** or `/mod-editor.html`. Two independently scrolling panes fill the whole viewport: the left is the mod list, the right is the editor form.

- **Basic info**: ID (editable; the numeric primary key stays stable underneath), name, logo upload (stored in the database keyed by mod ID so it survives ID renames), status (dropdown, text colored by status), description — all required before saving
- **Platform & project**: GitHub repo, CurseForge ID, Wiki URL, Java package, license (dropdown or free text), architecture / tags / co-authors as multi-select chip fields with prefill from `config/editor.yml` (see [editor.yml](/docs/tool/dashboard/configuration/editor-yml))
- **Version support**: version rows × loader selects with emoji statuses; delete a row, or keep at least one blank row
- **Unsaved changes**: the active mod turns **italic** in the left list and switching mods asks for confirmation
- Save / error feedback appears as a centered green / red toast with a fade-out

Use the cache entries in the **🛠 Admin** menu (**Clear database cache**, etc.) to flush the database mapping cache or per-source HTTP caches after edits.

---
sidebar_position: 4
title: Badge API
description: Public SVG badges for mod READMEs — CurseForge / GitHub stats, loaders, license, docs and Discord
---

# Badge API

ModList Dashboard exposes a set of **public SVG badges** under `/api/badge/` that mod authors can embed in their GitHub READMEs, Modrinth descriptions, or their own site. No login is required, and every badge is rendered by the dashboard itself, so they match the dashboard's own visual language instead of looking like a third-party sticker.

A public instance is already running at **https://mods.iafenvoy.com**, so the badges can be used as-is — all examples below point at it.

## Endpoint Reference

`:slug` is always a **mod ID** from the dashboard's catalog (`data/mods.db`).

| Endpoint | Renders |
|----------|---------|
| `/api/badge/curseforge/downloads/:slug` | CurseForge download count |
| `/api/badge/github/downloads/:slug` | Total GitHub release asset downloads |
| `/api/badge/github/issues/:slug` | Issues by state — Open / Done / Closed (two lines) |
| `/api/badge/github/prs/:slug` | Pull requests by state — Open / Merged / Draft / Closed (two lines) |
| `/api/badge/license/:slug` | The mod's license |
| `/api/badge/powered-by/:slug` | The mod's own logo + name, for dependents to reference |
| `/api/badge/loader/fabric` · `/forge` · `/neoforge` | Loader support — "Available for" / loader name (two lines) |
| `/api/badge/docs/:slug` | Documentation link — "Read the" / "Documentation" (two lines) |
| `/api/badge/discord` | Discord invite badge |

### Click-through landing pages

An image cannot carry a link, so the clickable badges are paired with a minimal redirect page. Wrap the badge in an `<a>` and point it at the `link/` variant:

| Endpoint | Redirects to |
|----------|--------------|
| `/api/badge/link/powered-by/:slug` | The mod's primary project page — **CurseForge → GitHub → wiki**, first one available |
| `/api/badge/link/docs/:slug` | The mod's wiki URL (only if the mod has one) |
| `/api/badge/link/discord` | The Discord invite from `config/config.yml` → `badges.discord` |

## Embedding

The API root used below is the public instance at **`https://mods.iafenvoy.com`**. Swap in your own host if you run your own deployment.

### Markdown

```markdown
![CurseForge Downloads](https://mods.iafenvoy.com/api/badge/curseforge/downloads/my-mod)
![GitHub Downloads](https://mods.iafenvoy.com/api/badge/github/downloads/my-mod)
![License](https://mods.iafenvoy.com/api/badge/license/my-mod)
```

### With a link (HTML inside Markdown)

```html
<a href="https://mods.iafenvoy.com/api/badge/link/powered-by/my-mod">
  <img src="https://mods.iafenvoy.com/api/badge/powered-by/my-mod" alt="Powered by">
</a>
```

To keep the GitHub README layout tidy, an inline `height` on the `<img>` is usually enough:

```html
<img height="56" src="https://mods.iafenvoy.com/api/badge/loader/neoforge" alt="Available for NeoForge">
```

### Live examples

These are all rendered by the public instance, so you can open them directly to check the current output. Replace `iceandfire` with your own mod ID.

| Badge | Preview | Markdown |
|-------|---------|----------|
| CurseForge downloads | ![CurseForge Downloads](https://mods.iafenvoy.com/api/badge/curseforge/downloads/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/curseforge/downloads/iceandfire)` |
| GitHub downloads | ![GitHub Downloads](https://mods.iafenvoy.com/api/badge/github/downloads/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/github/downloads/iceandfire)` |
| Issues by state | ![Issues](https://mods.iafenvoy.com/api/badge/github/issues/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/github/issues/iceandfire)` |
| Pull requests by state | ![Pull Requests](https://mods.iafenvoy.com/api/badge/github/prs/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/github/prs/iceandfire)` |
| License | ![License](https://mods.iafenvoy.com/api/badge/license/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/license/iceandfire)` |
| Powered by | ![Powered by](https://mods.iafenvoy.com/api/badge/powered-by/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/powered-by/iceandfire)` |
| Documentation | ![Documentation](https://mods.iafenvoy.com/api/badge/docs/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/docs/iceandfire)` |

If a preview above shows `N/A`, that cache entry has not been built yet on the server — open the badge once or twice and it fills in.

### Loader badges

Fixed text, no slug — usable in any mod's README:

```html
<img height="56" src="https://mods.iafenvoy.com/api/badge/loader/fabric" alt="Available for Fabric">
<img height="56" src="https://mods.iafenvoy.com/api/badge/loader/forge" alt="Available for Forge">
<img height="56" src="https://mods.iafenvoy.com/api/badge/loader/neoforge" alt="Available for NeoForge">
```

### Discord

```markdown
[![Discord](https://mods.iafenvoy.com/api/badge/discord)](https://mods.iafenvoy.com/api/badge/link/discord)
```

### For dependents: "Powered by"

`/api/badge/powered-by/:slug` is meant for **other mods** that depend on this one: it shows *that mod's* logo and name, so the dependent mod's README can credit it properly. The badge embeds the logo as a `data:` URI, so it keeps working even when the original image host is down.

## Where the Data Comes From

Every data badge is served **from the dashboard's cache** — a badge request never blocks on the CurseForge or GitHub API:

| Badge | Cache |
|-------|-------|
| CurseForge downloads | `cache/curseforge/<cf-id>.json` |
| GitHub downloads | `cache/github/<owner>/<repo>/downloads.json` |
| GitHub issues / PRs | `cache/github/<owner>/<repo>/meta2.json` (= the same entry the dashboard's GitHub panel uses) |

Behavior worth knowing:

- **Unmatched slug → `404`.** If the slug does not match any mod ID in the catalog, the badge returns `404` *without reading or creating any cache entry*.
- **Stale-while-revalidate, per entry.** An expired entry is still served immediately (the number just is not fresh), and **only that single entry** is refreshed in the background. Requesting one badge never warms or invalidates other entries.
- **Placeholders.** Before a cache entry exists the badge renders its title with a value of `N/A`. `N/A` means "no cache entry yet", while `0` means "cached value is genuinely zero".
- **Counting.** Download counts use full digits with thousands separators — `8,757,284`, never `8.7M`.
- **A valid slug still needs a data source.** A mod with no CurseForge ID or GitHub repo cannot produce the corresponding badge; hits on such an entry are `404` as well.

The `issues` / `prs` badges break their counts down by state, using the same icons and colors as the dashboard's GitHub panel:

| Badge | States shown (left to right) |
|-------|------------------------------|
| Issues | Open · Done · Closed — `not planned` issues are folded into `Closed` |
| Pull requests | Open · Merged · Draft · Closed |

`not planned` and `Closed` share the same gray cross icon, so they are merged into a single number instead of being drawn twice. The raw breakdown is still kept in the cache payload (`not_planned_issues`, `closed_issues`).

## Requirements & Configuration

| Badge | Needs |
|-------|-------|
| CurseForge / GitHub badges | The matching API key or token in `config/auth.yml`, plus the mod having that platform ID |
| `/api/badge/docs/:slug` | A Wiki URL on the mod |
| `/api/badge/discord` | `badges.discord` in `config/config.yml` — **empty means `404`** |

```yaml
# config/config.yml
badges:
  discord: "https://discord.gg/xxxxxxxx"
```

Only `http` / `https` values are accepted for the Discord invite and wiki links; anything else (including `javascript:`) is rejected, so a badge can never be turned into a script link.

## HTTP Details

- `GET` / `HEAD` only — other methods get `405`.
- `Content-Type: image/svg+xml; charset=utf-8`.
- Responses carry `Cache-Control: no-cache` plus an `ETag`, so a browser revalidates on every page load (unchanged badges answer `304`, updated ones are picked up immediately). This matters when the badge rendering itself is upgraded.
- CORS is wide open, so the badges can be fetched from any page.

## Self-Hosting Notes

The examples use the public instance (`https://mods.iafenvoy.com`). If you run your own deployment, the badge URLs simply follow the base URL you expose (through Nginx, a tunnel, etc.) — that comes from `server.port` plus your reverse proxy. See [Installation](/docs/tool/dashboard/getting-started/installation) for the deployment walkthrough and [Configuration Overview](/docs/tool/dashboard/getting-started/configuration) for the config files.

The loader and documentation badges reuse the icon shapes and brand colors from [@intergrav/devins-badges](https://github.com/intergrav/devins-badges) (CC0-1.0); the layout and text are rendered by this project so the labels can wrap onto two lines and be localized.

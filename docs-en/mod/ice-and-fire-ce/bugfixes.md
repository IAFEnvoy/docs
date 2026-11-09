---
title: BugFixes
---

# BugFixes

## Mobs

- Fixed dragons lag when breathing.
- Expanded dragon type API.
- Fixed Gorgon breaking all armors.
- Fixed stone status related crashes.

### Multipart Rewrite

- Fixed multipart entities lag.
- Fixed multipart spamming logs.

## WorldGen

- Fixed Mausoleums blocks being able to be broken.

* ### Structure System Rewrite

	- Switch worldgen system to vanilla one.
	- Fixed dragon caves being cut.
	- Fixed conflicts with Distance Horizons.
	- Fixed conflicts with c2me.
	- Fixed crashing when at world border.

## Integration

- Added better integration for Jade and fixed information display issue for multipart entities.
- Added EMI support.

## Render

- Fixed dragon breath rendering too long if a dragon has breathed for a long time.
- Fixed armor sometimes rendering wrongly.
- Made title screen render more capable.

* ### Tabula Model Loader Rewrite

	- Fixed tabula models not loading correctly in specific environments(Such as Develop Mode).
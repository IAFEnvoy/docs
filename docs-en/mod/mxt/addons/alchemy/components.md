---
title: Furnace Components
---

| Component ID | Payload | Purpose |
| --- | --- | --- |
| `mxt_alchemy:alchemy_furnace` | `Holder<AlchemyFurnaceDefinition>` | Which **furnace specification** this furnace core was built to. One specification is shared by the one block item, which cannot say which tier applies, so the tier is read from this reference too. |
| `mxt_alchemy:alchemy_wall_material` | `Holder<AlchemyWallMaterial>` | Which **wall material** this block is, that is, its temperature rating. The furnace ceiling is the **lowest** of the 18 wall cells. |

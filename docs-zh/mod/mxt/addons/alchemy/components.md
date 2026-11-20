---
title: 丹炉组件
---

| 组件 ID | 载荷 | 作用 |
| --- | --- | --- |
| `mxt_alchemy:alchemy_furnace` | `Holder<AlchemyFurnaceDefinition>` | 这件丹炉核心是按**哪份炉型规格**造的。一类规格共用一件方块物品，物品本身说不清是哪一档，所以档也从这份引用读。 |
| `mxt_alchemy:alchemy_wall_material` | `Holder<AlchemyWallMaterial>` | 这块炉壁是哪种**炉壁材料**，即它的耐温等级。炉温上限取 18 块炉壁里的**最低**那个。 |

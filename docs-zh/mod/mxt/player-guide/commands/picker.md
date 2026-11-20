---
title: /picker
---

# `/picker`

<span id="picker" />

<div className="cmd-tree">

- `/picker [<category>]`

  打开物品选择器，列出所选分类对应的物品；`category` 是分类 ID（如 `mxt:aura`、`mxt:artifact`、`mxt:currency`、`mxt:item_binding`、`mxt:technique`），不填列出全部已登记分类。需要 gamemaster 权限，且只在创造模式下可用。

</div>

## 分类能列出什么 {#分类能列出什么}

`/picker` 由本模组内置的 **Picker** 提供。界面、搜索和物品获取行为由 Picker 负责，本页说明 MiXianTu 注册的分类内容。

`category` 为数据包注册表 ID。物品匹配表展开为所匹配的物品，其中 `currency` 使用 `item`，`item_aura`、`item_binding`、`default_quality` 等使用 `items`；`block_aura` 与 `heat_source` 展开 `blocks` 匹配的方块。`spirit_herb` 优先使用 `growth.drops` 声明的果实，未声明 `growth` 时回退到植物方块对应的物品。分类按注册顺序排列，前两项为 Picker 内置分类：

`minecraft:item`、`minecraft:block`、`mxt:item_aura`、`mxt:currency`、`mxt:spirit_herb`、`mxt:pill_binding`、`mxt:artifact`、`mxt:item_binding`、`mxt:weapon_binding`、`mxt_forging:tool_binding`、`mxt_forging:blueprint_binding`、`mxt:default_quality`、`mxt:block_aura`、`mxt:heat_source`、`mxt:pill`、`mxt:contract_type`、`mxt:secret_realm`、`mxt:formation`、`mxt:talisman`、`mxt:technique`、`mxt_alchemy:alchemy_furnace`、`mxt_alchemy:alchemy_wall_material`、`mxt:aura`、`mxt:spirit_root`、`mxt:physique`、`mxt:quality`。

`mxt:technique` 是分类，`mxt:technique_binding` **不是**：获取一行的是功法本身，那一行是本体为它生成的载体（这条功法定义里 `carrier_item` 指定的物品，不写就是功法书），并且**已经带好 `mxt:technique` 组件**。见[功法绑定](../../datapack/json/technique_binding.md#carrier)。

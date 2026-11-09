---
title: "龙骑士：重铸"
---

# 龙骑士：重铸

本节记录 Dragon Mounts: Reforged（龙骑士：重铸）使用的数据包定义。所有数据均通过 Minecraft 的 `Codec` 加载，因此字段名、默认值和对象结构与当前模组实现保持一致。

## 注册表

| 注册表 | 数据包目录 | 用途 |
| --- | --- | --- |
| `dragon_mounts:purebred_dragon_breed` | `data/<namespace>/purebred_dragon_breed/` | 定义已注册的纯种龙。 |
| `dragon_mounts:dragon_breath_type` | `data/<namespace>/dragon_breath_type/` | 定义龙息伤害、颜色和状态效果。 |
| `dragon_mounts:dragon_ability_type` | 无独立目录 | 通过品种 `abilities` 数组中的 `type` 字段选择内联能力。 |
| `dragon_mounts:habitat_type` | 无独立目录 | 通过品种 `habitats` 数组中的 `type` 字段选择内联栖息地条件。 |

纯种龙与龙息类型注册表由 NeoForge 自动同步到客户端。杂交龙不是数据包注册表条目：它们在运行时由两个纯种龙的注册表 Holder 创建。因此，数据包只应定义纯种龙。

import DocCardList from '@theme/DocCardList';

<DocCardList />

---
title: "数据定义"
sidebar_position: 0
---

这些对象是能独立加载的数据包条目。文件命名空间和相对路径组成 ID，JSON 通常不再写 `id`。

| 定义 | 注册表 | 文件目录 |
| --- | --- | --- |
| [资源](./resource.md) | `saturn:resource` | `data/<namespace>/saturn/resource/` |
| [技能](./ability.md) | `saturn:ability` | `data/<namespace>/saturn/ability/` |
| [触发规则](./trigger.md) | `saturn:trigger` | `data/<namespace>/saturn/trigger/` |
| [未完成物品标记](./incomplete.md) | `saturn:incomplete` | `data/<namespace>/saturn/incomplete/` |
| [信息行](./information-row.md) | `saturn:information_row` | `data/<namespace>/saturn/information_row/` |
| [信息分组](./information-group.md) | `saturn:information_group` | `data/<namespace>/saturn/information_group/` |

定义按原生动态注册表生命周期在世界加载时读取；修改后重开世界或重启服务端。字段中的动作、条件、公式、取值器等是[类型对象](../types/index.md)，不是这些目录下的独立类型文件。

共享的 [JSON 数据类型](./common.md) 包括文本组件、物品堆模板、图标、比较对象和标签。

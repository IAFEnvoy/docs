---
title: information_row（信息行）
description: 用表达式定义人物信息行的内容、提示、显示条件和重要程度。
---

# information_row（信息行）

<span id="information-row-信息行" />

文件路径为 `data/<命名空间>/saturn/information_row/<名称>.json`，例如 `data/example/saturn/information_row/realm.json`。

信息行读取已经采集的快照。`mxt:information` 提供修炼信息，其成员为 `realm`、`lifespan`、`cultivation_progress`、`spirit_roots`、`physiques`、`techniques`、`curses`；每项包含 `values` 组件数组、可选的 `tooltip` 和 `tone`。

```json
{
  "order": 0,
  "importance": 60,
  "label": { "translate": "info.mxt.realm" },
  "value": {
    "type": "saturn:list",
    "source": {
      "type": "saturn:getter",
      "getter": { "type": "mxt:information" },
      "path": ["realm", "values"]
    },
    "element": {
      "type": "saturn:text",
      "component": true,
      "value": { "type": "saturn:local" }
    }
  },
  "missing": "hide"
}
```

| 字段 | 默认值 | 含义 |
| --- | --- | --- |
| `label` | 必填 | 文本组件形式的行名 |
| `value` | 必填 | 内容表达式 |
| `order` | `0` | 组内排序，越小越靠前 |
| `importance` | `0` | 重要程度，越大越重要，与排序独立 |
| `enabled` | `true` | 是否启用此定义 |
| `label_expression` | 无 | 可覆盖行名的表达式 |
| `tooltip` | 无 | 固定提示组件 |
| `tooltip_expression` | 无 | 可覆盖提示的表达式 |
| `tone` | `normal` | `normal`、`positive` 或 `warning` |
| `visible` | 无 | 布尔显示条件；false、缺失或类型不符均隐藏 |
| `missing` | `show` | `show` 显示缺失原因，`hide` 隐藏整条内容缺失的行 |

`component: true` 保留文字组件的翻译键和样式。内置修为进度的绿色来自捕获的组件，诅咒行使用 `warning`。提示表达式可读取 `path: ["realm", "tooltip"]`，其余成员同理；提示不可用时保留固定提示。

内置 7 条修炼行的 ID 与上述成员对应，均属于 `mxt` 命名空间，顺序从 `0` 到 `60`，重要程度默认为 `0`。没有相关数据时隐藏：寿元取决于配置，灵根、体质、功法、诅咒取决于快照中是否有可展示内容。保存数据不推测当前突破条件或子境界。

行本身不指定分组。把行 ID 加入[信息分组](./information_group.md)引用的标签后，人物面板和 `/saturn information @s mxt:cultivation` 都会包含它。覆盖同 ID 文件会替换完整定义；改变定义后重新打开世界或重启服务端。

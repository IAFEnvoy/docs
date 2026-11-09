---
title: "玩家信息行"
sidebar_position: 7
---

文件：`data/<namespace>/saturn/information_row/<path>.json`。信息行是只读的显示配方，不是玩家快照或可执行指令。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | 标准文本组件 | 是 | — | 默认行标题。 |
| `value` | [信息表达式](../types/expression/index.md) | 是 | — | 主值。 |
| `order` | 整数 | 否 | `0` | 升序排序，随后按 ID 排序。 |
| `importance` | 整数 | 否 | `0` | 供界面按最低重要程度过滤。 |
| `enabled` | 布尔值 | 否 | `true` | 是否启用此行。 |
| `label_expression` | 信息表达式 | 否 | 省略 | 动态标题。 |
| `tooltip` | 标准文本组件 | 否 | 省略 | 默认悬浮说明。 |
| `tooltip_expression` | 信息表达式 | 否 | 省略 | 动态悬浮说明。 |
| `tone` | 字符串 | 否 | `"normal"` | `normal`、`positive`、`warning`。 |
| `visible` | 信息表达式 | 否 | 省略 | 可见性表达式。 |
| `missing` | 字符串 | 否 | `"show"` | 值缺失时 show 显示或 hide 隐藏。 |

## 示例

```json title="data/example/saturn/information_row/health.json"
{
  "label": {
    "translate": "info.example.health"
  },
  "order": 10,
  "importance": 80,
  "value": {
    "type": "saturn:meter",
    "value": {
      "type": "saturn:getter",
      "getter": {
        "type": "saturn:health"
      }
    },
    "min": 0,
    "max": {
      "type": "saturn:getter",
      "getter": {
        "type": "saturn:max_health"
      }
    }
  }
}
```

值可以是文字、数字、布尔、列表、表格、物品列表、仪表或复合结果。取值器读取 PlayerView 或采集快照，不是任意实时世界访问；缺失值和已知的 0、false、空集合不同。要展示该行，还应把它放入[信息分组](./information-group.md)。

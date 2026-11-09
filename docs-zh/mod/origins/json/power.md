---
sidebar_position: 3
---

# 能力 JSON 格式

能力（Power）是起源的核心功能单元，为玩家授予各种特性和效果。

## 文件位置 {#file-location}

能力 JSON 文件放在数据包内的 `data/<namespace>/origins/power/` 目录中。

例如，`data/origins/origins/power/climbing.json` 的 ID 为 `origins:climbing`。

## 通用字段 {#common-fields}

所有能力类型共享这些基础字段：

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `type` | Identifier | **必填** | 能力类型 ID，决定能力的功能 |
| `name` | Text Component | 可选 | 显示名称。省略时回退到翻译键 |
| `description` | Text Component | 可选 | 描述文本。省略时回退到翻译键 |
| `hidden` | Boolean | `false` | 是否在起源的能力列表中隐藏此能力 |
| `condition` | Entity Condition | 可选 | 能力生效必须满足的条件 |
| `loading_priority` | Integer | `0` | 加载优先级；数值越大加载越晚 |
| `badges` | List of Badge | `[]` | 能力名称旁显示的徽章。支持 ID 引用或内联定义 |

## 翻译键 {#translation-keys}

能力名称和描述默认使用语言键：

- 名称：`power.<namespace>.<path>.name`
- 描述：`power.<namespace>.<path>.description`

你也可以通过 `name`/`description` 字段直接指定它们。

## 徽章引用 {#badge-references}

`badges` 列表可以混用两种格式：

```json
// Reference existing Badge by ID
"badges": [
  "origins:toggle",
  "origins:active"
]

// Inline Badge definition
"badges": [
  {
    "type": "origins:tooltip",
    "sprite": "origins:textures/gui/badge/star.png",
    "text": "A gold star!"
  }
]
```

## 示例 {#examples}

一个基础的攀爬能力：

```json
{
  "type": "origins:climbing",
  "condition": {
    "type": "origins:power_active",
    "power": "origins:primary_key"
  },
  "badges": [
    "origins:toggle"
  ]
}
```

一个带 HUD 冷却显示的弹射能力：

```json
{
  "type": "origins:launch",
  "cooldown": 600,
  "hud_render": {
    "sprite_location": "origins:textures/gui/resource_bar.png",
    "bar_index": 4
  },
  "sound": "minecraft:entity.parrot.fly",
  "speed": 2,
  "key": {
    "key": "key.origins.primary_active",
    "continuous": true
  }
}
```

:::note
与旧版本的主要区别：
- `name`/`description` 现在是可选的组件类型（支持纯字符串简写）
- `badges` 同时支持 ID 引用和内联徽章定义
- 基础命名空间从 `apoli` 改为 `origins`
:::

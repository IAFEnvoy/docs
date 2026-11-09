---
sidebar_position: 4
---

# 徽章 JSON 格式

:::warning FIXME
本页需要更新以反映新的徽章系统，并补充更多示例。
:::

徽章会在 Origins GUI 中能力名称的旁边显示一个图标，以及可选的工具提示。

## 文件位置 {#file-location}

徽章 JSON 文件放在数据包内的 `data/<namespace>/origins/badge/` 目录中。

## 通用字段 {#common-fields}

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `type` | Identifier | **必填** | 徽章类型 ID |

## 徽章类型 {#badge-types}

### `origins:keybind` {#originskeybind}

显示一个按键提示徽章。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `sprite` | Identifier | **必填** | 徽章图标的贴图位置 |
| `text` | String | **必填** | 徽章工具提示的翻译键 |

### `origins:sprite` {#originssprite}

只显示一个图标徽章。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `sprite` | Identifier | **必填** | 徽章图标的贴图位置 |

### `origins:tooltip` {#originstooltip}

显示一个带工具提示文本的徽章。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `sprite` | Identifier | **必填** | 徽章图标的贴图位置 |
| `text` | Text Component | **必填** | 悬停时显示的工具提示文本 |

### `origins:crafting_recipe` {#originscrafting_recipe}

显示一个合成配方提示徽章。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `sprite` | Identifier | **必填** | 徽章图标的贴图位置 |
| `recipe` | Identifier | **必填** | 要关联的合成配方 ID |

## 预设徽章 {#preset-badges}

Origins 提供了两个内置预设徽章。在能力的 `badges` 列表中按 ID 引用它们：

| ID | 描述 |
|----|-------------|
| `origins:active` | 表示一个“主动使用”能力 |
| `origins:toggle` | 表示一个“开关”能力 |

## 示例 {#examples}

```json
{
  "type": "origins:tooltip",
  "sprite": "origins:textures/gui/badge/star.png",
  "text": "A gold star!"
}
```

```json
{
  "type": "origins:keybind",
  "sprite": "origins:textures/gui/badge/active.png",
  "text": "origins.gui.badge.active"
}
```

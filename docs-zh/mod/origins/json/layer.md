---
sidebar_position: 2
---

# 起源层 JSON 格式

起源层是一组起源的集合。玩家在每个已启用的起源层中选择一个起源。

## 文件位置 {#file-location}

起源层 JSON 文件放在数据包内的 `data/<namespace>/origins/layer/` 目录中。

例如，`data/origins/origins/layer/origin.json` 的 ID 是 `origins:origin`（这是默认起源层）。

## 字段 {#fields}

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `name` | [文本组件](./../types/minecraft_data_types#text-component) | 可选 | 起源层的显示名称。更推荐使用翻译键 `layer.<namespace>.<path>.name` |
| `order` | Integer | `Integer.MAX_VALUE` | 选择界面中的排序顺序；数字越小越靠前 |
| `origins` | `Identifier` / `#tag` / [条件起源](#conditioned-origins)对象的列表 | **必填** | 此起源层包含的起源。支持直接 ID、标签和条件起源 |
| `enabled` | Boolean | `true` | 此起源层是否启用 |
| `gui_title` | [GUI 标题](#gui-title) | 可选 | 选择界面/查看界面的自定义标题 |
| `allow_random` | Boolean | `false` | 是否显示“随机选择”选项 |
| `allow_random_unchoosable` | Boolean | `false` | 随机选择是否包含不可选择的起源 |
| `exclude_random` | Identifier 的列表 | `[]` | 从随机选择中排除的起源 ID |
| `default_origin` | Identifier | 可选 | :x: 尚未实现 |
| `auto_choose` | Boolean | `false` | 如果只有一个起源可用，是否自动选择它 |
| `hidden` | Boolean | `false` | 是否在“查看起源”界面中隐藏此起源层 |

:::warning
与 Fabric 版本不同——Fabric 版本在当前起源层没有分配起源时使用 `missing_name` 和 `missing_description` 来显示——Origins (NeoForge) 在起源层没有任何起源时会直接在查看起源界面中隐藏该起源层。
:::

### GUI 标题 {#gui-title}

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `choose_origin` | Text Component | 可选 | 覆盖选择起源时显示的标题文本 |
| `view_origin` | Text Component | 可选 | 覆盖查看起源时显示的标题文本 |

## 条件起源 {#conditioned-origins}

在 `origins` 列表中，你可以将字符串 ID 与条件起源对象混合使用：

```json
{
  "condition": {
    "type": "origins:and",
    "conditions": [...]
  },
  "origins": [
    "origins:special_origin"
  ]
}
```

条件起源的字段：

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `condition` | Entity Condition | 玩家必须满足的条件 |
| `origins` | Identifier 或 #Tag 的列表 | 条件满足时显示的起源 |

## 示例 {#examples}

```json
{
  "order": 0,
  "enabled": true,
  "origins": [
    "#origins:origin"
  ],
  "allow_random": true,
  "exclude_random": [
    "origins:human"
  ]
}
```

带条件起源的起源层：

```json
{
  "order": 1,
  "origins": [
    "origins:human",
    {
      "condition": {
        "type": "origins:origin",
        "origin": "origins:human"
      },
      "origins": [
        "origins:special_human_upgrade"
      ]
    }
  ]
}
```
:::caution
命令可以绕过这些条件并授予起源层中的任意起源，因此条件起源并不是一种安全的内容门槛。它们主要用于引导玩家做出某些选择，或营造更具动态性的选择体验。
:::

:::note
与旧版本的主要区别：
- 移除了 `replace` 字段（新的注册表系统会自动处理数据覆盖）
- 移除了 `missing_name` 和 `missing_description`
- 移除了 `loading_priority`
- `gui_title` 的子字段重命名为 `choose_origin` / `view_origin`
:::

---
sidebar_position: 1
---

# 起源 JSON 格式

起源（Origin）定义了一种可选择的起源，为玩家授予特殊能力。

## 文件位置 {#file-location}

起源 JSON 文件放在数据包内的 `data/<namespace>/origins/origin/` 目录中。

文件名与其 ID 相对应。例如，`data/origins/origins/origin/avian.json` 的 ID 为 `origins:avian`。

## 字段 {#fields}

import OriginFields from './field_table/_origin.mdx';

<OriginFields/>

## 示例 {#examples}

```json
{
  "powers": [
    "#origins:avian"
  ],
  "icon": {
    "id": "minecraft:feather"
  },
  "order": 0,
  "impact": 1
}
```

使用能力标签的 Avian 起源：

```json
{
  "powers": [
    "example:my_power",
    "#origins:common_powers"
  ],
  "icon": {
    "id": "minecraft:player_head"
  },
  "order": 5,
  "impact": 2,
  "unchoosable": false
}
```

:::note
与旧版（Fabric）版本的主要区别：
- 移除了 `loading_priority` 字段
- `impact` 使用整数，而不是字符串枚举
- `powers` 支持标签引用（`#namespace:tag`）
:::

## 升级格式 {#upgrade-format}

升级（Upgrade）定义了起源在达成特定进度后如何转变为另一个起源。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | Identifier | **必填** | 触发此升级的进度 ID |
| `origin` | Identifier | **必填** | 升级后的目标起源 ID |
| `announcement` | Text Component | 可选 | 升级发生时显示的聊天通知 |

### 示例 {#example}

用于起源 JSON 的 `upgrades` 字段中：

```json
{
  "powers": [...],
  "icon": {"id": "minecraft:diamond"},
  "upgrades": [
    {
      "condition": "minecraft:end/kill_dragon",
      "origin": "origins:elytrian",
      "announcement": "You have slain the Ender Dragon! You have evolved into an Elytrian."
    },
    {
      "condition": "minecraft:nether/brew_potion",
      "origin": "origins:blazeborn"
    }
  ]
}
```

如果省略 `announcement`，则不会显示任何通知消息。

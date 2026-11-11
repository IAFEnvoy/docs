---
title: "方块动作"
sidebar_label: "方块动作 (BlockAction)"
sidebar_position: 3
---

# 方块动作

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

### `saturn:bonemeal` {#saturnbonemeal}

对上下文方块尝试应用骨粉效果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:bonemeal` |
| `effect` | 布尔值 | 否 | `true` | 状态效果 ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:bonemeal"
}
```

</details>

### `saturn:break_block` {#saturnbreak_block}

破坏上下文位置的方块，可控制是否掉落物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:break_block` |
| `drop` | 布尔值 | 否 | `true` | 是否生成方块掉落。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:break_block"
}
```

</details>

### `saturn:explode` {#saturnexplode}

在上下文位置创建爆炸，可配置破坏行为和保护条件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:explode` |
| `power` | 数值 | 是 | — | 爆炸强度。 |
| `interaction` | 枚举字符串 | 否 | `"mob"` | 爆炸与方块交互的方式。 可用值：`none`、`block`、`mob`、`tnt`、`trigger`。 |
| `indestructible` | [方块条件](../condition/block-condition.md) | 否 | 省略 | 本次爆炸中受保护方块的条件。 |
| `create_fire` | 布尔值 | 否 | `false` | 爆炸是否尝试生成火焰。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:explode",
  "power": 1
}
```

</details>

### `saturn:light_up` {#saturnlight_up}

尝试点燃上下文位置。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:light_up` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:light_up"
}
```

</details>

### `saturn:schedule_tick` {#saturnschedule_tick}

为上下文位置的方块安排延迟 tick。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:schedule_tick` |
| `delay` | 整数 | 是 | — | 延迟 tick 数。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:schedule_tick",
  "delay": 1
}
```

</details>

### `saturn:send_message` {#saturnsend_message}

把文本组件发给符合接收条件的玩家，可选择聊天栏或动作栏。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:send_message` |
| `message` | 文本组件 | 是 | — | 发给玩家的文本组件；字符串按翻译键处理。 |
| `channel` | 枚举字符串 | 否 | `"chat"` | 消息通道，可用值见下文枚举说明。 可用值：`chat`、`action_bar`。 |
| `target` | 枚举字符串 | 否 | `"self"` | 动作目标、目标 ID 或目标选择，具体见本页类型说明。 可用值：`self`、`other`、`all`。 |
| `recipients` | [实体条件](../condition/entity-condition.md) | 否 | `{"type":"saturn:always"}` | 对每个候选接收玩家检查的实体条件。 |

channel 可用 chat、action_bar。target=self 选择 actor / 物品持有者，other 选择双实体 target，all 选择当前服务端维度的玩家。方块动作没有自身收件人，通常使用 all。recipients 对每位候选玩家单独检查。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:send_message",
  "message": {
    "text": "操作完成"
  }
}
```

</details>

### `saturn:set_block` {#saturnset_block}

把当前位置设置为指定方块。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:set_block` |
| `block` | 资源 ID | 是 | — | 方块 ID 或方块参数。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:set_block",
  "block": "minecraft:stone"
}
```

</details>

### `saturn:spawn_entity` {#saturnspawn_entity}

在上下文提供的位置或指定坐标生成实体。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_entity` |
| `entity_type` | 资源 ID | 是 | — | 实体类型 ID。 |
| `tag` | 对象 | 否 | 省略 | 注册表标签，或本页声明的 NBT 数据。 |
| `entity_action` | [实体动作](./entity-action.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:spawn_entity",
  "entity_type": "minecraft:arrow"
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:chance` {#saturnchance}

按指定概率决定是否命中。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:chance` |
| `action` | [方块动作](./block-action.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `chance` | 数值 | 是 | — | 命中概率，0 表示不命中，1 表示必定命中。 Codec 范围：`0.0F, 1.0F`。 |
| `fail_action` | [方块动作](./block-action.md) | 否 | `{"type":"saturn:no_op"}` | 概率未命中时执行的动作。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:chance",
  "action": {
    "type": "saturn:no_op"
  },
  "chance": 1
}
```

</details>

### `saturn:choice` {#saturnchoice}

按权重随机选择一项动作执行。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:choice` |
| `actions` | 加权条目数组（value、weight） | 是 | — | 子动作数组；顺序类型依次执行，加权类型按 value 和 weight 选择。 |

每项包含 value 与 weight，见[加权条目](../../data/common.md#加权条目)。负权重按 0 处理；总权重为 0 时从非空动作列表均匀选择。空动作列表不执行。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:choice",
  "actions": [
    {
      "value": {
        "type": "saturn:no_op"
      },
      "weight": 1
    }
  ]
}
```

</details>

### `saturn:if_else` {#saturnif_else}

条件成立时执行 if_action，否则执行 else_action。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if_else` |
| `condition` | [方块条件](../condition/block-condition.md) | 是 | — | 要检查的条件。 |
| `if_action` | [方块动作](./block-action.md) | 是 | — | 条件成立时执行的动作。 |
| `else_action` | [方块动作](./block-action.md) | 否 | `{"type":"saturn:no_op"}` | 条件不成立时执行的动作。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:if_else",
  "condition": {
    "type": "saturn:always"
  },
  "if_action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:js` {#saturnjs}

调用由 KubeJS 注册的回调，并传入 params 参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:js` |
| `id` | 字符串 | 是 | — | 回调、选项或条目的标识符。 |
| `params` | 对象 | 否 | `{}` | 传给脚本或公式的参数对象。 |

仅在安装 KubeJS 时注册。JSON 只选择已有回调，不会直接执行 JSON 内的 JavaScript 字符串。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

### `saturn:no_op` {#saturnno_op}

不执行操作，可作为动作的占位值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:no_op` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:no_op"
}
```

</details>

### `saturn:offset` {#saturnoffset}

将方块上下文移动指定偏移后检查或执行子项。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:offset` |
| `action` | [方块动作](./block-action.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `x` | 整数 | 否 | `0` | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | 整数 | 否 | `0` | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | 整数 | 否 | `0` | Z 坐标、偏移或向量分量，取决于本页行为。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:offset",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:sequence` {#saturnsequence}

按数组顺序依次执行多个同类动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:sequence` |
| `actions` | 同类动作数组 | 是 | — | 子动作数组；顺序类型依次执行，加权类型按 value 和 weight 选择。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:sequence",
  "actions": []
}
```

</details>

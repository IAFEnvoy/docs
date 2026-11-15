---
title: "物品动作"
sidebar_label: "物品动作 (ItemAction)"
sidebar_position: 4
---

操作上下文中的物品堆以及持有者。它不是物品定义文件，应嵌入要求 ItemAction 的字段。

## 类型

### `saturn:add_enchantment` {#saturnadd_enchantment}

按映射为物品增加或覆盖附魔等级。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:add_enchantment` |
| `enchantments` | 资源 ID → 整数的映射 | 是 | — | 附魔 ID 到等级的映射。 |
| `override` | 布尔值 | 否 | `false` | 是否覆盖已有值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:add_enchantment",
  "enchantments": {
    "minecraft:unbreaking": 1
  }
}
```

</details>

### `saturn:consume_health` {#saturnconsume_health}

消耗物品持有者的生命值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:consume_health` |
| `amount` | [数值提供器](../number.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:consume_health",
  "amount": 1
}
```

</details>

### `saturn:consume_item` {#saturnconsume_item}

减少上下文物品堆的数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:consume_item` |
| `count` | [数值提供器](../number.md) | 是 | — | 数量或数量匹配模式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:consume_item",
  "count": 1
}
```

</details>

### `saturn:cooldown` {#saturncooldown}

读取或设置冷却状态。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:cooldown` |
| `ticks` | 整数 | 是 | — | 游戏 tick 数，20 tick 通常为一秒。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:cooldown",
  "ticks": 1
}
```

</details>

### `saturn:damage_item` {#saturndamage_item}

对物品堆施加指定耐久损耗。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:damage_item` |
| `amount` | [数值提供器](../number.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:damage_item",
  "amount": 1
}
```

</details>

### `saturn:holder_action` {#saturnholder_action}

对物品持有者执行实体动作

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:holder_action` |
| `action` | [实体动作](./entity-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:holder_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:merge_components` {#saturnmerge_components}

把数据组件补丁合并到物品堆。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:merge_components` |
| `components` | 对象 | 是 | — | 原版数据组件补丁。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:merge_components",
  "components": {}
}
```

</details>

### `saturn:remove_enchantment` {#saturnremove_enchantment}

从物品移除选定附魔，可重置修复费用。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:remove_enchantment` |
| `enchantment` | 资源 ID 数组 | 否 | `[]` | 附魔 ID 或附魔列表。 |
| `reset_repair_cost` | 布尔值 | 否 | `false` | 移除附魔时是否重置修复费用。 |
| `level` | 整数 | 否 | 省略 | 标题级别，1 至 4。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:remove_enchantment"
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

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:chance` {#saturnchance}

按指定概率决定是否命中。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:chance` |
| `action` | [物品动作](./item-action.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `chance` | 数值 | 是 | — | 命中概率，0 表示不命中，1 表示必定命中。 Codec 范围：`0.0F, 1.0F`。 |
| `fail_action` | [物品动作](./item-action.md) | 否 | `{"type":"saturn:no_op"}` | 概率未命中时执行的动作。 |

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

### `saturn:for_range` {#saturnfor_range}

将动作重复执行指定次数，负数为零次，次数不超过 max_iterations

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:for_range` |
| `range` | [数值提供器](../number.md) | 是 | — | 执行次数，求值后向零截断；负数不执行。 |
| `action` | [物品动作](./item-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `max_iterations` | 整数 | 否 | `1024` | 每次调用的最大迭代次数，至少为 1。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:for_range",
  "range": 3,
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

次数在进入循环时求值一次，超过 `max_iterations` 时截断到上限。

### `saturn:if_else` {#saturnif_else}

条件成立时执行 if_action，否则执行 else_action。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if_else` |
| `condition` | [物品条件](../condition/item-condition.md) | 是 | — | 要检查的条件。 |
| `if_action` | [物品动作](./item-action.md) | 是 | — | 条件成立时执行的动作。 |
| `else_action` | [物品动作](./item-action.md) | 否 | `{"type":"saturn:no_op"}` | 条件不成立时执行的动作。 |

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

### `saturn:if_else_list` {#saturnif_else_list}

按顺序检查条件，只执行第一个命中分支

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if_else_list` |
| `actions` | 分支数组 | 是 | — | 按顺序检查的分支，每项含 condition 和 action。 |

每个 `actions` 条目：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `condition` | `ItemCondition` | 是 | 该分支的匹配条件。 |
| `action` | `ItemAction` | 是 | 匹配后执行；后续分支不再检查。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:if_else_list",
  "actions": [
    {
      "condition": {
        "type": "saturn:always"
      },
      "action": {
        "type": "saturn:no_op"
      }
    }
  ]
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

### `saturn:side` {#saturnside}

仅在指定逻辑端执行，不以客户端或服务端进程判断

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:side` |
| `action` | [物品动作](./item-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `side` | 枚举字符串 | 是 | — | 逻辑端，可选 client 或 server。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:side",
  "side": "server",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

判断 `Level` 的逻辑端。单人游戏的内置服务器属于 `server`，不会因为运行在客户端进程就当成 `client`；该动作不会主动发包或跨端执行。

### `saturn:while` {#saturnwhile}

条件成立时重复执行，超过 max_iterations 则终止并报告异常

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:while` |
| `condition` | [物品条件](../condition/item-condition.md) | 是 | — | 筛选条件；类型由字段声明确定。 |
| `action` | [物品动作](./item-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `max_iterations` | 整数 | 否 | `1024` | 每次调用的最大迭代次数，至少为 1。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:while",
  "max_iterations": 64,
  "condition": {
    "type": "saturn:never"
  },
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

每轮重新检查条件。达到 `max_iterations` 后若仍满足条件，则抛出异常停止本次动作，防止错误数据包无限循环；已执行的动作不回滚。

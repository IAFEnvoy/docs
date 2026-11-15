---
title: "方块动作"
sidebar_label: "方块动作 (BlockAction)"
sidebar_position: 3
---

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

## 类型

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

### `saturn:execute_command` {#saturnexecute_command}

在目标方块中心执行原版命令，权限等级为 2，没有 @s 实体

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:execute_command` |
| `command` | 字符串 | 是 | — | 原版命令，开头的 / 可省略。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:execute_command",
  "command": "setblock ~ ~1 ~ minecraft:stone"
}
```

</details>

仅服务端执行，不输出命令反馈。实体动作以该实体为 `@s`，位置使用激活位置；方块动作位于方块中心，没有 `@s` 实体。

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

### `saturn:modify_block_state` {#saturnmodify_block_state}

循环、设置布尔或枚举属性，或加减/设置整数属性；无效值保持原状，仅服务端有效

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:modify_block_state` |
| `property` | 字符串 | 是 | — | 方块状态属性名。 |
| `cycle` | 布尔值 | 否 | `false` | true 时循环到下一个合法值，优先于其他修改字段。 |
| `value` | 布尔值 | 否 | 省略 | 固定布尔值；用于方块属性时，匹配或设置布尔属性。 |
| `enum` | 字符串 | 否 | 省略 | 属性序列化后的名称，如 north、bottom。 |
| `change` | [数值提供器](../number.md) | 否 | 省略 | 整数属性的操作数，求值后向零截断。 |
| `operation` | 枚举字符串 | 否 | `"add"` | add 加减或 set 直接设置整数属性。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:modify_block_state",
  "property": "age",
  "change": 1
}
```

</details>

`cycle` 优先；否则根据属性类型读取 `value`、`enum` 或 `change`。超出属性合法值集合时不修改，不会自动截断到边界。

### `saturn:region_apply` {#saturnregion_apply}

对目标周围符合条件的方块执行动作，保留原有面方向与扩展上下文

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:region_apply` |
| `radius` | [数值提供器](../number.md) | 否 | `16` | 范围半径，单位为方块。 |
| `shape` | 枚举字符串 | 否 | `"cube"` | cube 使用最大轴距离，star 使用曼哈顿距离，sphere 使用欧氏距离。 |
| `block_action` | [方块动作](./block-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `block_condition` | [方块条件](../condition/block-condition.md) | 否 | `saturn:always` | 筛选条件；类型由字段声明确定。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:region_apply",
  "radius": 2,
  "block_condition": {
    "type": "saturn:air"
  },
  "block_action": {
    "type": "saturn:no_op"
  }
}
```

</details>

所有距离相对查询中心计算；实体使用位置坐标并排除旁观者。方块半径向下取整为非负整数，区域按需遍历。负数或非有限半径返回空区域。

查询中心为目标方块；嵌套动作保留原面方向。

### `saturn:relative_offset` {#saturnrelative_offset}

沿上下文给定的方块面偏移后执行；没有方向时不执行

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:relative_offset` |
| `action` | [方块动作](./block-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
| `distance` | [数值提供器](../number.md) | 是 | — | 沿上下文面方向偏移的方块数，向零截断，可为负。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:relative_offset",
  "distance": 1,
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

没有上下文面方向时不执行；移动方块坐标后继续保留面方向、公式和扩展数据。

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

### `saturn:for_range` {#saturnfor_range}

将动作重复执行指定次数，负数为零次，次数不超过 max_iterations

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:for_range` |
| `range` | [数值提供器](../number.md) | 是 | — | 执行次数，求值后向零截断；负数不执行。 |
| `action` | [方块动作](./block-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
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

### `saturn:if_else_list` {#saturnif_else_list}

按顺序检查条件，只执行第一个命中分支

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if_else_list` |
| `actions` | 分支数组 | 是 | — | 按顺序检查的分支，每项含 condition 和 action。 |

每个 `actions` 条目：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `condition` | `BlockCondition` | 是 | 该分支的匹配条件。 |
| `action` | `BlockAction` | 是 | 匹配后执行；后续分支不再检查。 |

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

### `saturn:side` {#saturnside}

仅在指定逻辑端执行，不以客户端或服务端进程判断

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:side` |
| `action` | [方块动作](./block-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
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
| `condition` | [方块条件](../condition/block-condition.md) | 是 | — | 筛选条件；类型由字段声明确定。 |
| `action` | [方块动作](./block-action.md) | 是 | — | 要执行的嵌套动作；类型由字段声明确定。 |
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

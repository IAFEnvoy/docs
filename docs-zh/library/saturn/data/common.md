---
title: "公共数据类型"
sidebar_position: 1
---

## 资源 ID 与引用

资源 ID 使用 `命名空间:路径`，例如 `example:mana`。引用技能、资源等动态注册表条目时，必须先有对应定义。动作、条件、费用等行为对象通过 `type` 分派，其类型由 Java 注册；数据包不能凭空声明一种新 Java 类型。

## 数值提供器

要求 NumberProvider 的字段支持三种写法：常量数字、公式字符串、带 `type` 的数值对象。公式由 exp4j 解析，变量由执行上下文提供，不是 JavaScript。不要假定任意玩家字段都能直接当公式变量。

```json
{
  "amount": 10
}
```

```json
{
  "amount": "2 + 3"
}
```

```json
{
  "amount": {
    "type": "saturn:uniform",
    "min": 1,
    "max": 5
  }
}
```

完整类型见[数值提供器](../types/number.md)。时间参数遵从所属字段说明；标为 tick 的字段在正常 20 TPS 下每 20 tick 为一秒。

## 动作和条件

同类动作字段可用单个带 `type` 的对象，或以数组表达顺序动作；同类条件字段可用对象，或以数组表达全部成立。不要把实体动作、方块动作、物品动作混用。

```json
[
  {
    "type": "saturn:heal",
    "amount": 2
  },
  {
    "type": "saturn:extinguish"
  }
]
```

数值比较的公共字段是 `comparison` 与 `compare_to`，平铺到使用它的条件对象中：

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `comparison` | 字符串 | 是 | — | `<`、`<=`、`>`、`>=`、`==`、`!=`。 |
| `compare_to` | 数值 | 是 | — | 右侧比较值。 |

## 文本组件

标准 Minecraft 文本组件推荐显式写 `{"text":"文字"}` 或 `{"translate":"example.key"}`。部分 Saturn 字段使用 TRANSLATABLE_COMPONENT，此时裸字符串表示翻译键；标准 Component 字段的裸字符串表示文字。每页会注明区别。

## 物品与图标

物品堆模板使用原版 ItemStackTemplate：`id`、可选 `count`（默认 1）和 `components`。数据加载时读取模板，使用时才创建堆叠。`IconReference` 接受贴图 ID 字符串或物品堆模板对象；**裸物品 ID 字符串会被当作贴图 ID**，物品图标请用对象。

```json
{
  "icon": {
    "id": "minecraft:diamond",
    "count": 1
  }
}
```

## 加权条目

加权动作和数值分布使用下列条目结构。选择概率是本项权重除以总权重，`value` 的类型由外层字段决定。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `value` | 外层指定的值 | 是 | — | 例如一个动作或一个数值提供器。 |
| `weight` | 整数 | 否 | `1` | 负数按 0 处理；具体总权重回退由使用类型决定。 |

```json
{
  "type": "saturn:choice",
  "actions": [
    {
      "value": {
        "type": "saturn:heal",
        "amount": 2
      },
      "weight": 3
    },
    {
      "value": {
        "type": "saturn:extinguish"
      },
      "weight": 1
    }
  ]
}
```

动作的总权重为 0 时，从非空列表均匀选择；数值提供器 weighted_list 的总权重非正时返回 0。系统抽奖奖池另用正整数权重，遵从其自身规则。

## 属性修饰器

技能 modifier 的 modifiers 每项使用下列结构，原版修饰器字段与 attribute、value 平铺。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `attribute` | 属性 ID | 是 | — | 如 minecraft:max_health。 |
| `id` | 资源 ID | 是 | — | 修饰器稳定标识。 |
| `amount` | 数值 | 是 | — | 原版修饰器数值。 |
| `operation` | 字符串 | 是 | — | add_value、add_multiplied_base、add_multiplied_total。 |
| `value` | 数值提供器 | 否 | 省略 | 存在时在运行时替代 amount。 |

```json
{
  "attribute": "minecraft:max_health",
  "id": "example:bonus_health",
  "amount": 4,
  "operation": "add_value"
}
```

## 标签

动态注册表的 tag 放在 `data/<namespace>/tags/<注册表命名空间>/<注册表路径>/<path>.json`。只有声明支持 tag 的字段才能使用 `#example:group`；普通 Holder 或资源 ID 字段不会自动展开 tag。

```json title="data/example/tags/saturn/resource/magic.json"
{
  "replace": false,
  "values": [
    "example:mana"
  ]
}
```

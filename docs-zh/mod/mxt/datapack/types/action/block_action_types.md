---
title: block_action_type（方块行为）
description: 模组注册的全部内置方块行为类型，以及每种类型接受的 JSON 字段。
---

# block_action_type（方块行为）

<span id="block-action-type-方块行为" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/action/block-action.md)。
:::

**方块行为**作用于世界里的一个方块位置。世界与坐标由写这个行为的那个定义给出，有的调用方还会给出朝向，行为本身只描述在这个位置上做什么。

方块行为是 Java（内置）注册表，`type` id 固定，数据包既加不了条目也删不掉条目。`type` 就写在行为对象里，和参数平级，只能从本页列出的、带 `mxt` 命名空间的 id 里挑。要加自定义类型只能写 Java，或者用 KubeJS 桥接，见 [KubeJS API](../../../kubejs/api-reference.md)。

## 通用结构 {#通用结构}

一个行为就是一个 JSON 对象，`type` 指明内置类型，剩下的键全是这个类型自己的字段。

```json
{
  "type": "mxt:set_block",
  "block": "minecraft:stone"
}
```

行为是别的定义里的值，所以通常嵌在 `block_action` 这类字段下面：

```json
"block_action": {
  "type": "mxt:break_block",
  "drop": false
}
```

凡是收方块行为的地方也收数组。数组是 `mxt:sequence` 的简写，按写的顺序挨个执行：

```json
"block_action": [
  { "type": "mxt:break_block" },
  { "type": "mxt:set_block", "block": "minecraft:air" }
]
```

:::info 与其他家族混用
有若干表类型同时声明方块字段和其他行为字段；[实体行为](./entity_action_types.md)可以用 `mxt:block_action` 包一个方块行为。方块条件属于另一个家族，见[方块条件类型](../condition/block_condition_types.md)。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 能交互式地列出一个类型有哪些字段，核对字段名挺方便，不用翻本页的表。
:::

## 行为类型 {#行为类型}

### mxt:change_aura {#mxt-change-aura}

改变该位置所属区块的灵气存量。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `aura` | 灵气 id 到数值提供器的映射 | **必填** | 键是 [aura](../../json/aura.md) 的 id，值是[数值提供器](../../../../../library/saturn/types/number.md)：这次要给这门灵气加多少。 |

```json
{
  "type": "mxt:change_aura",
  "aura": {
    "example:azure_aura": -20,
    "example:crimson_aura": "5 + level"
  }
}
```

:::info `mxt:change_aura`
键只认具体灵气 id，写 `#标签` 不行。一次能同时改若干条灵气池；只在服务端施加，客户端上什么都不会改变。任意一项求值不是有限数时，这次改变整个不施加。
:::

---
sidebar_position: 0
---

# 基本概念 {#basic-concepts}

本页定义贯穿所有 Origins JSON 文件的基础数据类型。理解这些类型是使用能力、动作、条件以及其他 JSON 格式的前提。

---

## 标识符（Identifier） {#identifier}

**标识符**（Identifier，也称为 `Resource Location`）是形如 `namespace:path` 的字符串，用于唯一标识一个游戏对象。

- **格式：** `namespace:path`
- **示例：** `minecraft:diamond`、`origins:fire_immunity`
- **默认命名空间：** 如果未指定命名空间（例如 `diamond`），Minecraft 会默认使用 `minecraft:`。

标识符用于：
- 物品（`minecraft:diamond_sword`）
- 方块（`minecraft:stone`）
- 实体（`minecraft:creeper`）
- 能力（`origins:arcane_skin`）
- 起源（`origins:avian`）
- 状态效果（`minecraft:speed`）
- 附魔（`minecraft:sharpness`）
- 生物群系（`minecraft:desert`）
- 维度（`minecraft:the_nether`）
- 以及更多...

---

## 通配符标识符（Wildcard Identifier） {#wildcard-identifier}

**通配符标识符**是一种特殊的标识符。它可以像普通标识符一样使用，但另外支持 `*` 通配符字符。

命名空间中的所有 `*` 字符都会被替换为当前能力的命名空间。路径中的所有 `*` 字符都会被替换为当前能力的路径。

例如：`example:power` 中的 `*:*_toggle` 会被解析为 `example:power_toggle`。

---

## 字符串（String） {#string}

**字符串**是一段文本字符序列。

- **示例：** `"Hello World"`、`"key.origins.primary_active"`
- **用于：** 名称、消息、按键绑定 ID、操作名称、命令文本。

在 JSON 中，字符串始终用双引号 `"..."` 包裹。

---

## 整数（Integer） {#integer}

**整数**是不含小数的数字（正数、负数或零）。

- **示例：** `0`、`42`、`-5`
- **用于：** 槽位索引、栏索引、优先级数值、整数量计数。

整数不能带小数位。

---

## 浮点数（Float） {#float}

**浮点数**是带小数的数字。

- **示例：** `1.0`、`0.5`、`-2.75`
- **用于：** 修饰器数值、坐标、颜色通道、速度、概率。

浮点数可以带小数点也可以不带（例如 `1` 和 `1.0` 都是合法的浮点数）。

---

## 双精度浮点数（Double） {#double}

**双精度浮点数**是双精度浮点数值（与 Float 类似，但精度更高）。

- **示例：** `1.0`、`0.5`
- **用于：** 位置坐标、需要高精度的速度向量。

在大多数 Origins JSON 场景中，Float 与 Double 可以互换使用。

---

## 布尔值（Boolean） {#boolean}

**布尔值**是 true/false 值。

- **示例：** `true`、`false`
- **用于：** 开关项（`invert`、`hidden`、`negative`、`continuous`）、条件。

---

## 列表（List） {#list}

**列表**是用方括号 `[...]` 包裹的有序值集合。

- **示例：**
  ```json
  ["minecraft:sharpness", "minecraft:protection"]
  ```
- **用于：** 标识符集合、修饰器集合、动作集合。

列表会保留顺序。

---

## 值或列表（ValueOrList） {#valueorlist}

许多字段接受**单个值或值的列表**。这类字段的类型标注为 `Value or List`。

- **单值示例：**
  ```json
  "modifier": {
      "operation": "add_base_early",
      "value": 0.5
  }
  ```
- **列表示例：**
  ```json
  "modifier": [
      {
          "operation": "add_base_early",
          "value": 0.5
      },
      {
          "operation": "multiply_total_multiplicative",
          "value": 1.5
      }
  ]
  ```

只需要一个值时，可以使用单对象的简写语法。需要多个值时，使用列表语法。

---

## 引用或标签列表（ReferenceOrTagList） {#referenceortaglist}

**ReferenceOrTagList** 始终是一个 **列表**，其中每个元素既可以是普通的**标识符**，也可以是**标签**（以 `#` 为前缀）。与 `ValueOrList` 不同，此类型**始终**使用列表语法——单个条目没有简写形式。

```json
"block": ["minecraft:stone", "#minecraft:logs", "minecraft:dirt"]
```

标签是以 `#` 为前缀的标识符，引用数据包标签文件中定义的一组条目。

---

## JSON 对象（JSON Object） {#json-object}

**JSON 对象**（也称为“映射”，Map）是用花括号 `{...}` 包裹的键值对集合。

- **示例：**
  ```json
  {
      "modifier": {
          "operation": "add_base_early",
          "value": 1.0
      }
  }
  ```
- **用于：** Origins JSON 文件中几乎所有复杂结构。

每个键都是字符串，每个值可以是任意合法的 JSON 类型（字符串、数字、布尔值、列表、对象或 null）。

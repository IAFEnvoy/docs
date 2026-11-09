---
title: "局部变量"
sidebar_position: 10
---

`saturn:local`

读取列表或表格当前元素的局部绑定。

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:local` |
| `name` | 字符串 | 否 | `"item"` | 局部变量名、计分板持有者名或配置名称。 |
| `path` | 字符串数组 | 否 | `[]` | 复合结果的成员路径，点号不拆分。 |

## JSON 示例

```json
{
  "type": "saturn:local"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.expression.builtin.LocalExpression`。本页按当前 26.1.2 源码的 Codec 整理。

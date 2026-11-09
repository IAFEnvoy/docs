---
title: "点燃方块"
sidebar_position: 10
---

`saturn:light_up`

尝试点燃上下文位置。

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:light_up` |

## JSON 示例

```json
{
  "type": "saturn:light_up"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.block.LightUpAction`。本页按当前 26.1.2 源码的 Codec 整理。

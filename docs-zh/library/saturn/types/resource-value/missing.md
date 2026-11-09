---
title: "缺少的资源量"
sidebar_position: 10
---

`saturn:missing`

返回 max(0, 资源最大值 − 当前值)，不是缺失或错误标记。

在资源上下文中读取数值，不负责增加或扣除资源。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:missing` |

## JSON 示例

```json
{
  "type": "saturn:missing"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resource.builtin.MissingResourceValueProvider`。本页按当前 26.1.2 源码的 Codec 整理。

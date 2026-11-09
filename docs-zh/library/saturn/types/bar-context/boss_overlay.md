---
title: "Boss 覆盖层"
sidebar_position: 10
---

`saturn:boss_overlay`

为 Boss 资源条提供显示上下文。

ResourceBar.context 使用字符串 ID，而不是带 type 的对象。上下文是否被实际绘制仍取决于宿主界面。

## JSON 字段

该类型直接使用字符串 ID，没有额外 JSON 字段。

## JSON 示例

```json
"saturn:boss_overlay"
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`SaturnResourceBarContexts`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: "始终成立"
sidebar_position: 10
---

`saturn:always`

条件始终为真。

用于 ResourceBar.visibility，在资源条上下文中决定是否显示。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:always` |

## JSON 示例

```json
{
  "type": "saturn:always"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.AlwaysVisibility`。本页按当前 26.1.2 源码的 Codec 整理。

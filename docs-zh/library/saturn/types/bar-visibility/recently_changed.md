---
title: "变化后显示"
sidebar_position: 10
---

`saturn:recently_changed`

资源变化后保留显示指定 tick 数。

用于 ResourceBar.visibility，在资源条上下文中决定是否显示。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:recently_changed` |
| `hold_ticks` | 整数 | 否 | `60` | 变化后保留显示的 tick 数。 |

## JSON 示例

```json
{
  "type": "saturn:recently_changed"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.RecentlyChangedVisibility`。本页按当前 26.1.2 源码的 Codec 整理。

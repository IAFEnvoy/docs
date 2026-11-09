---
title: "合并组件"
sidebar_position: 10
---

`saturn:merge_components`

把数据组件补丁合并到物品堆。

操作上下文中的物品堆以及持有者。它不是物品定义文件，应嵌入要求 ItemAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:merge_components` |
| `components` | 对象 | 是 | — | 原版数据组件补丁。 |

## JSON 示例

```json
{
  "type": "saturn:merge_components",
  "components": {}
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.item.MergeComponentsAction`。本页按当前 26.1.2 源码的 Codec 整理。

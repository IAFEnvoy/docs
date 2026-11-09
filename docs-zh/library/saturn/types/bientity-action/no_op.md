---
title: "空动作"
sidebar_position: 10
---

`saturn:no_op`

不执行操作，可作为动作的占位值。

上下文包含 actor（发起者）与 target（目标）。同一个 ID 在实体动作和双实体动作注册表中可能有不同字段，不能跨种类替换。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:no_op` |

## JSON 示例

```json
{
  "type": "saturn:no_op"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.NoOpAction`。本页按当前 26.1.2 源码的 Codec 整理。

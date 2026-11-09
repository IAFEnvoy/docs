---
title: "等待倒计时"
sidebar_position: 10
---

`saturn:idle_countdown`

保存等待节点剩余 tick 数。

DataStorage 是运行时状态的 Codec，不是独立数据包注册表。技能类型声明所需状态；宿主负责创建、tick、持久化以及修改后的 markDirty。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:idle_countdown` |
| `remaining` | 整数 | 是 | — | 剩余量的范围或运行时剩余值。 |

## JSON 示例

```json
{
  "type": "saturn:idle_countdown",
  "remaining": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.storage.runtime.IdleCountdown`。本页按当前 26.1.2 源码的 Codec 整理。

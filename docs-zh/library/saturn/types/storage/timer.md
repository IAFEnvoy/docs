---
title: "计时器存储"
sidebar_position: 10
---

`saturn:timer`

保存持续时长和计时结束 tick。

DataStorage 是运行时状态的 Codec，不是独立数据包注册表。技能类型声明所需状态；宿主负责创建、tick、持久化以及修改后的 markDirty。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:timer` |
| `duration` | [数值提供器](../number/index.md) | 是 | — | 持续时长，通常以游戏 tick 计。 |
| `ends_at` | 数值 | 否 | 省略 | 计时器结束的游戏 tick。 |

## JSON 示例

```json
{
  "type": "saturn:timer",
  "duration": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.storage.builtin.TimerDataStorage`。本页按当前 26.1.2 源码的 Codec 整理。

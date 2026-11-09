---
title: "充能存储"
sidebar_position: 10
---

`saturn:charges`

保存最大充能、恢复间隔和当前剩余充能。

DataStorage 是运行时状态的 Codec，不是独立数据包注册表。技能类型声明所需状态；宿主负责创建、tick、持久化以及修改后的 markDirty。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:charges` |
| `maximum` | [数值提供器](../number/index.md) | 是 | — | 最大值或上限。 |
| `recharge_ticks` | [数值提供器](../number/index.md) | 是 | — | 恢复一次充能所需的 tick 数。 |
| `last_change` | 整数 | 否 | `0` | 上次修改充能的游戏 tick。 |
| `remaining` | 数值 | 否 | 省略 | 剩余量的范围或运行时剩余值。 |

## JSON 示例

```json
{
  "type": "saturn:charges",
  "maximum": 1,
  "recharge_ticks": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.storage.builtin.ChargesDataStorage`。本页按当前 26.1.2 源码的 Codec 整理。

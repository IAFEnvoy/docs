---
title: "目标锁定存储"
sidebar_position: 10
---

`saturn:target_lock`

保存锁定目标和可用距离。

DataStorage 是运行时状态的 Codec，不是独立数据包注册表。技能类型声明所需状态；宿主负责创建、tick、持久化以及修改后的 markDirty。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:target_lock` |
| `range` | [数值提供器](../number/index.md) | 是 | — | 检查范围，以方块计。 |
| `target` | 字符串 | 否 | 省略 | 动作目标、目标 ID 或目标选择，具体见本页类型说明。 |

## JSON 示例

```json
{
  "type": "saturn:target_lock",
  "range": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.storage.builtin.TargetLockDataStorage`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: "引导节拍"
sidebar_position: 10
---

`saturn:channel_pulse`

保存下一次引导执行时刻。

DataStorage 是运行时状态的 Codec，不是独立数据包注册表。技能类型声明所需状态；宿主负责创建、tick、持久化以及修改后的 markDirty。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:channel_pulse` |
| `next_tick` | 数值 | 是 | — | 下次执行的游戏 tick。 |

## JSON 示例

```json
{
  "type": "saturn:channel_pulse",
  "next_tick": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.storage.runtime.ChannelPulse`。本页按当前 26.1.2 源码的 Codec 整理。

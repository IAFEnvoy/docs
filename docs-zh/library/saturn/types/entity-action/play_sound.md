---
title: "播放声音"
sidebar_position: 10
---

`saturn:play_sound`

在实体处播放指定音效。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:play_sound` |
| `sound` | 资源 ID | 是 | — | SoundEvent ID。 |
| `category` | 枚举字符串 | 否 | 省略 | 声音分类。 可用值：`master`、`music`、`records`、`weather`、`blocks`、`hostile`、`neutral`、`players`、`ambient`、`voice`、`ui`。 |
| `volume` | 数值 | 否 | `1.0` | 音量倍率。 |
| `pitch` | 数值 | 否 | `1.0` | 不跟随鼠标时的俯仰角，单位为度。 |

## JSON 示例

```json
{
  "type": "saturn:play_sound",
  "sound": "minecraft:entity.experience_orb.pickup",
  "category": "players"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.PlaySoundAction`。本页按当前 26.1.2 源码的 Codec 整理。

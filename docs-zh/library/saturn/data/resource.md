---
title: "资源定义"
sidebar_position: 2
---

文件：`data/<namespace>/saturn/resource/<path>.json`。例如下列文件定义 `example:mana`。资源保存实体当前数值，边界和显示方式由定义提供；仅创建定义不会自动为所有实体初始化资源或授予技能。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `default_value` | [数值提供器](../types/number/index.md) | 是 | — | 初始化资源时的值。 |
| `min` | 数值提供器 | 否 | `0` | 资源下限。 |
| `max` | 数值提供器 | 是 | — | 资源上限。 |
| `icon` | [图标](./common.md#物品与图标) | 否 | 省略 | 贴图 ID 或物品模板。 |
| `particle_color` | RGB 字符串 | 否 | `"#FFFFFF"` | 粒子颜色。 |
| `bars` | [资源条](./resource-bar.md)数组 | 否 | `[]` | 该资源的显示条。 |

## 示例

```json title="data/example/saturn/resource/mana.json"
{
  "default_value": 50,
  "min": 0,
  "max": 100,
  "icon": {
    "id": "minecraft:lapis_lazuli"
  },
  "particle_color": "#4488FF",
  "bars": [
    {
      "anchor": "left",
      "renderer": {
        "type": "saturn:text_only",
        "format": "%current% / %maximum%",
        "color": "#4488FF"
      }
    }
  ]
}
```

按实际效果增减资源可使用 [add_resource](../types/entity-action/add_resource.md)，扣款使用[资源费用](../types/cost/resource.md)。开发侧初始化与事务接口见 [Java API](../development/api.md)。

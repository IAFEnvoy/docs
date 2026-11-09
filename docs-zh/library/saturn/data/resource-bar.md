---
title: "资源条"
sidebar_position: 3
---

资源条嵌入[资源定义](./resource.md)的 `bars`。一个资源可以在多个上下文中采用不同渲染方式，不需要为每个条另建文件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `context` | [上下文 ID](../types/bar-context/index.md) | 否 | `"saturn:self_hud"` | 字符串 ID，不是 type 对象。 |
| `anchor` | 字符串 | 是 | — | `left` 或 `right`。 |
| `order` | 整数 | 否 | `0` | 同一上下文中的布局顺序。 |
| `visibility` | [显示条件](../types/bar-visibility/index.md) | 否 | `{"type":"saturn:always"}` | 是否绘制。 |
| `renderer` | [渲染类型](../types/bar-renderer/index.md) | 是 | — | 资源条外观。 |
| `value_display` | 字符串 | 否 | `"none"` | `none`、`current`、`current_and_maximum`、`percentage`。 |
| `maximum` | 数值 | 否 | 省略 | 正数覆盖显示上限，非正数视为未指定。 |

## 示例

```json
{
  "context": "saturn:self_hud",
  "anchor": "left",
  "order": 0,
  "visibility": {
    "type": "saturn:always"
  },
  "renderer": {
    "type": "saturn:segmented_bar",
    "segments": 10
  },
  "value_display": "current_and_maximum"
}
```

## 贴图格式

渲染器的 SpriteIcon 字段支持 ID 或对象。`textured_bar` 的裸 ID 表示 GUI 图集精灵，`boss_bar` 的 `sprite_location` 裸 ID 表示完整贴图。对象格式如下：

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `sprite` | 资源 ID | 二选一 | 省略 | GUI 图集精灵，不可同时指定 texture。 |
| `texture` | 资源 ID | 二选一 | 省略 | 完整贴图路径。 |
| `region` | 区域对象 | 否 | 省略 | 仅 texture 可用。 |
| `width` / `height` | 整数 | 否 | `0` | 均为 0 使用调用方尺寸；指定时需同时指定，范围 0～8192。 |
| `region.u` / `region.v` | 整数 | 否 | `0` | 贴图区域原点，范围 0～8192。 |
| `region.texture_width` / `region.texture_height` | 整数 | 否 | `256` | 源贴图尺寸，范围 1～8192。 |

```json
{
  "texture": "example:textures/gui/bar.png",
  "region": {
    "u": 0,
    "v": 0,
    "texture_width": 256,
    "texture_height": 256
  },
  "width": 81,
  "height": 9
}
```

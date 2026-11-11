---
title: "资源条渲染"
sidebar_label: "资源条渲染 (ResourceBarRenderData)"
sidebar_position: 17
---

# 资源条渲染

用于 ResourceBar.renderer，负责显示资源快照，不修改资源。颜色写 #RRGGBB。

### `saturn:boss_bar` {#saturnboss_bar}

使用指定贴图的 Boss 血条样式。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:boss_bar` |
| `sprite_location` | 资源 ID | 否 | `"saturn:textures/gui/resource_bar.png"` | 资源条贴图。 |
| `bar_index` | 整数 | 否 | `0` | 贴图内资源条的索引。 Codec 范围：`0, 24`。 |
| `inverted` | 布尔值 | 否 | `false` | 是否反转判断或显示方向。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:boss_bar"
}
```

</details>

### `saturn:radial_bar` {#saturnradial_bar}

在指定角度范围内绘制环形进度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:radial_bar` |
| `radius` | 整数 | 是 | — | 半径，以方块计；资源条中以像素计。 Codec 范围：`1, 512`。 |
| `thickness` | 整数 | 是 | — | 圆环厚度，单位为像素。 Codec 范围：`1, 128`。 |
| `start_angle` | 数值 | 否 | `0.0` | 起始角度，单位为度。 |
| `end_angle` | 数值 | 否 | `360.0` | 结束角度，单位为度。 |
| `fill_color` | #RRGGBB 字符串 | 否 | `"#FFFFFF"` | 填充 RGB 颜色字符串。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:radial_bar",
  "radius": 1,
  "thickness": 1
}
```

</details>

### `saturn:segmented_bar` {#saturnsegmented_bar}

使用多个色块表示资源量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:segmented_bar` |
| `segments` | 整数 | 是 | — | 分段数量。 Codec 范围：`1, 256`。 |
| `gap` | 整数 | 否 | `1` | 分段间隔，单位为像素。 Codec 范围：`0, 32`。 |
| `full_color` | #RRGGBB 字符串 | 否 | `"#FFFFFF"` | 已填充分段颜色。 |
| `empty_color` | #RRGGBB 字符串 | 否 | `"#555555"` | 空分段颜色。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:segmented_bar",
  "segments": 1
}
```

</details>

### `saturn:text_only` {#saturntext_only}

用格式文本显示资源值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:text_only` |
| `format` | 字符串 | 否 | `"%current%"` | 支持 %current% 与 %maximum% 替换，不使用 printf 格式。 |
| `color` | #RRGGBB 字符串 | 否 | `"#FFFFFF"` | RGB 颜色字符串。 |
| `show_maximum` | 布尔值 | 否 | `false` | 是否显示上限。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:text_only"
}
```

</details>

### `saturn:textured_bar` {#saturntextured_bar}

使用背景与填充贴图绘制资源条。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:textured_bar` |
| `background_sprite` | 资源 ID | 是 | — | 背景 GUI 精灵 ID。 |
| `fill_sprite` | 资源 ID | 是 | — | 填充 GUI 精灵 ID。 |
| `width` | 整数 | 是 | — | 宽度，单位为像素。 Codec 范围：`1, 1024`。 |
| `height` | 整数 | 是 | — | 高度，单位为像素。 Codec 范围：`1, 1024`。 |
| `fill_color` | #RRGGBB 字符串 | 否 | `"#FFFFFF"` | 填充 RGB 颜色字符串。 |
| `show_value` | 布尔值 | 否 | `false` | 是否显示数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:textured_bar",
  "background_sprite": "minecraft:boss_bar/pink_background",
  "fill_sprite": "minecraft:boss_bar/pink_background",
  "width": 1,
  "height": 1
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:missing` {#saturnmissing}

表示没有可用实现或取值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:missing` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:missing"
}
```

</details>

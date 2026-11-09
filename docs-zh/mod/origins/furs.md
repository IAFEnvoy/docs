---
sidebar_position: 6
---

# 起源外观

本模组是起源模组的扩展，为起源添加自定义的兽形模型（furs）。

## 文件位置

兽形模型 JSON 文件放在以下路径下：

```
assets/<namespace>/furs/<origin_name>.json
```

文件名对应起源的 ID。例如，`origins:avian` 的外观应位于 `assets/origins/furs/avian.json`。

## 命名与命名空间

### 避免名称冲突

如果两个起源包定义了同名的起源（例如 `example1` 和 `example2` 都有一个名为 `phantom` 的起源），你可以在文件名前加上起源的命名空间以避免冲突：

```
assets/<namespace>/furs/<origin_namespace>.<origin_name>.json
```

例如：`assets/some_namespace/furs/example1.phantom.json` 和 `assets/some_namespace/furs/example2.phantom.json`。

### 起源职业（或其他扩展）

如果你用 **Origins Classes** 创建了自定义职业，外观文件名遵循 `origins-classes.<class_name>.json` 格式。与往常一样，建议加上命名空间以防万一。

### 子文件夹作为命名空间

如果你的起源位于子文件夹中（例如 `origins/roiraces/impact1/elf.json`），子文件夹路径会充当命名空间。你**必须**把完整的点分路径用作文件名：

```
roiraces.impact1.elf.json
```

省略命名空间（此例中为 `roiraces`）很可能导致外观无法加载。

:::warning[保留命名空间]
`orif-defaults` 命名空间是保留的。使用该命名空间的外观**不会**覆盖已有的外观。
:::

## 模型制作提示

创建新模型时，如果有立方体在任一轴上**宽度为零**（即面是扁平的），请确保该立方体的**至少一个面**完全透明。这是必需的，因为本模组支持半透明渲染，而不透明的零宽度面会导致渲染裁剪。

## JSON 格式

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `model` | Resource Location | 自定义 GeckoLib 模型（`.geo.json`） |
| `texture` | Resource Location | 模型的主纹理 |
| `fullbrightTexture` | Resource Location | 自发光（fullbright）纹理 |
| `animation` | Resource Location | 动画文件，会无限循环播放 |
| `elytraTexture` | Resource Location | 该起源的自定义鞘翅纹理 |
| `playerInvisible` | Boolean | 若为 `true`，完全隐藏玩家默认模型 |
| `hidden` | String[] | 要隐藏的玩家身体部位。有效值：`head`、`hat`、`body`、`jacket`、`leftArm`、`rightArm`、`leftLeg`、`rightLeg`、`leftPants`、`rightPants` |
| `overlay` | Resource Location | 绘制在玩家皮肤之上的纹理（Steve/宽模型） |
| `overlay_slim` | Resource Location | 与 `overlay` 相同，但用于 Alex/纤细模型。定义后，`overlay` 仅用于宽模型 |
| `emissive_overlay` | Resource Location | 绘制在玩家皮肤之上的自发光纹理（Steve/宽模型） |
| `emissive_overlay_slim` | Resource Location | 与 `emissive_overlay` 相同，但用于 Alex/纤细模型。定义后，`emissive_overlay` 仅用于宽模型 |
| `rendering_offsets` | Object | 物品渲染位置偏移 |
| `rendering_offsets.left` | Vec3 | 左臂物品渲染偏移 `[x, y, z]` |
| `rendering_offsets.right` | Vec3 | 右臂物品渲染偏移 `[x, y, z]` |

## 示例

```json
{
  "model": "some_namespace:geo/custommodel.geo.json",
  "texture": "some_namespace:textures/custom/customorigin.png",
  "fullbrightTexture": "some_namespace:textures/custom/customorigin_emission.png",
  "animation": "some_namespace:animations/custommodel.animation.json",
  "elytraTexture": "some_namespace:textures/custom/custom_elytra.png",
  "playerInvisible": true,
  "overlay": "some_namespace:textures/custom/skin_overlay.png",
  "emissive_overlay": "some_namespace:textures/custom/emissive_skin_overlay.png",
  "hidden": [
    "leftArm", "rightArm", "body", "jacket",
    "head", "hat", "leftLeg", "rightLeg",
    "leftPants", "rightPants"
  ],
  "rendering_offsets": {
    "left": [0, 0.3, 0],
    "right": [0, 0.3, 0]
  }
}
```

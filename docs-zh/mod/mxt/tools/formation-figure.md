---
title: 阵法图形编辑器
description: 编辑圆环与折线，导出 mxt:formation_shape 定义。
hide_table_of_contents: true
---

import MxtToolFrame from '@site/src/components/MxtToolFrame';

# 阵法图形编辑器

<span id="阵法图形编辑器" />

阵法的 `mxt:particle` 模块通过 `shape` 引用独立的 `mxt:formation_shape` 定义，客户端据此生成粒子。文件路径为 `data/<命名空间>/mxt/formation_shape/<名字>.json`。

编辑器用于绘制定义中的 `strokes`；`Copy JSON` 导出包含 `{"strokes": [...]}` 的完整定义。坐标以阵法半径为单位，`1` 对应阵法外环，因此同一图形可随阵法尺寸缩放。画布采用俯视视角：`+X` 向右（东），`+Z` 向下（南），北向上；坐标轴端点标注方位与坐标。

<div className="mxt-tool-open"><a href="/zh/docs/mod/mxt/tools/formation-figure-full" target="_blank" rel="noopener">在新窗口打开编辑器</a></div>

<MxtToolFrame tool="formation-figure" host="mxt-tool-formation" />

## 绘制操作 {#怎么画}

- **折线**：点击添加顶点，按 `Enter`、右键或双击完成一笔，按 `Esc` 取消当前笔画。
- **圆**：按下确定圆心，拖动设置半径。圆心可位于任意位置，阵心提供吸附点；完成后可拖动圆心或起点，调整位置、半径和朝向。
- **编辑**：拖动顶点调整形状；列表中的 `⇄` 反转笔画及其生长方向，`✕` 删除笔画；`Ctrl+Z` / `Ctrl+Y` 撤销或重做。
- **吸附**：支持 `0.05` 网格、外环（`r = 1`）与圆周 N 等分。等分射线从阵心出发，第 0 根指向正东，夹角为 `360/N` 度。外环与等分优先于网格，避免顶点再次取整。
- **生成器**：`Star N/K` 按 &#123;N/K&#125; 规则生成星形，每个闭合循环对应一笔。`5/2`、`6/2`、`8/2` 分别对应 `mxt:five`、`mxt:six`（两个三角形）、`mxt:eight`（两个正方形）；`K = 1` 为正 N 边形。`N-gon` 生成一笔闭合折线，`Rays` 生成 `N` 笔射线。生成操作均可撤销。
- **颜色**：每笔必须提供 `color`，可使用十六进制纯色或 `{"at": …, "color": …}` 渐变节点列表。`at` 沿笔画从起点至终点递增，范围外保持端点颜色。新笔使用 `new strokes` 中的颜色；选中笔画后，可点击工具栏下方的渐变条添加节点、拖动标记调整位置，或通过 `+ stop` / `− stop` 增删节点。
- **生长区间**：`start` / `end` 指定该笔在整体进度中生长的区间，且必须满足 `start < end`。例如 `start: 0.5` 表示从整体进度的后半段开始绘制；不同区间可实现依次生长。输入框会自动约束边界，防止区间交叉。
- **粒子间距与大小**：每笔独立设置 `spacing`（方块间距）与 `size`（粒子尺寸），默认分别为 `0.33` 和 `2`。等于默认值时，导出文件省略对应字段。

## 计算与预览 {#它在算什么}

- **点数**：每笔按 `ceil(笔画方块长度 / spacing) + 1` 计算，长度由预览 `radius` 换算。读数表示客户端单帧生成的点数需求；每笔上限为 `2048` 点，超出部分从末端截断，工具会显示提示。
- **生长进度**：每笔按自身区间截取进度，同区间的笔画同步生长。滑块控制整体进度；`Play` 按 `duration_ticks` 播放，以每秒 20 tick 计。
- **播放控制**：`speed`、`loop` 与计时器仅影响预览；`1×` 对应游戏原速，计时器显示 `已过 / duration_ticks`。`duration_ticks` 属于阵法模块，不写入图形定义。
- **线条显示**：`lines` 按当前进度描线，圆按角度、折线按弧长推进；关闭 `dust` 可仅显示线条。尚未绘制的部分以灰色轮廓保留，便于在任意进度下编辑。

## 导出格式 {#写出来的是什么}

```json
{
  "strokes": [
    {"type": "mxt:circle", "radius": 1, "color": [{"at": 0, "color": "#80c0ff"}, {"at": 1, "color": "#ffffff"}]},
    {"type": "mxt:polyline", "points": [[1, 0], [-0.809, 0.588], [0.309, -0.951], [0.309, 0.951], [-0.809, -0.588], [1, 0]], "color": "#ffd76a"}
  ]
}
```

`type` 必须包含命名空间。`"circle"` 会被解析为 `minecraft:circle`，导致定义加载失败；编辑器导入此类简写后会将其补全为 `mxt:circle` 再导出。

阵法半径 `radius` 和预览开关不写入定义，仅用于换算预览点数与粒子尺寸。

## 相关文档 {#接下来}

- [formation_shape（阵法图形）](../datapack/json/formation_shape.md)：字段、笔画属性与几何规则。
- [mxt:particle 模块](../datapack/types/other/formation-action.md)：`shape` 引用与 `duration_ticks` / `interval_ticks` 配置。
- [定义阵法](../tutorial/define-a-formation.md)：完整阵法配置示例。

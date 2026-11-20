---
title: 符箓笔画编辑器
description: 绘制 pattern.strokes，并检查符形的加载期约束。
hide_table_of_contents: true
---

import MxtToolFrame from '@site/src/components/MxtToolFrame';

# 符箓笔画编辑器

<span id="符箓笔画编辑器" />

`pattern.strokes` 是笔画列表，每笔由点列组成，坐标以固定 `90 × 210` 画布归一化至 `[0,1]²`。编辑器采用相同比例，以及默认纸色 `#FFFE85` 和笔迹色 `#FF0000`，与工作站画布一致。

<div className="mxt-tool-open"><a href="/zh/docs/mod/mxt/addons/talisman/tools/talisman-strokes-full" target="_blank" rel="noopener">在新窗口打开编辑器</a></div>

<MxtToolFrame tool="talisman-strokes" host="mxt-tool-talisman" />

## 绘制操作 {#怎么画}

- **折线**：点击添加顶点，按 `Enter`、右键或双击完成一笔，按 `Esc` 取消当前笔画。
- **手绘**：按住并拖动绘制，松开后按工具栏中的 ε 进行 Ramer-Douglas-Peucker 简化，减少冗余点。
- `Ctrl+Z` / `Ctrl+Y` 撤销或重做；列表支持删除单笔，`Clear` 清空画布。
- `Snap to whole pixels` 将坐标吸附至整数像素；`Grid` 显示网格；`Stroke order` 显示每笔起点与序号，对应游戏中的 `pattern.show_order: true`。
- `Load from JSON` 接受笔画数组或完整 `pattern` 对象。
- `Zoom` 仅调整显示倍率，画布仍为 `90 × 210`；`Decimals` 指定导出坐标的小数位数。

## 校验与读数 {#它在报什么}

- **笔画顺序与颜料**：列表显示单笔像素长度，默认每像素约消耗 1 点颜料。
- **形状校验**：单笔少于 2 点、超过 `256` 笔、单笔超过 `4096` 点或全部点重合时，定义会被加载器拒绝。编辑器提前报告这些问题。

评分会归一化平移与缩放，不归一化旋转。因此整体位置和尺寸不影响得分，方向偏差仍参与评分。重采样步长为 `2` 像素，简化阈值为 `0.5 × tolerance`（默认 `0.06` 时为 `6.3` 像素），更细的点列会被简化。

## 导出格式 {#写出来的是什么}

```json
[
  [[0.5, 0.05], [0.5, 0.95]],
  [[0.1, 0.5], [0.9, 0.5]]
]
```

导出的数组可直接作为 `pattern.strokes`。编辑器仅生成形状；`pattern.tolerance`、`pattern.guide`、`pattern.show_order`、`talisman`、`result` 与各档完成度仍需在配方中配置。

## 接下来 {#接下来}

- [talisman_drawing（符方）](../datapack/talisman_drawing.md) —— 符方的全部字段，含 `pattern` 与各档完成度。
- [写一张符方](../tutorial/author-a-talisman-drawing.md) —— 从一张符开始的完整流程。
- [画符判分](../technical/talisman-scoring.md) —— 判分如何重采样、如何归一化、如何算分。

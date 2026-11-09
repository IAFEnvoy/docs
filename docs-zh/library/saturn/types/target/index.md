---
title: "目标选择器"
sidebar_position: 0
---

用于技能的 target_selector。选择器取得候选后，技能仍会检查 target_condition。

| 类型 | 用途 |
| --- | --- |
| [`saturn:self`](./self.md) | 以使用者自身作为目标。 |
| [`saturn:area`](./area.md) | 在半径内选取目标，可控制数量和排序。 |
| [`saturn:ray`](./ray.md) | 沿使用者朝向选取射线附近的实体。 |
| [`saturn:cone`](./cone.md) | 在指定长度和角度的视锥内选取目标。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |

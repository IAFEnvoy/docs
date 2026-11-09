---
title: "卡片节点"
sidebar_position: 0
---

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

| 类型 | 用途 |
| --- | --- |
| [`system:text`](./text.md) | 显示文字、翻译组件或已有格式文本。 |
| [`system:markdown`](./markdown.md) | 解析 AI 回复中的受控 Markdown。 |
| [`system:title`](./title.md) | 显示标题文字，并允许宿主抽取为卡片主标题。 |
| [`system:image`](./image.md) | 显示资源包内的图片。 |
| [`system:item`](./item.md) | 渲染上下文中的物品快照，悬浮时显示物品提示。 |
| [`system:player`](./player.md) | 渲染上下文指定的玩家模型，可控制朝向、缩放和鼠标跟随。 |
| [`system:ftb_icon`](./ftb_icon.md) | 显示服务端快照中的 FTB 任务或奖励图标。 |
| [`system:flex`](./flex.md) | 横向或纵向组织子节点，可遍历集合并分页。 |
| [`system:grid`](./grid.md) | 只构建当前页的格子，按列数和最大行数计算分页容量。 |
| [`system:container`](./container.md) | 保存物品槽内容或布局子元素。 |
| [`system:groups`](./groups.md) | 从当前查询结果构造分组，选择后只显示组内内容。 |
| [`system:details`](./details.md) | 用可点击摘要展开或收起子节点。 |
| [`system:button`](./button.md) | 执行客户端回调、打开 URL 或向服务端发送字符串。 |
| [`system:link`](./link.md) | 使用原版 URL 确认流程打开链接。 |
| [`system:divider`](./divider.md) | 显示一条布局分割线。 |
| [`system:progress`](./progress.md) | 显示上下文提供的进度值。 |
| [`system:player_information`](./player_information.md) | 直接渲染 Saturn 信息文档，并按最低 importance 筛选。 |
| [`system:recipe`](./recipe.md) | 显示上下文中的单个有序配方与材料。 |

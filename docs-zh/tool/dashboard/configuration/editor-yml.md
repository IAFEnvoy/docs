---
sidebar_position: 8
title: editor.yml
description: 模组编辑器的预填选项——许可证、架构与标签
---

# editor.yml

为**模组元数据编辑器**（`/mod-editor.html`）提供下拉预填选项。每个选项列表都**可以从下拉中选择，也可以手动输入**——下面的值只是建议，并非白名单。

每次 `/api/config` 请求都会重新读取该文件，因此修改后刷新页面即可生效——无需重启服务。

## 完整示例

```yaml
# Prefill options for the mod editor
license_options:
  - MIT
  - LGPL-3.0
  - All Rights Reserved

architecture_options:
  - Fabric-Loom
  - Architectury-Loom
  - ModDevGradle
  - Stonecutter

tag_options:
  - Library
  - Addon
  - KubeJS
  - Adventure and RPG
```

## 字段

| 字段 | 类型 | 使用位置 |
|-------|------|---------|
| `license_options` | string[] | 许可证——单选建议列表 |
| `architecture_options` | string[] | 架构——多选；选中的值会变成带 `×` 的标签块，可移除 |
| `tag_options` | string[] | 标签——多选；选中的值会变成带 `×` 的标签块，可移除 |

多选字段同样支持自由输入——按 **Enter** 或 `,` 把自定义值添加为标签块。下拉列表会随输入过滤，并隐藏已选中的值。

:::tip 建议的默认值
仓库中的默认值是根据数据库中已有的模组，加上常见的 Minecraft 模组标签生成的。可以随意扩展——每个选项列表也接受任意自定义输入。
:::

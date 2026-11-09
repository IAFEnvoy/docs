---
sidebar_position: 1
---

# 创建自定义起源

本指南将带你为数据包创建一个全新的起源。

## 前置条件 {#prerequisites}

你应当已经有一个可用的数据包。如果你刚接触数据包，请先阅读 [Minecraft Wiki 教程](https://minecraft.wiki/w/Tutorials/Creating_a_data_pack)。

## 第 1 步：定义起源文件 {#step-1-define-the-origin-file}

在 `data/<namespace>/origins/origin/<id>.json` 创建 JSON 文件。本教程使用 `example:supermorph`，因此文件位于：

```
data/example/origins/origin/supermorph.json
```

下面是一个复用原版能力的最小起源：

```json title='data/example/origins/origin/supermorph.json'
{
  "powers": [
    "#example:supermorph"
  ],
  "icon": {
    "id": "minecraft:slime_ball"
  },
  "order": 4,
  "impact": 1
}
```

```json title='data/example/tags/origins/power/supermorph.json'
{
  "replace": false,
  "values": [
    "origins:fire_immunity",
    "origins:elytra",
    "origins:throw_ender_pearl",
    "origins:fresh_air"
  ]
}
```

`powers` 列表可以同时包含能力 ID 和标签。此例中，我们定义标签 `example:supermorph`，其中包含若干已有能力，从而创建一个能飞行、免疫火焰的起源。

:::tip
推荐使用标签，以获得更好的兼容性和可扩展性。

如果你在起源文件中直接列出能力，其他数据包就无法在不替换整个文件的前提下为你的起源添加或移除能力。使用标签时，它们只需在标签中添加或移除能力，而无需替换你的起源文件。
:::

<details>
<summary>起源 JSON 字段参考</summary>

import OriginFields from '../../json/field_table/_origin.mdx';

<OriginFields/>

</details>

## 第 2 步：添加翻译 {#step-2-add-translations}

名称和描述定义在**语言文件**中。创建一个资源包（或在数据包支持的情况下把它们放进其 `assets/` 目录）：

```json
// assets/origins/lang/en_us.json
{
  "origin.origins.supermorph.name": "Supermorph",
  "origin.origins.supermorph.description": "A flying, fire-immune creature that needs fresh air."
}
```

格式为 `origin.<namespace>.<path>.name` / `.description`。

如果你更愿意在起源文件本身设置名称，可以使用可选的 `name` 和 `description` 字段（作为文本组件），但推荐使用翻译键。

:::info

始终推荐使用默认翻译键。**但语言文件总是放在资源包中，这意味着你必须同时提供一个使用相同命名空间的资源包。**

默认情况下模组自带内置资源包和数据包，因此对模组来说使用翻译键没有问题。对于纯数据包，是否创建用于翻译的资源包由你决定。

如果你不想创建资源包，可以使用 `name` 和 `description` 字段直接指定文本，但这样它们就无法被本地化。

:::

## 第 3 步：将起源添加到起源层 {#step-3-add-the-origin-to-a-layer}

起源只有被列入**起源层**后才会在游戏内出现。默认起源层是 `origins:origin`。要将你的起源添加到该层，请创建：

```json title='data/origins/tags/origins/origin/origin.json'
{
  "replace": false,
  "values": [
    "example:supermorph"
  ]
}
```

要创建一个让玩家选择第二个起源的**独立**起源层：

```json title='data/example/origins/layer/second_origin.json'
{
  "order": 1,
  "origins": [
    "example:supermorph",
    "origins:human"
  ],
  "gui_title": {
    "choose_origin": "Choose your Second Origin"
  }
}
```

:::note
Fabric 版本中的旧 `replace` 字段已不存在。要覆盖已有起源层，只需在数据包中创建**相同 ID** 的文件：它会自动替换原有文件。

如果你不想替换整个文件，只需使用标签。这正是我们使用标签、而不是在起源层文件中直接列出所有起源的原因：它允许其他数据包添加自己的起源，而无需替换整个文件。
:::

## 第 4 步：测试 {#step-4-test}

将数据包加载到世界中并检查起源选择界面。如果起源没有出现：

1. 运行 `/datapack list` 确认数据包已加载。
2. 检查游戏日志中的 JSON 解析错误。
3. 确认你的起源文件位于 `origins/origin/`，而不是 `origins/`。

:::warning
修改后你不能使用 `/reload` 重新加载数据包，因为 Origins (NeoForge) 使用原版数据加载机制，而该机制不支持对数据文件热重载。你必须退出世界并重新进入才能看到改动。

如果你需要频繁重载来测试某些功能，并且懂一些 JavaScript，可以使用 [起源JS](../../js) 以 JavaScript 而非 JSON 定义起源。这样你就可以通过 `/reload` 重载数据包并立即看到改动。
:::

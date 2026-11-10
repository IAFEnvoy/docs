---
title: Plan 与界面设置
description: 方案字段、资源绑定、捕获输入、预设、完成条件与界面配置。
sidebar_position: 1
---

文件为 `data/<namespace>/spb/plan/<path>.json`。Plan 定义完整开局流程；最小示例见[入门教程](./index.md)。Plan 没有数据格式版本字段。

## Plan 字段

| 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `title` | 文本组件 | 否 | 不显示 | 顶部标题及旁白标题，不回退到模组名 |
| `description` | 文本组件 | 否 | 无 | 方案说明；当前主界面不绘制顶部说明 |
| `activation` | 对象 | 否 | 见下表 | 自动开启条件与优先级 |
| `inputs` | 名称 → NumberProvider | 否 | `{}` | 会话创建时捕获的外部数值 |
| `resources` | ResourceBinding 数组 | 是 | — | 本方案使用的 Saturn 资源 |
| `presets` | Preset 数组 | 否 | `[]` | 左侧预设 |
| `groups` | ID 或 `#tag` 数组 | 是 | — | 按顺序引用 Group |
| `completion_rules` | 完成规则数组 | 否 | `[]` | 确认时必须全部通过的条件 |
| `outcomes` | [Outcome](./rewards.md) 数组 | 否 | `[]` | 按最终状态产生的奖励 |
| `ui` | 对象 | 否 | 见下表 | 界面尺寸与关闭规则 |

文本组件建议显式写为 `{"text":"文字"}` 或 `{"translate":"example.plan.title"}`。裸字符串按翻译键处理。翻译文件放在客户端资源包，例如 `assets/example/lang/zh_cn.json`。

## 自动开启

| `activation` 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `on_first_join` | 布尔值 | 否 | `false` | 登录时向未完成此方案的玩家提供界面 |
| `priority` | 整数 | 否 | `0` | 多个方案适用时，值较大的优先 |
| `condition` | Saturn EntityCondition | 否 | 始终通过 | 自动入口读取玩家真实状态的条件 |

优先级相同时按方案 ID 升序选择，不同时编辑多个方案。完成当前自动方案后，下一个适用方案会在后续登录时提供。显式命令或 action 可以指定非自动方案；`activation.condition` 是自动入口的筛选条件。

## 资源绑定

| ResourceBinding 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `resource` | Saturn resource ID | 是 | — | 已定义的资源，方案内不可重复绑定 |
| `initial` | NumberProvider | 否 | 当前真实值 | 仅创建新会话时求值 |
| `quantum` | 有限正数 | 否 | `1` | 最小单位，如 `0.25`；用于精度检查 |
| `commit` | `replace` / `discard` | 否 | `replace` | 确认时写回最终值，或只用于草稿 |
| `display` | 布尔值 | 否 | `true` | 是否显示于底部资源栏 |
| `name` | 文本组件 | 否 | 自动翻译键 | 显示名称，省略时使用 `spb.resource.<namespace>.<path>` |

```json
{
  "resources": [
    {"resource": "example:points", "initial": 8, "name": {"text": "点数"}},
    {"resource": "example:strength", "name": {"text": "力量"}},
    {"resource": "example:preview", "commit": "discard", "display": false}
  ]
}
```

上述是 Plan 的字段片段，引用的三种资源须另行定义。公式使用 ID 自动生成的名字，例如 `base_example_points` 和 `resource_example_points`，不配置资源 `key`。

每次编辑从冻结基准和完整选择集重算，草稿不直接修改玩家真实资源。只有确认成功才写入 `replace` 资源。`discard` 资源也参与贡献、边界和精度检查，但不写回。

资源物理上下限取自 Saturn 定义。超支、越界或不符合 `quantum` 时阻止提交，不通过截断余额使其合法。需要小数时同时检查资源默认值、贡献和最终余额能否对齐单位。首个绑定资源是选项价格行的主货币；其他减少的资源保留负号显示。

重置保留基准；重新打开保留已保存草稿；刷新使用当前真实资源，不再计算 `initial`。建议为开局预算使用独立资源，避免其他玩法在编辑期间修改同一余额。

## 捕获输入

```json
{
  "inputs": {
    "bonus": 2,
    "roll": {"type": "saturn:uniform", "min": 1, "max": 4}
  }
}
```

`inputs` 保留人为名称，公式读取 `input_bonus`、`input_roll`。名字不能为空，且只能使用 Saturn 变量名允许的字母、数字和下划线。新会话时求值并保存，点击、重置和重连不重新抽取；显式刷新会重新捕获。

输入和 `initial` 求值发生在选择编辑之前，不应依赖最终草稿变量。其他 [NumberProvider](../../../library/saturn/types/number/index.md) 可用于读取真实玩家状态。

## 预设

| Preset 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `name` | 文本组件 | 是 | — | 列表名称 |
| `description` | 文本组件 | 否 | 无 | 预设说明 |
| `icon` | Saturn IconReference | 否 | 无 | 图标，如 `{"id":"minecraft:iron_sword"}` |
| `selections` | 完整 Option ID → 非负整数 | 否 | `{}` | 整套选择；省略项为 `0` |

预设没有 `key` 字段，按列表位置自动编号 `preset_1`、`preset_2`……。重排列表会改变编号；内容相同的预设允许重复出现。

应用预设整体替换草稿，不修改基准。引用、硬上限、单选结构和候选可用性检查失败时保留原草稿；点数或动态数量等完成规则不通过时，可以作为待修正草稿保留。

## 完成规则

| 完成规则字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `key` | 非空字符串 | 是 | — | 诊断标识 |
| `condition` | Saturn EntityCondition | 是 | — | 必须通过的条件 |
| `message` | 文本组件 | 否 | 包含 key 的失败提示 | 未通过时显示 |

多个规则全部通过才可确认，资源边界、组和选项限制也必须通过。正好为零、余额非负或区间条件见[公式与比较条件](./formulas.md)。

## 界面设置

| `ui` 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `preset_sidebar_width` | 整数，GUI 逻辑像素 | 否 | `100` | 左侧预设栏的期望宽度，布局会按屏幕宽度限制 |
| `max_width` | 整数，GUI 逻辑像素 | 否 | `0` | 正数限制窗口最大宽度；`0` 使用当前逻辑屏幕 |
| `max_height` | 整数，GUI 逻辑像素 | 否 | `0` | 正数限制窗口最大高度；`0` 使用当前逻辑屏幕 |
| `allow_close_before_complete` | 布尔值 | 否 | `false` | 是否允许确认前保存并关闭 |

屏幕尺寸已受 Minecraft GUI scale 换算，不是物理像素。默认锁定关闭，达到点数条件仍需确认；设为 `true` 后关闭也要等服务端回执。打开期间伤害保护始终由服务端处理，无单独配置项。没有预设时隐藏左栏。

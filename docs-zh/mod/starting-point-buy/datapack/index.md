---
title: 制作第一个数据包
description: 用一份资源、一组选项和一个完成规则建立最小加点方案。
sidebar_position: 0
---

本教程制作 `example:first_start`：玩家获得 4 点预算，购买 4 份训练后余额为零，才能完成。每份训练消耗 1 点。需要先安装[开局加点界面与 Saturn](../install.md)。

## 文件结构

```text
first-start/
├── pack.mcmeta
└── data/example/
    ├── saturn/resource/points.json
    └── spb/
        ├── plan/first_start.json
        ├── group/training.json
        └── option/train.json
```

Plan 组织资源、预设、组、完成规则和奖励；Group 管单选/多选与数量；Option 管每份选择的资源变化和效果。文件路径确定注册 ID，三个定义都不配置手写 `key`。

## 1. 数据包信息

Minecraft 26.1.2 的数据包格式为 `101.1`。将以下文件放在数据包顶层：

```json title="pack.mcmeta"
{
  "pack": {
    "description": "开局加点界面入门示例",
    "min_format": [101, 1],
    "max_format": [101, 1]
  }
}
```

## 2. 定义点数资源

```json title="data/example/saturn/resource/points.json"
{
  "default_value": 4,
  "min": -100,
  "max": 100,
  "icon": {"id": "minecraft:gold_nugget"}
}
```

`example:points` 是 Saturn resource。允许负的物理下限可以让界面表达透支；是否允许完成由 Plan 的规则决定。资源完整字段见 [Saturn 资源定义](../../../library/saturn/data/resource.md)。

## 3. 定义训练选项和组

```json title="data/example/spb/option/train.json"
{
  "name": {"text": "训练"},
  "description": {"text": "每份消耗 1 点，最多选择 4 份。"},
  "icon": {"id": "minecraft:iron_sword"},
  "hard_max": 4,
  "resource_changes": {"example:points": -1}
}
```

```json title="data/example/spb/group/training.json"
{
  "title": {"text": "训练"},
  "mode": "multiple",
  "count_mode": "total",
  "options": ["example:train"]
}
```

所有选项都有非负整数数量，`0` 表示未选。`hard_max: 4` 使此项可重复购买；`count_mode: total` 按份数统计组计数。

## 4. 定义方案

```json title="data/example/spb/plan/first_start.json"
{
  "title": {"text": "选择你的开局"},
  "resources": [
    {"resource": "example:points", "name": {"text": "剩余点数"}}
  ],
  "presets": [
    {"name": {"text": "训练开局"}, "selections": {"example:train": 4}}
  ],
  "groups": ["example:training"],
  "completion_rules": [
    {
      "key": "spend_all",
      "condition": {
        "type": "spb:compare",
        "left": "resource_example_points",
        "operator": "==",
        "right": 0
      },
      "message": {"text": "请花完全部点数。"}
    }
  ],
  "ui": {"allow_close_before_complete": true}
}
```

`resource_example_points` 来自完整 ID `example:points`，不需要另写别名。完成规则的 `key` 用于诊断，仍需配置。教程允许提前关闭；删掉这项 UI 设置后，默认必须确认才能关闭。

## 5. 进入游戏验证

将 `first-start/` 放入世界的 `datapacks/`，重新进入世界，运行 `/spb open example:first_start`。选择 4 份训练或左侧预设：余额应为 `0`，确认按钮可用。确认后真实 Saturn 点数变为 `0`。

需要再次测试时使用管理员命令 `/spb unlock <玩家名> example:first_start`；它会恢复当前已提交会话的资源基准。多人服务器中的数据包只放在服务端。

## 扩展目录与引用

| 路径 | 内容 |
| --- | --- |
| `data/<namespace>/spb/plan/<path>.json` | 开局方案 |
| `data/<namespace>/spb/group/<path>.json` | 选项组 |
| `data/<namespace>/spb/option/<path>.json` | 选项 |
| `data/<namespace>/tags/spb/group/<path>.json` | Group tag |
| `data/<namespace>/tags/spb/option/<path>.json` | Option tag |
| `data/<namespace>/saturn/resource/<path>.json` | Saturn 资源 |
| `data/<namespace>/saturn/ability/<path>.json` | Saturn 能力 |

Plan 的 `groups` 和 Group 的 `options` 支持 ID 与 `#tag` 混排，例如 `["example:training", "#example:extra_groups"]`。直接引用保持顺序，tag 成员按 ID 排序，并按 ID 去重。同一 Plan 内，一个 Option 只能归属一个 Group；不同 Plan 可以复用它。

这些引用必须存在；缺失资源、能力、组、选项或所引用 tag 都会拒绝加载世界，未被 Plan 使用的非法 Group/Option 也会被检查。修改后重进世界，不依赖 `/reload`。

---
title: 战士与学者示例
description: 下载经过测试的多资源联动方案，检查职业、天赋、属性与奖励。
sidebar_position: 5
---

此示例来自当前测试模组中已通过 GameTest 的 `example:default`，包含 3 种资源、4 个组选项、2 个预设、能力与延后动作。下载包只包含这套示例，不需要安装 test-mod。

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href={useBaseUrl('/resources/starting-point-buy/example-26.1.2-datapack.zip')} download data-no-link-preview>下载数据包</a>

<a href={useBaseUrl('/resources/starting-point-buy/example-26.1.2-resources.zip')} download data-no-link-preview>下载中英文资源包</a>

## 安装和打开

1. 安装 Minecraft 26.1.2 对应的开局加点界面和 Saturn 1.3。
2. 将数据包 ZIP 放入测试世界的 `datapacks/`，将资源包 ZIP 放入客户端 `resourcepacks/` 并启用。
3. 重新进入世界。尚未完成的玩家会自动打开方案，也可以运行 `/spb open example:default`。
4. 选择战士开局或学者开局，检查底部余额，然后确认。

资源包提供示例翻译；未启用时可能显示翻译键。方案默认必须确认后才能关闭，打开期间忽略伤害。示例与 test-mod 使用相同的 `example` 命名空间，不需要同时安装两份相同内容。入门教程也使用 `example:points`，建议在独立测试世界中分别体验，避免同名资源覆盖。

## 数据目录

```text
data/example/
├── saturn/resource/{points,fate,strength}.json
├── saturn/ability/{sword_training,archery,alchemy,strong_body}.json
└── spb/
    ├── plan/default.json
    ├── group/{profession,talents,attributes,drawbacks}.json
    └── option/{warrior,scholar,archery,alchemy,strength,indebted}.json
```

初始 points 为 `8`，fate 为 `2`，strength 为 `0`。这来自资源默认值；已有玩家未必仍为这些值，Plan 不会在每次打开时重新赠送默认点数。

| 选项 | 每份点数变化 | 其他变化或联动 |
| --- | --- | --- |
| warrior | `-2` | 力量 `+1`，弓术折扣，力量可买 4 份 |
| scholar | `-1` | 天赋名额从 1 变为 2，力量最多 2 份 |
| archery | `-3 + selected_example_warrior` | 命运 `-1` |
| alchemy | `-2` | 命运 `-1` |
| strength | `-1` | 力量 `+1` |
| indebted | `+2` | 命运 `-1`，作为返还预算的缺陷 |

职业是必选单选组；天赋和缺陷是多选；属性组按总份数计数。完成时要求点数恰好为 `0`，命运非负，还须符合所有数量和资源限制。

## 对照计算

| 选择 | points / fate / strength | 预期 |
| --- | --- | --- |
| warrior + strength×4 + archery | `0 / 1 / 5` | 可完成 |
| scholar + strength×2 + archery + alchemy | `0 / 0 / 2` | 可完成 |
| scholar + strength×4 + archery | `0 / 1 / 4` | 力量购买份数超过上限 2，不可完成 |

战士开局点数为 `8 - 2 - 4 - 2 = 0`；力量为 `0 + 1 + 4 = 5`。战士提供剑术训练，弓术提供对应能力，最终力量达到 4 又触发强健体魄；战士奖励还会延后发放 2 个面包和欢迎消息。

第三行说明余额符合并不足以通过，动态数量规则也必须满足。先应用战士预设，再改选学者，可以在界面中复现该状态。

## 修改时检查

- 预设没有 `key`，第一项编号为 `preset_1`，第二项为 `preset_2`。
- 公式使用完整 ID：`selected_example_warrior`、`resource_example_points`、`group_example_talents_distinct`。
- Plan 的 `title` 可省略，省略时不显示顶部标题；它不是格式版本号。
- 动作、Outcome 和规则仍保留自己的稳定 `key`。
- 改动后退出并重进世界，已提交动作保持冻结结果。重复体验可使用[管理员解锁命令](../usage.md)。

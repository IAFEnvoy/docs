---
title: 寿元
description: Reincarnation 寿元账本、在线老化、耗尽后果与 MiXianTu 修炼保留规则。
---

# 寿元

<span id="寿元" />

Reincarnation 为可选联动。安装后由它管理寿元和转世，MiXianTu 显示寿元信息行；数据包可在突破成功行为中配置增减寿元。未安装时修炼照常运行，寿元联动内容须按加载条件排除。两项数字均以游戏刻记录：剩余寿元与本世累计获授寿元。默认每 24000 刻显示为一岁，这只是显示比例。

## 数字从哪里来 {#数字从哪里来}

| 来源 | 行为 |
| --- | --- |
| Reincarnation 初始寿元设置 | 启用自动寿元后为玩家开账；默认 1440000 刻，显示 60 岁；0 不自动开账 |
| [境界阶段](../datapack/json/realm_stage.md) 的 `success_action` | 配置寿元行为后，成功抵达该阶段时执行；支持与其他成功行为组成数组 |
| `reincarnation:add_lifespan` / `reincarnation:remove_lifespan` | 使用非负数量增减寿元；增加同时提高剩余和总额，扣除只影响剩余 |
| [指令](./commands/lifespan.md)与 [ReincarnationLifespan](../kubejs/api/lifespan.md) | 管理员或服务端脚本写入 |

没有账本时读取为未记账，不自动给所有生物建账。零增量不建账，减寿最低扣到 0。关闭账本后可以用 set/add 再授予有限寿元。

## 服务端怎么结算 {#服务端怎么结算}

自然老化默认关闭。Reincarnation 服务端的「寿元 → 启用寿元」控制自动开账、结算与提醒，显式指令、行为和脚本写入始终可用。

默认每 20 游戏刻扣除 20 寿元刻；在线且被 tick 的实体才结算，离线不补扣。创造、旁观默认不老化，可分别开启。剩余比例达到或低于提醒阈值时，聊天栏提示一次。

## 耗尽之后 {#耗尽之后}

Reincarnation 服务端的「寿元 → 耗尽后果」决定后果。

| 选择 | 行为 |
| --- | --- |
| `none` | 关闭账本，不自动倒计时；发布耗尽通知 |
| `death` | 按「玩家寿尽身死方式」正常击杀或转为旁观；非玩家正常击杀 |
| `reincarnate` | 按「玩家转世方式」完整换世或原地重置；非玩家始终原地重置 |

正常击杀使用 `reincarnation:lifespan` 伤害类型，触发死亡流程；在 `mxt:no_bonus` 标签内，不参与元素伤害加成。普通死亡重生保留同一世账本。开启 Reincarnation 的死亡自动转生时，正常死亡后的重生也会开始新世。

完整换世会归档前世、推进世代、替换玩家，并按初始配置重开寿元；原地重置保持对象和世代，只重开寿元及按下面的规则处理修炼数据。转世请求在服务端 tick 末尾执行，指令或脚本返回接受不等于已完成。

耗尽前 `lifespanEnd.Pre` 可取消：在回调中写入正数即续命，未续命的取消会关闭账本，避免反复耗尽。转世还经过 `lifespanRebirth.Pre`，可单独取消；完成与失败分别通过 Post、Failed 通知。见 [ReincarnationEvents](../kubejs/api/reincarnation_events.md)。

## 人物信息面板 {#人物信息面板}

人物信息面板的寿元行与 Reincarnation 前世档案共用数据。未记账时隐藏，账本关闭时显示不受限；有限账本在关闭自然老化后仍可查询。显示为「当前年龄 / 总寿元」，年龄由总额减剩余计算，从 0 正向增长；增寿只提高上限，年龄不变，新世年龄归零。两项按 Reincarnation 的「每岁刻数」换算，设为 1 显示刻数。完整换世后的前世保持归档时的寿元。

## 服务端配置 {#服务端配置}

### Reincarnation 寿元 {#reincarnation-寿元}

以下条目均在 Reincarnation 服务端的「寿元」页。

| 条目 | 默认 | 作用 |
| --- | --- | --- |
| 启用寿元 | 关 | 自动开账、结算与提醒 |
| 初始寿元（刻） | 1440000 | 初始及新世寿元，0 不自动开账 |
| 结算周期 | 20 | 两次结算间隔 |
| 每次流逝 | 20 | 每次扣除量，0 不自然老化 |
| 耗尽后果 | 身死 | none / death / reincarnate |
| 玩家寿尽身死方式 | 击杀 | 正常击杀或切旁观 |
| 玩家转世方式 | 完整换世 | 完整换世或原地重置 |
| 提醒阈值 | 0.1 | 剩余比例向下跨过时提醒，0 禁用 |
| 每岁刻数 | 24000 | 仅显示换算，1 显示刻 |
| 创造模式流逝 | 关 | 创造玩家是否结算 |
| 旁观模式流逝 | 关 | 旁观玩家是否结算 |

### Reincarnation 数据保留 {#reincarnation-数据保留}

完整换世和原地重置都由 Reincarnation 统一清理附件。境界修为、子境界、天劫、灵根体质、功法和魂四项默认清空。原地重置保留实体和世代；原版背包、经验和进度只在完整换世时重置。

| Reincarnation 条目 | 默认 | 作用 |
| --- | --- | --- |
| 寿元 → 原地重置时击杀 | 关 | 原地重置完成后使用寿元伤害击杀；完整换世不额外击杀新玩家 |
| 转生重置 → 清空资源数值 | 开 | 清空 Saturn 数值资源；关闭时保留资源附件 |

用 `reincarnation:keep_on_rebirth` 选择要继承的附件，附件本身也必须支持死亡复制。例如，数据包可保留灵根体质、功法和魂四项：

`data/reincarnation/tags/neoforge/attachment_types/keep_on_rebirth.json`

```json
{
  "replace": false,
  "values": ["mxt:spirit_identity", "mxt:technique", "mxt:soul_stats"]
}
```

还可选择 `mxt:cultivation`、`mxt:minor_stages`、`mxt:tribulation` 和 `saturn:resource_holder`。资源附件在标签内时，即使开启清空资源也会保留。「重置未知模组数据」优先于标签与资源保留。完整换世将附件名单固定在归档中，恢复时不重新读取后续标签和配置。

灵草补算使用服务端配置「炼丹 → 灵草单次补算上限（刻）」，默认 24000，独立于寿元显示比例。

## 相关 {#相关}

- [实体行为](../datapack/types/action/entity_action_types.md)：增减寿元、关闭账本与转世。
- [实体条件](../datapack/types/condition/entity_condition_types.md)：寿元数值、账本状态与玩家世代。
- [公式变量](../datapack/types/formula_variables.md)：`lifespan_remaining` / `lifespan_total`；负值哨兵返回 NaN。
- [ReincarnationLifespan](../kubejs/api/lifespan.md)、[事件](../kubejs/api/reincarnation_events.md)与[指令](./commands/lifespan.md)。

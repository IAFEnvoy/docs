---
title: 寿元联动
description: 将转生接入觅仙途的人物面板、突破与修炼数据。
---

# 寿元联动

<span id="寿元" />
<span id="服务端怎么结算" />
<span id="耗尽之后" />
<span id="人物信息面板" />
<span id="服务端配置" />
<span id="reincarnation-寿元" />
<span id="相关" />

[转生（Reincarnation）](../../reincarnation/index.md)是可选联动模组。玩家已有寿元账本时，觅仙途人物面板会显示转生提供的寿元行。[老化规则和寿元设置](../../reincarnation/lifespan.md)、[档案与管理指令](../../reincarnation/commands.md)及[脚本接口](../../reincarnation/kubejs.md)均由转生提供。

## 突破增减寿元 {#数字从哪里来}

可在[境界阶段的 `success_action`](../datapack/json/realm_stage.md)中配置突破成功后的增寿或减寿。数据包如果同时支持未安装转生的环境，应限制使用寿元行为的内容仅在安装转生时加载。

## 转生时的修炼数据 {#reincarnation-数据保留}

按默认重置策略，转生会清除觅仙途的境界与修为、子境界、进行中的天劫、灵根与体质、功法和灵魂数值。下例通过[转生的附件保留标签](../../reincarnation/datapack.md#attachment-retention)保留灵根与体质、功法和灵魂数值。

```json title="data/reincarnation/tags/neoforge/attachment_types/keep_on_rebirth.json"
{
  "replace": false,
  "values": ["mxt:spirit_identity", "mxt:technique", "mxt:soul_stats"]
}
```

要保留境界与修为、子境界或天劫状态，可分别添加 `mxt:cultivation`、`mxt:minor_stages` 或 `mxt:tribulation`。Saturn 数值资源是否保留，以及标签是否生效，取决于[转生的重置配置](../../reincarnation/index.md#reset-settings)。

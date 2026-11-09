---
title: "模块类型"
sidebar_position: 0
---

写入模块定义的 server 对象，以 type 选择实现。系统的 modules 引用模块配置 ID，不能直接放实现类型对象。公共结构见[模块定义](../../data/module.md)。

| 类型 | 用途 |
| --- | --- |
| [`system:core`](./core.md) | 提供执行账本、权限和核心状态管理。 |
| [`system:binding`](./binding.md) | 提供系统绑定与基础管理入口。 |
| [`system:usage`](./usage.md) | 提供 AI 和联网请求用量查看入口。 |
| [`system:player`](./player.md) | 提供玩家资料查询与宿主信息卡片。 |
| [`system:items`](./items.md) | 查询物品和配方来源，生成物品与来源卡片。 |
| [`system:signin`](./signin.md) | 提供签到、奖励选择及奖励入账。 |
| [`system:inbox`](./inbox.md) | 展示待领取权益并执行物品交付。 |
| [`system:shop`](./shop.md) | 浏览商品、预览费用并经确认购买。 |
| [`system:lottery`](./lottery.md) | 浏览奖池、预览概率并经确认抽奖。 |
| [`system:advancement`](./advancement.md) | 监听 system-advancements.json 规则，执行解锁标记与固定奖励工作流。 |
| [`system:ftb_quests`](./ftb_quests.md) | 提供任务查询、详情、提交、领奖、礼包和说明书检索。 |
| [`system:web_search`](./web_search.md) | 提供显式授权后的 DeepSeek Search 与 Fetch 能力。 |

---
title: 界面与多人游戏规则
sidebar_position: 7
---

# 界面与多人游戏规则

## `FND-01` - 注册与数据生成 {#fnd-01}
**配置：** `None`

MITE 的内容使用 NeoForge 注册表，而生成的方块与物品标签让土壤交互、传送门地基、牲畜放牧与材料修理等共享行为与已注册内容保持一致。

## `FND-02` - 持久化玩法状态 {#fnd-02}
**配置：** `Enforce server authority`

营养、合成、职业、装备状态、牲畜状态、世界进度与归属会按各自规则在死亡或重启后保留。必需的数据会被序列化并同步，而不是只存放在客户端界面中。

## `FND-03` - 服务器权威规则 {#fnd-03}
**配置：** `Enable multiplayer rules`; `Enforce server authority`

采集、战斗、合成完成、营养、归属与传送都由服务器裁决。客户端界面只显示同步后的状态，无法授予资格或完成受保护的操作。

## `FND-04` - 配置、重载与验证 {#fnd-04}
**配置：** `None`

单人游戏与专用服务器使用相同的配置与规则加载器。无效的外部定义会连同其来源一起报告，可重载的数据通过受支持的重载路径刷新，自动化测试覆盖关键的服务器行为。

## `FND-05` - 非生存模式限制 {#fnd-05}
**配置：** `Restrict non-survival game modes`; `Non-survival game mode permission level`

MITE 把创造模式及其他非生存模式保留给开发用途。服务器可以要求玩家具备某个管理员权限等级才能离开生存模式，从而防止普通的流程被绕过。

## `FND-06` - 带版本的网络状态 {#fnd-06}
**配置：** `Enforce server authority`

自定义玩法状态使用带类型、版本兼容且由服务端校验的 NeoForge 载荷。营养、合成、符文之门、统计数据、归属以及其他同步系统都不接受客户端任意提交的完成或变更请求。

## `UX-01` - HUD、提示框与视觉效果 {#ux-01}
**配置：** `Show survival HUD`; `Show detailed tooltips`; `Show nutrition button in inventory`; `Show Rune Gate transition effects`; `Show witch curse HUD`; `Render special moon colors and halos`

客户端设置控制生存 HUD、食物详情、营养入口、符文之门过渡、诅咒显示以及特殊月相配色。它们只改变呈现方式，不会改变服务器的玩法。

## `UX-02` - 引导式进度 {#ux-02}
**配置：** `None`

进度引导玩家完成第一天生存、金属流程、冥界与下界，既不会取代自主探索，也不会暴露内部实现细节。

## `UX-03` - 受限的调试信息 {#ux-03}
**配置：** `Show full debug information in development`

正式游玩时 F3 输出被限制为允许的信息。在开发环境中运行的客户端可以选择启用完整的现代调试显示，而无需更改服务器规则。

## `UX-04` - 保险箱归属 {#ux-04}
**配置：** `Enable strongboxes`; `Enforce server authority`

保险箱会保存其所有者的 UUID 并拒绝未经授权的访问。创造模式的覆盖与村庄所属的容器会被显式处理，而 Jade 可以显示归属与访问状态。

## `UX-05` - 遮挡反馈 {#ux-05}
**配置：** `Require clear access to production blocks`; `Require clear space above workbenches`

当所需的净空被阻挡时，工作台、铁砧、熔炉、保险箱与附魔台会拒绝使用。具体的提示会说明需要清理的是顶部还是熔炉正面。

## `UX-06` - 收藏品与创造模式内容 {#ux-06}
**配置：** `Enable MITE enchantment effects`; `Enable MITE mobs`

专门的创造模式标签页包含 MITE 的方块与物品、刷怪蛋、附魔书、音乐唱片、参考书以及全部符文石图案。已注册的内容仍可通过受支持的配方与信息查看器搜索。

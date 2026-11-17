---
title: 可扩展轮盘
sidebar_position: 4
---

Saturn 提供原版 Screen 轮盘、单池配置界面、12 格主盘、自动分页、快捷键与 HUD。轮盘不依赖 AUI。界面条目负责显示，服务端注册的类型负责执行。

## 注册类型与来源

公共接口位于 `com.iafenvoy.saturn.api.wheel`。在两端模组初始化时分别调用 `WheelEntryKinds.register(kind)` 和 `WheelSourceTypes.register(source)`。

| 契约 | 主要成员 | 职责 |
| --- | --- | --- |
| `WheelEntryKind` | `id`, `displayName`, `holdsEntry`, `exists`, `trigger`, `directed` | 按 id 解析条目，服务端执行；默认不支持定向状态请求 |
| `WheelSource` | `id`, `displayName`, `configured`, `grantSources`, `equipment`, `offers` | 描述来源，并校验条目当前是否仍可从这里触发 |
| `WheelMenuEntry` | `kind`, `id`, `title`, `icon`, `accentColor`, `tooltip`, `cooldownTicks`, `cooldownLength`, `usable` | 客户端展示数据；不可用只影响显示，服务端仍会校验请求 |

内建 kind 为 `saturn:empty` 和 `saturn:ability`。能力条目使用已经授予玩家且实现 `Togglable` 的能力。内建 source 为 `saturn:configured`、`saturn:main_hand`、`saturn:off_hand`、`saturn:equipped`。最后一种通过 `AbilityHooks.equippedItems` 读取扩展装备，物品承载的能力通过 `AbilityHooks.itemAbilities` 解析。

同一 kind 或 source id 首次注册生效。来源按注册顺序分页；网络按 id 寻址。每页最多12格，主盘始终有12格；派生来源按条目数量自动拆页，空来源不占页。

## 注册客户端内容

在客户端初始化的 `enqueueWork` 中注册，专用服务端不要加载展示实现：

```java
WheelContent.register(myKind, player -> myConfigurableEntries(player));
WheelMenuContent.register(mySource, (player, source) -> myDerivedEntries(player));
AbilityWheelTooltips.register(myOwner,
        (player, ability, carrier, lines) -> lines.add(myExtraDescription(ability)));
```

以上是接入片段，`my*` 由消费方提供；两个客户端注册入口分别位于 `screen.wheel.content` 与 `screen.wheel`。类型、来源注册入口位于 `runtime.wheel`。

`WheelEntryProvider.options(player)` 提供统一配置池，按 kind id + entry id 去重；`available(player)` 默认返回同一集合，可重写以解析不允许新配置但仍有效的旧槽位。`WheelMenuProvider.entries` 返回来源条目，可超过12格，也可用 `null` 表示空格。

候选提供者同一 kind 首次注册生效；页面提供者同一 source 后注册替换。Tooltip 提供者按 owner 替换，并按 owner id 顺序追加。提供者应只读取当前状态，避免昂贵的每 tick 操作。

## 服务端执行

普通与定向请求都先检查类型存在性与来源 `offers`，再交给 `trigger` 或 `directed`。不要相信客户端展示的状态。自定义类型必须在执行处再次校验权限和业务前提。

能力类型复用统一激活入口，检查授予、前置条件、消耗与冷却；主盘包含某能力不等于授予它。定向请求在已经达到目标状态时不重复切换，也必须通过授予与来源检查。

`WheelLayout` 保存12个 `WheelSlot(kind, id)`。短列表补空、长列表截断、非法或未知类型为空；服务端保存时清除已不存在的定义。布局和选中编号由服务端玩家附件保存及同步，快捷槽编号按当前页面解释。

## 玩家操作

`R` 打开选择，`V` 使用，左右方向键或滚轮切页。`/wheel` 或 `/wheel configure` 打开配置；配置键和12个槽位键默认未绑定。除槽位1–12单独放在「Saturn：轮盘槽位」外，其余按键都在「Saturn」主分类。

配置界面上方只有一个候选池，可滚轮或拖动滚动条；下方12格保留颜色条。左键选候选再点槽位放入，右键清空；关闭时保存。窗口较窄时槽位会换行。主盘12格全空时，HUD 只隐藏主盘，自动识别到的从盘技能继续显示并从顶部排列；配置主盘后恢复其12格，清空后再次隐藏。HUD 布局编辑器仍提供占位框。

Saturn 客户端配置的 `wheel.hold`、`wheel.scroll_switch`、`wheel.wrap_pages` 默认均为 `true`，分别控制按住打开、滚轮切页与循环翻页。

---
title: 轮盘条目
---

<span id="轮盘条目" />

MiXianTu 使用 Saturn 的轮盘、按键、布局同步和原生 Screen。通用接入方式见 [Saturn 可扩展轮盘](../../../library/saturn/development/wheel.md)。MiXianTu 在同一套注册接口上增加灵气、契约行为，以及技能的元素、学习来源和法器品质说明。

## 主盘与从盘的编号 {#主盘与从盘的编号}

主盘为玩家配置的12格；主手、副手、扩展装备与契约灵兽按当前内容生成从盘，每12格自动分页。每页占12个编号，页内从0起按顺时针排列，首格位于正上方。空的派生来源不占页，主盘始终保留。

Saturn 提供 `saturn:configured`、`saturn:main_hand`、`saturn:off_hand`、`saturn:equipped`。MiXianTu 增加 `mxt:contract`，由当前御兽铃选中的契约对象决定可用行为。

## 需要按键的技能（`Togglable`） {#toggable}

内建 `saturn:ability` 条目只列出已授予且实现 `Togglable` 的能力。主动技能、定向技能、法器开关和储物能力继续走统一能力激活入口，业务内容不在界面重复结算。

MiXianTu 另外注册 `mxt:aura` 与 `mxt:behavior`：前者调用灵气发射规则，后者调用契约命令。为新内容添加轮盘能力时，先实现相应 kind 与 source，再单独注册客户端展示提供者。

## 12 格从哪来 {#_12-格从哪来}

通过 `/wheel` 配置主盘。所有 kind 的候选在一个可滚动网格中合并，按 kind id 与条目 id 去重。仅由当前双手物品授予的技能留在手持页；护甲、扩展装备与学习得到的技能可配置到主盘，灵气还需满足自身的发射条件。

客户端 `WheelEntryProvider` 区分可选候选与可解析的已存条目；派生页通过 `WheelMenuProvider` 提供。注册示例和替换规则见 Saturn 文档。

## 扇区里画什么 {#扇区里画什么}

条目使用 `com.iafenvoy.saturn.api.wheel.WheelMenuEntry` 描述名称、图标、颜色条、tooltip、冷却和可用状态。它只提供显示数据。输入统一发送请求，条目不再自行绑定发送回调。

MiXianTu 用 `AbilityWheelTooltip` 追加业务说明；额外说明不会替换 Saturn 的冷却、消耗与状态显示。配置页中失效条目保留位置，使用红色边框和 tooltip 提示，可手动清空。

## 选择与使用是两个键 {#选择与使用是两个键}

`R` 选择，`V` 或轮盘内左键使用；松开选择键只关闭，不触发。左右方向键和滚轮切页，12个快捷槽作用于当前页。按键归 Saturn 分类，配置键与快捷槽默认未绑定。

`wheel.hold`、`wheel.scroll_switch`、`wheel.wrap_pages` 位于 Saturn 客户端配置，默认均开启。轮盘和配置页都使用原版 Screen，不加载 AUI 页面。

## 选中项跨会话 {#选中项跨会话}

服务端保存12格主盘布局和选中编号，并同步给客户端。派生页随当前装备与契约重建。编号超出当前页时回退到最后一个有内容的格子，编号对应空格时回退到第一个有内容的格子；不会因此改写主盘布局。

## 触发 {#触发}

服务端同时校验 kind 的存在性与 source 的 `offers`，再分派普通或定向请求。定向开关同样检查来源，无法绕过已撤销的装备或授予。能力类型继续检查授予、业务条件、消耗与冷却，保存布局本身不授予能力。

公共契约见 [WheelSource](./interfaces/wheel/wheel-source.md)、[WheelEntryKind](./interfaces/wheel/wheel-entry-kind.md)、[WheelMenuEntry](./interfaces/wheel/wheel-menu-entry.md)。

---
title: 丹炉界面
---

## 丹炉的四个界面 {#丹炉的四个界面}

四个页面分别由核心、主药仓、辅药仓、产物仓打开，炉壁不打开任何界面。唯一开界面入口是 `AlchemyFurnaceMenus.open(ServerPlayer, BlockPos)`：方块右键时把访问位置交过去，它按那个位置的方块决定页面（核心＝监控、主药仓＝主药、辅药仓＝辅药、产物仓＝产物），别的方块什么都不开。

布局不在 Java 里：四个页面各对应一份随模组发布的 HTML 与共用样式表——`monitor.html`、`main_input.html`、`auxiliary_input.html`、`output.html` 与 `alchemy.css`，由 ApricityUI 渲染，皮肤是随模组发布的扁平半透明深色样式表，文字用游戏自带的字体绘制（页面不写 `font-family`）。Java 只按稳定 ID 抓节点，然后绑状态与事件（**槽位不归它**，见下句），**不手写布局树，也没有备用树**：四个页面都要有 `panel`、`title`、`inventory_label`、`player_inventory`，三个仓页另有 `machine`，监控页**没有 `machine`**（供热是世界里的一格方块）；监控页另有 `temperature`、`limit`、`status`、`progress`（进度条本身是 `progress_fill`）、`target`、`apply`、`start`、`abort`。`machine` 声明这一页的机器槽位数（主药 2、辅药 3、产物 4），`player_inventory` 是 36 格玩家物品栏。缺了哪个必需节点，那一页的页面绑定就整份丢掉、屏幕上一个字都不画，只在日志里留一条 WARN：`Page <name> does not match its contract: <missing piece>`（槽位是 ApricityUI 按菜单布局绑的，不受这条契约影响，所以格子照旧能点）——视觉重排随便改，这些 ID 与这两个容器不能改。槽位归 ApricityUI：页面里的 `<slot>` 按祖先 `<container id>` 与组内 `slot-index` 绑到菜单槽位，`Slot.x/y` 每帧由它写回，物品、悬停高亮、拖拽与槽位提示框也都是它的；Java 这边只剩读面板的实时矩形，喂给屏幕自己的命中判定与 `hasClickedOutside`。**页面不要写 `aui-mouse-events` 这个 meta**，写了点击会被页面吃掉，槽位就点不动了。页面要自己撑满视口做居中时用视口单位（`height: 100vh`）：ApricityUI 里 `body` 的百分比高度不生效，写 `height: 100%` 面板会一直贴着顶边。宿主屏幕在 `extractBackground` 里先画原版那层半透明灰底（`AuiStyles.extract`，就是原版容器界面那块渐变）再交页面；**别调 `super.extractBackground`**——普通 `Screen` 宿主的 `isInGameUi()` 是 false，super 会走「模糊 + 菜单底图」那一支，把已经画好的 HUD 一起糊掉。**唯一的例外是轮盘菜单**：它是边玩边读的，`extractBackground` 保持空的，世界与 HUD 都按原亮度显示。

页面随模组打包在 `assets/apricityui/apricity/mxt_alchemy/alchemy/` 下，每次打开都直接从资源包读。所以改页面就是改 jar（或资源包）里的那一份：开着热重载时存盘即生效，否则在游戏里按 END 重扫资源、再重开丹炉界面。游戏目录下的 `<gameDir>/apricity/` 只是玩家的覆盖层，同名文件优先于 jar。

监控页画的是服务端下发的只读读数（`AlchemyStateS2CPayload`，见[网络协议](#network)），界面自己不算配方，也不显示丹方名或丹方按钮；温度输入框、开始与终止只是把那三件事发回服务端。页面里的 `player_inventory` 与 `machine` 都是真实槽位，机器槽位与玩家物品栏同在菜单里；监控页没有机器槽。

## 网络协议 {#network}

客户端发送操作意图，服务端重新检查当前菜单、访问距离与丹炉状态。

| Payload | 用途 |
| --- | --- |
| `AlchemyActionC2SPayload` | 丹炉监控页的三件事：`(containerId, action, temperature)`——`containerId` 是**丹炉监控菜单**的容器号（服务端据此确认这个包来自当前真正打开的那个丹炉，并复查访问位置仍在范围内、那个方块还是这个角色），`action` 是 `TEMPERATURE` / `START` / `ABORT` 之一，`temperature` 只在 `TEMPERATURE` 时被读。`TEMPERATURE` 请求把设定温度改成那个值，服务端重新判一遍"有限、落在 `0` 到可设上限之间"才接受（请求里不带炉温，炉温由服务端自己推进）；`START` 走 `AlchemyWorkstationService.start`，`ABORT` 走 `AlchemyWorkstationService.abort`。三件事被拒时都不改任何状态：`START` 只回一句动作栏提示；温度写入的接受与拒绝走随后的状态包，监控页把它画在输入框与「设定」按钮上；`ABORT` 没有回执。 |

`AlchemyStateS2CPayload` 发送 `(containerId, view)`：炉体名与品质、阶段与状态、是否成型或锁定、能否开炉、主辅格数，以及当前/设定/上限温度、目标温度与容差、剩余/总时长和越界刻数。客户端只显示读数，不重算配方。

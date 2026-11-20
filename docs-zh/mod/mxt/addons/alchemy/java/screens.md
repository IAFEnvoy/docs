---
title: 丹炉界面
---

## 丹炉的四个界面 {#丹炉的四个界面}

丹炉核心、主药仓、辅药仓与产物仓分别打开监控、主药、辅药与产物页面，炉壁不打开界面。统一入口为 `AlchemyFurnaceMenus.open(ServerPlayer, BlockPos)`：根据访问位置的方块选择页面，其他方块不响应。

四个页面由 ApricityUI 渲染，分别使用 `monitor.html`、`main_input.html`、`auxiliary_input.html`、`output.html`，共用 `alchemy.css`。样式为半透明深色主题，文字使用游戏字体，页面无需声明 `font-family`。Java 负责按固定节点 ID 绑定状态与事件，不构建备用布局。

| 页面 | 必需节点与容器 |
| --- | --- |
| 全部页面 | `panel`、`title`、`inventory_label`、`player_inventory` |
| 三个仓储页面 | 额外包含 `machine`；主药、辅药与产物页面分别声明 2、3、4 个机器槽位 |
| 监控页面 | 额外包含 `temperature`、`limit`、`status`、`progress`、`progress_fill`、`target`、`apply`、`start`、`abort`；不包含 `machine` |

`player_inventory` 对应玩家物品栏的 36 个槽位。缺少必需节点时，该页停止绑定和绘制，并记录 WARN：`Page <name> does not match its contract: <missing piece>`。槽位由 ApricityUI 独立绑定，仍可交互。调整布局时应保留上述节点 ID 和容器。

页面中的 `<slot>` 按祖先 `<container id>` 和组内 `slot-index` 绑定菜单槽位。ApricityUI 每帧更新 `Slot.x/y`，并处理物品绘制、悬停高亮、拖拽与提示框。宿主界面读取面板实时矩形，用于命中判定和 `hasClickedOutside`。

布局与背景处理应遵循以下约束：

- 不声明 `aui-mouse-events` meta，避免页面拦截槽位点击。
- 需要占满视口并居中时使用 `height: 100vh`。ApricityUI 不支持 `body` 的百分比高度，`height: 100%` 无法实现该布局。
- 宿主在 `extractBackground` 中先通过 `AuiStyles.extract` 绘制原版半透明背景，再渲染页面。不调用 `super.extractBackground`，避免普通 `Screen` 的背景模糊影响 HUD。
- 轮盘菜单不绘制背景，世界与 HUD 保持原亮度。

页面资源位于 `assets/apricityui/apricity/mxt_alchemy/alchemy/`，每次打开时读取。启用热重载后，保存修改即可生效；否则按 END 重新加载资源，再打开界面。游戏目录下的 `<gameDir>/apricity/` 是覆盖目录，同名文件优先于 Jar 内资源。

监控页仅显示服务端下发的只读状态，不计算配方，也不提供丹方列表。温度输入、开始与终止操作均发送至服务端。仓储页的 `machine` 和 `player_inventory` 均绑定真实菜单槽位，监控页仅有玩家物品栏。

## 网络协议 {#network}

客户端发送操作请求，服务端重新校验当前菜单、访问距离与丹炉状态。

`AlchemyActionC2SPayload` 包含 `(containerId, action, temperature)`。`containerId` 标识当前监控菜单；服务端据此确认菜单、访问位置与方块角色仍然有效。`action` 支持以下值：

| 操作 | 服务端处理 | 反馈 |
| --- | --- | --- |
| `TEMPERATURE` | 读取 `temperature`，仅接受有限且位于 `0` 至可设上限之间的数值；当前炉温由服务端独立推进 | 后续状态包反映接受或拒绝结果，界面更新输入框和「设定」按钮 |
| `START` | 调用 `AlchemyWorkstationService.start` | 拒绝时显示动作栏提示 |
| `ABORT` | 调用 `AlchemyWorkstationService.abort` | 无独立回执 |

请求被拒绝时不修改状态。`temperature` 在其他操作中不读取，请求也不携带当前炉温。

`AlchemyStateS2CPayload` 发送 `(containerId, view)`，包含炉体名称与品质、阶段与状态、成型及锁定状态、开炉可用性、主辅槽位数，以及当前/设定/上限温度、目标温度与容差、剩余/总时长和越界刻数。客户端仅显示这些数据。

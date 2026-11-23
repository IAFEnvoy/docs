---
title: 转生
description: 在同一个世界开启新的一世，并查阅前世档案。
sidebar_position: 0
---

转生（Reincarnation，模组 ID `reincarnation`）让玩家在同一个 Minecraft 世界开启新的一世。账号 UUID 保持不变，玩家实体和个人进度重新初始化。世界与已有建筑保留，前世记录可在档案界面查阅。

## 安装 {#installation}

服务器与连接服务器的客户端都需要安装转生。单人游戏只需在客户端实例中安装。

| 项目 | 要求 |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.99 或此 Minecraft 版本的兼容更新 |
| Java | 25 |
| [Jupiter](../../library/jupiter/index.md) | 2.4 或更新版本，客户端与服务端 |
| [Saturn](../../library/saturn/index.md) | 1.2.5 或更新版本，客户端与服务端 |
| ApricityUI | 1.2.9 或更新版本，客户端 |
| KubeJS | 可选，用于[脚本扩展](./kubejs.md) |

[源码与发行](https://github.com/IAFEnvoy/Reincarnation) · [下载 ApricityUI](https://www.curseforge.com/minecraft/mc-mods/apricityui)

## 当前世与前世档案 {#life-archive}

使用 `/reincarnation view` 打开当前世。左侧可切换世代，右侧可展开各组信息。档案显示世数、起止时间、转生原因，以及存档时的经验、物品数量和进度数量等玩家信息。在线玩家的当前世约每秒刷新一次，离线玩家的当前世可显示已记录的摘要。前世档案仅供查阅。详见[指令与权限](./commands.md)。

## 开启新的一世 {#new-life}

完整换世会归档上一世、将可见世数加一，并在默认出生位置创建新的玩家实体。背包、末影箱、经验、配方、进度和统计随之重置。`keepInventory` 对完整换世的背包重置无效。计分板分数、队伍、游戏模式和选定的模组数据按服务端的[重置设置](#reset-settings)处理。

管理员可以用 `/reincarnation rebirth` 开启新的一世。服务端也可以设置为死亡后重生时自动换世。这两种触发方式独立于[自然老化](./lifespan.md)。如需保留实体与世数并重新初始化寿元，可使用寿元系统的原地重置。

完整换世会让绑定在前世的关系失效，例如原版宠物的主人关系。若已提交的换世中途被中断，重新连接后服务端会继续处理。前世档案和恢复记录保存在世界存档的 `reincarnation/` 目录，备份世界时应一并保留。

## 服务端配置 {#server-configuration}

通过**模组列表 → Reincarnation → 配置**打开设置，修改服务端配置需要管理员权限。配置文件位于 `config/reincarnation/reincarnation-server.json`。

### 生命周期与查询 {#lifecycle}

| 配置项 | 默认 | 作用 |
| --- | --- | --- |
| `lifecycle.auto_reincarnate_on_death` | 关闭 | 玩家死亡后重生时完整换世。 |
| `lifecycle.filter_death_damage_types` | 关闭 | 只允许 `reincarnation:reincarnate_on_death` 标签中的伤害类型触发自动换世。内置标签包含寿元伤害。 |
| `query.history_page_size` | `8` | 每页聊天栏历史记录条数，范围为 `1` 至 `50`。 |

[伤害类型标签示例](./datapack.md#death-filter)演示了如何扩充允许触发转生的死因。

### 重置设置 {#reset-settings}

| 配置项 | 默认 | 作用 |
| --- | --- | --- |
| `reset.scores` | 开启 | 完整换世时清空玩家的计分板分数。 |
| `reset.team` | 关闭 | 完整换世时将玩家移出计分板队伍。 |
| `reset.keep_game_mode` | 开启 | 完整换世后保留游戏模式。关闭时使用服务端默认模式。 |
| `reset.unknown_mod_data` | 关闭 | 开启时，完整换世会清除未知模组的持久数据，两种转生模式均跳过附件保留。已注册的处理器仍可在完整换世时显式恢复各自的数据。 |
| `reset.clear_resources` | 开启 | 清除 Saturn 数值资源附件，数据包可显式保留。关闭后保留该附件，清除未知模组数据的设置优先。 |

数据包可通过[附件保留规则](./datapack.md#attachment-retention)选择要继承的数据。修炼数据和突破增寿配置见[觅仙途联动](../mxt/player-guide/lifespan.md)。

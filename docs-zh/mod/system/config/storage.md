---
title: "存储容量"
sidebar_position: 2
---

文件：`config/system/system-storage.json`。作用侧：**服务端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `businessBytes` | 整数 | 否 | `4194304` | 每玩家业务文件预算，字节。 |
| `chatBytes` | 整数 | 否 | `33554432` | 每玩家聊天文件预算，字节。 |
| `journalBytes` | 整数 | 否 | `786432` | 执行日志预算，受业务文件总预算约束。 |
| `journalEntries` | 整数 | 否 | `8192` | 执行日志最多条数。 |
| `taskBytes` | 整数 | 否 | `262144` | 任务日志预算，字节。 |
| `taskEntries` | 整数 | 否 | `4096` | 任务日志最多条数。 |
| `conversationEntries` | 整数 | 否 | `256` | 保留对话最多条数。 |
| `conversationDays` | 整数 | 否 | `30` | 对话保留天数。 |

启动时采纳存储容量。执行日志与任务日志共享业务文件空间，实际预算会向下约束以预留其他业务内容；修改容量不能恢复已经清理的记录。自管存档文件位于 `<world>/system/`，使用压缩 NBT，不做旧路径迁移。

## 随附默认文件

```json title="config/system/system-storage.json"
{
  "businessBytes": 4194304,
  "chatBytes": 33554432,
  "journalBytes": 786432,
  "journalEntries": 8192,
  "taskBytes": 262144,
  "taskEntries": 4096,
  "conversationEntries": 256,
  "conversationDays": 30
}
```

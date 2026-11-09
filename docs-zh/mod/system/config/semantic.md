---
title: "本地语义路由"
sidebar_position: 6
---

文件：`config/system/system-semantic.json`。作用侧：**服务端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `mode` | 字符串 | 否 | `"enforce"` | off 关闭、shadow 影子计算、enforce 实际用于决策，使用小写。 |
| `maxCharacters` | 整数 | 否 | `240` | 本地匹配的文本长度预算，正整数。 |
| `minCoverage` | 数值 | 否 | `0.9` | 词面覆盖阈值，0～1。 |
| `defaultThreshold` | 对象 | 否 | `{"score":0.9,"margin":0.15}` | 默认 score / margin，均为 0～1。 |
| `languages` | 数组 | 否 | `["zh","en"]` | 支持的基础语言代码列表，如 zh、en。 |
| `lexicalThresholds` | 对象 | 否 | `{}` | 按工作流 ID 或 ID@语言覆盖阈值。 |
| `examples` | 对象 | 否 | `{}` | 工作流 ID → 语言 → 示例语句数组。 |
| `cacheEntries` | 整数 | 否 | `1024` | 全局路由缓存容量。 |
| `cacheSeconds` | 整数 | 否 | `300` | 缓存有效秒数。 |
| `entriesPerPlayer` | 整数 | 否 | `32` | 每玩家缓存条数。 |
| `modeScores` | 对象 | 否 | `{"functions":-0.1,"freeChat":0.03}` | functions 与 freeChat 的 score 偏移，范围 -1～1；最终阈值限制在 0～1。 |

相似度和候选间差距不是概率。功能模式使用 functions 偏移以尽量本地匹配，自由聊天允许时使用 freeChat 偏移提高匹配门槛。详见[本地路由](../development/routing.md)。

## 随附默认文件

```json title="config/system/system-semantic.json"
{
  "mode": "enforce",
  "maxCharacters": 240,
  "minCoverage": 0.9,
  "defaultThreshold": {
    "score": 0.9,
    "margin": 0.15
  },
  "languages": [
    "zh",
    "en"
  ],
  "lexicalThresholds": {},
  "examples": {},
  "cacheEntries": 1024,
  "cacheSeconds": 300,
  "entriesPerPlayer": 32,
  "modeScores": {
    "functions": -0.1,
    "freeChat": 0.03
  }
}
```

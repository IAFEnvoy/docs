---
title: "语音计费估算"
sidebar_position: 8
---

文件：`config/system/system-speech-pricing.json`。作用侧：**客户端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `version` | 整数 | 否 | `1` | 计价表格式版本。 |
| `currency` | 字符串 | 否 | `"CNY"` | 当前仅 CNY。 |
| `asOf` | 字符串 | 否 | `"2026-10-25"` | 价目表参考日期，不表示实时官方价格。 |
| `rates` | 数组 | 否 | 见随附价目表 | 价格条目列表，见下表。 |

## rates 条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `provider` | 字符串 | 有效条目必填 | 空 | 提供器 ID。 |
| `model` | 字符串 | 有效条目必填 | 空 | 模型名。 |
| `region` | 字符串 | 有效条目必填 | 空 | 区域。 |
| `unit` | 字符串 | 有效条目必填 | 省略 | characters、tokens、calls；大小写均可。 |
| `units` | 正整数 | 有效条目必填 | 无有效默认 | 单价对应的单位数。 |
| `input` | 非负十进制数或字符串 | 有效条目必填 | 省略 | 输入字符 / Token / 次数的价格。 |
| `output` | 非负十进制数或字符串 | 有效条目必填 | 省略 | 输出 Token 的价格；非 tokens 单位必须为 0。 |

条目按 provider、model、region 匹配，缺价或计费单位不匹配时只记用量，金额保持未定价；重复项保留首项。不会把缺价当成免费。价格是本地估算，不是供应商账单，随附表的 asOf 只表示参考日期。NLS 完成一次识别按 calls 估算。

## 随附默认文件

```json title="config/system/system-speech-pricing.json"
{
  "version": 1,
  "currency": "CNY",
  "asOf": "2026-10-25",
  "rates": [
    {
      "provider": "aliyun",
      "model": "qwen3-tts-flash",
      "region": "beijing",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 0.8,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen3-tts-flash",
      "region": "singapore",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 0.733924,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-flash",
      "region": "beijing",
      "unit": "TOKENS",
      "units": 1000000,
      "input": 1.5,
      "output": 12
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-flash",
      "region": "singapore",
      "unit": "TOKENS",
      "units": 1000000,
      "input": 1.677,
      "output": 13.636
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-plus",
      "region": "beijing",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1.4,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-plus",
      "region": "singapore",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 2.19,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.0-tts-plus",
      "region": "beijing",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1.4,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.0-tts-plus",
      "region": "singapore",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1.49884,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.0-tts-flash",
      "region": "beijing",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.0-tts-flash",
      "region": "singapore",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1.12413,
      "output": 0
    },
    {
      "provider": "aliyun-nls",
      "model": "sentence-recognition",
      "region": "shanghai",
      "unit": "CALLS",
      "units": 1000,
      "input": 3.5,
      "output": 0
    },
    {
      "provider": "aliyun-nls",
      "model": "sentence-recognition",
      "region": "beijing",
      "unit": "CALLS",
      "units": 1000,
      "input": 3.5,
      "output": 0
    },
    {
      "provider": "aliyun-nls",
      "model": "sentence-recognition",
      "region": "shenzhen",
      "unit": "CALLS",
      "units": 1000,
      "input": 3.5,
      "output": 0
    }
  ]
}
```

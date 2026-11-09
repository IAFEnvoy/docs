---
title: "语音识别"
sidebar_position: 11
---

文件：`config/system/system-asr.json`。作用侧：**客户端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `enabled` | 布尔值 | 否 | `false` | 启用可选语音输入；还需安装 Simple Voice Chat。 |
| `provider` | 字符串 | 否 | `"aliyun-nls"` | 内置 aliyun-nls。 |
| `appKey` | 字符串 | 否 | `""` | NLS 项目的 AppKey。 |
| `accessKeyId` | 字符串 | 否 | `""` | 用于申请临时 Token 的 AccessKey ID。 |
| `accessKeySecret` | 字符串 | 否 | `""` | 对应 AccessKey Secret，仅保存在客户端。 |
| `region` | 字符串 | 否 | `"shanghai"` | NLS 区域，默认 shanghai。 |
| `autoSend` | 布尔值 | 否 | `false` | 识别成功后立即发送；关闭时填入输入框。 |

这些凭证及语音用量仅属于当前客户端，不同步给服务端。推荐通过 `/system settings` 的语音标签页修改，设置提交后自动标记并保存；关闭通知、提前确认或切换语音 session 会取消对应播报。

## 随附默认文件

```json title="config/system/system-asr.json"
{
  "enabled": false,
  "provider": "aliyun-nls",
  "appKey": "",
  "accessKeyId": "",
  "accessKeySecret": "",
  "region": "shanghai",
  "autoSend": false
}
```

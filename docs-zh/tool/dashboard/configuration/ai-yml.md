---
sidebar_position: 3
title: ai.yml
description: AI 提供商与模型配置，每个 API 端点支持多个模型
---

# ai.yml

## 设计

每个 **provider** 代表一个 API 端点（base_url + api_key），该端点可以承载**多个模型**。

模型通过 provider_id/model_id 的形式引用，例如：
- openai/gpt-4o
- deepseek/deepseek-chat
- ollama/qwen2.5:7b

YAML 结构请参考上面的完整示例。

## 字段参考

### providers[]

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| id | string | 唯一的提供商 ID |
| name | string | 显示名称 |
| type | string | openai / openai-compatible / deepseek / ollama |
| base_url | string | API 端点 URL |
| api_key | string | API 密钥（支持 `${ENV}` 占位符） |
| models | array | 该端点下的模型列表 |

### models[]

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| id | string | — | 传给 API 的模型名称 |
| name | string | — | 界面中显示的名称 |
| max_tokens | int | — | 最大输出令牌数 |
| temperature | float | 0.7 | 采样温度 |
| thinking_enabled | bool | false | **仅 DeepSeek**：启用思考模式 |
| reasoning_effort | string | high | **仅 DeepSeek**：推理强度（low/medium/high） |

### default_model

默认选中的模型，格式为 provider_id/model_id。

## DeepSeek 思考模式

当 `type: "deepseek"` 且 `thinking_enabled: true` 时，系统会自动启用 tRPC-Agent-Go 的 BuiltinPlanner：

1. 在每次请求前注入思考参数（通过 reasoning_effort）
2. 从响应中提取 reasoning_content
3. 在多轮对话中保留思维链上下文

这样可确保 DeepSeek 的 reasoning_content 在整个对话过程中得到正确处理。

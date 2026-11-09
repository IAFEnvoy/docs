---
sidebar_position: 3
title: ai.yml
description: AI provider and model configuration, supporting multiple models per API endpoint
---

# ai.yml

## Design

Each **provider** represents an API endpoint (base_url + api_key) that can host **multiple models**.

Models are referenced as provider_id/model_id, e.g.:
- openai/gpt-4o
- deepseek/deepseek-chat
- ollama/qwen2.5:7b

Refer to the full example above for the YAML structure.

## Field Reference

### providers[]

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique provider ID |
| name | string | Display name |
| type | string | openai / openai-compatible / deepseek / ollama |
| base_url | string | API endpoint URL |
| api_key | string | API key (supports `${ENV}` placeholder) |
| models | array | List of models under this endpoint |

### models[]

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| id | string | — | Model name passed to the API |
| name | string | — | Display name in the UI |
| max_tokens | int | — | Max output tokens |
| temperature | float | 0.7 | Sampling temperature |
| thinking_enabled | bool | false | **DeepSeek only**: Enable thinking mode |
| reasoning_effort | string | high | **DeepSeek only**: Reasoning intensity (low/medium/high) |

### default_model

The default selected model, in provider_id/model_id format.

## DeepSeek Thinking Mode

When type: "deepseek" and thinking_enabled: true, the system automatically enables tRPC-Agent-Go's BuiltinPlanner:

1. Injects thinking parameters before each request (via reasoning_effort)
2. Extracts reasoning_content from responses
3. Preserves chain-of-thought context across multi-turn conversations

This ensures DeepSeek's reasoning_content is correctly managed throughout the entire conversation.

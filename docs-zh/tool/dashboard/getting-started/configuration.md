---
sidebar_position: 2
title: 配置概览
description: 所有配置文件及其用途概览
---

# 配置概览

所有配置文件都位于项目根目录的 `config/` 目录：

| 文件 | 用途 | 是否必需 |
|------|---------|----------|
| `config.yml` | 服务端口、数据源并发、缓存、项目路径、Codacy | 是 |
| `auth.yml` | API 密钥、GitHub 令牌、管理员凭据 | 是 |
| `ai.yml` | AI 提供商与模型配置 | 否 |
| `agents.yml` | 智能体定义与 MCP 绑定 | 否 |
| `mcps.yml` | 外部 MCP 服务器列表 | 否 |
| `rate.yml` | 维护难度评分系数 | 否 |
| `editor.yml` | 模组编辑器预填选项（许可证、架构、标签） | 否 |
| `configuration.json` | 界面预设——状态颜色、加载器颜色、版本支持 emoji | 否 |
| `status_config.json` | 维护状态顺序与归档状态 | 否 |
| `prompts/*.md` | 智能体系统提示词文件（由 `agents.yml` 引用） | 否 |

## 环境变量占位符

在任何 YAML 配置文件中都可以用 `${ENV_VAR}` 语法引用环境变量：

```yaml
api_key: "${OPENAI_API_KEY}"  # Reads from the OPENAI_API_KEY env var
```

## 热重载

登录后，使用 **🛠 Admin** 菜单 → **Reload Local Config** 即可重新加载所有 YAML/JSON 配置、提示词文件和模组目录，无需重启服务。

## 详细文档

- [config.yml](../configuration/config-yml) — 服务、数据源与 Codacy
- [auth.yml](../configuration/auth-yml) — API 密钥与登录
- [ai.yml](../configuration/ai-yml) — AI 提供商与模型
- [agents.yml](../configuration/agents-yml) — 智能体定义
- [mcps.yml](../configuration/mcps-yml) — MCP 服务器
- [rate.yml](../configuration/rate-yml) — 难度评分
- [editor.yml](../configuration/editor-yml) — 编辑器预填选项
- [提示词文件](../configuration/prompts) — 智能体系统提示词

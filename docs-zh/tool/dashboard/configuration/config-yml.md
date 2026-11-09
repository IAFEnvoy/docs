---
sidebar_position: 1
title: config.yml
description: 服务端口、数据源并发、缓存、智能体项目路径以及 Codacy
---

# config.yml

## 完整示例

```yaml
server:
  port: 3456              # Listening port
  cache_ttl_minutes: 90   # Data source cache TTL (minutes)
  cache_dir: "cache"      # Disk cache directory

datasources:
  curseforge:
    enabled: true          # Fetch CurseForge download counts
    concurrency: 5         # Max concurrent requests
  github:
    enabled: true          # Fetch GitHub Issues/PRs
    concurrency: 5

retry:
  max_attempts: 3          # Max attempts (including the first)
  base_delay_ms: 1000      # Base delay (ms, exponential backoff)

ignore_archived: true      # Ignore Issues/PRs from archived repos

project_paths:
  - "D:/Projects/mods"     # Agent project search paths (searched in order)

codacy:
  enabled: true            # Enable Codacy code-quality analysis
  concurrency: 2           # Concurrent analyses
  cache_ttl_hours: 24      # Analysis cache TTL
  provider: "gh"           # Provider (gh = GitHub)
  add_wait_minutes: 10     # Wait time after adding a repo
```

## 字段参考

### server

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `port` | int | `3456` | HTTP 监听端口 |
| `cache_ttl_minutes` | int | `90` | 数据源缓存时长 |
| `cache_dir` | string | `cache` | 磁盘缓存目录路径 |

### datasources

控制外部数据源的启用/禁用与并发数。

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `curseforge` | object | CurseForge API 配置（下载量） |
| `github` | object | GitHub API 配置（Issue/PR） |

每个数据源的子字段：

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `enabled` | bool | 是否获取该来源 |
| `concurrency` | int | 最大并发请求数 |

获取结果会缓存在磁盘的 `cache/<source>/` 下。某个来源被禁用时，已有的缓存值会保留并继续复用。

### retry

针对失败的上游请求，采用指数退避的重试策略。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `max_attempts` | int | `3` | 最大尝试次数（包含首次） |
| `base_delay_ms` | int | `1000` | 基础延迟，每次尝试翻倍 |

### ignore_archived

- `true`：在汇总统计中跳过已归档仓库的 Issue/PR
- `false`：统计所有 Issue/PR

### project_paths

存放智能体项目的目录列表。当用户在智能体界面中选择项目时，系统会按顺序搜索这些路径；如果某个仓库不存在，会自动用 `git clone` 克隆到第一个可写路径。

- **留空**则默认为当前工作目录

示例：
```yaml
project_paths:
  - "D:/Projects/mods"
  - "E:/Workspace/forge"
```

### codacy

自动分析 GitHub 仓库的代码质量，并用于维护难度评分。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `enabled` | bool | `true` | 启用分析 |
| `concurrency` | int | `2` | 并发分析数 |
| `cache_ttl_hours` | int | `24` | 分析缓存时长（过期后重新检查） |
| `provider` | string | `gh` | 仓库托管服务商 |
| `add_wait_minutes` | int | `10` | 添加仓库后等待分析完成的时间 |

计算出的难度会缓存在 `data/mods.db` 中（公式见 `rate.yml`）。

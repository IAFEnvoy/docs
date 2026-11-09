---
sidebar_position: 1
title: config.yml
description: Server port, data source concurrency, caching, Agent project paths, and Codacy
---

# config.yml

## Full Example

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

## Field Reference

### server

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `port` | int | `3456` | HTTP listening port |
| `cache_ttl_minutes` | int | `90` | Data source cache duration |
| `cache_dir` | string | `cache` | Disk cache directory path |

### datasources

Controls enable/disable and concurrency for the external data sources.

| Field | Type | Description |
|-------|------|-------------|
| `curseforge` | object | CurseForge API config (download counts) |
| `github` | object | GitHub API config (Issues/PRs) |

Sub-fields per data source:

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | bool | Whether to fetch this source |
| `concurrency` | int | Max concurrent requests |

Fetch results are cached on disk under `cache/<source>/`. When a source is disabled, existing cached values are kept and reused.

### retry

Exponential-backoff retry strategy for failed upstream requests.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `max_attempts` | int | `3` | Max attempts (including the first) |
| `base_delay_ms` | int | `1000` | Base delay, doubles each attempt |

### ignore_archived

- `true`: Skip Issues/PRs from archived repos in aggregate stats
- `false`: Count all Issues/PRs

### project_paths

List of directories where Agent projects live. When a user picks a project in the Agent UI, the system searches these paths in order; if a repo is missing, it is auto-cloned with `git clone` into the first writable path.

- **Leave empty** to default to the current working directory

Example:
```yaml
project_paths:
  - "D:/Projects/mods"
  - "E:/Workspace/forge"
```

### codacy

Automatically analyses GitHub repos for code quality and feeds the maintenance difficulty score.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `true` | Enable analysis |
| `concurrency` | int | `2` | Concurrent analyses |
| `cache_ttl_hours` | int | `24` | Analysis cache duration (re-check after expiry) |
| `provider` | string | `gh` | Repository host provider |
| `add_wait_minutes` | int | `10` | Wait time after adding a repo for analysis to complete |

The computed difficulty is cached inside `data/mods.db` (see `rate.yml` for the formula).
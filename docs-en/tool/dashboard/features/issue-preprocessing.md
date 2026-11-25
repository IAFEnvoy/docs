---
sidebar_position: 5
title: Automatic Issue Preprocessing
description: Use an authenticated switch to assess new issues against local code and generate solution reports without editing files
---

Automatic preprocessing clones or synchronizes project sources, then creates an AI session for each new issue, reads its description and source code, assesses whether the problem exists, and proposes a solution. **The AI analysis generates a report without changing code or running builds and tests.** Source synchronization discards local changes as described below.

## Enable preprocessing

1. Enable the GitHub data source in [config.yml](../configuration/config-yml.md) and configure the repository owner's GitHub token in [auth.yml](../configuration/auth-yml.md).
2. Configure a working default model in [ai.yml](../configuration/ai-yml.md).
3. Install Git and configure writable `project_paths`. Missing repositories are cloned into a `<repository-name>` subdirectory of the first writable root. Existing checkouts are updated before every analysis.
4. Log into the website, open **Agent → Settings**, and enable **Automatic issue preprocessing**. Settings appears to the right of **MCP Servers**; the switch defaults to off.

Reading or changing the switch, viewing task status, and retrying tasks all require valid website credentials. The setting takes effect immediately and persists. Turning it off prevents new tasks from starting; a running task finishes.

## Synchronize sources before analysis

New repositories clone the remote default branch. Existing checkouts update the current branch's configured `origin` upstream, or the matching remote branch when no upstream is configured. Detached checkouts use the remote default branch. Private repositories use the owner's GitHub token from `auth.yml`; credentials are not stored in clone URLs or `.git/config`.

**The current policy discards local commits, staged and unstaged changes, and ordinary untracked and Git-ignored files.** The server fetches remote code and verifies the branch before running `reset --hard` and `clean -fdx`, so failed fetches preserve local contents. Do not retain needed local changes in a preprocessing checkout.

A same-named directory that is not a standalone Git checkout, a mismatched `origin`, or a path outside the configured root stops synchronization without overwriting that directory. Synchronization has a five-minute timeout. Clone, fetch, branch verification or cleanup failures fail the task, display a reason beside the issue, and write an `[Issue]` log. Correct the network, permissions or configuration and retry. Analysis does not proceed using stale sources after synchronization fails.

## Which issues trigger processing

GitHub lists refresh according to `server.cache_ttl_minutes` and each repository's current cache expiry. Delta comparison runs only after a **successful upstream fetch**. Analysis runs sequentially in the background without blocking list refreshes.

| Event | Behavior |
| --- | --- |
| First successful fetch for a repository after every restart | Establish the baseline without preprocessing |
| Subsequent TTL refresh | Queue only newly observed issues that remain Open and belong to an unarchived project |
| Clear GitHub or all caches while logged in | Fetch again immediately using the same delta rules |
| Cache hit or failed upstream request | Keep the first-fetch protection; failures do not advance the baseline |
| Edit or reopen an old issue, or refresh repeatedly | Do not dispatch it again |
| Successful fetch while preprocessing is disabled | Update the baseline without later backfilling those issues |

Pull requests are excluded. New issues are identified using the highest issue number already observed for each repository. Existing tasks and reports are retained; clearing caches does not delete them or reset the first-fetch protection.

**The first-fetch protection applies after every restart, even when disk caches and baselines already exist.** Issues added while the service was offline and present in the first post-restart snapshot become part of the baseline. New-item detection starts with the next successful fetch.

For example, if the previous snapshot contained `#100` and a refresh adds the open issue `#101`, only `#101` is dispatched. Another cache clear does not rerun it. If `#102` appears in the first snapshot after a restart, it only updates the baseline; a later new issue `#103` triggers processing.

## Reports and retries

Automatic dispatch creates a session and attaches the issue body, as manual dispatch does, using the built-in `issue-preprocessor` Agent. Reports contain:

- A problem summary: expected and actual behavior, trigger conditions, and affected versions.
- A validity assessment: confirmed, likely, unsupported by available evidence, insufficient information, or a feature request.
- Evidence and root cause: source paths, line numbers and logs, with assumptions and missing information identified.
- A proposed solution: suggested changes, steps, compatibility concerns and risks.
- A validation plan for maintainers to reproduce the problem and check regressions.

Select **View report** beside an issue or open its session in AI chat history. Failed tasks can be retried while the switch is enabled. Running tasks interrupted by a restart become failed. Queued tasks persist, and events such as new tasks, explicit retries or configuration changes wake the processor.

The server restricts this Agent to reading, searching and fetching reference material. File changes, Shell, external MCP tools and sub-agents are unavailable, including with approval bypass enabled. A validation plan does not mean the system has executed tests.

## API and storage

All of these endpoints require website authentication:

| Endpoint | Method | Request and purpose |
| --- | --- | --- |
| `/api/admin/issue-preprocess` | GET | Read the switch and task status |
| `/api/admin/issue-preprocess` | PUT | `{"enabled": true}` to change the switch |
| `/api/admin/issue-preprocess` | POST | `{"repo": "owner/repo", "number": 101}` to retry a failed task only |

The switch, repository baselines and task index live in `data/issue-preprocess.json`; complete reports live in `data/sessions.db`. To send reports to QQ, configure [Bot notifications](./bot-notifications.md) separately. Notification switches and preprocessing are independent.

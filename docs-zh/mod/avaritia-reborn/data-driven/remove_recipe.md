---
title: 禁用配方
---

# 禁用配方

本页将教你如何禁用某个配方。

## 操作方法

将以下内容写入 `fabric.mod.json`：

*此配置会禁用 iron_door 的配方，请替换为你自己的目标。*

```json
"custom": {
    "avaritia-disable-recipe": [
        "minecraft:iron_door"
    ]
},
```

---
title: 终极配方
---

# 终极配方

本页将教你如何创建极限有序配方。

## 操作方法

创建文件 `data/YOUR_ID/recipes/example.json`，并写入以下内容：

*示例：压缩机*

```json
{
  "type": "avaritia:extreme_shaped",
  "result": {
    "item": "avaritia:compressor"
  },
  "pattern": [
    "IIIHHHIII",
    "X N   N X",
    "I N   N I",
    "X N   N X",
    "RNN O NNR",
    "X N   N X",
    "I N   N I",
    "X N   N X",
    "IIIXIXIII"
  ],
  "key": {
    "N": {
      "item": "avaritia:neutronium_ingot"
    },
    "H": {
      "item": "minecraft:hopper"
    },
    "I": {
      "item": "minecraft:iron_block"
    },
    "O": {
      "item": "avaritia:neutronium_block"
    },
    "X": {
      "item": "avaritia:crystal_matrix_ingot"
    },
    "R": {
      "item": "minecraft:redstone_block"
    }
  }
}
```

**该格式与 `crafting_shaped` 配方类似。**

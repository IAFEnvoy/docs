---
title: 兼容配置
---

# 兼容配置

本页将教你如何创建兼容配置。

## 操作方法

创建文件 `data/YOUR_ID/avaritia/dynamic/TARGET_MOD_ID.json`，并写入以下内容：

```json
{
  "dependency": [
    //Your dependency ids, loaded when one of these match.
  ],
  "recipe": {
    "catalyst": [
      //Item in ingredient format. (item/tag)
    ],
    "stew": [
      //Item in ingredient format. (item/tag)
    ],
    "meatballs": [
      //Item in ingredient format. (item/tag)
    ]
  },
  "singularity": {
    "add": 0,//Addition to sigularity cost
    "mul": 0//Multiplication to sigularity cost
  }//The formula is: (origin+add)*mul
}
```

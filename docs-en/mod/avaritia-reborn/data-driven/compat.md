---
title: Compat Configuration
---

# Compat Configuration

This page will teach you how to create a compat configuration.

## How to do

Create file `data/YOUR_ID/avaritia/dynamic/TARGET_MOD_ID.json` and write content below:

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
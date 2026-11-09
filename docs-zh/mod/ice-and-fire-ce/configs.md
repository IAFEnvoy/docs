---
title: 模组配置
---

# 模组配置

IaF:CE 有 2 个配置文件，位于 instance/config/iceandfire。一个用于客户端设置（视觉设置，不影响功能，文件为 iaf-client.json），另一个用于服务端设置（改变功能，文件为 iaf-common.json）。

## iaf-client.json

共有 3 项设置：
```
"customMainMenu": true, - 启用/禁用自定义的冰火传说主菜单。
"dragonAuto3rdPerson": false, - 启用/禁用骑乘龙时自动切换到第三人称。
"siren.shader": true - 启用/禁用塞壬给予你的屏幕效果。
```

## iaf-common.json

拥有大量设置，可详细自定义生物、武器、盔甲和生成。
它分为以下几个部分：

1. 龙：
```
"iceandfire.dragon.maxHealth": 500.0, - 修改龙的最大生命值
"iceandfire.dragon.eggBornTime": 7200, - 修改龙蛋孵化的时间
"iceandfire.dragon.maxPathingNodes": 5000,
"iceandfire.dragon.villagersFear": true, - 修改村民是否会害怕龙
"iceandfire.dragon.animalsFear": true, - 修改动物是否会害怕龙
"": {},
"iceandfire.dragon.generate.skeletons": true, - 启用/禁用龙骸骨的生成
"iceandfire.dragon.generate.skeletonChance": 0.0033333333333333335, - 修改龙骸骨的常见程度
"iceandfire.dragon.generate.denGoldAmount": 0.25, - 编辑龙巢中的黄金数量
"iceandfire.dragon.generate.oreRatio": 0.022222222222222223,
"iceandfire.dragon.griefing": true, - 启用/禁用所有龙破坏方块
"iceandfire.dragon.tamedGriefing": true, - 启用/禁用已驯服的龙破坏方块
"iceandfire.dragon.flapNoiseDistance": 4,
"iceandfire.dragon.fluteDistance": 8,
"iceandfire.dragon.attackDamage": 17, - 编辑龙的近战伤害
"iceandfire.dragon.attackDamageFire": 2.0, - 编辑龙的火焰吐息伤害
"iceandfire.dragon.attackDamageIce": 2.5, - 编辑龙的寒冰吐息伤害
"iceandfire.dragon.attackDamageLightning": 3.5, - 编辑龙的闪电吐息伤害
"iceandfire.dragon.maxFlight": 256,
"iceandfire.dragon.goldSearchLength": 30,
"iceandfire.dragon.canHealFromBiting": false,
"iceandfire.dragon.canDespawn": true, - 启用/禁用野生龙消失
"iceandfire.dragon.sleep": true, - 启用/禁用龙睡觉
"iceandfire.dragon.digWhenStuck": true, - 启用/禁用龙卡住时破坏方块以脱困
"iceandfire.dragon.breakBlockCooldown": 5, - 编辑龙破坏方块之间的冷却时间
"iceandfire.dragon.targetSearchLength": 128, - 编辑龙能注意到目标的距离
"iceandfire.dragon.wanderFromHomeDistance": 40, - 编辑已驯服的龙会从家走多远
"iceandfire.dragon.hungerTickRate": 3000, - 编辑已驯服的龙变饿的速度
"iceandfire.dragon.blockBreakingDropChance": 0.1, - 编辑龙破坏方块时的掉落几率
"iceandfire.dragon.explosiveBreath": false, - 启用/禁用龙息的爆炸
"iceandfire.dragon.chunkLoadSummonCrystal": true,
"iceandfire.dragon.dragonFlightSpeedMod": 1.0,
"iceandfire.dragon.maxTamedDragonAge": 128, - 编辑已驯服的龙的最大年龄
"iceandfire.dragon.maxBreathTimeMul": 2.0,
"iceandfire.dragon.neutralToPlayer": false, - 启用/禁用龙对玩家保持中立（不主动攻击，只在被攻击后反击）
"iceandfire.dragon.enableBrushDragonScales": true, - 启用/禁用使用刷子采集龙鳞（类似犰狳）
"iceandfire.dragon.maxBrushScalesDropPerTime": 2, - 编辑刷龙时最多掉落的鳞片数量
"iceandfire.dragon.brushTimesMul": 1.0,
"iceandfire.dragon.loot.skull": true, - 启用/禁用龙掉落头颅
"iceandfire.dragon.loot.heart": true, - 启用/禁用龙掉落龙心
"iceandfire.dragon.loot.blood": true - 启用/禁用从死去的龙身上采集血液
```

2. 骏鹰：
```
"iceandfire.hippogryphs.spawn": true, - 启用/禁用骏鹰生成
"iceandfire.hippogryphs.spawnWeight": 2, - 编辑骏鹰的生成几率。数值越高 = 骏鹰越多
"iceandfire.hippogryphs.flightSpeedMod": 1.0 - 编辑骏鹰的飞行速度
```

3. 小精灵：
```
"iceandfire.pixie.size": 5,
"iceandfire.pixie.stealItems": true 启用/禁用小精灵从玩家物品栏中偷取物品
```

4. 独眼巨人
```
"iceandfire.cyclops.spawnWanderingChance": 0.0011111111111111111, - 编辑生成游荡独眼巨人的几率
"iceandfire.cyclops.sheepSearchLength": 17, - 编辑独眼巨人能看到羊的范围
"iceandfire.cyclops.maxHealth": 150.0, - 编辑独眼巨人的最大生命值
"iceandfire.cyclops.attackDamage": 15.0, - 编辑独眼巨人的普通攻击伤害
"iceandfire.cyclops.biteDamage": 40.0, - 编辑独眼巨人的撕咬攻击伤害
"iceandfire.cyclops.griefing": true - 启用/禁用独眼巨人破坏方块
```

5. 塞壬
```
"iceandfire.siren.maxHealth": 50.0, - 编辑塞壬的最大生命值
"iceandfire.siren.maxSingTime": 12000, - 编辑塞壬吸引你的最长时间
"iceandfire.siren.timeBetweenSongs": 2000 - 编辑歌声之间的间隔时间
```

6. 戈尔贡
```
"iceandfire.gorgon.maxHealth": 100.0 - 编辑戈尔贡的最大生命值
```

7. 死亡蠕虫
## 待补充

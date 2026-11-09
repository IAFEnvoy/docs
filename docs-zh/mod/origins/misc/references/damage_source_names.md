# 伤害来源名称 {#damage-source-names}

伤害来源名称是用于区分承受/造成何种类型伤害的字符串，并用于在被杀死时确定该伤害的死亡消息。

### 原版伤害来源名称列表 {#list-of-vanilla-damage-source-names}

| 名称 | 描述 |
|------|-------------|
| `anvil` | 被下落的铁砧砸中。 |
| `anvil.player` | 与玩家/生物战斗时被下落的铁砧砸中。 |
| `arrow` | 被玩家/生物射中。 |
| `arrow.item` | 被玩家/生物使用重命名的弓或弩射中。 |
| `badRespawnPoint` | 在下界、末地或自定义维度中尝试使用床时，被床造成的爆炸击中。 |
| `cactus` | 接触仙人掌。 |
| `cactus.player` | 与玩家/生物战斗时接触仙人掌。 |
| `cramming` | 与许多其他实体挤在同一位置。 |
| `cramming.player` | 与玩家/生物战斗时与许多其他实体挤在同一位置。 |
| `dragonBreath` | 受到龙息的伤害。（原版中龙息造成 `magic` 伤害。） |
| `dragonBreath.player` | 与玩家/生物战斗时受到龙息的伤害。 |
| `drown` | 溺水。 |
| `drown.player` | 与玩家/生物战斗时溺水。 |
| `dryout` | 干枯。**原版中未使用。** |
| `dryout.player` | 与玩家/生物战斗时干枯。**原版中未使用。** |
| `even_more_magic` | 死亡消息过大而无法发送时。**原版中未使用。** |
| `explosion` | 被普通爆炸击中。 |
| `explosion.player` | 被生物造成的爆炸，或被玩家/生物点燃的 TNT 造成的爆炸击中。 |
| `fall` | 从高处坠落。 |
| `fall.player` | 与玩家/生物战斗时从高处坠落。 |
| `fallingBlock` | 被下落的非铁砧方块砸中。 |
| `fallingBlock.player` | 与玩家/生物战斗时被下落的方块砸中。 |
| `fallingStalactite` | 被下落的滴水石锥方块砸中。 |
| `fallingStalactite.player` | 与玩家/生物战斗时被下落的滴水石锥砸中。 |
| `fireball` | 被玩家/生物发射的火球击中。 |
| `fireball.item` | 被手持重命名物品的玩家/生物发射的火球击中。 |
| `fireworks` | 被烟花爆炸击中。 |
| `fireworks.player` | 与玩家/生物战斗时被烟花爆炸击中。 |
| `fireworks.item` | 被玩家/生物使用重命名的弩发射的烟花爆炸击中。 |
| `flyIntoWall` | 使用鞘翅高速撞向墙壁。 |
| `flyIntoWall.player` | 与玩家/生物战斗时使用鞘翅高速撞向墙壁。 |
| `freeze` | 在细雪中停留过久。 |
| `freeze.player` | 与玩家/生物战斗时在细雪中停留过久。 |
| `generic` | 受到没有具体类型的伤害来源造成的伤害。 |
| `generic.player` | 与玩家/生物战斗时受到没有具体类型的伤害来源造成的伤害。 |
| `hotFloor` | 站在岩浆块上。 |
| `hotFloor.player` | 与玩家/生物战斗时站在岩浆块上。 |
| `indirectMagic` | 受到间接魔法伤害（例如投掷的喷溅药水）。 |
| `indirectMagic.item` | 与玩家/生物战斗时，被重命名物品造成的间接魔法伤害击中。 |
| `inFire` | 站在火中。 |
| `inFire.player` | 与玩家/生物战斗时站在火中。 |
| `inWall` | 身处固体方块内部。 |
| `inWall.player` | 与玩家/生物战斗时身处固体方块内部。 |
| `lava` | 身处岩浆中。 |
| `lava.player` | 与玩家/生物战斗时身处岩浆中。 |
| `lightningBolt` | 被闪电击中。 |
| `lightningBolt.player` | 与玩家/生物战斗时被闪电击中。 |
| `magic` | 受到魔法伤害（例如潮涌核心、瞬间伤害、中毒）。 |
| `magic.player` | 与玩家/生物战斗时受到魔法伤害。 |
| `mob` | 被生物击中。 |
| `mob.item` | 被手持重命名物品的生物击中。 |
| `onFire` | 着火。 |
| `onFire.player` | 与玩家/生物战斗时着火。 |
| `outOfWorld` | 掉入虚空。 |
| `outOfWorld.player` | 与玩家/生物战斗时掉入虚空。 |
| `player` | 被玩家击中。 |
| `player.item` | 被手持重命名物品的玩家击中。 |
| `sonic_boom` | 被监守者的音波冲击击中。 |
| `sonic_boom.player` | 与玩家/生物战斗时被监守者的音波冲击击中。 |
| `sonic_boom.item` | 与玩家/生物战斗时，被手持重命名物品的监守者的音波冲击击中。 |
| `stalagmite` | 落在石笋上。 |
| `stalagmite.player` | 与玩家/生物战斗时落在石笋上。 |
| `starve` | 受到饥饿造成的伤害。 |
| `starve.player` | 与玩家/生物战斗时受到饥饿造成的伤害。 |
| `sting` | 被蜜蜂蜇伤。 |
| `sting.player` | 被玩家/生物蜇伤。**原版中未使用。** |
| `sting.item` | 被手持重命名物品的玩家/生物蜇伤。**原版中未使用。** |
| `sweetBerryBush` | 穿过甜浆果丛。 |
| `sweetBerryBush.player` | 与玩家/生物战斗时穿过甜浆果丛。 |
| `thorns` | 击中穿着荆棘盔甲的玩家/生物（或守卫者/远古守卫者）。 |
| `thorns.item` | 手持重命名物品击中穿着荆棘盔甲的玩家/生物。 |
| `thrown.item` | 被玩家/生物投掷的投掷物击中。**原版中未使用。** |
| `trident` | 被玩家/生物投掷的三叉戟击中。 |
| `trident.item` | 被手持重命名物品的玩家/生物投掷的三叉戟击中。 |
| `wither` | 受到凋零状态效果造成的伤害。 |
| `wither.player` | 与玩家/生物战斗时受到凋零状态效果造成的伤害。 |
| `witherSkull` | 被玩家/生物发射的凋灵之首击中。 |

### Origins 伤害来源名称列表 {#list-of-origins-damage-source-names}

| 名称 | 描述 |
|------|-------------|
| `genericDamageOverTime` | 受到使用 `origins:damage_over_time` 能力类型且未指定伤害来源名称的能力造成的伤害。 |
| `genericDamageOverTime.player` | 与玩家/生物战斗时受到 `damage_over_time` 能力类型造成的伤害。 |
| `hurt_by_water` | 受到 `origins:water_vulnerability` 能力造成的伤害。 |
| `hurt_by_water.player` | 与玩家/生物战斗时受到 `origins:water_vulnerability` 能力造成的伤害。 |
| `no_water_for_gills` | 拥有 `origins:water_breathing` 能力时失去氧气。 |
| `no_water_for_gills.player` | 与玩家/生物战斗时，拥有 `origins:water_breathing` 能力的同时失去氧气。 |

---
title: ArmorMaterialUtil
---

import { Utility } from '@site/src/components/JavaIcons';

# ArmorMaterialUtil <Utility/>

快速创建 `ArmorMaterial` 的方式。

示例：
```java
ArmorMaterialUtil.of("blue_diamond_armors", new int[]{13, 15, 16, 11}, 70, new int[]{9, 13, 18, 10}, 40, Registries.SOUND_EVENT.get(new Identifier("item.armor.equip_diamond")), 5.0F, 0.3F, ModItems.BLUE_DIAMOND)
```

**重要：虽然 `equipSound` 参数在 IDEA 中标记为 `@Nullable`，但不要向它传入 `null`，否则会导致游戏崩溃！**

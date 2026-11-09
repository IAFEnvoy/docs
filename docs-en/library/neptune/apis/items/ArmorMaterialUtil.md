---
title: ArmorMaterialUtil
---

import { Utility } from '@site/src/components/JavaIcons';

# ArmorMaterialUtil <Utility/>

Fast way to create a `ArmorMaterial`.

Example(s):
```java
ArmorMaterialUtil.of("blue_diamond_armors", new int[]{13, 15, 16, 11}, 70, new int[]{9, 13, 18, 10}, 40, Registries.SOUND_EVENT.get(new Identifier("item.armor.equip_diamond")), 5.0F, 0.3F, ModItems.BLUE_DIAMOND)
```

**IMPORTANT: Although the `equipSound` parameter is marked with `@Nullable` in IDEA, DON'T pass `null` into it since it will cause game crash!**
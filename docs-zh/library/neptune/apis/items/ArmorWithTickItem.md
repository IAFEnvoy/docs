---
title: ArmorWithTickItem
---

import { Class } from '@site/src/components/JavaIcons';

# ArmorWithTickItem <Class/>

为盔甲添加 `onArmorTick(World world, PlayerEntity entity)` 方法。

示例：
```java
public class YourArmor extends ArmorWithTickItem {
    public YourArmor(Type slot) {
        super(...)
        //super constructor will automatically register it into tick event
    }

    @Override
    public void onArmorTick(World world, PlayerEntity entity) {
        //Execute on every tick if this is equipped.
    }
}
```

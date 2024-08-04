---
title: SwordItemBase
---

import { Class } from '@site/src/components/JavaIcons';

# SwordItemBase <Class/>

Add `onSwingHand(ItemStack itemtack, World world, double x, double y, double z)` method to swords.

Example(s):
```java
public class YourSword extends SwordItemBase {
    public YourSword() {
        super(...)
    }

    @Override
    public boolean onSwingHand(ItemStack itemtack, World world, double x, double y, double z) {
        boolean ret_val = super.onSwingHand(itemtack, world, x, y, z);
        //Execute when player swing hand with this sword.
        return ret_val;
    }
}
```
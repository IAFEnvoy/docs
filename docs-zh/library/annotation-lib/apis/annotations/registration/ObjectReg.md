---
title: ObjectReg
---

import { Annotation } from '@site/src/components/JavaIcons';

# ObjectReg <Annotation/>

使用给定的 ID 注册此字段。

未提供 ID 时将使用字段名。
处理器会自动判断应使用哪个 `Registry`。

目前可注册：`Item`、`Block`、`EntityType`、`SoundEvent`、`StatusEffect`、`ItemGroup`、`ParticleType`、`Enchantment`、`Potion`、`KeyBinding`、`BlockEntityType`

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface ObjectReg {
    /**
     * The register ID.
     *
     * @return {@link String }
     */
    String value() default "";
}
```

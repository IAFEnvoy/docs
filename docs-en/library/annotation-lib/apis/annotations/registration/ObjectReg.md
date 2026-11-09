---
title: ObjectReg
---

import { Annotation } from '@site/src/components/JavaIcons';

# ObjectReg <Annotation/>

Register this field with given ID.

Field name will be used if no ID provided.
Processor will automatically detect which `Registry` should be used.

Currently can be registered: `Item`, `Block`, `EntityType`, `SoundEvent`, `StatusEffect`, `ItemGroup`, `ParticleType`, `Enchantment`, `Potion`, `KeyBinding`, `BlockEntityType`

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
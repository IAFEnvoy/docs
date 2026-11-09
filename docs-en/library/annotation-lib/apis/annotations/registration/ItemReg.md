---
title: ItemReg
---

import { Annotation } from '@site/src/components/JavaIcons';

# ItemReg <Annotation/>

Register this item with given ID.

Field name will be used if no ID provided.
Processor will add it to item group if provided.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface ItemReg {
    /**
     * The register ID.
     *
     * @return {@link String }
     */
    String value() default "";

    /**
     * The target item group.
     *
     * @return {@link String }
     * @see Identifier
     */
    TargetId group() default @TargetId("");
}
```
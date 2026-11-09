---
title: TargetId
---

import { Annotation } from '@site/src/components/JavaIcons';

# TargetId <Annotation/>

The replacement of `Identifier` in annotation.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({})
public @interface TargetId {
    /**
     * The Namespace
     *
     * @return {@link String }
     */
    String namespace() default "";

    /**
     * The Path
     *
     * @return {@link String }
     */
    String value();
}
```
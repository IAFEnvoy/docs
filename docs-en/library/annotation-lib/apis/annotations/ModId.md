---
title: ModId
---

import { Annotation } from '@site/src/components/JavaIcons';

# ModId <Annotation/>

Provide ModId to registration system.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface ModId {
    /**
     * The Mod ID.
     *
     * @return {@link String }
     */
    String value();
}
```
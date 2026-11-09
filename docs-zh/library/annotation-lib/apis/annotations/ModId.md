---
title: ModId
---

import { Annotation } from '@site/src/components/JavaIcons';

# ModId <Annotation/>

向注册系统提供 ModId。

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

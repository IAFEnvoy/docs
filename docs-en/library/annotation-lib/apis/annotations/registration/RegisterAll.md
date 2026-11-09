---
title: RegisterAll
---

import { Annotation } from '@site/src/components/JavaIcons';

# RegisterAll <Annotation/>

Automatically register all static fields in this class.

Processor will automatically detect which `Registry` should be used.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface RegisterAll {
}
```
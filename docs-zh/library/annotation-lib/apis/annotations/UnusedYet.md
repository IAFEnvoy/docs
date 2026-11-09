---
title: UnusedYet
---

import { Annotation } from '@site/src/components/JavaIcons';

# UnusedYet <Annotation/>

如果任何注解带有此标记，无论如何都**不要使用**它。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.ANNOTATION_TYPE})
public @interface UnusedYet {
}
```

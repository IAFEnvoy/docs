---
title: RegisterAll
---

import { Annotation } from '@site/src/components/JavaIcons';

# RegisterAll <Annotation/>

自动注册此类中所有静态字段。

处理器会自动判断应使用哪个 `Registry`。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface RegisterAll {
}
```

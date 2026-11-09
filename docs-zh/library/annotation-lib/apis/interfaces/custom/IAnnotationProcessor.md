---
title: IAnnotationProcessor
---

import { Interface } from '@site/src/components/JavaIcons';

# IAnnotationProcessor <Interface/>

实现此接口以创建你自己的处理器。

需要与 [@AnnotationProcessor](./../../annotations/AnnotationProcessor) 一起使用

示例：
```java
@AnnotationProcessor(IAnnotatedRegistryEntry.class)
public class RegistrationManager implements IAnnotationProcessor {
    @Override
    public void process(Class<?> clazz) {
        // Your process logic here.
    }
}
```

---
title: IAnnotationProcessor
---

import { Interface } from '@site/src/components/JavaIcons';

# IAnnotationProcessor <Interface/>

Implement this to create your own processor.

Need to be used with [@AnnotationProcessor](./../../annotations/AnnotationProcessor)

Example(s):
```java
@AnnotationProcessor(IAnnotatedRegistryEntry.class)
public class RegistrationManager implements IAnnotationProcessor {
    @Override
    public void process(Class<?> clazz) {
        // Your process logic here.
    }
}
```
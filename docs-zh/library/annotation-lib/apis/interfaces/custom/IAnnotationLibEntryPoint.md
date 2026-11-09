---
title: IAnnotationLibEntryPoint
---

import { Interface } from '@site/src/components/JavaIcons';

# IAnnotationLibEntryPoint <Interface/>

你需要创建自己的入口点接口并继承此接口，才能被 Fabric Loader 加载。

示例：
```java
public interface IExampleEntry extends IAnnotationLibEntryPoint {
}
```

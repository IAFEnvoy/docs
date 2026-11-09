# 自动转换器（测试版）

**V0.1-beta.7**

:::caution
- 此转换器只能转换 1.21.1 Fabric 的数据包。如果你的数据包是为 1.20.4 或更早版本制作的，转换后你需要手动修正与版本相关的改动（例如 `ItemStack`）。

- 转换器处于早期测试阶段，可能无法覆盖所有边界情况。请仔细检查日志和转换后的文件，遇到不一致之处请参考[手动移植指南](../porting)。请把你在转换器中发现的任何缺陷或不准确之处反馈出来。你也可以通过本指南快速定位问题所在：[疑难排查：错误日志分析](./log)。
:::

import OriginsDatapackConverterWidget from '@site/src/components/OriginsDatapackConverterWidget';

<OriginsDatapackConverterWidget />

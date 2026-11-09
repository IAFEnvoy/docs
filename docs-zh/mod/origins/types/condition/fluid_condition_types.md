# 流体条件类型 {#fluid-condition-types}

流体条件检查某个位置上流体的属性。

### `origins:empty` {#originsempty}

检查该位置上没有流体。

### `origins:in_tag` {#originsin_tag}

检查该流体是否位于某个流体标签中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `tag` | [标识符](../basic_concepts#identifier) | **必填** | 流体标签 ID |

### `origins:still` {#originsstill}

检查此状态是否描述一种静止（即未流动，即源）流体。

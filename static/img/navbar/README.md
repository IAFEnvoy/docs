# 导航项目图标

这些 WebP 用于顶部导航菜单，显示尺寸为 20 × 20 px，文件最长边为 64 px，保留原图比例和透明背景。`docusaurus.config.js` 中的 `icon` 字段决定是否显示图标。

主要来源为 [IAFEnvoy 模组列表](https://mods.iafenvoy.com/#mods) 的 `/api/mods` 项目清单和 `/api/logo/<id>` 图片接口，获取日期为 2026-11-13：

| 文件 | 列表项目 ID |
| --- | --- |
| `annotation-lib.webp` | `annotation_lib` |
| `dragon-mounts-reforged.webp` | `dragon_mounts` |
| `ice-and-fire-ce.webp` | `iceandfire` |
| `jupiter.webp` | `jupiter` |
| `mobs-banner.webp` | `mobs_banner` |
| `mxt.webp` | `mxt` |
| `neptune.webp` | `neptune` |
| `origins-js.webp` | `origins_js`（1.20.1 / Legacy） |
| `origins.webp` | `origins` |
| `pendulum.webp` | `pendulum` |
| `saturn.webp` | `saturn` |
| `starting-point-buy.webp` | `spb` |
| `system.webp` | `system` |
| `tameable.webp` | `tameable` |
| `uranus.webp` | `uranus` |

两个项目使用补充来源：

- `avaritia-reborn.webp`：ModList 站点原项目中的 `logos/mods/avaritia.webp`，由其 `data/item/avaritia.json` 确认对应 Avaritia Reborn。当前在线清单的 `avaritia` 是另一个项目 Re:Avaritia，使用 `avaritia2.webp`，不要混用。
- `mite.webp`：[MITE-Reforged 项目根目录的 logo.webp](https://github.com/IAFEnvoy/MITE-Reforged/blob/master/logo.webp)，当前列表站未收录此项目。

`evaluate.webp` 来自 Evaluate 项目的 `src/main/resources/logo.png`，于 2026-11-14 等比例缩小为 64 × 64 px；保留透明背景。

图片随各原项目保留版权，不因存入本站而改用代码许可证。更新时从来源重新获取，并等比例缩小到最长边 64 px；不要放大已有小图。

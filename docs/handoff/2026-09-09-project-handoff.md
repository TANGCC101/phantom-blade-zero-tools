# Phantom Blade Zero Tools 项目交接文档

**交接日期：** 2026-09-09  
**项目目录：** `E:\Ai项目\Phantom Blade Zero Tools`  
**项目性质：** 独立玩家工具站，不隶属于 S-GAME；不是官方站点，也没有复制官方 Logo 或美术资源。

## 1. 一句话概览

这是一个使用 Next.js 静态导出的《影之刃零》独立工具站，当前 V1 重点是配装笔记、发售/进度追踪、带来源的资料页和 SEO 基础设施；界面已经支持截图中要求的 15 种语言，并使用参考官网视觉印象的墨黑、雾灰、骨白、暗红配色。

## 2. 当前已交付功能

### 页面与路由

- `/`：首页、入口、资料可信度说明。
- `/builds/`：配装规划器。
- `/weapons/`、`/weapons/[slug]/`：武器系统概览与详情。
- `/bosses/`、`/bosses/[slug]/`：首领资料列表与详情。
- `/tracker/`：发售倒计时与发售后进度追踪。
- `/guides/`：指南与 FAQ。
- `/about/`：来源、隐私、本项目说明。
- `robots.txt`、`sitemap.xml`、页面 JSON-LD、Open Graph 元数据均已接入。

### 配装规划器

- 浏览器 `localStorage` 保存配装，最多 100 条。
- 字段是玩家自由笔记：名称、武器、副武器、饰品、战术；不要把它们解释成已被官方确认的装备槽位。
- 支持 JSON 导出、验证后的 JSON 导入、确认后替换当前列表。
- 支持 Unicode 安全的分享 URL fragment；打开分享链接只预览，不覆盖本地记录；保存副本是显式操作。
- 有长度上限、schema version、唯一 ID、1 MB 输入限制和存储失败保护。

### 进度追踪

- 发布瞬间当前记录为 `2026-10-29T02:00:00.000Z`，依据美国 PlayStation Store 页面；页面文案明确这是当前发售倒计时范围。
- 发售前显示倒计时，发售后切换为进度记录，并保留发售前历史。
- Tracker 数据有独立备份 schema，不要和配装 JSON 混用。

### 资料与可信度

- 每条公开资料使用两个独立维度：来源 `Official` / `Community`，阶段 `Pre-release` / `Verified`。
- 公开记录包含 `sourceUrl`、`sourceTitle`、`lastUpdated`。
- 当前内容是精选的预发行参考，不是完整武器或首领数据库。
- 武器页目前主要是系统级概览，避免伪造未证实的具体武器条目。
- 首领资料目前包含 Seven Stars 相关记录，来源已在页面标注。

## 3. 多语言现状

语言定义在 `src/lib/i18n.ts`，词典位于 `src/lib/locales/`，当前顺序和代码如下：

| 代码 | 显示名 |
| --- | --- |
| `en` | English |
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁體中文 |
| `ja` | 日本語 |
| `ko` | 한국어 |
| `fr` | Français |
| `de` | Deutsch |
| `es` | Español |
| `es-419` | Español (LATAM) |
| `pt-BR` | Português (BR) |
| `pt-PT` | Português (PT) |
| `ru` | Русский |
| `it` | Italiano |
| `th` | ไทย |
| `vi` | Tiếng Việt |

行为约定：

- 首次访问按浏览器语言匹配；繁体中文、拉美西语、巴西葡语和葡萄牙葡语有地区映射。
- 显式选择保存在 `pbz.language.v1`。
- 切换语言不会翻译玩家自己填写的配装名称和笔记。
- `document.documentElement.lang` 会在切换后更新。
- 静态 metadata、JSON-LD 和 URL 仍以英文/现有路由为主；这是显示语言偏好，不是多语言 SEO 路由树。
- 15 份词典当前各覆盖 135 个界面 key，但尚未经过母语编辑审校；下一模型不应宣称“原生级翻译已验证”。

## 4. 视觉与设计决策

配色参考实际查看的官方站点 `https://pbz.s-game.com/en-US/` 的整体视觉印象：墨黑、雾灰、骨白，战斗画面中使用暗红强调；不是从官网提取的官方色值，也没有引入官方图片。

核心 CSS 变量在 `app/globals.css`：

- `--ink: #090a0b`
- `--surface: #131416`
- `--bone: #e4dfd5`
- `--fog: #a9adb0`
- `--blood: #852e32`
- `--gold: #c3ad80`

`tailwind.config.ts` 中保留了旧的 `jade` 命名以避免组件接口变化，但实际颜色已调整为冷灰色。主要按钮使用暗红，金色只做少量强调；首页 Hero 使用 CSS 渐变、薄刀锋线和圆环，不使用官方图像。

## 5. 重要目录

| 目录/文件 | 责任 |
| --- | --- |
| `app/` | App Router 页面、布局、全局样式、metadata、sitemap、robots |
| `src/components/` | 语言选择、配装、追踪器、列表卡片、来源说明、JSON-LD 等可复用组件 |
| `src/lib/data.ts` | 游戏资料、来源和更新时间 |
| `src/lib/i18n.ts` | 语言列表、浏览器语言解析、插值、倒计时格式化 |
| `src/lib/locales/*.json` | 15 份界面词典 |
| `src/lib/planner.ts` | 配装 schema、导入导出和分享数据 |
| `src/lib/tracker.ts` | 追踪器 schema、状态转换和历史 |
| `tests/` | Vitest 单元/回归测试 |
| `scripts/check-export.mjs` | 静态导出完整性和 SEO 检查 |
| `scripts/browser-smoke.cjs` | Playwright 浏览器烟测（需本机 Playwright/Edge） |
| `docs/verification/` | 已执行的测试和浏览器验证证据 |

## 6. 如何运行

在项目根目录执行：

```text
npm ci
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

静态预览地址：`http://127.0.0.1:3000/`。`npm run build` 输出到 `out/`；`NEXT_PUBLIC_SITE_URL` 未设置时，预览构建使用 noindex/disallow 并生成空 sitemap。生产部署前必须设置真实 HTTPS 域名，不要猜测或写入域名。

## 7. 已验证证据

截至 2026-09-09：

- `npm test`：6 个测试文件、45 个测试通过。
- `npm run lint`：通过，零 warning。
- `npm run typecheck`：通过。
- `npm run build`：通过，静态导出成功。
- `node scripts/check-export.mjs`：通过；检查 10 个 HTML 路由、4 类 JSON-LD、来源占位符、预览索引策略。
- 实际本地浏览器检查：15 个语言选项逐一切换成功；刷新后语言选择保留；未保存的配装草稿在切换到德语时保留；桌面和 390×844 手机尺寸未发现横向溢出。
- 已检查简体中文首页、德语配装页；临时 viewport 覆盖已重置。

对应证据文档：

- `docs/verification/2026-09-09-theme-and-15-languages.md`
- `docs/verification/2026-09-09-functional-v1.md`
- `docs/verification/2026-09-09-language-selection.md`
- `docs/decisions/2026-09-09-v1-completion.md`

## 8. 已知限制与下一步建议

优先级从高到低：

1. 找母语使用者审校 14 份非英文词典，特别是韩语、泰语、越南语、俄语、拉美西语和两种葡语的语气与术语。
2. 在真实手机浏览器上再检查原生 `<select>` 弹出菜单；目前控件是可访问的原生下拉框，弹出外观会由操作系统决定。
3. 确认发售日期是否仍与当前 PlayStation Store 来源一致；正式发售后将所有 `Pre-release` 记录逐条复核，再改为 `Verified`。
4. 如果需要更多资料页，先补充有可靠来源的实质内容，不要为了 SEO 批量创建空的武器/首领页面。
5. 如果要做真正的多语言 SEO，再单独设计 locale 路由、canonical、hreflang 和各语言 metadata；不要只把当前显示选择器误当作 SEO 国际化。
6. 部署 Cloudflare Pages 前设置 `NEXT_PUBLIC_SITE_URL`，并检查 sitemap、robots、OG 图和 Web Analytics 配置；不要把密钥或 `.env.local` 放入文档或版本库。

## 9. 给下一个模型的工作边界

请先阅读本交接文档、`docs/PROJECT-BRIEF.md`、`README.md` 和 `docs/decisions/2026-09-09-v1-completion.md`，再修改代码。保留现有用户数据兼容性、静态导出能力、来源标注和独立项目声明。任何新增游戏事实都必须有来源和更新时间；不使用未授权官方美术资源；不要把玩家笔记字段改写成官方装备事实。修改后至少运行 `npm test`、`npm run lint`、`npm run typecheck`、`npm run build` 和 `node scripts/check-export.mjs`。

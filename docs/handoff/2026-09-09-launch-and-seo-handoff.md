# Phantom Blade Zero Tools — 上线与后续开发交接

**交接日期：** 2026-09-09  
**项目目录：** `E:\Ai项目\Phantom Blade Zero Tools`  
**当前线上地址：** https://phantom-blade-zero-tools.pages.dev/  
**GitHub：** https://github.com/TANGCC101/phantom-blade-zero-tools

> 后续进展（2026-09-10）：本交接中的“稳健内容积累”首批开发已实施，详见 `docs/verification/2026-09-09-seo-content.md`。六篇指南现已随站点语言选择完整切换为 15 种显示语言，涵盖正文、来源区和相关推荐；实现与验证见 `docs/verification/2026-09-10-guide-languages.md`。sitemap 已从 10 个扩展为 16 个 URL。下文保留原始交接状态；不要重复开发本批内容。

## 1. 当前状态：已经上线

Cloudflare Pages 已成功部署，生产分支为 `main`。线上首页、`robots.txt` 和 `sitemap.xml` 均已实测返回 HTTP 200。

最新提交为：

```text
2277172 Regenerate lockfile for Cloudflare npm
```

此前两个提交：

```text
a31bae1 Fix npm ci lockfile consistency
2ffee8e Initial release
```

当前 Cloudflare Pages 构建设置：

```text
Framework preset: Next.js (Static HTML Export)
Production branch: main
Build command: npx next build
Build output directory: out
Root directory: blank
```

Cloudflare 第一次部署失败的原因是 `package-lock.json` 与 Cloudflare 使用的 npm 版本不兼容。已用 npm 10 重新生成 lockfile，并验证：

- `npm ci --dry-run`：通过
- `npm test`：45 个测试通过
- `npm run build`：通过

不要把项目改成 `wrangler deploy`。这是 Next.js 静态导出项目，应继续使用 Pages 的 GitHub 自动部署。

## 2. Cloudflare 环境变量

已在生产环境添加：

```text
NEXT_PUBLIC_SITE_URL=https://phantom-blade-zero-tools.pages.dev
GOOGLE_SITE_VERIFICATION=<Google Search Console 提供的验证字符串>
```

环境变量修改后必须重新部署才会进入静态 HTML 和 metadata。以后如果绑定自定义域名，需要把 `NEXT_PUBLIC_SITE_URL` 改成正式域名并重新部署。

不要提交 `.env.local`、密码、API key 或其他私密凭据。`.gitignore` 已忽略 `.env` 和 `.env.*`，但保留 `.env.example`。

## 3. 搜索引擎状态

### Google

- 已验证网站所有权。
- 已提交：`https://phantom-blade-zero-tools.pages.dev/sitemap.xml`
- sitemap 当前包含 10 个 URL。
- Search Console 初始显示已发现页面为 0 是正常的，等待抓取后会更新。
- 后续可在「网址检查」中检查并请求首页收录。

### Bing

- 已添加正确的网站属性：`phantom-blade-zero-tools.pages.dev`。
- 已成功提交：`https://phantom-blade-zero-tools.pages.dev/sitemap.xml`。
- Bing 页面显示 sitemap 正在处理、错误 0、警告 0、已发现 URL 10 个。
- 之前误选过 `pbz-tools.pages.dev`，以后操作时确认左上角属性必须是本项目域名。

### 已验证线上文件

```text
https://phantom-blade-zero-tools.pages.dev/robots.txt
https://phantom-blade-zero-tools.pages.dev/sitemap.xml
```

robots 已声明 sitemap，内容允许搜索引擎抓取。

## 4. 当前产品功能

- Next.js 15 静态导出，输出目录 `out/`。
- 页面：`/`、`/builds/`、`/weapons/`、`/weapons/[slug]/`、`/bosses/`、`/bosses/[slug]/`、`/tracker/`、`/guides/`、`/about/`。
- 配装规划器：浏览器本地保存、JSON 备份/导入、Unicode 分享链接、预览后显式保存。
- 追踪器：发售倒计时、发售后进度切换和历史记录。
- 资料页：来源与阶段两个独立可信度维度，已有来源 URL、标题和更新时间。
- 语言：English、简体中文、繁體中文、日本語、한국어、Français、Deutsch、Español、Español (LATAM)、Português (BR)、Português (PT)、Русский、Italiano、ไทย、Tiếng Việt。
- 视觉：官网视觉印象启发的墨黑、雾灰、骨白、暗红配色；没有复制官方 Logo 或官方美术。
- 玩家配装数据保存在各自浏览器中，不是云端共享数据。

## 5. 已确认的事实与边界

- 当前发售瞬间为 `2026-10-29T02:00:00.000Z`，依据美国 PlayStation Store；上线前后仍应继续核对权威来源。
- 所有当前公开数据均为 `Pre-release`，`Verified` 只代表正式发售后逐条对照游戏确认。
- 武器页当前是系统级概览，不要扩展成虚构的具体武器、伤害、掉落或槽位数据库。
- 首领资料是精选条目，不是完整首领名单。
- 内容不得暗示与 S-GAME 官方合作或获得官方背书。
- 不要为了 SEO 批量创建没有实质内容的空页面。

## 6. 下一阶段：稳健内容积累（首批已实现）

用户已批准采用“稳健内容积累”方案，下一模型可以直接继续，不需要重新讨论方向。

### 技术 SEO

1. 检查并补齐首页、配装、武器、首领、追踪器、指南、关于页的页面级 title、description、canonical、Open Graph。
2. 检查 JSON-LD：VideoGame、FAQPage、ItemList、BreadcrumbList 应只在内容真实存在的页面输出。
3. 加强首页 ↔ 指南 ↔ 武器/首领/配装/追踪器的内部链接。
4. 检查 sitemap 的最后修改时间和正式域名切换逻辑。
5. 保留静态导出、Cloudflare Pages 和 15 语言选择，不引入不必要的服务端依赖。

### 首批内容

优先新增有来源、能解决具体问题的指南内容：

- 战斗系统概览：只总结已有官方预发行战斗资料。
- Phantom Edges 是什么：明确它是开发者预览中的副武器家族，不扩写未确认装备清单。
- 如何使用配装规划器：解释本地保存、JSON 备份、分享预览和数据边界。
- 发售前资料可信度说明：解释 Official / Community 与 Pre-release / Verified 的区别。
- 首领资料阅读指南：说明 Seven Stars 条目来自媒体试玩，不等同于正式版完整攻略。
- 发售后如何记录进度：说明 tracker 会在发售后切换，但不要现在伪造正式版流程。

每篇内容都需要来源、更新时间、相关页面链接和明确的预发行限制。不要用 AI 批量生成无来源攻略。

### 内容与商业化边界

- 现阶段优先积累搜索流量和工具使用，不急着做会员、支付或云同步。
- 后续可考虑 AdSense、合法周边联盟链接和用户赞助，但必须补齐隐私、Cookie 和推广披露。
- 云端同步/会员需要新的账号、数据库和支付架构，不能只靠当前静态 Pages 完成。

## 7. 推荐继续工作的顺序

1. 先写 SEO/内容设计文档和实现计划。
2. 补页面 metadata、内部链接和结构化数据测试。
3. 继续新增有来源的实质指南时，同步补齐 15 种显示语言的文章词典；英文仍作为静态 HTML、metadata 和 canonical 的稳定基线。
4. 运行 `npm test`、`npm run lint`、`npm run typecheck`、`npm run build`、`node scripts/check-export.mjs`。
5. 推送到 `main`，确认 Cloudflare 新部署成功。
6. 在 Google/Bing 检查 sitemap 和首页收录状态。

## 8. 交给下一个模型的提示

请先阅读本文件、`docs/PROJECT-BRIEF.md`、`README.md`、`docs/decisions/2026-09-09-v1-completion.md`，再开始 SEO/内容开发。用户已批准“稳健内容积累”方案。不要重做已经完成的部署、语言选择器或配装规划器；不要更换 Cloudflare Pages 架构；不要添加没有来源的游戏事实；所有新增事实都要附来源 URL、来源标题和更新时间。

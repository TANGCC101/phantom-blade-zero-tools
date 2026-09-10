# 指南全文 15 种显示语言验收

**验收日期：** 2026-09-10

**范围：** `/guides/` 与六个 `/guides/[slug]/` 页面

**线上地址：** https://phantom-blade-zero-tools.pages.dev/

## 完成结果

- 指南中心卡片、文章标题、摘要、适用范围、目录、全部正文、来源标签、面包屑与相关推荐均跟随现有语言选择器。
- 覆盖站点已有的 15 种显示语言：English、简体中文、繁體中文、日本語、한국어、Français、Deutsch、Español、Español (LATAM)、Português (BR)、Português (PT)、Русский、Italiano、ไทย、Tiếng Việt。
- 六篇文章共验证 90 个“文章 × 语言”组合；切换后文章 `lang`、可见正文、来源区与结构化数据同步更新。
- 刷新后继续使用已保存的语言；连续快速切换时不会被较早的异步结果覆盖。
- 英文仍是静态 HTML、metadata、canonical 与 sitemap 的基线，没有新增重复的语言 URL。
- 语言包按需载入；载入失败或缺少文本时回退为完整英文内容。
- 简体、繁体中文的导航、标题、摘要、范围说明和章节标题已人工润色。其他语言已完成机器翻译和自动一致性检查，后续内容维护仍应安排母语编辑复核。

## 自动化证据

在 Node.js 22+ 环境完成：

- `npm test`：9 个测试文件、72 项测试通过，其中指南语言测试 16 项。
- `npm run lint`：通过，0 警告。
- `npm run typecheck`：通过。
- `NEXT_PUBLIC_SITE_URL=https://phantom-blade-zero-tools.pages.dev npm run build`：通过，21 个静态页面生成步骤完成。
- `node scripts/check-export.mjs`：通过；确认 16 个 HTML 页面、六篇实质指南、唯一 metadata、内部链接、四类 JSON-LD 与生产索引策略。
- `node scripts/guide-language-smoke.cjs`：通过全部 90 个文章语言组合，并覆盖完整段落、来源 URL/标题、结构化数据、指南中心与首页卡片、语言偏好刷新、快速切换和移动端布局。

## 内容完整性检查

- 15 个指南词典均包含与英文基线完全一致的 141 个键，且没有空值。
- 数字事实、年份、数量、文件大小限制和 UTC 时间在翻译后保留。
- 六篇文章的摘要、范围说明和正文没有退化为英文副本。
- 来源 URL 保持原样，来源标题可按显示语言阅读；编辑日期没有因翻译工作而虚假刷新。

## 维护说明

新增或修改英文指南内容时，先更新 `src/lib/guides.ts` 与 `src/lib/guide-locales/en.json`，再为其余 14 个语言词典补齐相同键，并运行指南语言测试与浏览器验收脚本。翻译属于显示层内容，不应自动生成语言路由或改变 canonical。

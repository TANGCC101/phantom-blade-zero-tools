import Link from 'next/link';
import {JsonLd} from '../../src/components/JsonLd';
import {homeLanguageAlternates,pageMetadata,publicUrl,siteUrl} from '../../src/lib/seo';

export const metadata=pageMetadata(
 '影之刃零配装与资料工具（简体中文）',
 '/zh',
 '独立整理的《影之刃零》配装规划、有来源的战斗资料与发售追踪。注明官方/社区来源与发售前边界，不编造未验证配装榜。',
 {languages:homeLanguageAlternates}
);

const tools=[
 {href:'/builds/',title:'配装规划器',body:'为组合命名、本地保存，并生成分享链接。笔记保存在你的浏览器，不上传云端。'},
 {href:'/weapons/',title:'武器与战斗系统',body:'按官方预览整理主武器与 Phantom Edges 系统说明，明确区分已公布内容与未知项。'},
 {href:'/bosses/',title:'首领遭遇记录',body:'精选有来源的试玩遭遇笔记，不是完整 Boss 名单或通关攻略。'},
 {href:'/tracker/',title:'发售与进度追踪',body:'查看发售里程碑；发售后可在本机记录精选遭遇的完成情况。'},
 {href:'/guides/',title:'指南',body:'战斗系统概览、配装器用法、资料可信度与首领笔记阅读方法，均标注来源与查阅日期。'},
] as const;

const guides=[
 {href:'/guides/combat-system-overview/',title:'战斗系统：发售前概览',body:'了解官方公开的武器系统信息，区分已公布内容与未知信息。'},
 {href:'/guides/build-planner/',title:'如何使用配装规划器',body:'本地保存、JSON 备份、分享预览，以及数据边界说明。'},
 {href:'/guides/data-reliability/',title:'如何阅读来源与可信度标签',body:'官方/社区与发售前/已验证两个维度的读法。'},
] as const;

export default function ChineseHome(){
 return (
  <div lang="zh-CN">
   <p className="mb-6 text-sm text-stone-400">
    <Link href="/">English</Link>
    <span aria-hidden="true"> · </span>
    <span>简体中文</span>
   </p>
   <section className="hero relative mb-10 overflow-hidden rounded-2xl border border-stone-800 px-6 py-16 md:px-12 md:py-24">
    <div className="relative z-10 max-w-2xl">
     <p className="text-xs tracking-[.3em] text-jade">武林行旅手记</p>
     <h1 className="mt-6 text-5xl font-semibold leading-tight md:text-7xl">
      手中之刃。<br/>自己的江湖。
     </h1>
     <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-400">
      规划配装，记录旅程，查阅持续整理、注明来源的《影之刃零》（Phantom Blade Zero）资料。
     </p>
     <div className="mt-8 flex flex-wrap gap-4">
      <Link className="button-primary" href="/builds/">创建配装 ↗</Link>
      <Link className="rounded border border-stone-600 px-5 py-3" href="/tracker/">关注发售</Link>
     </div>
    </div>
    <div aria-hidden="true" className="moon"/>
   </section>

   <aside className="panel mb-10 text-sm leading-relaxed text-stone-300">
    <h2 className="text-base text-gold">这个中文页解决什么问题</h2>
    <p className="mt-3">
      英文首页的语言切换只在浏览器里改显示文案，搜索引擎默认抓到的仍是英文 HTML。本页把核心介绍写成可抓取的简体中文，方便检索「影之刃零配装」「Phantom Blade Zero 工具」等意图，同时链回配装器、武器资料与有来源的指南。
    </p>
    <p className="mt-3">
      本站是独立玩家项目，与 S-GAME 无隶属或官方背书关系。《影之刃零》为 S-GAME 作品，并有 PlayStation 5 商店页面。
    </p>
   </aside>

   <div className="mb-10 grid gap-4 md:grid-cols-2">
    {tools.map(tool=>(
     <Link key={tool.href} className="panel block" href={tool.href}>
      <h2 className="text-lg text-gold">{tool.title}</h2>
      <p className="mt-3 text-stone-400">{tool.body}</p>
     </Link>
    ))}
   </div>

   <aside className="panel mb-10 text-sm">
    <h2 className="text-base text-gold">资料可信度说明</h2>
    <p className="mt-2 text-stone-300">
      来源：<span className="text-jade">官方</span>＝开发商/平台发布 · 社区＝独立媒体或玩家报道。
    </p>
    <p className="mt-2 text-stone-400">
      阶段：发售前＝预告/试玩信息 · 已验证＝已对照正式版游戏核对。这两个维度相互独立。本站不编造「最强配装」榜单，也不把试玩观察写成正式版定论。
    </p>
   </aside>

   <section className="mb-10 border-t border-stone-800 pt-8">
    <h2 className="text-2xl text-gold">下一步阅读指南</h2>
    <p className="mt-2 text-sm text-stone-400">每篇指南均注明来源、查阅日期和适用范围。打开后可用站点语言菜单阅读译文；页面的英文 HTML 仍是稳定基线。</p>
    <ul className="mt-4 grid gap-4 md:grid-cols-2">
     {guides.map(guide=>(
      <li key={guide.href}>
       <Link className="panel block h-full" href={guide.href}>
        <h3 className="text-lg">{guide.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-400">{guide.body}</p>
       </Link>
      </li>
     ))}
    </ul>
    <Link className="mt-5 inline-block" href="/guides/">浏览所有指南 →</Link>
   </section>

   <p className="mt-6 text-sm text-stone-400">
    Phantom Blade Zero（《影之刃零》）是 S-GAME 的游戏，并有 PlayStation 5 商店页面。{' '}
    <a href="https://www.playstation.com/en-us/games/phantom-blade-zero/">官方 PlayStation 游戏页</a>
    {' '}· 官方 / 发售前 · 查阅日期 2026-09-09。
   </p>

   <JsonLd data={{
    '@context':'https://schema.org',
    '@type':'WebSite',
    name:'影之刃零工具（PBZ Tools）',
    inLanguage:'zh-CN',
    description:'独立整理的《影之刃零》配装规划、有来源资料与发售追踪。',
    ...(siteUrl?{url:publicUrl('/zh')}:{}),
   }}/>
  </div>
 );
}

'use client';
import Link from 'next/link';
import type {Guide} from '../lib/guides';
import {useGuideLanguage} from './GuideLanguage';
import {JsonLd} from './JsonLd';

export function GuideArticle({guide,breadcrumbUrls}:{guide:Guide;breadcrumbUrls:string[]}){
 const {readingLocale,t}=useGuideLanguage();
 const crumbs=[{name:'Home',href:'/'},{name:'Guides',href:'/guides'},{name:guide.title,href:'/guides/'+guide.slug}];
 return <article lang={readingLocale} className="mx-auto max-w-3xl">
  <nav aria-label={t('Breadcrumb')} className="mb-6 text-sm"><ol className="flex flex-wrap gap-3">{crumbs.map((item,i)=><li key={item.href}>{i>0&&<span aria-hidden="true" className="mr-3">/</span>}<Link href={item.href}>{t(item.name)}</Link></li>)}</ol></nav>
  <JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((item,i)=>({'@type':'ListItem',position:i+1,name:t(item.name),item:breadcrumbUrls[i]}))}}/>
  <p className="mb-4 text-sm text-jade">{t('PBZ Tools editorial guide')}</p>
  <h1 className="text-3xl font-bold leading-tight md:text-5xl">{t(guide.title)}</h1>
  <p className="mt-5 text-lg leading-relaxed text-stone-300">{t(guide.description)}</p>
  <p className="mt-4 text-sm text-stone-400">{t('Last updated:')} <time dateTime={guide.lastUpdated}>{guide.lastUpdated}</time></p>
  <aside className="panel my-8"><h2 className="text-lg text-gold">{t('Scope and pre-release limits')}</h2><p className="mt-3 leading-relaxed">{t(guide.limitation)}</p></aside>
  <nav aria-label={t('On this page')} className="mb-10"><h2 className="mb-3 text-lg text-gold">{t('On this page')}</h2><ul className="list-disc space-y-2 pl-5">{guide.sections.map(s=><li key={s.id}><a href={'#'+s.id}>{t(s.title)}</a></li>)}<li><a href="#sources">{t('Sources and review dates')}</a></li></ul></nav>
  {guide.sections.map(s=><section id={s.id} key={s.id} className="mb-9 scroll-mt-6"><h2 className="mb-4 text-2xl text-gold">{t(s.title)}</h2>{s.paragraphs.map(p=><p key={p} className="mt-4 leading-8 text-stone-300">{t(p)}</p>)}</section>)}
  <section id="sources" className="panel"><h2 className="text-2xl text-gold">{t('Sources and review dates')}</h2><ul className="mt-4 space-y-5">{guide.sources.map(s=><li key={s.sourceUrl}><a className="break-words underline" href={s.sourceUrl} title={t(s.sourceTitle)}>{t(s.sourceTitle)}</a><p className="mt-1 text-sm text-stone-400">{t(s.kind)} · {t('Checked')} <time dateTime={s.lastUpdated}>{s.lastUpdated}</time></p></li>)}</ul></section>
  <nav aria-label={t('Related reading')} className="mt-10"><h2 className="text-2xl text-gold">{t('Continue reading and using the tools')}</h2><ul className="mt-4 list-disc space-y-3 pl-5">{guide.related.filter(x=>x.href!=='/guides').map(x=><li key={x.href}><Link href={x.href}>{t(x.name)}</Link></li>)}<li><Link href="/guides">{t('All guides')}</Link></li><li><Link href="/">{t('PBZ Tools home')}</Link></li></ul></nav>
 </article>;
}

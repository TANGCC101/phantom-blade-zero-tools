'use client';
import Link from 'next/link';
import {JsonLd} from './JsonLd';
import {useGuideLanguage} from './GuideLanguage';

export type GuideCard={slug:string;title:string;description:string;lastUpdated:string};
export function RelatedGuideCards({guides}:{guides:GuideCard[]}){
 const {readingLocale,t}=useGuideLanguage();
 return <section lang={readingLocale} className="mt-10 border-t border-stone-800 pt-8">
  <h2 className="text-2xl text-gold">{t('Guides for your next step')}</h2><p className="mt-2 text-sm text-stone-400">{t('Guides with sources, review dates and clear limits.')}</p>
  <ul className="mt-4 grid gap-4 md:grid-cols-2">{guides.map(guide=><li key={guide.slug}><Link className="panel block h-full" href={'/guides/'+guide.slug}><h3 className="text-lg">{t(guide.title)}</h3><p className="mt-2 text-sm leading-relaxed text-stone-400">{t(guide.description)}</p></Link></li>)}</ul>
  <Link className="mt-5 inline-block" href="/guides">{t('Browse all guides →')}</Link>
 </section>;
}
export function GuideCards({guides,urls}:{guides:GuideCard[];urls:string[]}){
 const {readingLocale,t}=useGuideLanguage();
 return <section lang={readingLocale} className="my-8">
  <h2 className="text-2xl text-gold">{t('Practical guides for Phantom Blade Zero')}</h2>
  <p className="mt-3 text-stone-400">{t('Start with a question, follow the sources, then use the tools. Choose your reading language in the menu.')}</p>
  <div className="mt-6 grid gap-4 md:grid-cols-2">{guides.map(guide=><article className="panel" key={guide.slug}>
   <h3 className="text-xl text-gold"><Link href={'/guides/'+guide.slug}>{t(guide.title)}</Link></h3>
   <p className="mt-3 leading-relaxed text-stone-300">{t(guide.description)}</p>
   <p className="mt-3 text-xs text-stone-400">{t('Updated')} <time dateTime={guide.lastUpdated}>{guide.lastUpdated}</time></p>
  </article>)}</div>
  <JsonLd data={{'@context':'https://schema.org','@type':'ItemList',itemListElement:guides.map((guide,i)=>({'@type':'ListItem',position:i+1,name:t(guide.title),url:urls[i]}))}}/>
 </section>;
}

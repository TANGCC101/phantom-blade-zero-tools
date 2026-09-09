import Link from 'next/link';
import {notFound} from 'next/navigation';
import {guides} from '../../../src/lib/guides';
import {pageMetadata} from '../../../src/lib/seo';
import {Breadcrumbs} from '../../../src/components/Breadcrumbs';

export const dynamicParams=false;
export function generateStaticParams(){return guides.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const guide=guides.find(x=>x.slug===slug);
 return guide?pageMetadata(guide.title,'/guides/'+slug,guide.description):{};
}
export default async function GuidePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const guide=guides.find(x=>x.slug===slug);if(!guide)notFound();
 return <article lang="en" className="mx-auto max-w-3xl">
  <Breadcrumbs items={[{name:'Guides',href:'/guides'},{name:guide.title,href:'/guides/'+slug}]}/>
  <p className="mb-4 text-sm text-jade">PBZ Tools editorial guide · English</p>
  <h1 className="text-3xl font-bold leading-tight md:text-5xl">{guide.title}</h1>
  <p className="mt-5 text-lg leading-relaxed text-stone-300">{guide.description}</p>
  <p className="mt-4 text-sm text-stone-400">Last updated: <time dateTime={guide.lastUpdated}>{guide.lastUpdated}</time></p>
  <aside className="panel my-8"><h2 className="text-lg text-gold">Scope and pre-release limits</h2><p className="mt-3 leading-relaxed">{guide.limitation}</p></aside>
  <nav aria-label="On this page" className="mb-10"><h2 className="mb-3 text-lg text-gold">On this page</h2><ul className="list-disc space-y-2 pl-5">{guide.sections.map(s=><li key={s.id}><a href={'#'+s.id}>{s.title}</a></li>)}<li><a href="#sources">Sources and review dates</a></li></ul></nav>
  {guide.sections.map(s=><section id={s.id} key={s.id} className="mb-9 scroll-mt-6"><h2 className="mb-4 text-2xl text-gold">{s.title}</h2>{s.paragraphs.map(p=><p key={p} className="mt-4 leading-8 text-stone-300">{p}</p>)}</section>)}
  <section id="sources" className="panel"><h2 className="text-2xl text-gold">Sources and review dates</h2><ul className="mt-4 space-y-5">{guide.sources.map(s=><li key={s.sourceUrl}><a className="break-words underline" href={s.sourceUrl}>{s.sourceTitle}</a><p className="mt-1 text-sm text-stone-400">{s.kind} · Checked <time dateTime={s.lastUpdated}>{s.lastUpdated}</time></p></li>)}</ul></section>
  <nav aria-label="Related reading" className="mt-10"><h2 className="text-2xl text-gold">Continue reading and using the tools</h2><ul className="mt-4 list-disc space-y-3 pl-5">{guide.related.map(x=><li key={x.href}><Link href={x.href}>{x.name}</Link></li>)}<li><Link href="/guides">All guides</Link></li><li><Link href="/">PBZ Tools home</Link></li></ul></nav>
 </article>;
}

import Link from 'next/link';
import {guides} from '../lib/guides';

export function RelatedGuides({slugs}:{slugs:string[]}){
 const selected=guides.filter(guide=>slugs.includes(guide.slug));
 return <section lang="en" className="mt-10 border-t border-stone-800 pt-8"><h2 className="text-2xl text-gold">Guides for your next step</h2><p className="mt-2 text-sm text-stone-400">English guides with sources, review dates and clear limits.</p><ul className="mt-4 grid gap-4 md:grid-cols-2">{selected.map(guide=><li key={guide.slug}><Link className="panel block h-full" href={'/guides/'+guide.slug}><h3 className="text-lg">{guide.title}</h3><p className="mt-2 text-sm leading-relaxed text-stone-400">{guide.description}</p></Link></li>)}</ul><Link className="mt-5 inline-block" href="/guides">Browse all guides →</Link></section>;
}

import {RelatedGuides} from '../../../src/components/RelatedGuides';
import {T} from '../../../src/components/Language';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {bosses} from '../../../src/lib/data';
import {SourceNote} from '../../../src/components/SourceNote';
import {Breadcrumbs} from '../../../src/components/Breadcrumbs';
import {pageMetadata} from '../../../src/lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return bosses.map(x=>({slug:x.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const x=bosses.find(x=>x.slug===slug);return x?pageMetadata(x.name,'/bosses/'+slug,x.summary):{};}
export default async function Detail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const x=bosses.find(x=>x.slug===slug);if(!x)notFound();
 return <><Breadcrumbs items={[{name:'bosses',href:'/bosses'},{name:x.name,href:'/bosses/'+slug}]}/><h1 className="text-4xl font-bold"><T text={x.name}/></h1><p className="mt-4 text-lg"><T text={x.summary}/></p><ul className="my-6 list-disc space-y-3 pl-5">{x.notes.map(note=><li key={note}><T text={note}/></li>)}</ul><SourceNote item={x}/><div className="mt-8 flex gap-6"><Link href="/builds"><T text="Plan a combination →"/></Link><Link href="/tracker"><T text="Record your progress →"/></Link></div><RelatedGuides slugs={["boss-encounter-notes","progress-tracker"]}/></>;
}

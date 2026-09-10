import {notFound} from 'next/navigation';
import {guides} from '../../../src/lib/guides';
import {pageMetadata,publicUrl} from '../../../src/lib/seo';
import {GuideArticle} from '../../../src/components/GuideArticle';

export const dynamicParams=false;
export function generateStaticParams(){return guides.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const guide=guides.find(x=>x.slug===slug);
 return guide?pageMetadata(guide.title,'/guides/'+slug,guide.description):{};
}
export default async function GuidePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const guide=guides.find(x=>x.slug===slug);if(!guide)notFound();
 return <GuideArticle guide={guide} breadcrumbUrls={['/','/guides','/guides/'+slug].map(publicUrl)}/>;
}

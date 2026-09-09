import {T} from './Language';
import Link from 'next/link';
import {JsonLd} from './JsonLd';
import {publicUrl} from '../lib/seo';
export function Breadcrumbs({items}:{items:{name:string;href:string}[]}){
 return <><nav aria-label="Breadcrumb" className="mb-6 text-sm"><ol className="flex flex-wrap gap-3">{[{name:'Home',href:'/'},...items].map((item,i)=><li key={item.href}>{i>0&&<span aria-hidden="true" className="mr-3">/</span>}<Link href={item.href}><T text={item.name}/></Link></li>)}</ol></nav><JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',href:'/'},...items].map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:publicUrl(item.href)}))}}/></>;
}

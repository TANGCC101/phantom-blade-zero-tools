import type {Metadata} from 'next';
function configuredOrigin(value:string|undefined){
 if(!value?.trim())return undefined;
 const url=new URL(value.trim());
 if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash||url.pathname!=='/')throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, credentials, query or fragment.');
 return url.origin;
}
export const siteUrl=configuredOrigin(process.env.NEXT_PUBLIC_SITE_URL);
export function publicUrl(path:string){return (siteUrl??'')+'/'+path.replace(/^\/+|\/+$/g,'')+(path.replace(/\//g,'')?'/':'');}
export function pageMetadata(title:string,path:string,description:string):Metadata{
  return {title,description,alternates:siteUrl?{canonical:publicUrl(path)}:undefined,
    openGraph:{title,description,type:'website',...(siteUrl?{url:publicUrl(path)}:{})},
    robots:siteUrl?{index:true,follow:true}:{index:false,follow:false}};
}
export function itemList(items:{name:string;slug:string}[],kind:string){
 return {'@context':'https://schema.org','@type':'ItemList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,url:publicUrl('/'+kind+'/'+item.slug)}))};
}

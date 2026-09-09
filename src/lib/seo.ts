import type {Metadata} from 'next';
export const siteUrl=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,'');
export function pageMetadata(title:string,path:string,description:string):Metadata{
  return {title,description,alternates:siteUrl?{canonical:siteUrl+path}:undefined,
    openGraph:{title,description,type:'website',...(siteUrl?{url:siteUrl+path}:{})},
    robots:siteUrl?{index:true,follow:true}:{index:false,follow:false}};
}
export function itemList(items:{name:string;slug:string}[],kind:string){
 return {'@context':'https://schema.org','@type':'ItemList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,url:(siteUrl??'')+'/'+kind+'/'+item.slug}))};
}

import type {Metadata} from 'next';
function configuredOrigin(value:string|undefined){
 if(!value?.trim())return undefined;
 const url=new URL(value.trim());
 if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash||url.pathname!=='/')throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path, credentials, query or fragment.');
 return url.origin;
}
export const siteUrl=configuredOrigin(process.env.NEXT_PUBLIC_SITE_URL);
export function publicUrl(path:string){return (siteUrl??'')+'/'+path.replace(/^\/+|\/+$/g,'')+(path.replace(/\//g,'')?'/':'');}
export const homeLanguageAlternates={
 en:'/',
 'zh-CN':'/zh',
 'x-default':'/',
} as const;
const shareImage={url:'/opengraph-image.png',width:1200,height:630,alt:'Phantom Blade Zero Tools'};
export function pageMetadata(
 title:string,
 path:string,
 description:string,
 options:{languages?:Record<string,string>}={}
):Metadata{
 const languages=options.languages&&siteUrl
  ?Object.fromEntries(Object.entries(options.languages).map(([locale,localePath])=>[locale,publicUrl(localePath)]))
  :undefined;
 return {
  title,
  description,
  alternates:siteUrl?{canonical:publicUrl(path),...(languages?{languages}:{})}:undefined,
  openGraph:{
   title,
   description,
   type:'website',
   locale:path==='/zh'?'zh_CN':'en_US',
   images:[shareImage],
   ...(siteUrl?{url:publicUrl(path)}:{}),
  },
  twitter:{card:'summary_large_image',title,description,images:['/opengraph-image.png']},
  robots:siteUrl?{index:true,follow:true}:{index:false,follow:false},
 };
}
export function itemList(items:{name:string;slug:string}[],kind:string){
 return {'@context':'https://schema.org','@type':'ItemList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,url:publicUrl('/'+kind+'/'+item.slug)}))};
}

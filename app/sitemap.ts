import {weapons,bosses} from '../src/lib/data';
import {siteUrl,publicUrl} from '../src/lib/seo';
import {guides} from '../src/lib/guides';
export const dynamic='force-static';
export default function sitemap(){
 if(!siteUrl)return [];
 const staticPages=['/','/builds','/weapons','/bosses','/tracker','/guides','/about'].map(path=>({path,lastUpdated:'2026-09-09'}));
 const records=[...staticPages,...weapons.map(x=>({path:'/weapons/'+x.slug,lastUpdated:x.lastUpdated})),...bosses.map(x=>({path:'/bosses/'+x.slug,lastUpdated:x.lastUpdated})),...guides.map(x=>({path:'/guides/'+x.slug,lastUpdated:x.lastUpdated}))];
 return records.map(x=>({url:publicUrl(x.path),lastModified:x.lastUpdated}));
}

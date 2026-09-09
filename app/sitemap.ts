import {weapons,bosses} from '../src/lib/data';
import {siteUrl} from '../src/lib/seo';
export const dynamic='force-static';
export default function sitemap(){if(!siteUrl)return [];return ['','/builds','/weapons','/bosses','/tracker','/guides','/about',...weapons.map(x=>'/weapons/'+x.slug),...bosses.map(x=>'/bosses/'+x.slug)].map(path=>({url:siteUrl+path,lastModified:'2026-09-09'}));}

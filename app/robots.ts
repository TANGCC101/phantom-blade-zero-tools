import {siteUrl} from '../src/lib/seo';
export const dynamic='force-static';
export default function robots(){return {rules:{userAgent:'*',...(siteUrl?{allow:'/'}:{disallow:'/'})},...(siteUrl?{sitemap:siteUrl+'/sitemap.xml'}:{})};}

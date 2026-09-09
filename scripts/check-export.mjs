import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const configuredOrigin=process.env.NEXT_PUBLIC_SITE_URL?.trim();
const origin=configuredOrigin?new URL(configuredOrigin).origin:undefined;
const files=await readdir('out',{recursive:true});
const pages=files.map(x=>x.replaceAll('\\','/')).filter(x=>x==='index.html'||x.endsWith('/index.html')).filter(x=>!x.startsWith('404/'));
const routes=new Set(pages.map(x=>'/'+x.replace(/index\.html$/,'')));
const guideRoutes=['combat-system-overview','phantom-edges','build-planner','data-reliability','boss-encounter-notes','progress-tracker'].map(x=>'/guides/'+x+'/');
for(const route of guideRoutes)assert.ok(routes.has(route),'missing static article: '+route);
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
const titles=new Set(),descriptions=new Set(),types=new Set();
const sitemap=await readFile('out/sitemap.xml','utf8');
const sitemapUrls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>decode(m[1]));
for(const page of pages){
 const route='/'+page.replace(/index\.html$/,'');
 const html=await readFile('out/'+page,'utf8');
 const body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
 const visible=decode(body.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ');
 assert.match(html,/<html lang="en"/);assert.equal((body.match(/<h1\b/g)||[]).length,1,route+' h1');
 const title=decode(html.match(/<title>(.*?)<\/title>/)?.[1]??'');
 assert.ok(title&&!titles.has(title),route+' missing/duplicate title');titles.add(title);
 const metas=[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>attrs(m[0]));
 const meta=key=>metas.find(x=>x.name===key||x.property===key)?.content;
 const description=meta('description');assert.ok(description&&!descriptions.has(description),route+' missing/duplicate description');descriptions.add(description);
 assert.ok(meta('og:title'),route+' OG title');assert.equal(meta('og:description'),description,route+' OG description');
 const links=[...body.matchAll(/<a\b[^>]*>/g)].map(m=>attrs(m[0])).filter(x=>x.href);
 for(const {href} of links){
  if(href.startsWith('#')){assert.ok(body.includes(`id="${href.slice(1)}"`),route+' broken anchor '+href);continue;}
  if(!href.startsWith('/')||href.startsWith('//'))continue;
  const path=new URL(href,'https://preview.example').pathname.replace(/\/?$/,'/');
  assert.ok(routes.has(path),route+' broken internal link '+href);
 }
 const canonical=[...html.matchAll(/<link\b[^>]*>/g)].map(m=>attrs(m[0])).find(x=>x.rel==='canonical')?.href;
 if(origin){
  assert.equal(canonical,origin+route,route+' canonical');assert.equal(meta('og:url'),canonical,route+' OG URL');
  assert.ok(sitemapUrls.includes(canonical),route+' absent from sitemap');assert.ok(!meta('robots')?.includes('noindex'),route+' noindex in production');
 }else{assert.equal(canonical,undefined);assert.match(meta('robots')??'',/noindex/);}
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
  const data=JSON.parse(match[1]);types.add(data['@type']);
  if(data['@type']==='FAQPage'){
   assert.equal(route,'/guides/');
   for(const question of data.mainEntity){assert.ok(visible.includes(question.name));assert.ok(visible.includes(question.acceptedAnswer.text));}
  }
  if(data['@type']==='VideoGame'){assert.equal(route,'/');assert.ok(visible.includes(data.name));assert.ok(visible.includes(data.gamePlatform));assert.ok(visible.includes(data.publisher.name));assert.equal(data.datePublished,undefined);}
  if(['ItemList','BreadcrumbList'].includes(data['@type']))for(const [i,item] of data.itemListElement.entries()){
   assert.equal(item.position,i+1);assert.ok(visible.includes(item.name),route+' invisible schema item '+item.name);
   const url=item.url??item.item;
   const target=new URL(url,'https://preview.example');assert.ok(routes.has(target.pathname),route+' schema target '+url);
   if(origin)assert.equal(target.origin,origin);
  }
 }
 if(guideRoutes.includes(route)){
  assert.match(body,/<article lang="en"/);assert.ok(visible.includes('Pre-release')||visible.includes('pre-release'));
  assert.ok(visible.includes('Sources and review dates'));assert.match(body,/<time dateTime="\d{4}-\d{2}-\d{2}"/);
  assert.ok(visible.split(/\s+/).length>250,route+' thin article');
  assert.ok(links.some(x=>x.href.startsWith('https://')),route+' missing sources');
  const hub=await readFile('out/guides/index.html','utf8');assert.ok(hub.includes(route.slice(0,-1)),route+' orphaned');
 }
}
for(const type of ['VideoGame','FAQPage','ItemList','BreadcrumbList'])assert.ok(types.has(type),type+' missing');
const robots=await readFile('out/robots.txt','utf8');
if(origin){
 assert.equal(sitemapUrls.length,routes.size);assert.equal(new Set(sitemapUrls).size,routes.size);
 assert.ok(robots.includes(origin+'/sitemap.xml'));
 for(const date of sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g))assert.match(date[1],/^\d{4}-\d{2}-\d{2}$/);
}else{assert.match(robots,/Disallow: \//);assert.equal(sitemapUrls.length,0);}
console.log(`PASS: ${pages.length} HTML pages, six substantive guides, unique metadata, internal links, four JSON-LD types and ${origin?'production':'preview'} indexing policy.`);

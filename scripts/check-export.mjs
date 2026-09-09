import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const pages=['','builds/','weapons/','weapons/main-weapons/','weapons/phantom-edges/','bosses/','bosses/seven-stars/','tracker/','guides/','about/'];
const types=new Set();
for(const route of pages){
 const html=await readFile('out/'+route+'index.html','utf8');
 assert.match(html,/<html lang="en"/);
 assert.match(html,/<h1/);
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
  const data=JSON.parse(match[1]);types.add(data['@type']);
 }
 assert.ok(!html.includes('Unknown Blade'),'fake item leaked');
 assert.ok(!html.includes('https://pbz.tools'),'unowned domain leaked');
}
for(const type of ['VideoGame','FAQPage','ItemList','BreadcrumbList'])assert.ok(types.has(type),type+' missing');
const robots=await readFile('out/robots.txt','utf8');
const sitemap=await readFile('out/sitemap.xml','utf8');
if(process.env.NEXT_PUBLIC_SITE_URL){
 assert.ok(sitemap.includes('/weapons/phantom-edges'));
 assert.ok(sitemap.includes('/bosses/seven-stars'));
}else{
 assert.match(robots,/Disallow: \//);assert.ok(!sitemap.includes('<loc>'));
}
console.log('PASS: ten HTML routes, four JSON-LD types, provenance placeholders removed, preview indexing policy.');

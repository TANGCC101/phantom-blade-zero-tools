import {afterEach, describe, expect, it, vi} from 'vitest';

afterEach(()=>{vi.unstubAllEnvs();vi.resetModules();});
describe('public URL policy',()=>{
 it.each(['http://example.org','https://example.org/path','https://user:pass@example.org','https://example.org/?query=1','https://example.org/#fragment','not-a-url'])('rejects an invalid production origin: %s',async value=>{
  vi.stubEnv('NEXT_PUBLIC_SITE_URL',value);vi.resetModules();
  await expect(import('../src/lib/seo')).rejects.toThrow();
 });
 it('normalizes canonical and Open Graph to the exported trailing-slash URL',async()=>{
  vi.stubEnv('NEXT_PUBLIC_SITE_URL',' https://EXAMPLE.ORG:443/ ');vi.resetModules();
  const {pageMetadata}=await import('../src/lib/seo');
  const meta=pageMetadata('Guides','/guides','Read guides');
  expect(meta.alternates?.canonical).toBe('https://example.org/guides/');
  expect(meta.openGraph).toMatchObject({url:'https://example.org/guides/',images:[{url:'/opengraph-image.png'}]});
  expect(meta.twitter).toMatchObject({card:'summary_large_image',images:['/opengraph-image.png']});
 });
 it('publishes hreflang alternates for the English and Chinese landings',async()=>{
  vi.stubEnv('NEXT_PUBLIC_SITE_URL','https://example.org');vi.resetModules();
  const {homeLanguageAlternates,pageMetadata}=await import('../src/lib/seo');
  const en=pageMetadata('Home','/','English home',{languages:homeLanguageAlternates});
  const zh=pageMetadata('中文首页','/zh','中文介绍',{languages:homeLanguageAlternates});
  expect(en.alternates?.languages).toEqual({
   en:'https://example.org/',
   'zh-CN':'https://example.org/zh/',
   'x-default':'https://example.org/',
  });
  expect(zh.alternates?.languages).toEqual(en.alternates?.languages);
  expect(zh.openGraph).toMatchObject({locale:'zh_CN'});
 });
 it('keeps unconfigured previews out of the index',async()=>{
  vi.stubEnv('NEXT_PUBLIC_SITE_URL','');vi.resetModules();
  const {pageMetadata}=await import('../src/lib/seo');
  expect(pageMetadata('Guides','/guides','Read guides')).toMatchObject({robots:{index:false,follow:false}});
  expect((await import('../app/sitemap')).default()).toEqual([]);
 });
 it('moves all sitemap URLs to a replacement domain with stable editorial dates',async()=>{
  vi.stubEnv('NEXT_PUBLIC_SITE_URL','https://replacement.example');vi.resetModules();
  const entries=(await import('../app/sitemap')).default();
  expect(entries.length).toBe(17);
  expect(entries.some(x=>x.url==='https://replacement.example/zh/')).toBe(true);
  for(const entry of entries){expect(entry.url).toMatch(/^https:\/\/replacement\.example\/.*\/$|^https:\/\/replacement\.example\/$/);expect(entry.lastModified).toBe('2026-09-09');}
 });
});

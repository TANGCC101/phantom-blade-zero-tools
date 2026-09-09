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
  expect(meta.openGraph).toMatchObject({url:'https://example.org/guides/'});
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
  expect(entries.length).toBe(16);
  for(const entry of entries){expect(entry.url).toMatch(/^https:\/\/replacement\.example\/.*\/$|^https:\/\/replacement\.example\/$/);expect(entry.lastModified).toBe('2026-09-09');}
 });
});

import {expect,it,vi,afterEach} from 'vitest';
import {guides} from '../src/lib/guides';
afterEach(()=>{vi.unstubAllEnvs();vi.resetModules();});
it('includes every editorial article in the sitemap using its review date',async()=>{
 vi.stubEnv('NEXT_PUBLIC_SITE_URL','https://example.org');vi.resetModules();
 const sitemap=(await import('../app/sitemap')).default();
 for(const guide of guides)expect(sitemap).toContainEqual({url:`https://example.org/guides/${guide.slug}/`,lastModified:guide.lastUpdated});
 expect(new Set(guides.map(g=>g.slug)).size).toBe(guides.length);
});
it('keeps all article related links within published routes',async()=>{
 vi.stubEnv('NEXT_PUBLIC_SITE_URL','https://example.org');vi.resetModules();
 const urls=new Set((await import('../app/sitemap')).default().map(x=>x.url));
 for(const guide of guides)for(const link of guide.related)expect(urls.has('https://example.org'+link.href+'/'),`${guide.slug}: ${link.href}`).toBe(true);
});

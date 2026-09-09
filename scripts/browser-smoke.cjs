const {chromium}=require(process.env.PBZ_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:process.env.PBZ_BROWSER_CHANNEL||'msedge',headless:true});
 try{
 const context=await browser.newContext({locale:'en-US',viewport:{width:1280,height:900}});
 const page=await context.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.PBZ_TEST_URL||'http://127.0.0.1:3000';
 await page.goto(base+'/builds/');
 await page.getByLabel('Build name',{exact:true}).fill('Night ferry 夜渡');
 await page.getByLabel('weapon note',{exact:true}).fill('My sword');
 await page.getByLabel('Strategy notes').fill('Keep distance');
 await page.getByRole('button',{name:'Save combination',exact:true}).click();
 await page.getByRole('status').filter({hasText:'Saved on this device.'}).waitFor();
 await page.reload();
 await page.getByRole('heading',{name:'Night ferry 夜渡',exact:true}).waitFor();
 await page.getByRole('button',{name:'Share',exact:true}).click();
 const share=await page.getByLabel('Share link — contains all notes').inputValue();
 await page.goto(share);
 await page.reload();
 await page.getByRole('heading',{name:'Shared preview: Night ferry 夜渡'}).waitFor();
 assert.equal(await page.getByRole('heading',{name:'Night ferry 夜渡',exact:true}).count(),1);
 const backup=await page.evaluate(()=>localStorage.getItem('pbz.builds.v1'));
 page.on('dialog',dialog=>dialog.accept());
 await page.getByLabel('Import JSON',{exact:true}).setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(backup)});
 await page.getByRole('status').filter({hasText:'Saved on this device.'}).waitFor();
 await page.getByLabel('Import JSON',{exact:true}).setInputFiles({name:'broken.json',mimeType:'application/json',buffer:Buffer.from('{}')});
 await page.getByRole('status').filter({hasText:'Invalid JSON'}).waitFor();
 assert.equal(await page.getByRole('heading',{name:'Night ferry 夜渡',exact:true}).count(),1);
 await page.goto(base+'/tracker/');
 await page.getByRole('checkbox',{name:'Release date and PS5 listing'}).check();
 await page.reload();
 assert.equal(await page.getByRole('checkbox',{name:'Release date and PS5 listing'}).isChecked(),true);
 await page.clock.install({time:new Date('2026-10-29T02:00:01Z')});
 await page.reload();
 await page.getByRole('heading',{name:'Boss progress',exact:true}).waitFor();
 assert.equal(await page.getByRole('checkbox',{name:'Release date and PS5 listing'}).isChecked(),true);
 await page.goto(base+'/weapons/');
 await page.getByLabel('Search',{exact:true}).fill('phantom');
 assert.equal(await page.getByRole('heading',{name:'Phantom Edges',exact:true}).count(),1);
 assert.equal(await page.getByRole('heading',{name:'Main weapons',exact:true}).count(),0);
 await page.setViewportSize({width:390,height:844});
 for(const route of ['/','/builds/','/tracker/','/weapons/','/weapons/phantom-edges/','/bosses/','/bosses/seven-stars/','/guides/','/about/']){
  const response=await page.goto(base+route);assert.equal(response.status(),200,route);
  assert.ok(await page.locator('h1').count(),route);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' mobile overflow');
 }
 await page.goto(base+'/');await page.screenshot({path:'work/home-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'work/home-desktop.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS: persistence, share preview, valid/invalid import, tracker history and launch transition, filter, nine routes, mobile overflow, no page errors.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

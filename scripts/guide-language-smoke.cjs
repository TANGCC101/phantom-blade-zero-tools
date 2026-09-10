const {chromium}=require(process.env.PBZ_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,filename);
const {guides}=require('../src/lib/guides.ts');
const locales=['en','zh-CN','zh-TW','ja','ko','fr','de','es','es-419','pt-BR','pt-PT','ru','it','th','vi'];
const base=process.env.PBZ_TEST_URL||'http://127.0.0.1:3000';
(async()=>{
 const browser=await chromium.launch({channel:process.env.PBZ_BROWSER_CHANNEL||'msedge',headless:true});
 try{
  const context=await browser.newContext({locale:'en',viewport:{width:390,height:844}});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const guide of guides){
   await page.goto(base+'/guides/'+guide.slug+'/');
   for(const locale of locales){
    await page.getByLabel('Language / 语言').selectOption(locale);
    await page.waitForFunction(locale=>document.querySelector('main > article')?.lang===locale,locale);
    const dictionary=JSON.parse(fs.readFileSync(`src/lib/guide-locales/${locale}.json`,'utf8'));
    const t=text=>dictionary[text]??text;
    assert.equal(await page.locator('h1').innerText(),t(guide.title),`${guide.slug}/${locale}: title`);
    for(const section of guide.sections){
     assert.equal(await page.locator(`#${section.id} h2`).innerText(),t(section.title));
     assert.deepEqual(await page.locator(`#${section.id} p`).allTextContents(),section.paragraphs.map(t),`${guide.slug}/${locale}: full paragraphs`);
    }
    assert.equal(await page.locator('aside p').innerText(),t(guide.limitation));
    assert.deepEqual(await page.locator('#sources a').evaluateAll(links=>links.map(a=>a.getAttribute('href'))),guide.sources.map(s=>s.sourceUrl));
    assert.deepEqual(await page.locator('#sources a').allTextContents(),guide.sources.map(s=>t(s.sourceTitle)));
    const breadcrumb=await page.locator('article script[type="application/ld+json"]').textContent();
    assert.equal(JSON.parse(breadcrumb).itemListElement.at(-1).name,t(guide.title));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${guide.slug}/${locale}: mobile overflow`);
   }
  }
  // Stored preference must survive a hard reload.
  await page.getByLabel('Language / 语言').selectOption('zh-CN');
  await page.reload();
  await page.waitForFunction(()=>document.querySelector('main > article')?.lang==='zh-CN');
  assert.equal(await page.getByLabel('Language / 语言').inputValue(),'zh-CN');
  await page.screenshot({path:'work/guides-zh-mobile.png',fullPage:true});
  for(const route of ['/guides/','/']){
   await page.goto(base+route);
   for(const locale of locales){
    await page.getByLabel('Language / 语言').selectOption(locale);
    const dictionary=JSON.parse(fs.readFileSync(`src/lib/guide-locales/${locale}.json`,'utf8'));
    const title=dictionary[guides[0].title];
    await page.getByRole('link',{name:title,exact:route==='/guides/'}).first().waitFor();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route}/${locale}: overflow`);
   }
  }
  // Rapid choices must settle on the last requested language.
  await page.goto(base+'/guides/build-planner/');
  await page.getByLabel('Language / 语言').selectOption('de');
  await page.getByLabel('Language / 语言').selectOption('ja');
  await page.getByLabel('Language / 语言').selectOption('fr');
  await page.waitForFunction(()=>document.querySelector('main > article')?.lang==='fr');
  const french=JSON.parse(fs.readFileSync('src/lib/guide-locales/fr.json','utf8'));
  assert.equal(await page.locator('h1').innerText(),french[guides[2].title]);
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:'work/guides-fr-desktop.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS: all 90 article/language combinations, full paragraph text, source URLs/titles, schema, hub/home cards, preference reload, rapid switching and mobile layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

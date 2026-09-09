const {chromium}=require(process.env.PBZ_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
 const context=await browser.newContext({locale:'zh-CN',viewport:{width:390,height:844}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:3000';
 await page.goto(base);
 await page.getByRole('link',{name:'创建配装 ↗',exact:true}).waitFor();
 assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
 await page.getByLabel('Language / 语言').selectOption('en');
 await page.getByRole('link',{name:'Create a build ↗',exact:true}).waitFor();
 await page.reload();
 await page.getByRole('link',{name:'Create a build ↗',exact:true}).waitFor();
 assert.equal(await page.getByLabel('Language / 语言').inputValue(),'en');
 await page.getByLabel('Language / 语言').selectOption('zh-CN');
 await page.getByRole('link',{name:'创建配装 ↗',exact:true}).click();
 await page.getByLabel('配装名称',{exact:true}).fill('My build 原始内容');
 await page.getByLabel('战术笔记',{exact:true}).fill('Do not translate 我的笔记');
 await page.getByRole('button',{name:'保存组合',exact:true}).click();
 await page.getByRole('status').filter({hasText:'已保存到当前设备。'}).waitFor();
 const before=await page.evaluate(()=>localStorage.getItem('pbz.builds.v1'));
 await page.getByLabel('Language / 语言').selectOption('en');
 await page.getByRole('button',{name:'Save combination',exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>localStorage.getItem('pbz.builds.v1')),before);
 await page.getByLabel('Language / 语言').selectOption('zh-CN');
 for(const [route,title] of [['/weapons/','武器与战斗系统'],['/bosses/','首领战斗资料'],['/tracker/','记录你的江湖之路。'],['/guides/','使用指南'],['/about/','关于武林手记'],['/weapons/main-weapons/','主武器'],['/bosses/seven-stars/','七星首席弟子（Chief Disciple of the Seven Stars）']]){
  await page.goto(base+route);await page.getByRole('heading',{name:title,exact:true}).waitFor();
  assert.equal(await page.getByLabel('Language / 语言').inputValue(),'zh-CN');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route);
 }
 await page.goto(base+'/weapons/');
 await page.getByLabel('来源',{exact:true}).selectOption('Official');
 assert.equal(await page.locator('article').count(),2);
 await page.goto(base);
 await page.getByRole('link',{name:'创建配装 ↗',exact:true}).waitFor();
 await page.screenshot({path:'work/language-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'work/language-desktop.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS: browser default, language persistence, all page families, unchanged build data, translated filter values, mobile layout, no page errors.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

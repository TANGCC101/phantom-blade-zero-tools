import {describe,expect,it} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {languages} from '../src/lib/i18n';
import {guides} from '../src/lib/guides';
import english from '../src/lib/guide-locales/en.json';

describe('complete translated articles',()=>{
 it.each(languages.map(x=>x.code))('%s covers all article text without losing numerical facts',locale=>{
  const path=`src/lib/guide-locales/${locale}.json`;
  expect(existsSync(path),`missing ${locale} dictionary`).toBe(true);
  const dictionary=JSON.parse(readFileSync(path,'utf8')) as Record<string,string>;
  expect(Object.keys(dictionary).sort()).toEqual(Object.keys(english).sort());
  for(const [key,value] of Object.entries(dictionary)){
   expect(typeof value).toBe('string');expect(value.trim().length,key).toBeGreaterThan(0);
   // Dates, limits, times and quantities must survive translation in Arabic digits.
   for(const number of key.match(/\d+/g)??[])expect(value,key).toContain(number);
   expect(value,key).not.toMatch(/MYMEMORY WARNING|AVAILABLE FREE TRANSLATIONS|TRANSLATED\.NET/i);
  }
  for(const guide of guides){
   const strings=[guide.title,guide.description,guide.limitation,...guide.sections.flatMap(s=>[s.title,...s.paragraphs]),...guide.related.map(x=>x.name),...guide.sources.map(x=>x.sourceTitle)];
   for(const text of strings)expect(dictionary[text],text).toBeTruthy();
   if(locale!=='en')for(const text of [guide.description,guide.limitation,...guide.sections.flatMap(s=>s.paragraphs)])expect(dictionary[text],text).not.toBe(text);
  }
 });
 it('loads selected text and safely retains source text for unknown keys',async()=>{
  const {loadGuideDictionary,guideText}=await import('../src/lib/guide-i18n');
  const dictionary=await loadGuideDictionary('en');
  expect(guideText('On this page',dictionary)).toBe('On this page');
  expect(guideText('Unknown future source text',dictionary)).toBe('Unknown future source text');
 });
});

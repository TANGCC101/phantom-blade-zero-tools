import {expect,it} from 'vitest';
import {resolveLocale,translate,languages,dictionaries,formatCountdown} from '../src/lib/i18n';
it('respects saved preference over browser language',()=>expect(resolveLocale('en','zh-CN')).toBe('en'));
it('distinguishes traditional Chinese browsers',()=>expect(resolveLocale(null,'zh-TW')).toBe('zh-TW'));
it('ignores invalid saved preferences and uses browser language',()=>expect(resolveLocale('xx','fr')).toBe('fr'));
it('translates app copy and preserves unknown names',()=>{expect(translate('Build Planner','zh-CN')).toBe('配装规划器');expect(translate('My own build','zh-CN')).toBe('My own build');});
it.each([['zh-Hant-HK','zh-TW'],['zh-Hans','zh-CN'],['es-MX','es-419'],['es-ES','es'],['pt-BR','pt-BR'],['pt','pt-PT'],['ja-JP','ja'],['ko-KR','ko'],['fr-CA','fr'],['ar','en']])('maps %s to %s',(browser,expected)=>expect(resolveLocale(null,browser)).toBe(expected));
it('offers the fifteen requested languages in screenshot order',()=>expect(languages.map(x=>x.code)).toEqual(['en','zh-CN','zh-TW','ja','ko','fr','de','es','es-419','pt-BR','pt-PT','ru','it','th','vi']));
it.each(languages.map(x=>x.code))('%s contains every interface translation and keeps template fields',locale=>{
 const expected=Object.keys(dictionaries.en).sort();expect(Object.keys(dictionaries[locale]).sort()).toEqual(expected);
 for(const key of expected){
  expect(dictionaries[locale][key].trim().length,key).toBeGreaterThan(0);
  expect(dictionaries[locale][key].match(/\{\w+\}/g)??[],key).toEqual(key.match(/\{\w+\}/g)??[]);
 }
});
it('interpolates confirmation text without changing player content',()=>expect(translate('Delete {name}?','ja',{name:'My $& build'})).toBe('「My $& build」を削除しますか？'));
it('uses localized countdown units',()=>{expect(formatCountdown(90061,'ja')).toContain('日');expect(formatCountdown(90061,'fr')).toContain('j');expect(formatCountdown(-1,'en')).not.toContain('-');});

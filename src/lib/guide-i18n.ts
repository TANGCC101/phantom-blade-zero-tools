import type {Locale} from './i18n';

export type GuideDictionary=Record<string,string>;
// Explicit imports let the static bundler emit a separate chunk per reading language.
const loaders:Record<Locale,()=>Promise<{default:GuideDictionary}>>={
 en:()=>import('./guide-locales/en.json'),
 'zh-CN':()=>import('./guide-locales/zh-CN.json'),
 'zh-TW':()=>import('./guide-locales/zh-TW.json'),
 ja:()=>import('./guide-locales/ja.json'),
 ko:()=>import('./guide-locales/ko.json'),
 fr:()=>import('./guide-locales/fr.json'),
 de:()=>import('./guide-locales/de.json'),
 es:()=>import('./guide-locales/es.json'),
 'es-419':()=>import('./guide-locales/es-419.json'),
 'pt-BR':()=>import('./guide-locales/pt-BR.json'),
 'pt-PT':()=>import('./guide-locales/pt-PT.json'),
 ru:()=>import('./guide-locales/ru.json'),
 it:()=>import('./guide-locales/it.json'),
 th:()=>import('./guide-locales/th.json'),
 vi:()=>import('./guide-locales/vi.json'),
};
const pending=new Map<Locale,Promise<GuideDictionary>>();
export function loadGuideDictionary(locale:Locale):Promise<GuideDictionary>{
 const cached=pending.get(locale);if(cached)return cached;
 const request=loaders[locale]().then(module=>module.default).catch(error=>{pending.delete(locale);throw error;});
 pending.set(locale,request);return request;
}
export function guideText(text:string,dictionary?:GuideDictionary){return dictionary?.[text]??text;}

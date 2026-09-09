import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import es419 from './locales/es-419.json';
import ptBR from './locales/pt-BR.json';
import ptPT from './locales/pt-PT.json';
import ru from './locales/ru.json';
import it from './locales/it.json';
import th from './locales/th.json';
import vi from './locales/vi.json';
export const languages=[
 {code:'en',name:'English'},
 {code:'zh-CN',name:'简体中文'},
 {code:'zh-TW',name:'繁體中文'},
 {code:'ja',name:'日本語'},
 {code:'ko',name:'한국어'},
 {code:'fr',name:'Français'},
 {code:'de',name:'Deutsch'},
 {code:'es',name:'Español'},
 {code:'es-419',name:'Español (LATAM)'},
 {code:'pt-BR',name:'Português (BR)'},
 {code:'pt-PT',name:'Português (PT)'},
 {code:'ru',name:'Русский'},
 {code:'it',name:'Italiano'},
 {code:'th',name:'ไทย'},
 {code:'vi',name:'Tiếng Việt'},
] as const;
export type Locale=typeof languages[number]['code'];
export const LANGUAGE_KEY='pbz.language.v1';
export const dictionaries:Record<Locale,Record<string,string>>={
 en,'zh-CN':zhCN,'zh-TW':zhTW,ja,ko,fr,de,es,'es-419':es419,'pt-BR':ptBR,'pt-PT':ptPT,ru,it,th,vi,
};
export function resolveLocale(saved:string|null,browserLanguage:string):Locale{
 const valid=languages.find(x=>x.code===saved);if(valid)return valid.code;
 const tag=browserLanguage.replaceAll('_','-').toLowerCase();
 const exact=languages.find(x=>x.code.toLowerCase()===tag);if(exact)return exact.code;
 if(tag.startsWith('zh'))return /(?:hant|tw|hk|mo)/.test(tag)?'zh-TW':'zh-CN';
 if(tag.startsWith('pt'))return tag.includes('br')?'pt-BR':'pt-PT';
 if(tag.startsWith('es'))return tag==='es'||tag==='es-es'?'es':'es-419';
 return languages.find(x=>x.code===tag.split('-')[0])?.code??'en';
}
export function translate(text:string,locale:Locale,values:Record<string,string|number>={}):string{
 const template=dictionaries[locale][text]??text;
 return template.replace(/\{(\w+)\}/g,(match,key)=>values[key]===undefined?match:String(values[key]));
}
export function formatCountdown(seconds:number,locale:Locale):string{
 const total=Math.max(0,Math.floor(seconds));
 return [Math.floor(total/86400),Math.floor(total%86400/3600),Math.floor(total%3600/60),total%60]
 .map((value,i)=>new Intl.NumberFormat(locale,{style:'unit',unit:['day','hour','minute','second'][i],unitDisplay:'short'}).format(value)).join(' ');
}

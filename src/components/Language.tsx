'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {LANGUAGE_KEY,languages,resolveLocale,translate,type Locale} from '../lib/i18n';
const Context=createContext<{locale:Locale;setLocale:(locale:Locale)=>void}>({locale:'en',setLocale:()=>{}});
export function LanguageProvider({children}:{children:React.ReactNode}){
 const [locale,setLocaleState]=useState<Locale>('en');
 useEffect(()=>{let saved=null;try{saved=localStorage.getItem(LANGUAGE_KEY);}catch{}setLocaleState(resolveLocale(saved,navigator.language));},[]);
 useEffect(()=>{document.documentElement.lang=locale;},[locale]);
 function setLocale(next:Locale){setLocaleState(next);try{localStorage.setItem(LANGUAGE_KEY,next);}catch{}}
 return <Context.Provider value={{locale,setLocale}}>{children}</Context.Provider>;
}
export function useLanguage(){const context=useContext(Context);return {...context,t:(text:string,values?:Record<string,string|number>)=>translate(text,context.locale,values)};}
export function T({text}:{text:string}){const {t}=useLanguage();return <>{t(text)}</>;}
export function LanguageSelect(){const {locale,setLocale}=useLanguage();return <label className="language-control flex items-center gap-2 text-sm text-stone-300"><svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg><select aria-label="Language / 语言" value={locale} onChange={e=>setLocale(e.target.value as Locale)} className="rounded border px-3 py-2">{languages.map(language=><option key={language.code} value={language.code} lang={language.code}>{language.name}</option>)}</select></label>;}

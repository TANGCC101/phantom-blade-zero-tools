'use client';
import {useEffect,useState} from 'react';
import {useLanguage} from './Language';
import {guideText,loadGuideDictionary,type GuideDictionary} from '../lib/guide-i18n';
import type {Locale} from '../lib/i18n';

export function useGuideLanguage(){
 const {locale}=useLanguage();
 const [loaded,setLoaded]=useState<{locale:Locale;dictionary:GuideDictionary}|null>(null);
 useEffect(()=>{
  let active=true;
  if(locale!=='en')loadGuideDictionary(locale).then(dictionary=>{if(active)setLoaded({locale,dictionary});}).catch(()=>{if(active)setLoaded(null);});
  return()=>{active=false;};
 },[locale]);
 const dictionary=loaded?.locale===locale?loaded.dictionary:undefined;
 // SSR and a not-yet-loaded selection display complete English with honest lang markup.
 const readingLocale:Locale=locale==='en'||!dictionary?'en':locale;
 return {readingLocale,t:(text:string)=>guideText(text,dictionary)};
}

export function GuideText({text}:{text:string}){
 const {readingLocale,t}=useGuideLanguage();
 return <span lang={readingLocale}>{t(text)}</span>;
}

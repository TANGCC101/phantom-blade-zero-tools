'use client';
import {T,useLanguage} from './Language';
import {useState} from 'react';
import {EntityCard} from './EntityCard';
import type {Reliability} from '../lib/types';
export function EntityList({items,kind}:{items:(Reliability&{slug:string;name:string;summary:string})[];kind:'weapons'|'bosses'}){
 const {t}=useLanguage();
 const [query,setQuery]=useState(''),[source,setSource]=useState('All'),[stage,setStage]=useState('All');
 const filtered=items.filter(x=>(x.name+' '+x.summary+' '+t(x.name)+' '+t(x.summary)).toLowerCase().includes(query.toLowerCase())&&(source==='All'||x.sourceType===source)&&(stage==='All'||x.stage===stage));
 return <><div className="my-6 flex flex-wrap gap-4"><label><T text="Search"/><input className="ml-2 rounded bg-stone-900 p-2" value={query} onChange={e=>setQuery(e.target.value)}/></label><label><T text="Source"/><select aria-label={t('Source')} className="ml-2 bg-stone-900 p-2" value={source} onChange={e=>setSource(e.target.value)}>{['All','Official','Community'].map(x=><option key={x} value={x}>{t(x)}</option>)}</select></label><label><T text="Stage"/><select aria-label={t('Stage')} className="ml-2 bg-stone-900 p-2" value={stage} onChange={e=>setStage(e.target.value)}>{['All','Pre-release','Verified'].map(x=><option key={x} value={x}>{t(x)}</option>)}</select></label></div><p role="status" className="mb-3 text-sm text-stone-400">{filtered.length}{' '}<T text="entries"/></p><div className="grid gap-4 md:grid-cols-2">{filtered.map(item=><EntityCard key={item.slug} item={item} kind={kind}/>)}</div>{!filtered.length&&<p><T text="No matching entries. Try another filter."/></p>}</>;
}

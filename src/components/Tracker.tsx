'use client';
import {T,useLanguage} from './Language';
import {formatCountdown} from '../lib/i18n';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {bosses,RELEASE_DATE} from '../lib/data';
import {EMPTY_TRACKER,exportTracker,importTracker,trackerMode,type TrackerState} from '../lib/tracker';
import {downloadJson} from '../lib/download';
const KEY='pbz.tracker.v1';
export function Tracker(){
  const {t,locale}=useLanguage();
  const [now,setNow]=useState<number|null>(null),[state,setState]=useState<TrackerState>(EMPTY_TRACKER),[message,setMessage]=useState('');
  useEffect(()=>{setNow(Date.now());try{const raw=localStorage.getItem(KEY);if(raw)setState(importTracker(raw));}catch{setMessage('Saved tracker data could not be loaded. Recover a backup before saving new progress.');}const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer);},[]);
  function save(next:TrackerState){try{localStorage.setItem(KEY,exportTracker(next));setState(next);setMessage('Progress saved on this device.');}catch{setMessage('Storage unavailable. Your previous progress has not changed.');}}
  function toggle(group:'checklist'|'bosses',id:string){save({...state,[group]:state[group].includes(id)?state[group].filter(x=>x!==id):[...state[group],id]});}
  const launched=now!==null&&trackerMode(now)==='progress';
  const seconds=now===null?0:Math.max(0,Math.ceil((Date.parse(RELEASE_DATE)-now)/1000));
  return <div className="mt-8 space-y-6">
    <div className="panel"><h2 className="text-2xl text-gold">{launched?t('Progress & Boss Tracker'):t('Launch Countdown')}</h2><p className="my-4 text-3xl tabular-nums">{now===null?t('Loading local clock…'):launched?t('Scheduled launch time reached'):formatCountdown(seconds,locale)}</p><p><T text="October 29, 2026 · 02:00 UTC"/></p><p className="mt-2 text-sm text-stone-400"><T text="Based on the US PlayStation Store listing; regional or platform availability may differ. The tracker changes mode at this scheduled time."/></p><a className="mt-3 inline-block" href="https://store.playstation.com/en-us/concept/10017620"><T text="Official listing · Official / Pre-release · checked September 9, 2026"/></a></div>
    <section className="panel"><h2 className="text-xl">{launched?t('Pre-release history'):t('Officially Confirmed Checklist')}</h2><p className="my-3 text-stone-400"><T text="Tick the announcements you have reviewed. These checks stay in your backup after launch."/></p>{[{id:'release',name:'Release date and PS5 listing',url:'https://store.playstation.com/en-us/concept/10017620'},{id:'combat',name:'Main weapons, Phantom Edges, and accessories',url:'https://blog.playstation.com/2026/08/17/phantom-blade-zero-state-of-play-dives-deep-into-combat-and-the-wulin-world/'}].map(item=><div className="my-4" key={item.id}><label><input disabled={now===null} type="checkbox" className="mr-3" checked={state.checklist.includes(item.id)} onChange={()=>toggle('checklist',item.id)}/><T text={item.name}/></label><a className="ml-3 text-sm" href={item.url}><T text="Official source"/></a><p className="ml-6 text-xs text-stone-500"><T text="Official · Pre-release · updated 2026-09-09"/></p></div>)}</section>
    {launched&&<section className="panel"><h2 className="text-xl"><T text="Boss progress"/></h2><p className="mt-2 text-sm text-stone-400"><T text="A personal checklist of our sourced encounter entries, not the complete game roster."/></p>{bosses.map(boss=><div className="mt-4" key={boss.slug}><label><input className="mr-3" type="checkbox" checked={state.bosses.includes(boss.slug)} onChange={()=>toggle('bosses',boss.slug)}/><T text="Defeated"/>{' '}<T text={boss.name}/></label><Link className="ml-3" href={`/bosses/${boss.slug}`}><T text="Encounter notes"/></Link></div>)}</section>}
    <div className="panel"><button disabled={now===null} className="text-jade" onClick={()=>downloadJson('pbz-tracker.json',exportTracker(state))}><T text="Download tracker JSON"/></button><label className="mt-4 block"><T text="Import tracker JSON"/><input disabled={now===null} className="mt-2 block max-w-full" type="file" accept=".json,application/json" onChange={async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>100000)throw Error();const next=importTracker(await file.text());if(confirm(t('Replace current tracker progress with this backup?')))save(next);}catch{setMessage('Invalid tracker backup. Your saved progress is unchanged.');}}}/></label><p role="status" className="mt-3 text-jade"><T text={message}/></p></div>
  </div>;
}

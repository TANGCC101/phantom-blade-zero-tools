'use client';
import {T,useLanguage} from './Language';
import {useEffect,useState} from 'react';
import type {Build} from '../lib/types';
import {decodeShare,encodeShare,exportBuilds,importBuilds,MAX_JSON_BYTES} from '../lib/planner';
import {downloadJson} from '../lib/download';
const KEY='pbz.builds.v1';
const empty={name:'',weapon:'',secondary:'',accessory:'',notes:''};
export function BuildPlanner(){
  const {t}=useLanguage();
  const [builds,setBuilds]=useState<Build[]>([]),[draft,setDraft]=useState(empty);
  const [ready,setReady]=useState(false),[message,setMessage]=useState('');
  const [shared,setShared]=useState<Build|null>(null),[shareUrl,setShareUrl]=useState('');
  useEffect(()=>{
    try{const raw=localStorage.getItem(KEY);if(raw)setBuilds(importBuilds(raw));}
    catch{setMessage('Saved data could not be loaded. Recover your previous backup before saving new data.');}
    try{const token=new URLSearchParams(location.hash.slice(1)).get('build');if(token)setShared(decodeShare(token));}
    catch{setMessage('This shared build link is invalid.');}
    setReady(true);
  },[]);
  function commit(next:Build[]){
    try{localStorage.setItem(KEY,exportBuilds(next));setBuilds(next);setMessage('Saved on this device.');}
    catch{setMessage('Could not save. Check storage permissions or the 100-build limit. Your current list has not changed.');}
  }
  return <div className="mt-8 grid gap-6 lg:grid-cols-2">
    <form className="panel space-y-4" onSubmit={e=>{e.preventDefault();commit([...builds,{...draft,id:crypto.randomUUID()}]);}}>
      <h2 className="text-xl"><T text="Create a combination"/></h2>
      {(['name','weapon','secondary','accessory'] as const).map(key=><label className="block" key={key}><span className="text-sm capitalize">{t(key==='name'?'Build name':`${key} note`)}</span><input required={key==='name'} maxLength={key==='name'?80:120} value={draft[key]} onChange={e=>setDraft({...draft,[key]:e.target.value})} className="mt-1 w-full rounded bg-stone-900 p-3"/></label>)}
      <label className="block"><T text="Strategy notes"/><textarea maxLength={4000} className="mt-1 w-full rounded bg-stone-900 p-3" rows={5} value={draft.notes} onChange={e=>setDraft({...draft,notes:e.target.value})}/></label>
      <button disabled={!ready} className="rounded bg-gold px-4 py-2 text-ink"><T text="Save combination"/></button>
      <p role="status" className="text-sm text-jade"><T text={message}/></p>
    </form>
    <section className="space-y-4">
      {shared&&<article className="panel"><h2 className="text-xl"><T text="Shared preview:"/>{' '}{shared.name}</h2><p>{[shared.weapon,shared.secondary,shared.accessory].filter(Boolean).join(' · ')}</p><p className="whitespace-pre-wrap">{shared.notes}</p><button disabled={!ready} className="mt-3 text-jade" onClick={()=>commit([...builds,{...shared,id:crypto.randomUUID()}])}><T text="Save a copy on this device"/></button></article>}
      <div className="panel"><h2 className="text-xl"><T text="Your builds ("/>{builds.length}<T text="/100)"/></h2><p className="my-3 text-sm text-stone-400"><T text="Export regularly. Clearing browser storage removes your saved builds. Imports replace the current list after confirmation."/></p>
        <button className="text-jade" disabled={!ready} onClick={()=>downloadJson('pbz-builds.json',exportBuilds(builds))}><T text="Download JSON backup"/></button>
        <label className="mt-4 block text-sm"><T text="Import JSON"/><input className="mt-2 block max-w-full" type="file" accept=".json,application/json" disabled={!ready} onChange={async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>MAX_JSON_BYTES)throw Error();const next=importBuilds(await file.text());if(window.confirm(t('Replace your saved list with {count} imported builds?',{count:next.length})))commit(next);}catch{setMessage('Invalid JSON: use a version 1 backup, unique IDs, and files under 1 MB.');}}}/></label>
      </div>
      {ready&&builds.length===0&&<p className="text-stone-400"><T text="No saved combinations yet."/></p>}
      {builds.map(build=><article className="panel" key={build.id}><h3 className="text-lg text-gold">{build.name}</h3><p>{[build.weapon,build.secondary,build.accessory].filter(Boolean).join(' · ')}</p><p className="mt-2 whitespace-pre-wrap text-stone-400">{build.notes}</p><div className="mt-3 flex flex-wrap gap-5"><button className="text-jade" onClick={()=>{setDraft({name:build.name,weapon:build.weapon??'',secondary:build.secondary??'',accessory:build.accessory??'',notes:build.notes??''});setMessage('Loaded into the form. Saving creates a new copy.');}}><T text="Use as template"/></button><button className="text-jade" onClick={()=>setShareUrl(`${location.origin}/builds#build=${encodeShare(build)}`)}><T text="Share"/></button><button onClick={()=>{if(confirm(t('Delete {name}?',{name:build.name})))commit(builds.filter(b=>b.id!==build.id));}}><T text="Delete"/></button></div></article>)}
      {shareUrl&&<label className="panel block"><T text="Share link — contains all notes"/><input readOnly value={shareUrl} className="mt-2 w-full bg-stone-900 p-2" onFocus={e=>e.target.select()}/></label>}
    </section>
  </div>;
}

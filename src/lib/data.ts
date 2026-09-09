import type {Boss,Reliability,Weapon} from './types';
export const RELEASE_DATE='2026-10-29T02:00:00.000Z';
export const combatSource:Reliability={
 sourceType:'Official',stage:'Pre-release',
 sourceUrl:'https://blog.playstation.com/2026/08/17/phantom-blade-zero-state-of-play-dives-deep-into-combat-and-the-wulin-world/',
 sourceTitle:'S-GAME — State of Play combat deep dive',lastUpdated:'2026-09-09',
};
export const weapons:Weapon[]=[
 {...combatSource,slug:'main-weapons',name:'Main weapons',category:'System overview',
 summary:'S-GAME describes more than 30 main weapons in its pre-release combat overview.',
 notes:['These are weapon-system notes, not an individual weapon entry.','Upgrades and reforging support experimenting with different combinations.','Record your preferred weapon in the planner. Individual names, damage values, and slot counts are not asserted here.']},
 {...combatSource,slug:'phantom-edges',name:'Phantom Edges',category:'System overview',
 summary:'The developer calls secondary weapons Phantom Edges and lists 25 in its August preview.',
 notes:['This entry describes a weapon family, not one equipable item.','The preview discusses ranged and summon-assisted combat options without giving a complete item catalog.','Use the secondary note field to record your preferred option; exact item compatibility remains unverified.']}
];
export const bosses:Boss[]=[{
 sourceType:'Community',stage:'Pre-release',sourceUrl:'https://www.techradar.com/gaming/phantom-blade-zero-preview',
 sourceTitle:'TechRadar — Phantom Blade Zero hands-on preview',lastUpdated:'2026-09-09',
 slug:'seven-stars',name:'Chief Disciple of the Seven Stars',status:'Confirmed',
 summary:'A hands-on preview reports this named leader at the end of a demo.',
 notes:['The report describes a multi-stage encounter. It is a demo observation, not a verified final-release walkthrough.','Final attack timings, rewards, mandatory status, and location are not confirmed here.','After the scheduled launch, use the tracker to record your own completion. The checklist is not the full boss roster.']
}];
export function isReliability(value:unknown):value is Reliability{
 if(!value||typeof value!=='object')return false;
 const v=value as Record<string,unknown>;
 return ['Official','Community'].includes(String(v.sourceType))&&['Pre-release','Verified'].includes(String(v.stage))
 &&typeof v.sourceUrl==='string'&&/^https:\/\//.test(v.sourceUrl)&&typeof v.sourceTitle==='string'&&v.sourceTitle.length>0
 &&typeof v.lastUpdated==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v.lastUpdated);
}

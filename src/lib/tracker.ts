import {z} from 'zod';
import {RELEASE_DATE} from './data';
const schema=z.object({version:z.literal(1),checklist:z.array(z.string().min(1).max(100)).max(100),bosses:z.array(z.string().min(1).max(100)).max(300)}).strict();
export type TrackerState=z.infer<typeof schema>;
export const EMPTY_TRACKER:TrackerState={version:1,checklist:[],bosses:[]};
export function trackerMode(now:number){return now<Date.parse(RELEASE_DATE)?'pre-release':'progress';}
export function importTracker(raw:string):TrackerState{if(raw.length>100000)throw Error('File too large.');return schema.parse(JSON.parse(raw));}
export function exportTracker(state:TrackerState){return JSON.stringify(schema.parse(state),null,2);}

import { z } from 'zod';
import type { Build } from './types';
export const plannerSchemaVersion = 1;
export const MAX_JSON_BYTES = 1_000_000;
const buildSchema = z.object({
  id:z.string().min(1).max(100), name:z.string().trim().min(1).max(80),
  weapon:z.string().max(120).optional(), secondary:z.string().max(120).optional(),
  accessory:z.string().max(120).optional(), notes:z.string().max(4000).optional(),
}).strict();
export function validateBuild(value:unknown):value is Build {return buildSchema.safeParse(value).success;}
export function importBuilds(raw:string):Build[]{
  if(new TextEncoder().encode(raw).length>MAX_JSON_BYTES)throw Error('File exceeds 1 MB.');
  const {builds}=z.object({version:z.literal(1),builds:z.array(buildSchema).max(100)}).strict().parse(JSON.parse(raw));
  if(new Set(builds.map(b=>b.id)).size!==builds.length)throw Error('Duplicate build IDs.');
  return builds;
}
export function exportBuilds(builds:Build[]):string {const raw=JSON.stringify({version:1,builds},null,2);importBuilds(raw);return raw;}
export function encodeShare(build:Build):string {
  const bytes=new TextEncoder().encode(JSON.stringify(buildSchema.parse(build)));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
export function decodeShare(token:string):Build {
  if(token.length>40000||!/^[A-Za-z0-9_-]+$/.test(token))throw Error('Invalid shared build.');
  const bytes=Uint8Array.from(atob(token.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
  return buildSchema.parse(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes)));
}

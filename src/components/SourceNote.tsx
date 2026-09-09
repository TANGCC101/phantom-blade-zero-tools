import {T} from './Language';
import type { Reliability } from '../lib/types'; export function SourceNote({item}:{item:Reliability}){return <p className="mt-4 text-xs text-stone-500"><T text={item.sourceType}/> · <T text={item.stage}/> · <a href={item.sourceUrl} rel="noreferrer"><T text={item.sourceTitle}/></a>{' '}<T text="· updated"/>{' '}{item.lastUpdated}</p>}

import {expect,it} from 'vitest';
import {bosses,weapons,isReliability} from '../src/lib/data';
it('keeps all current records sourced and pre-release',()=>{
 for(const item of [...weapons,...bosses]){
  expect(isReliability(item)).toBe(true);
  expect(item.stage).toBe('Pre-release');
  expect(item.notes.length).toBeGreaterThan(1);
 }
});
it('rejects missing provenance and unsafe source protocols',()=>{
 expect(isReliability({...weapons[0],sourceUrl:'javascript:alert(1)'})).toBe(false);
 expect(isReliability({...weapons[0],sourceTitle:''})).toBe(false);
 expect(isReliability({...weapons[0],lastUpdated:'yesterday'})).toBe(false);
});

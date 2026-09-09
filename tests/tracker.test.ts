import {expect,it} from 'vitest';
import {trackerMode,importTracker,exportTracker} from '../src/lib/tracker';
it('switches at the configured launch instant',()=>{
  expect(trackerMode(Date.parse('2026-10-29T01:59:59Z'))).toBe('pre-release');
  expect(trackerMode(Date.parse('2026-10-29T02:00:00Z'))).toBe('progress');
});
it('preserves pre-release history across JSON backup',()=>{
  const state={version:1 as const,checklist:['release'],bosses:['seven-stars']};
  expect(importTracker(exportTracker(state))).toEqual(state);
});
it('rejects invalid tracker progress',()=>expect(()=>importTracker('{"version":1,"checklist":[true],"bosses":[]}')).toThrow());

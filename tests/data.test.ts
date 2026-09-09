import { describe,it,expect } from 'vitest'; import { RELEASE_DATE,isReliability,weapons } from '../src/lib/data';
describe('verified data',()=>{it('uses the PlayStation release instant',()=>expect(RELEASE_DATE).toBe('2026-10-29T02:00:00.000Z'));it('requires independent reliability fields',()=>expect(isReliability(weapons[0])).toBe(true));});

import { describe,it,expect } from 'vitest'; import { decodeShare,encodeShare,exportBuilds,importBuilds } from '../src/lib/planner';
const build={id:'1',name:'Night Ferry',weapon:'unknown-blade',notes:'My notes'};
describe('planner serialization',()=>{it('round trips JSON',()=>expect(importBuilds(exportBuilds([build]))).toEqual([build]));it('round trips share tokens',()=>expect(decodeShare(encodeShare(build))).toEqual(build));it('rejects malformed JSON',()=>expect(()=>importBuilds('{"version":1,"builds":[{}]}')).toThrow());});

import { expect, it } from 'vitest';
import { importBuilds, encodeShare, decodeShare } from '../src/lib/planner';
it('rejects duplicate identities', () => {
  expect(() => importBuilds(JSON.stringify({version:1, builds:[{id:'a',name:'One'},{id:'a',name:'Two'}]}))).toThrow();
});
it('rejects oversized notes', () => {
  expect(() => importBuilds(JSON.stringify({version:1, builds:[{id:'a',name:'One',notes:'x'.repeat(4001)}]}))).toThrow();
});
it('shares Unicode without Node Buffer', () => {
  const previous = globalThis.Buffer;
  try {
    globalThis.Buffer = undefined as never;
    const build = {id:'a',name:'夜渡 ⚔',notes:'Player notes'};
    expect(decodeShare(encodeShare(build))).toEqual(build);
  } finally { globalThis.Buffer = previous; }
});

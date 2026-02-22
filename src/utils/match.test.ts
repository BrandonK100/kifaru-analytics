import { describe, it, expect } from 'vitest';
import { getResult, calcPossession } from './match';

describe('match utils', () => {
  it('getResult returns W when home > away', () => {
    const r = getResult({ score: { home: 3, away: 1 } });
    expect(r).toBe('W');
  });

  it('getResult returns L when home < away', () => {
    const r = getResult({ score: { home: 0, away: 2 } });
    expect(r).toBe('L');
  });

  it('getResult returns D when home === away', () => {
    const r = getResult({ score: { home: 2, away: 2 } });
    expect(r).toBe('D');
  });

  it('getResult returns LIVE when match.result is LIVE', () => {
    const r = getResult({ score: { home: 1, away: 0 }, result: 'LIVE' });
    expect(r).toBe('LIVE');
  });

  it('calcPossession returns values that sum to 100', () => {
    const p = calcPossession(37, 63);
    expect(p.home + p.away).toBe(100);
    const p2 = calcPossession(0, 0);
    expect(p2.home + p2.away).toBe(100);
  });
});

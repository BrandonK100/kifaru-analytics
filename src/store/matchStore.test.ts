import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMatchStore } from './matchStore';
import { fixtures } from '@/mock';

// restore real timers after each test

describe('matchStore', () => {
  beforeEach(() => {
    // reset store to initial state by re-creating
    useMatchStore.setState({
      liveMatch: fixtures.find((m) => m.result === 'LIVE') ?? null,
      liveMinute: fixtures.find((m) => m.result === 'LIVE')?.minute ?? 0,
    });
  });

  it('initialises from fixture data', () => {
    const state = useMatchStore.getState();
    const live = fixtures.find((m) => m.result === 'LIVE') ?? null;
    expect(state.liveMatch).toBe(live);
    expect(state.liveMinute).toBe(live?.minute ?? 0);
  });

  it('setLiveMatch updates match and resets minute', () => {
    const newMatch = { ...fixtures[0], result: 'LIVE', minute: 5 };
    useMatchStore.getState().setLiveMatch(newMatch as any);
    const state = useMatchStore.getState();
    expect(state.liveMatch).toBe(newMatch);
    expect(state.liveMinute).toBe(5);

    // clearing works too
    useMatchStore.getState().setLiveMatch(null);
    expect(useMatchStore.getState().liveMatch).toBeNull();
    expect(useMatchStore.getState().liveMinute).toBe(0);
  });

  it('ticker increments minute until cap then stops', () => {
    vi.useFakeTimers();
    const store = useMatchStore.getState();
    store.setLiveMatch({ ...fixtures[0], result: 'LIVE', minute: 78 } as any);
    store.startLiveTicker();
    expect(useMatchStore.getState().liveMinute).toBe(78);
    // advance 1 tick (8000ms)
    vi.advanceTimersByTime(8000);
    expect(useMatchStore.getState().liveMinute).toBe(79);
    // advance to cap
    vi.advanceTimersByTime(8000 * 2);
    expect(useMatchStore.getState().liveMinute).toBe(80);
    // further ticks should not increment
    vi.advanceTimersByTime(8000 * 5);
    expect(useMatchStore.getState().liveMinute).toBe(80);
    // cleanup
    store.stopLiveTicker();
    vi.useRealTimers();
  });
});
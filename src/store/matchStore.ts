/**
 * Match store for Kifaru Analytics. Live match and minute ticker.
 */

import { create } from 'zustand';
import type { Match } from '@/types/match.types';
import { fixtures } from '@/mock';

const TICK_MS = 8000;
const MAX_MINUTE = 80;
let tickerId: ReturnType<typeof setInterval> | null = null;

interface MatchStore {
  liveMatch: Match | null;
  liveMinute: number;
  startLiveTicker: () => void;
  stopLiveTicker: () => void;
  /** update the live match object; resets minute if provided */
  setLiveMatch: (match: Match | null) => void;
}

export const useMatchStore = create<MatchStore>()((set, get) => ({
  liveMatch: fixtures.find((m) => m.result === 'LIVE') ?? null,
  liveMinute: fixtures.find((m) => m.result === 'LIVE')?.minute ?? 0,

  startLiveTicker() {
    if (tickerId !== null) return;
    tickerId = setInterval(() => {
      const { liveMinute } = get();
      if (liveMinute >= MAX_MINUTE) {
        if (tickerId !== null) clearInterval(tickerId);
        tickerId = null;
        return;
      }
      set({ liveMinute: Math.min(MAX_MINUTE, liveMinute + 1) });
    }, TICK_MS);
  },

  stopLiveTicker() {
    if (tickerId !== null) {
      clearInterval(tickerId);
      tickerId = null;
    }
  },

  setLiveMatch(match) {
    set({ liveMatch: match, liveMinute: match?.minute ?? 0 });
  },
}));

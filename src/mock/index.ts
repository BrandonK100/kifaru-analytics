/**
 * Central export for all mock data. Replace with API once backend is ready.
 */

export { fixtures } from './fixtures.mock';
export { players } from './players.mock';
export { matchStats } from './matchStats.mock';
export {
  pointsPerMatch,
  triesPerMatch,
  possessionTrend,
  pointsScoredVsConceded,
  winRateCumulative,
} from './seasonStats.mock';
export { insights } from './insights.mock';
export type { Insight } from './insights.mock';
export { attackZones, defenceZones } from './heatmap.mock';
export { getMatchEvents } from './matchEvents.mock';
export { setPieceStats } from './setPiece.mock';

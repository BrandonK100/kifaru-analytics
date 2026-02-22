/**
 * Teams API. Mock team/season data derived from fixtures.
 */

import type { Team, Season, Record as SeasonRecord } from '@/types/team.types';
import { fixtures } from '@/mock';

export interface TeamWithRecord extends Team {
  record: SeasonRecord;
}

export async function fetchTeams(): Promise<TeamWithRecord[]> {
  await new Promise((r) => setTimeout(r, 250));
  const kenya: Team = { id: 'kenya', name: 'Kenya Kifarus', code: 'KEN', flag: '🇰🇪' };
  let played = 0, won = 0, drawn = 0, lost = 0, pointsFor = 0, pointsAgainst = 0;
  fixtures.forEach((m) => {
    if (m.result === 'UPCOMING') return;
    played++;
    const isHome = m.homeTeam === 'Kenya';
    const forScore = isHome ? m.score.home : m.score.away;
    const againstScore = isHome ? m.score.away : m.score.home;
    pointsFor += forScore;
    pointsAgainst += againstScore;
    if (m.result === 'D') drawn++;
    else if ((isHome && forScore > againstScore) || (!isHome && forScore > againstScore)) won++;
    else lost++;
  });
  return [{ ...kenya, record: { played, won, drawn, lost, pointsFor, pointsAgainst } }];
}

export async function fetchSeasons(): Promise<Season[]> {
  await new Promise((r) => setTimeout(r, 150));
  return [{ id: '2024', name: '2024', year: 2024, startDate: '2024-03-01', endDate: '2024-11-30' }];
}

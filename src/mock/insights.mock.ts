/**
 * Mock AI-generated insight data for Kifaru Analytics.
 */

export interface Insight {
  id: string;
  title: string;
  body: string;
  icon: string;
  category: 'scrum' | 'lineout' | 'attack' | 'defence' | 'general';
}

export const insights: Insight[] = [
  {
    id: 'i1',
    title: 'Scrum stability improved in second half',
    body: 'Kenya won 92% of their own scrums in the last three matches, up from 78% in the opening rounds. The front row has shown better timing on the hit and cleaner exits.',
    icon: 'scrum',
    category: 'scrum',
  },
  {
    id: 'i2',
    title: 'Lineout success rate above 85%',
    body: 'The combination of primary jumpers and hooker delivery has produced an 87% lineout win rate this season. Consider using the back of the line more in the opposition 22.',
    icon: 'lineout',
    category: 'lineout',
  },
  {
    id: 'i3',
    title: 'Wide attack creating more line breaks',
    body: 'Attacking phases that go beyond two passes from the ruck have generated 60% of line breaks. The back three are finding space when the ball is moved quickly.',
    icon: 'attack',
    category: 'attack',
  },
  {
    id: 'i4',
    title: 'Tackle completion in the 22',
    body: 'Defensive sets inside the 22 have improved: 89% tackle completion when the opposition enters the red zone, compared to 82% in the first half of the season.',
    icon: 'defence',
    category: 'defence',
  },
  {
    id: 'i5',
    title: 'Discipline costing points',
    body: 'Penalty count in the last two matches averaged 12 per game. Reducing infringements at the breakdown could lower opposition kickable penalties and ease pressure.',
    icon: 'general',
    category: 'general',
  },
];

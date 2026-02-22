/**
 * AI-generated insight block. Icon, title, body text.
 */

import type { Insight } from '@/mock';

export interface InsightCardProps {
  readonly insight: Insight;
}

const categoryIcon: Record<Insight['category'], string> = {
  scrum: '⚙',
  lineout: '↗',
  attack: '→',
  defence: '🛡',
  general: '•',
};

/**
 * Single insight card for dashboard insights panel.
 */
export default function InsightCard({ insight }: InsightCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start gap-2">
        <span className="text-lg" aria-hidden>
          {categoryIcon[insight.category]}
        </span>
        <div>
          <h3 className="font-display text-sm font-medium text-text">{insight.title}</h3>
          <p className="mt-1 text-sm text-sub leading-relaxed">{insight.body}</p>
        </div>
      </div>
    </div>
  );
}

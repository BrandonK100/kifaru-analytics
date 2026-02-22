/**
 * Format helpers for scores, dates, percentages.
 */

export function formatScore(home: number, away: number): string {
  return `${home} – ${away}`;
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function formatPct(value: number, decimals = 1): string {
  return `${Number(value.toFixed(decimals))}%`;
}

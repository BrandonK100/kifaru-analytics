/**
 * Horizontal divider for visual separation in Kifaru Analytics.
 */

export interface DividerProps {
  readonly className?: string;
}

/**
 * Thin rule using theme border color.
 */
export default function Divider({ className = '' }: DividerProps) {
  return <hr className={`border-0 border-t border-border ${className}`.trim()} />;
}

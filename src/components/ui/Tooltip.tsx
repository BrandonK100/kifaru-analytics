/**
 * Chart and UI tooltip for Kifaru Analytics.
 * Simple hover tooltip with accessible behavior.
 */

import { useState, useRef, useEffect, type ReactNode } from 'react';

export interface TooltipProps {
  readonly label: string;
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Wraps a trigger element and shows label on hover/focus.
 */
export default function Tooltip({ label, children, className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  // const coords not needed — tooltip positioned via CSS
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !triggerRef.current) return;
    // kept for potential future positioning logic
  }, [visible]);

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`.trim()}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 rounded border border-border bg-surface px-2 py-1 text-xs text-text shadow-sm"
          style={{ pointerEvents: 'none' }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

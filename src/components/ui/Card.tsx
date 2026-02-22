/**
 * Base surface card for Kifaru Analytics.
 * Provides consistent padding, border, and optional header/body/footer slots.
 */

import type { ReactNode } from 'react';

export interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export interface CardHeaderProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export interface CardBodyProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export interface CardFooterProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Card container. Use CardHeader, CardBody, CardFooter as children when needed.
 */
export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface shadow-sm ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`border-b border-border px-4 py-3 font-display text-text ${className}`.trim()}>
      {children}
    </div>
  );
}

function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-4 text-body text-text ${className}`.trim()}>{children}</div>;
}

function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`border-t border-border px-4 py-3 text-sm text-sub ${className}`.trim()}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

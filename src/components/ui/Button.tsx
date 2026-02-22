/**
 * Button component for Kifaru Analytics.
 * Provides primary, ghost, and danger variants with optional loading state.
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly loading?: boolean;
  readonly children: ReactNode;
}

function cn(...parts: (string | boolean | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

function baseClasses(size: ButtonSize): string {
  if (size === 'sm') {
    return 'inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md';
  }
  return 'inline-flex items-center justify-center px-4 py-2 text-sm rounded-md';
}

function variantClasses(variant: ButtonVariant, disabled: boolean): string {
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : '';
  if (variant === 'ghost') {
    return cn(
      'border border-border bg-transparent text-text hover:bg-muted',
      disabled && 'hover:bg-transparent',
      disabledClass
    );
  }
  if (variant === 'danger') {
    return cn(
      'bg-accent text-surface hover:bg-accent/90',
      disabled && 'hover:bg-accent',
      disabledClass
    );
  }
  return cn(
    'bg-kenya text-surface hover:bg-kenya/90',
    disabled && 'hover:bg-kenya',
    disabledClass
  );
}

/**
 * Primary action button used across forms and interactive controls.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled ?? loading;

  return (
    <button
      type="button"
      aria-disabled={isDisabled}
      className={cn(
        baseClasses(size),
        variantClasses(variant, Boolean(isDisabled)),
        'font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kenya/40',
        loading && 'relative',
        className
      )}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 animate-pulse rounded-full bg-surface/80" />
          <span className="text-xs uppercase tracking-[0.1em]">Loading</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}


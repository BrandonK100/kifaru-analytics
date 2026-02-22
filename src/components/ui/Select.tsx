/**
 * Select dropdown for Kifaru Analytics.
 */

import type { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  readonly label: string;
  readonly options: SelectOption[];
  readonly error?: string;
  readonly id?: string;
  readonly className?: string;
}

/**
 * Controlled select with label and optional error.
 */
export default function Select({
  label,
  options,
  error,
  id: idProp,
  className = '',
  ...props
}: SelectProps) {
  const id = idProp ?? props.name ?? `select-${label.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <div className={className.trim() || undefined}>
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      <select
        id={id}
        className={`mt-1 block w-full rounded-md border bg-surface px-3 py-2 font-body text-text focus:border-kenya focus:outline-none focus:ring-1 focus:ring-kenya ${
          error ? 'border-accent' : 'border-border'
        }`}
        aria-invalid={!!error}
        aria-errormessage={error ? `${id}-error` : undefined}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

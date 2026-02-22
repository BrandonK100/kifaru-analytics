/**
 * Controlled input with label and error for Kifaru Analytics.
 */

import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  readonly label: string;
  readonly error?: string;
  readonly id?: string;
  readonly className?: string;
}

/**
 * Accessible text input with label and optional error message.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id: idProp, className = '', ...props },
  ref
) {
  const id = idProp ?? props.name ?? `input-${label.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <div className={className.trim() || undefined}>
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={`mt-1 block w-full rounded-md border bg-surface px-3 py-2 font-body text-text placeholder:text-faint focus:border-kenya focus:outline-none focus:ring-1 focus:ring-kenya ${
          error ? 'border-accent' : 'border-border'
        }`}
        aria-invalid={!!error}
        aria-errormessage={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;

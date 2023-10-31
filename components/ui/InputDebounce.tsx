import * as React from 'react';

import { cn } from '@/libs/utils';

export interface InputDebounceProps extends React.InputHTMLAttributes<HTMLInputElement> {
  debounce?: number;
  onChange?: (value: any) => void;
}

const InputDebounce = React.forwardRef<HTMLInputElement, InputDebounceProps>(
  ({ value, defaultValue, className, type, onChange, debounce = 300, ...props }, ref) => {
    const [debounceValue, setDebounceValue] = React.useState(value || defaultValue);

    React.useEffect(() => {
      setDebounceValue(value);
    }, [value]);

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(debounceValue);
      }, debounce);
      return () => clearTimeout(timeout);
    }, [debounceValue, debounce, onChange]);

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-neutral-500 dark:bg-neutral-900',
          'border-neutral-300 ring-offset-white dark:border-neutral-700 dark:ring-offset-neutral-900',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        value={debounceValue}
        onChange={(e) => setDebounceValue(e.target.value)}
        ref={ref}
        {...props}
      />
    );
  }
);
InputDebounce.displayName = 'InputDebounce';

export { InputDebounce };

import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

type Props = {
  children: ReactNode;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  value?: string | ReadonlyArray<string> | number;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  // onClick?: (e: any) => Promise<void>;
  // onClick?: () => void;
  disabled?: boolean;
  [props: string]: any;
};

export default function Button({ children, className, type, value, onClick, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      disabled={disabled}
      value={value}
      className={cn(
        disabled ? 'cursor-not-allowed' : 'hover:bg-sky-600 dark:hover:bg-sky-600',
        'rounded bg-sky-500 px-3 py-1.5 text-sm font-medium text-white outline-none transition-all',
        'focus:ring-2 focus:ring-sky-400 dark:bg-sky-500',
        className,
      )}
    >
      {children}
    </button>
  );
}

Button.secondary = ({ children, className, type, value, onClick, disabled, ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        disabled ? 'cursor-not-allowed' : 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
        'rounded bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-800 outline-none transition-all',
        'border border-neutral-300 dark:border-neutral-800',
        'focus:ring-2 focus:ring-sky-500 dark:bg-neutral-800 dark:text-neutral-300',
        className,
      )}
    >
      {children}
    </button>
  );
};

Button.tertary = ({ children, className, type, value, onClick, disabled, ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      value={value}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        disabled ? 'cursor-not-allowed' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
        'rounded px-3 py-1.5 text-sm font-medium text-neutral-600 outline-none transition-all dark:text-neutral-300',
        'focus:ring-2 focus:ring-sky-500',
        className,
      )}
    >
      {children}
    </button>
  );
};

Button.success = ({ children, className, type, value, onClick, disabled, ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      disabled={disabled}
      value={value}
      className={cn(
        disabled ? 'cursor-not-allowed' : 'hover:bg-emerald-700 dark:hover:bg-emerald-700',
        'rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white outline-none transition-all dark:bg-emerald-600',
        'focus:ring-2 focus:ring-emerald-400',
        className,
      )}
    >
      {children}
    </button>
  );
};

Button.danger = ({ children, className, type, value, onClick, disabled, ...props }: Props) => {
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      disabled={disabled}
      value={value}
      className={cn(
        disabled ? 'cursor-not-allowed' : 'hover:bg-red-700 dark:hover:bg-red-700',
        'rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white outline-none transition-all dark:bg-red-600',
        'focus:ring-2 focus:ring-red-400',
        className,
      )}
    >
      {children}
    </button>
  );
};

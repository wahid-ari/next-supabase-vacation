import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
  isLarge?: boolean;
  [props: string]: any;
};

export default function Badge({ children, className, isLarge, ...props }: Props) {
  return (
    <span
      {...props}
      className={twMerge(
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-sky-100 font-semibold text-sky-500 dark:bg-sky-500 dark:bg-opacity-10',
        'rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]',
        className,
      )}
    >
      {children}
    </span>
  );
}

Badge.dark = ({ children, className, isLarge, ...props }: Props) => {
  return (
    <span
      {...props}
      className={twMerge(
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-neutral-100 font-semibold text-neutral-600 dark:bg-neutral-600 dark:bg-opacity-10 dark:text-neutral-400',
        'rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]',
        className,
      )}
    >
      {children}
    </span>
  );
};

Badge.red = ({ children, className, isLarge, ...props }: Props) => {
  return (
    <span
      {...props}
      className={twMerge(
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-red-100 font-semibold text-red-600 dark:bg-red-600 dark:bg-opacity-10',
        'rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]',
        className,
      )}
    >
      {children}
    </span>
  );
};

Badge.green = ({ children, className, isLarge, ...props }: Props) => {
  return (
    <span
      {...props}
      className={twMerge(
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-green-100 font-semibold text-green-600 dark:bg-green-600 dark:bg-opacity-10',
        'rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]',
        className,
      )}
    >
      {children}
    </span>
  );
};

Badge.yellow = ({ children, className, isLarge, ...props }: Props) => {
  return (
    <span
      {...props}
      className={twMerge(
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-yellow-100 font-semibold text-yellow-600 dark:bg-yellow-600 dark:bg-opacity-10',
        'rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]',
        className,
      )}
    >
      {children}
    </span>
  );
};

Badge.indigo = ({ children, className, isLarge, ...props }: Props) => {
  return (
    <span
      {...props}
      className={twMerge(
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-600 dark:bg-opacity-10',
        'rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]',
        className,
      )}
    >
      {children}
    </span>
  );
};

Badge.purple = ({ children, className, isLarge, ...props }: Props) => {
  return (
    <span
      {...props}
      className={twMerge(
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-purple-100 font-semibold text-purple-600 dark:bg-purple-600 dark:bg-opacity-10',
        'rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]',
        className,
      )}
    >
      {children}
    </span>
  );
};

Badge.pink = ({ children, className, isLarge, ...props }: Props) => {
  return (
    <span
      {...props}
      className={twMerge(
        isLarge ? 'text-sm' : 'text-xs',
        'whitespace-nowrap bg-pink-100 font-semibold text-pink-600 dark:bg-pink-600 dark:bg-opacity-10',
        'rounded-full px-[0.625rem] pb-[0.125rem] pt-[0.1rem]',
        className,
      )}
    >
      {children}
    </span>
  );
};

import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

type Props = {
  children: ReactNode;
  className?: string;
  label?: string;
  name: string;
  defaultValue?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  [props: string]: any;
};

export default function Select({ children, className, label, name, defaultValue, onChange, ...props }: Props) {
  return (
    <div className=''>
      {label && (
        <label htmlFor={name} className='block text-sm text-neutral-800 dark:text-neutral-300'>
          {label}
        </label>
      )}
      <select
        {...props}
        id={name}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={cn(
          'mt-2 block w-full cursor-pointer rounded-md border border-neutral-300 bg-white px-3 py-2',
          'text-sm font-medium outline-none transition-all focus:border-sky-500 focus:outline-none',
          'focus:ring-2 focus:ring-sky-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white',
          className,
        )}
      >
        {children}
      </select>
    </div>
  );
}

type OptionProps = {
  children: ReactNode;
  value: any;
  [props: string]: any;
};

Select.option = ({ children, value, ...props }: OptionProps) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};

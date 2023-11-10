import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  wrapperClassName?: string;
  className?: string;
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string | string[];
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [props: string]: any;
};

export default function LabeledInput({
  wrapperClassName,
  className,
  label,
  type,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={twMerge('mb-4', type == 'password' && 'relative', wrapperClassName)}>
      <label className='block text-sm text-neutral-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        type={type == 'password' ? (showPassword ? 'text' : 'password') : type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={twMerge(
          'mt-2 w-full rounded-md border border-neutral-300 px-4 py-[0.6rem] text-sm font-medium outline-none transition-all',
          'bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100',
          'focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-neutral-700 dark:focus:border-sky-500 dark:focus:ring-sky-500',
          'disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      />
      {type == 'password' && (
        <button
          type='button'
          aria-label='show password'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-0.5 z-10 mr-0.5 mt-3 rounded-md border-neutral-300 p-1.5 outline-none ring-neutral-300 focus:border-sky-600 focus:ring-1 focus:ring-sky-500'
        >
          {showPassword ? (
            <EyeIcon className='h-5 w-5 text-neutral-500' />
          ) : (
            <EyeOffIcon className='h-5 w-5 text-neutral-500' />
          )}
        </button>
      )}
    </div>
  );
}

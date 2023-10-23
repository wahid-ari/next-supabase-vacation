import { useRef } from 'react';
import { PlusIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/systems/Button';

type Props = {
  className?: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [props: string]: any;
};

export default function FileInput({ className, label, name, value, onChange, ...props }: Props) {
  // const ref = useRef<HTMLInputElement>(null);
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.click();
  };

  return (
    <div className='mb-4'>
      <label className='block text-sm text-neutral-800 dark:text-neutral-300' htmlFor={name}>
        {label}
      </label>
      <Button.secondary title='Select File' onClick={handleClick} className='mt-2 w-full truncate !py-2'>
        {value !== '' ? (
          value
        ) : (
          <span className='flex items-center justify-center gap-1'>
            <PlusIcon className='inline h-4 w-4' /> File
          </span>
        )}
      </Button.secondary>
      <input
        ref={ref}
        {...props}
        id={name}
        type='file'
        name={name}
        value=''
        onChange={onChange}
        className={twMerge(
          'mt-2 hidden h-12 w-full rounded-md bg-white px-4 py-[0.6rem] text-sm font-medium transition-all dark:bg-neutral-900 dark:text-neutral-100',
          'border border-neutral-300 outline-none focus:border-sky-500 dark:border-neutral-800 dark:focus:border-sky-500',
          'ring-neutral-300 focus:ring-1 focus:ring-sky-500 dark:ring-neutral-600 dark:focus:ring-sky-500',
          className
        )}
        required
      />
    </div>
  );
}

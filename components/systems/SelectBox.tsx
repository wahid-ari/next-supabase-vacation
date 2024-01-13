import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

type Props = {
  label?: string;
  name?: string;
  value?: { id: number; name: string };
  placeholder?: string;
  onChange?: (e: any) => void;
  options: { id: number; name: string }[];
  [props: string]: any;
};

export default function SelectBox({ label, name, value, placeholder, onChange, options, ...props }: Props) {
  return (
    <Listbox name={name} value={value} onChange={onChange}>
      <div className='relative mt-1 pb-1'>
        {label && <Listbox.Label className='text-neutral-800 dark:text-neutral-300'>{label}</Listbox.Label>}
        <Listbox.Button
          {...props}
          className={cn(
            'relative my-2 h-10 w-full cursor-pointer rounded-md border text-left text-sm transition-all',
            'border-neutral-300 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800',
            'focus:ring-2 focus:ring-sky-500 focus-visible:outline-none',
          )}
        >
          <span className={cn('block truncate pl-3', !value ? 'text-neutral-500 dark:text-neutral-500' : '')}>
            {value ? value?.name : placeholder || 'Select'}
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon className='h-5 w-5 text-neutral-500 dark:text-neutral-300' aria-hidden='true' />
          </span>
        </Listbox.Button>
        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Listbox.Options
            className={cn(
              'absolute z-10 max-h-40 w-full overflow-auto rounded-md py-1 text-sm shadow-lg',
              'bg-white focus-visible:outline-none dark:bg-neutral-800',
            )}
          >
            {options.map((option: any, index: number) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  cn(
                    'relative cursor-pointer py-2 pl-10 pr-4 text-neutral-900 dark:text-white',
                    active && 'bg-sky-500 text-white',
                  )
                }
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <span className={cn('block truncate', selected && 'font-medium')}>{option.name}</span>
                    {selected ? (
                      <span
                        className={cn(
                          'absolute inset-y-0 left-0 flex items-center pl-3',
                          active ? 'text-white' : 'text-emerald-600',
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

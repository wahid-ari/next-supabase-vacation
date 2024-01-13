import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

type Props = {
  label?: string;
  name?: string;
  value?: { id: number; name: string };
  placeholder?: string;
  onChange?: any;
  query?: string;
  onChangeQuery?: (e: any) => void;
  options: { id: number; name: string }[];
  [props: string]: any;
};

export default function SearchBox({
  label,
  name,
  value,
  placeholder,
  onChange,
  query,
  onChangeQuery,
  options,
  ...props
}: Props) {
  return (
    <Combobox name={name} by='id' value={value} onChange={onChange}>
      <div className='relative mt-1 pb-1'>
        {label && <Combobox.Label className='text-neutral-800 dark:text-neutral-300'>{label}</Combobox.Label>}
        <div
          className={cn(
            'relative my-2 w-full cursor-default overflow-hidden rounded-md p-[1px] text-left text-sm',
            'border border-neutral-300 dark:border-neutral-600',
          )}
        >
          <Combobox.Input
            {...props}
            className={cn(
              'w-full rounded-md py-2 pl-3 pr-10 text-sm text-neutral-900 dark:bg-neutral-900 dark:text-white',
              'border border-transparent focus:border-sky-500 focus:ring-2 focus:ring-sky-500',
            )}
            displayValue={(data: any) => data?.name}
            placeholder={placeholder || 'Search'}
            onChange={onChangeQuery}
          />
          <Combobox.Button title='Show options' className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <div className='h-5 border-l pr-2 dark:border-l-neutral-600'></div>
            <ChevronDownIcon className='h-5 w-5 text-neutral-500 dark:text-neutral-300' aria-hidden='true' />
          </Combobox.Button>
        </div>
        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Combobox.Options className='absolute z-10 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg dark:bg-neutral-800'>
            {options.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none px-4 py-2 text-neutral-700 dark:text-white'>
                Nothing found.
              </div>
            ) : (
              options.map((item: any) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer py-2 pl-10 pr-4',
                      active ? 'bg-sky-500 text-white' : 'text-neutral-900 dark:text-white',
                    )
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
                        {item.name}
                      </span>
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
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

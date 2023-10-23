import { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  label?: string;
  value?: string[];
  placeholder?: string;
  onChange?: any;
  query?: string;
  onChangeQuery?: (e: any) => void;
  afterLeave?: () => void;
  filtered: any;
  [props: string]: any;
};

export default function SearchBox({
  label,
  value,
  placeholder,
  onChange,
  query,
  onChangeQuery,
  afterLeave,
  filtered,
  ...props
}: Props) {
  return (
    // @ts-ignore
    <Combobox value={value} by='id' onChange={onChange}>
      <div className='relative mt-1 pb-1'>
        {label && <Combobox.Label className='text-neutral-800 dark:text-neutral-300'>{label}</Combobox.Label>}
        <div className='relative my-2 w-full cursor-default overflow-hidden rounded-md border border-neutral-300 p-[1px] text-left text-sm dark:border-neutral-600'>
          <Combobox.Input
            {...props}
            className='w-full rounded-md border border-transparent py-2 pl-3 pr-10 text-sm font-medium text-neutral-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:bg-neutral-900 dark:text-white'
            displayValue={(data: any) => data?.name}
            placeholder={placeholder}
            onChange={onChangeQuery}
          />
          <Combobox.Button title='Show options' className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon className='h-5 w-5 dark:text-neutral-300 text-neutral-500' aria-hidden='true' />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={afterLeave}
        >
          <Combobox.Options className='absolute z-10 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg dark:bg-neutral-800'>
            {filtered.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none px-4 py-2 text-neutral-700 dark:text-white'>
                Nothing found.
              </div>
            ) : (
              filtered.map((item: any) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    twMerge(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      active ? 'bg-sky-500 text-white' : 'text-neutral-900 dark:text-white'
                    )
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={twMerge('block truncate', selected ? 'font-medium' : 'font-normal')}>
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={twMerge(
                            'absolute inset-y-0 left-0 flex items-center pl-3',
                            active ? 'text-white' : 'text-teal-600'
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

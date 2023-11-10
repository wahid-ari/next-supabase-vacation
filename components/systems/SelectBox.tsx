import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

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
    <Listbox name={name} value={value} onChange={onChange} {...props}>
      <div className='relative mt-1 pb-1'>
        {label && <Listbox.Label className='text-neutral-800 dark:text-neutral-300'>{label}</Listbox.Label>}
        <Listbox.Button
          className={twMerge(
            'h-10 relative my-2 w-full p-[1px] text-left border transition-all rounded-md cursor-pointer text-sm',
            'border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800',
            'focus:ring-2 focus:ring-sky-500 focus-visible:outline-none',
          )}
        >
          <span className={twMerge('block truncate pl-3', !value ? 'dark:text-neutral-500 text-neutral-500' : '')}>
            {value ? value?.name : placeholder || 'Select'}
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronDownIcon className='w-5 h-5 text-neutral-500 dark:text-neutral-300' aria-hidden='true' />
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
            className={twMerge(
              'z-10 absolute w-full py-1 overflow-auto rounded-md shadow-lg max-h-40 text-sm',
              'bg-white dark:bg-neutral-800 focus-visible:outline-none',
            )}
          >
            {options.map((option: any, index: number) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  twMerge(
                    'relative cursor-pointer py-2 pr-4 pl-10 text-neutral-900 dark:text-white',
                    active && 'bg-sky-500 text-white',
                  )
                }
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <span className={twMerge('block truncate', selected && 'font-medium')}>{option.name}</span>
                    {selected ? (
                      <span
                        className={twMerge(
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

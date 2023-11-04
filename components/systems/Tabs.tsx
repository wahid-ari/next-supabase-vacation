import { ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
  items: string[];
  [props: string]: any;
};

export default function Tabs({ children, className, items, ...props }: Props) {
  return (
    <Tab.Group>
      <Tab.List
        {...props}
        className={twMerge(
          'flex whitespace-nowrap border-b border-neutral-200 font-medium dark:border-neutral-800',
          className
        )}
      >
        <div className='flex gap-x-6'>
          {items.map((item, index) => (
            <Tab
              key={index + 1}
              as='div'
              className='rounded-t focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0'
            >
              {({ selected }) => (
                <button
                  className={twMerge(
                    'relative w-full border-transparent py-2.5 text-sm font-semibold tracking-wide transition-all',
                    'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200',
                    'rounded outline-none ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                    selected && '!text-sky-600 dark:!text-sky-500'
                  )}
                >
                  {item}
                  {selected && (
                    <motion.div
                      className='absolute bottom-0 left-0 right-0 z-10 h-[2px] rounded-full border-b-2 border-b-sky-600'
                      layoutId='underline'
                      initial={false}
                    />
                  )}
                </button>
              )}
            </Tab>
          ))}
        </div>
      </Tab.List>
      <Tab.Panels className='mt-2'>{children}</Tab.Panels>
    </Tab.Group>
  );
}

type PanelProps = {
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

Tabs.panel = ({ children, className, ...props }: PanelProps) => {
  return (
    <>
      <Tab.Panel
        {...props}
        className={twMerge(
          'rounded py-2 text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-0 dark:text-neutral-200',
          className
        )}
      >
        {children}
      </Tab.Panel>
    </>
  );
};

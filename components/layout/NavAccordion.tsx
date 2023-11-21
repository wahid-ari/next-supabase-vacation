import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { useMounted } from '@/hooks/use-mounted';

type Props = {
  children: ReactNode;
  title?: string;
  routeName?: string;
  className?: string;
  icon?: ReactNode;
  [props: string]: any;
};

export default function NavAccordion({ children, title, routeName, className, icon, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const mounted = useMounted();

  useEffect(() => {
    if (router.pathname.includes(routeName)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [router, routeName]);

  if (!mounted) {
    return (
      <>
        <button
          className={twMerge(
            'group flex w-full font-medium items-center justify-start gap-2 rounded py-1.5 pl-3 pr-2 text-neutral-600 outline-none transition-all',
            'hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            'dark:text-neutral-300 dark:hover:text-sky-500',
            'hover:bg-neutral-100 dark:hover:bg-neutral-800',
            className,
          )}
        >
          <div className='flex-grow text-left text-sm flex items-center gap-2'>
            <div className='border rounded-md dark:border-neutral-800 p-0.5 bg-neutral-100 dark:bg-neutral-800 dark:group-hover:border-neutral-700'>
              {icon}
            </div>
            <span>{title}</span>
          </div>
          <ChevronRightIcon className={`h-5 w-5 text-neutral-500 transition-all duration-300 dark:text-neutral-400`} />
        </button>
        <hr className='mx-3 dark:border-neutral-800' />
      </>
    );
  }

  return (
    <>
      <Disclosure defaultOpen={isOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              {...props}
              className={twMerge(
                'group flex w-full font-medium items-center justify-start gap-2 rounded py-1.5 pl-3 pr-2 text-neutral-600 outline-none transition-all',
                'hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                'dark:text-neutral-300 dark:hover:text-sky-500',
                'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                className,
              )}
            >
              <div className='flex-grow text-left text-sm flex items-center gap-2'>
                <div className='border rounded-md dark:border-neutral-800 p-0.5 bg-neutral-100 dark:bg-neutral-800 dark:group-hover:border-neutral-700'>
                  {icon}
                </div>
                <span>{title}</span>
              </div>
              <ChevronRightIcon
                className={`h-5 w-5 text-neutral-500 transition-all duration-300 dark:text-neutral-400 ${
                  open ? 'rotate-90 transform transition-transform' : 'transition-transform'
                }`}
              />
            </Disclosure.Button>
            <Transition
              enter='transition duration-300 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-75 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'
            >
              <Disclosure.Panel className='relative overflow-hidden py-0.5 px-2.5 transition-all'>
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <hr className='mx-3 dark:border-neutral-800' />
    </>
  );
}

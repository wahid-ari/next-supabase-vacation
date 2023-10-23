import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';

import { useMounted } from '@/hooks/use-mounted';

import Modal from '@/components/systems/Modal';

type Props = {
  className?: string;
  [props: string]: any;
};

export default function Akun({ className, ...props }: Props) {
  const { data: session }: { data: any; status: any } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const mounted = useMounted();

  function handleLogout() {
    setOpenModal(false);
    router.push('/logout');
  }

  return (
    <>
      <Menu as='div' className={twMerge('relative', className)}>
        {({ open }) => (
          <>
            <Menu.Button
              {...props}
              className={twMerge(
                'inline-flex w-full items-center font-medium justify-center rounded transition-all',
                'text-neutral-600 hover:text-neutral-900',
                'dark:text-neutral-300 dark:hover:text-neutral-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              )}
            >
              {(mounted && session?.name) || 'Menu'}

              <ChevronDownIcon
                className={twMerge('ml-1 h-5 w-4 transition-all duration-200', open ? 'rotate-180' : 'rotate-0')}
                aria-hidden='true'
              />
            </Menu.Button>
            <Transition
              enter='transition ease-in-out duration-300'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in-out duration-100'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 lg:right-1 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-md focus:outline-none dark:bg-neutral-900 border dark:border-neutral-800'>
                <div className='space-y-1 p-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href='/setting'
                        className={twMerge(
                          'flex w-full rounded px-2 py-1.5 text-sm',
                          active
                            ? 'bg-neutral-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                            : 'text-neutral-700 dark:text-neutral-300'
                        )}
                      >
                        Setting
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setOpenModal(true)}
                        className={twMerge(
                          'flex w-full rounded px-2 py-1.5 text-sm',
                          active
                            ? 'bg-neutral-100 text-red-600 transition-all dark:bg-neutral-800 dark:text-red-500'
                            : 'text-red-500 dark:text-red-500'
                        )}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      <Modal
        title='Logout'
        open={openModal}
        showIcon
        isDanger
        onClose={() => setOpenModal(false)}
        onConfirm={handleLogout}
        confirmText='Logout'
      >
        Are you sure want to logout?
      </Modal>
    </>
  );
}

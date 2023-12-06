import { Fragment, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/libs/utils';
import { useMounted } from '@/hooks/use-mounted';

import ActiveLink from '@/components/front/ActiveLink';
import FrontThemeChanger from '@/components/front/FrontThemeChanger';
import NavbarSearch from '@/components/front/NavbarSearch';

function CustomActiveLink({
  children,
  href,
  pathname,
  className,
}: {
  children: ReactNode;
  href: string;
  pathname?: string;
  className?: string;
}) {
  return (
    <ActiveLink
      href={href}
      pathname={pathname}
      activeClassName='!text-sky-500 dark:!text-sky-500'
      className={twMerge(
        'px-1 text-[15px] font-medium text-neutral-700 transition-all duration-200',
        'rounded hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
        className,
      )}
    >
      {children}
    </ActiveLink>
  );
}

const mobileLinkClassname = twMerge(
  'block rounded px-3 py-1.5 text-[15px] font-medium',
  'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
);

export default function FrontNavbar({
  className,
  transparentNavbar,
  ...props
}: {
  className?: string;
  transparentNavbar?: boolean;
  [props: string]: any;
}) {
  const { data: session, status }: { data: any; status: any } = useSession();
  const mounted = useMounted();
  const [isShowMore, setIsShowMore] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  return (
    <Popover
      {...props}
      as='header'
      className={twMerge(
        'sticky top-0 z-10 border-b border-b-neutral-200/70 dark:border-b-neutral-800 max-w-full 2xl:max-w-7xl mx-auto',
        transparentNavbar && !scrolled && ' border-none bg-gradient-to-b from-black/50 via-black/30 to-transparent',
        scrolled && 'bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30 ',
        className,
      )}
    >
      <>
        <div className='mx-auto max-w-7xl px-4 py-3'>
          <nav className='flex items-center justify-between'>
            {/* web logo  */}
            <Link
              href='/'
              passHref
              className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              <div className='flex items-center justify-center font-medium text-neutral-900 md:justify-start'>
                <Image alt='Logo' src='/icon.png' width={30} height={30} className='mr-2 rounded-lg' unoptimized />
                <span
                  className={twMerge(
                    'text-xl font-semibold text-neutral-800 dark:text-neutral-100',
                    transparentNavbar && !scrolled && 'text-white dark:text-white',
                  )}
                >
                  MyVacation
                </span>
              </div>
            </Link>
            {/* web logo  */}

            {/* Nav Link  */}
            <div className='hidden lg:block'>
              <div className='flex items-center lg:space-x-3 min-[1100px]:space-x-5 xl:space-x-7'>
                <CustomActiveLink
                  href='/'
                  className={twMerge(transparentNavbar && !scrolled && 'text-white dark:text-white')}
                >
                  Home
                </CustomActiveLink>
                <CustomActiveLink
                  href='/destinations'
                  pathname='/destinations/[slug]'
                  className={twMerge(transparentNavbar && !scrolled && 'text-white dark:text-white')}
                >
                  Destination
                </CustomActiveLink>
                <CustomActiveLink
                  href='/categories'
                  pathname='/categories/[slug]'
                  className={twMerge(transparentNavbar && !scrolled && 'text-white dark:text-white')}
                >
                  Category
                </CustomActiveLink>
                <CustomActiveLink
                  href='/videos'
                  className={twMerge(transparentNavbar && !scrolled && 'text-white dark:text-white')}
                >
                  Video
                </CustomActiveLink>
                <CustomActiveLink
                  href='/provinces'
                  pathname='/provinces/[slug]'
                  className={twMerge(transparentNavbar && !scrolled && 'text-white dark:text-white')}
                >
                  Province
                </CustomActiveLink>
                <CustomActiveLink
                  href='/islands'
                  pathname='/islands/[slug]'
                  className={twMerge(transparentNavbar && !scrolled && 'text-white dark:text-white')}
                >
                  Island
                </CustomActiveLink>

                <Popover
                  className='relative'
                  // onMouseEnter={() => setIsShowMore(true)}
                  // onMouseLeave={() => setIsShowMore(false)}
                >
                  <Popover.Button
                    className={twMerge(
                      'group flex items-center space-x-1 rounded px-1 text-[15px] font-medium transition-all duration-200',
                      ' text-neutral-700 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                      transparentNavbar && !scrolled && 'text-white dark:text-white',
                    )}
                  >
                    <span>More</span>
                    <ChevronDownIcon
                      className={`${
                        isShowMore
                          ? 'rotate-180 transform transition-transform duration-300'
                          : 'transition-transform duration-300'
                      } h-4 w-4`}
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    // show={isShowMore}
                    enter='duration-200 ease-out'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='duration-100 ease-in'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                  >
                    <Popover.Panel
                      className={cn(
                        'absolute top-8 z-[11] flex w-40 flex-col space-y-2.5 rounded px-4 py-4 shadow',
                        'dark:border dark:border-neutral-800 bg-white dark:bg-neutral-900',
                      )}
                    >
                      <CustomActiveLink href='/dashboard'>Dashboard</CustomActiveLink>
                    </Popover.Panel>
                  </Transition>
                </Popover>

                <CustomActiveLink
                  href='/browse'
                  className={twMerge(transparentNavbar && !scrolled && 'text-white dark:text-white')}
                >
                  Browse
                </CustomActiveLink>

                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        aria-label='Search'
                        title='Search'
                        className={twMerge(
                          'group flex items-center space-x-2 rounded p-0.5 text-[15px] font-medium transition-all duration-200',
                          ' text-neutral-700 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                          transparentNavbar && !scrolled && 'text-white dark:text-white',
                        )}
                      >
                        <SearchIcon className='h-[18px] w-[18px]' />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter='duration-200 ease-out'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='duration-100 ease-in'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                      >
                        <Popover.Panel
                          className={twMerge(
                            'absolute left-1/2 top-16 z-10 w-96 -translate-x-1/2 space-y-2.5 rounded',
                            'border border-transparent bg-white p-2 shadow dark:border-neutral-800 dark:bg-[#1a1a1a]',
                          )}
                        >
                          <NavbarSearch />
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
            {/* End Nav Link  */}

            <div className='hidden items-center gap-2 lg:flex'>
              {mounted && status != 'loading' ? (
                session?.name ? (
                  <Link
                    href='/dashboard'
                    className={twMerge(
                      'rounded-md text-sm border dark:border-neutral-700 px-3 py-1 font-medium transition-all duration-200',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                      transparentNavbar &&
                        !scrolled &&
                        'text-white dark:text-white hover:bg-neutral-800 border-neutral-300 dark:border-neutral-300',
                    )}
                    passHref
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href='/login'
                    className={twMerge(
                      'rounded-md text-sm border dark:border-neutral-700 px-3 py-1 font-medium transition-all duration-200',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                      transparentNavbar &&
                        !scrolled &&
                        'text-white dark:text-white hover:bg-neutral-800 border-neutral-300 dark:border-neutral-300',
                    )}
                    passHref
                  >
                    Login
                  </Link>
                )
              ) : (
                <div
                  className={cn(
                    'rounded-md text-sm border dark:border-neutral-700 px-3 py-1 font-medium transition-all duration-200',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200',
                  )}
                >
                  <span>Loading</span>
                </div>
              )}

              <FrontThemeChanger
                className={twMerge(
                  transparentNavbar &&
                    !scrolled &&
                    'text-white dark:text-white hover:bg-neutral-800 border-neutral-300 dark:border-neutral-300',
                )}
              />
            </div>

            {/* Mobile menu button */}
            <div className='flex lg:hidden'>
              <Popover.Button
                className={twMerge(
                  'inline-flex items-center justify-center rounded transition-all',
                  'text-neutral-500 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-100',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                  transparentNavbar &&
                    !scrolled &&
                    'text-neutral-100 dark:text-neutral-100 hover:text-white dark:hover:text-white',
                )}
              >
                <span className='sr-only'>Open main menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
            {/* End Mobile menu button */}
          </nav>
        </div>

        {/* Mobile menu panel */}
        <Transition
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-10 origin-top-right transform p-3 transition lg:hidden'
          >
            <div className='overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 dark:bg-[#1a1a1a]'>
              <div className='flex items-center justify-between border-b py-3 dark:border-b-neutral-800'>
                <div className='ml-5'>
                  <Link
                    href='/'
                    passHref
                    className='flex w-full items-center rounded focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                  >
                    <span className='text-xl font-semibold dark:text-white'>MyVacation</span>
                  </Link>
                </div>
                {/* CLose Mobile Menu Button  */}
                <div className='mr-3 flex items-center gap-2'>
                  <FrontThemeChanger />
                  <Popover.Button
                    className={twMerge(
                      'p-1 text-neutral-700 transition-all dark:text-neutral-300',
                      'rounded-md border hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600',
                      'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
                      'focus:outline-none focus:ring-2 focus:ring-sky-500',
                    )}
                  >
                    <span className='sr-only'>Close main menu</span>
                    <XIcon className='h-5 w-5' aria-hidden='true' />
                  </Popover.Button>
                </div>
                {/* EndCLose Mobile Menu Button  */}
              </div>
              <div className='my-4 flex flex-col space-y-1 px-4'>
                <ActiveLink href='/' activeClassName='!text-sky-500 dark:text-sky-500' className={mobileLinkClassname}>
                  Home
                </ActiveLink>
                <ActiveLink
                  href='/destinations'
                  activeClassName='!text-sky-500 dark:text-sky-500'
                  className={mobileLinkClassname}
                >
                  Destination
                </ActiveLink>
                <ActiveLink
                  href='/categories'
                  activeClassName='!text-sky-500 dark:text-sky-500'
                  className={mobileLinkClassname}
                >
                  Category
                </ActiveLink>
                <ActiveLink
                  href='/videos'
                  activeClassName='!text-sky-500 dark:text-sky-500'
                  className={mobileLinkClassname}
                >
                  Video
                </ActiveLink>
                <ActiveLink
                  href='/provinces'
                  activeClassName='!text-sky-500 dark:text-sky-500'
                  className={mobileLinkClassname}
                >
                  Province
                </ActiveLink>
                <ActiveLink
                  href='/islands'
                  activeClassName='!text-sky-500 dark:text-sky-500'
                  className={mobileLinkClassname}
                >
                  Islands
                </ActiveLink>
                <Menu>
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className={twMerge(
                          'w-full rounded px-3 py-1.5 text-[15px] font-medium',
                          'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                        )}
                      >
                        <div className='flex items-center justify-between'>
                          <span>More</span>
                          <ChevronRightIcon
                            className={`${
                              open
                                ? 'rotate-90 transform transition-transform duration-200'
                                : 'transition-transform duration-200'
                            } h-5 w-5`}
                          />
                        </div>
                      </Menu.Button>
                      <Menu.Items className='space-y-1 px-3 focus-visible:outline-none focus-visible:ring-0'>
                        <Menu.Item>
                          {({ active }) => (
                            <ActiveLink
                              activeClassName='!text-sky-500 dark:text-sky-500'
                              href='/dashboard'
                              className={cn(mobileLinkClassname, active && 'bg-neutral-100 dark:bg-neutral-800')}
                            >
                              Dashboard
                            </ActiveLink>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </>
                  )}
                </Menu>
                <ActiveLink
                  href='/browse'
                  activeClassName='!text-sky-500 dark:text-sky-500'
                  className={mobileLinkClassname}
                >
                  Browse
                </ActiveLink>
                {mounted && (
                  <Link
                    href={`${session?.name ? '/dashboard' : '/login'}`}
                    className={twMerge(
                      'block rounded px-3 py-1.5 text-[15px] font-medium text-neutral-600 hover:bg-neutral-100',
                      'hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                      'dark:text-neutral-200 dark:hover:bg-neutral-800',
                    )}
                  >
                    {session?.name ? 'Dashboard' : 'Login'}
                  </Link>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
        {/* End Mobile menu panel */}
      </>
    </Popover>
  );
}

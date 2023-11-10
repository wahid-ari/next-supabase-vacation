import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, InstagramIcon, RssIcon, TwitterIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const linkClassName = twMerge(
  'hover-underline-animation rounded text-[15px] hover:text-neutral-900 px-0.5',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-neutral-100',
);
const linkIconClassName = twMerge(
  'rounded text-neutral-700 transition-all duration-200 hover:text-neutral-900',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-300 dark:hover:text-white',
);

export default function Footer({ className, ...props }: { className?: string; [props: string]: any }) {
  return (
    <footer {...props} className={twMerge('border-t dark:border-neutral-800', className)}>
      <div className='mx-auto max-w-7xl px-4 pb-6 pt-12'>
        <div className='gap-16 pb-4 md:flex md:justify-between'>
          <div className='mb-6 md:mb-0 md:w-2/5'>
            {/* web logo  */}
            <Link href='/' passHref className='group inline-flex rounded focus-visible:outline-none'>
              <div
                className={twMerge(
                  'flex items-center rounded font-medium text-neutral-900',
                  'group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-sky-500',
                )}
              >
                <Image alt='Logo' src='/icon.png' width={30} height={30} className='mr-2 rounded-lg' unoptimized />
                <span className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'>MyVacation</span>
              </div>
            </Link>
            {/* web logo  */}
            <p className='mt-4 pb-2 pr-4 text-[15px] text-neutral-700 dark:text-neutral-300'>
              Find books you&apos;ll love, and keep track of the books you want to read. Be part of the largest
              community of book lovers on MyVacation
            </p>
          </div>
          <div className='grid grid-cols-2 gap-8 min-[500px]:grid-cols-3 sm:gap-6 md:w-2/4'>
            <div>
              <h2 className='mb-4 px-0.5 text-sm font-semibold uppercase text-neutral-800 dark:text-neutral-200'>
                Sitemap
              </h2>
              <ul className='text-neutral-700 dark:text-neutral-300'>
                <li className='mb-2'>
                  <Link href='/' className={linkClassName}>
                    Home
                  </Link>
                </li>
                <li className='mb-2'>
                  <Link href='/design' className={linkClassName}>
                    Design
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-4 px-0.5 text-sm font-semibold uppercase text-neutral-800 dark:text-neutral-200'>
                Sitemap
              </h2>
              <ul className='text-neutral-700 dark:text-neutral-300'>
                <li className='mb-2'>
                  <Link href='/#' className={linkClassName}>
                    Studios
                  </Link>
                </li>
                <li className='mb-2'>
                  <Link href='/browse' className={linkClassName}>
                    Browse
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-4 px-0.5 text-sm font-semibold uppercase text-neutral-800 dark:text-neutral-200'>
                Resources
              </h2>
              <ul className='text-neutral-700 dark:text-neutral-300'>
                <li className='mb-2'>
                  <a href='https://my-book-docs.vercel.app' target='_blank' rel='noreferrer' className={linkClassName}>
                    API Docs
                  </a>
                </li>
                <li>
                  <a href={`${process.env.NEXT_PUBLIC_API_ROUTE}/sitemap.xml`} className={linkClassName}>
                    Sitemap.xml
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='mb-6 mt-8 border-t dark:border-neutral-800 sm:mx-auto md:mt-6' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-neutral-700 dark:text-neutral-300 sm:text-center'>
            © 2023{' '}
            <Link
              href='/'
              className={twMerge(
                'hover-underline-animation rounded transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              MyVacation™
            </Link>
            . All Rights Reserved.
          </span>
          <div className='mt-4 flex space-x-4 sm:mt-0 sm:justify-center'>
            <a href='https://www.instagram.com/' title='Instagram' target='_blank' className={linkIconClassName}>
              <InstagramIcon className='h-5 w-5' />
              <span className='sr-only'>Instagram page</span>
            </a>
            <a href='https://twitter.com' title='Twitter' target='_blank' className={linkIconClassName}>
              <TwitterIcon className='h-5 w-5' />
              <span className='sr-only'>Twitter page</span>
            </a>
            <a href='https://github.com' title='GitHub' target='_blank' className={linkIconClassName}>
              <GithubIcon className='h-5 w-5' />
              <span className='sr-only'>GitHub account</span>
            </a>
            <Link href='/rss.xml' title='RSS' className={linkIconClassName}>
              <RssIcon className='h-5 w-5' />
              <span className='sr-only'>RSS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

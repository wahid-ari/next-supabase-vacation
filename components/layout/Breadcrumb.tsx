import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function Breadcrumb({ ...props }: { [props: string]: any }) {
  const router = useRouter();
  // dont show breadcrumb item in detail page
  const paths = router.pathname
    .split('/')
    .slice(1)
    .filter((r) => {
      if (r.includes('_id') || r === '[id]') {
        return false;
      }
      return true;
    });
  // const paths = router.asPath
  //   .split("/")
  //   .slice(1)
  //   .filter((r) => {
  //     if (r.includes("_id") || r === "[id]") {
  //       return false;
  //     }
  //     return true;
  //   });

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav className='flex w-full text-sm' aria-label='Breadcrumb'>
      <ol {...props} className='inline-flex flex-nowrap items-center space-x-1 whitespace-nowrap md:space-x-1'>
        <li className='-ml-0.5 inline-flex items-center'>
          <ChevronRightIcon className='mr-1 h-[18px] w-5 text-neutral-400' />
          <Link
            href='/'
            passHref
            className={twMerge(
              'inline-flex items-center rounded text-neutral-700 transition-all hover:text-neutral-900',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              'dark:text-neutral-300 dark:hover:text-neutral-100'
            )}
          >
            Home
          </Link>
        </li>
        {paths[0] !== '' &&
          paths.map((path, index) => {
            if (index === paths.length - 1) {
              return (
                <li aria-current='page' key={index} className='flex items-center'>
                  <ChevronRightIcon className='h-[18px] w-5 text-neutral-500 dark:text-neutral-400' />
                  <span className='ml-1 mr-4 font-medium text-sky-600 dark:text-sky-500'>
                    {capitalizeFirstLetter(path)}
                  </span>
                </li>
              );
            }
            return (
              <li key={index}>
                <div className='flex items-center'>
                  <ChevronRightIcon className='h-[18px] w-5 text-neutral-400' />
                  <Link
                    href={(index !== 0 ? '/' : '') + paths.slice(0, index).join('/') + '/' + path}
                    className={twMerge(
                      'ml-1 rounded text-neutral-600 transition-all hover:text-neutral-800',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                      'dark:text-neutral-300 dark:hover:text-neutral-200'
                    )}
                  >
                    {capitalizeFirstLetter(path)}
                  </Link>
                </div>
              </li>
            );
          })}
      </ol>
    </nav>
  );
}

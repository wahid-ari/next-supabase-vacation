import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon, ImageIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  href: string;
  image?: string;
  name: string;
  web?: string;
  [props: string]: any;
};

export default function AuthorListItem({ href, image, name, web, ...props }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div {...props} className='flex items-center gap-3'>
      <Link
        href={href}
        className='rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-sky-500'
      >
        {image ? (
          <div className='relative h-16 w-16'>
            <Image
              alt={name}
              src={image}
              fill
              className={twMerge(
                'rounded-full object-cover brightness-90 hover:brightness-100',
                isLoading ? 'blur-sm' : 'blur-0',
              )}
              onLoad={() => setLoading(false)}
              unoptimized
            />
          </div>
        ) : (
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800'>
            <ImageIcon className='h-8 w-8 text-neutral-500' />
          </div>
        )}
      </Link>
      <div>
        <Link
          href={href}
          className={twMerge(
            'rounded text-[15px] font-medium text-neutral-700 transition-all duration-200 dark:text-neutral-100',
            'hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-sky-500',
          )}
        >
          {name}
        </Link>
        {web ? (
          <a
            href={web}
            className={twMerge(
              'mt-1 flex w-16 items-center rounded text-sm font-medium transition-all duration-200',
              'text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
            target='_blank'
            rel='noreferrer'
          >
            Web
            <ArrowUpRightIcon className='ml-1 h-4 w-4' />
          </a>
        ) : (
          <p>-</p>
        )}
      </div>
    </div>
  );
}

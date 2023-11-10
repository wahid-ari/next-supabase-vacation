import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  href: string;
  image?: string;
  title: string;
  published?: string;
  [props: string]: any;
};

export default function BookListItem({ href, image, title, published, ...props }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div {...props} className='flex gap-3'>
      <Link
        href={href}
        className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-sky-500'
      >
        {image ? (
          <div className='relative h-20 w-14'>
            <Image
              alt={title}
              src={image}
              fill
              className={twMerge(
                'rounded object-cover brightness-90 hover:brightness-100',
                isLoading ? 'blur-sm' : 'blur-0',
              )}
              onLoadingComplete={() => setLoading(false)}
              unoptimized
            />
          </div>
        ) : (
          <div className='flex h-20 w-14 items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
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
          {title}
        </Link>
        <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-200'>
          {published ? published.split('-')[0] : '-'}
        </p>
      </div>
    </div>
  );
}

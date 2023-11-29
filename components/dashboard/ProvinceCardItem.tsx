import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  href: string;
  name: string;
  image_url: string;
  [props: string]: any;
};

export default function ProvinceCardItem({ href = '/province', name = 'Province Name', image_url, ...props }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className='grid' {...props}>
      <Link
        href={href}
        className='rounded-md group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
      >
        {image_url ? (
          <div className='relative h-64 overflow-hidden'>
            <Image
              className={twMerge(
                'w-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-500 transform group-hover:scale-110',
                isLoading ? 'blur-sm' : 'blur-0',
              )}
              src={image_url}
              alt={name}
              fill
              unoptimized
              onLoad={() => setLoading(false)}
            />
          </div>
        ) : (
          <div className='flex h-64 w-full items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
            <ImageIcon className='h-20 w-20 text-neutral-500' />
          </div>
        )}
        <div className='absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent to-neutral-950'>
          <div className='flex justify-center items-end h-full'>
            <p className='font-medium text-base text-center line-clamp-2 text-white px-4 mb-4'>{name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

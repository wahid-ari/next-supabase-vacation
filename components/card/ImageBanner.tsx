import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

type Props = {
  className?: string;
  href: string;
  image_url: string;
  align?: 'left' | 'center' | 'right';
  text?: string;
  textLink?: string;
  [props: string]: any;
};

export default function ImageBanner({
  className,
  href = '/',
  image_url = 'https://images.unsplash.com/photo-1558005137-d9619a5c539f?q=80&w=1000',
  align = 'left',
  text,
  textLink = 'Discover More',
  ...props
}: Props) {
  return (
    <div className={cn('relative h-64', className)} {...props}>
      <Image alt='hero' src={image_url} className='rounded-xl object-cover' fill unoptimized />
      <div
        className={cn(
          'absolute inset-0 rounded-xl text-white',
          align == 'left' && 'bg-gradient-to-r from-black/40 via-black/20 to-transparent',
          align == 'center' && 'bg-gradient-to-r from-transparent via-black/40 to-transparent',
          align == 'right' && 'bg-gradient-to-r from-transparent via-black/20 to-black/40',
        )}
      >
        <div
          className={cn(
            'flex h-full items-center p-6 sm:p-12',
            align == 'left' ? 'justify-start' : align == 'center' ? 'justify-center' : 'justify-end',
          )}
        >
          <div className={cn(align == 'left' ? 'text-left' : align == 'center' ? 'text-center' : 'text-right')}>
            <p className='mb-6 text-2xl font-semibold sm:max-w-xl sm:text-3xl md:text-4xl'>{text}</p>
            <div className='hover-underline-animation group after:bg-neutral-100'>
              <Link
                href={href}
                className='flex items-center gap-1 rounded text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              >
                {textLink}
                <ArrowRightIcon className='h-5 w-5 transition-all duration-300 group-hover:translate-x-0.5' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

import Badge from '@/components/systems/Badge';
import Heading from '@/components/systems/Heading';

type Props = {
  children?: ReactNode;
  id?: string;
  name?: string;
  docs?: string;
  props?: string[];
  variant?: string[];
  noClassName?: boolean;
  noChildren?: boolean;
  noProps?: boolean;
  noWrap?: boolean;
};

export default function Wrapper({
  children,
  id,
  name,
  docs,
  props,
  variant,
  noClassName,
  noChildren,
  noProps,
  noWrap,
}: Props) {
  return (
    <section id={id} className='pt-8'>
      <Heading className='group flex transition-all duration-500'>
        <span className='mr-2 text-neutral-500 transition-all duration-500 group-hover:text-black dark:group-hover:text-white'>
          #
        </span>{' '}
        <Link
          href={`#${id}`}
          className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
        >
          {name}
        </Link>
        {docs && (
          <a
            aria-label={docs}
            href={docs}
            className={cn(
              'ml-2 flex items-center justify-center rounded text-sm font-medium transition-all duration-200',
              'text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
            target='_blank'
            rel='noreferrer'
          >
            <ArrowUpRightIcon className='h-5 w-5' />
          </a>
        )}
      </Heading>
      {noWrap ? (
        <div className='mb-2'>{children}</div>
      ) : (
        <div className='relative mb-2 rounded-md border p-8 dark:border-neutral-800'>{children}</div>
      )}
      {variant && variant.length > 0 ? (
        <div className='mb-2 flex flex-wrap items-center gap-2'>
          {variant.map((v, i) => {
            return <Badge.yellow key={i}>.{v}</Badge.yellow>;
          })}
        </div>
      ) : (
        ''
      )}
      <div className='flex flex-wrap items-center gap-2'>
        {!noClassName && <Badge.green>className</Badge.green>}
        {props &&
          props.length > 0 &&
          props.map((p, i) => {
            return <Badge key={i}>{p}</Badge>;
          })}
        {!noChildren && <Badge.green>children</Badge.green>}
        {!noProps && <Badge.green>...props</Badge.green>}
      </div>
    </section>
  );
}

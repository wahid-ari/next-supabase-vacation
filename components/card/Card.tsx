import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useSpring, useTransform } from 'framer-motion';

import { cn } from '@/libs/utils';

function Highlight({ trigger, duration, children, ...props }) {
  let [previous, setPrevious] = useState(trigger);
  let [didHighlight, setDidHighlight] = useState(false);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (previous !== trigger) {
        setDidHighlight(true);
      }
      setPrevious(trigger);
    }, duration);
    return () => {
      clearTimeout(handler);
    };
  }, [duration, previous, trigger]);
  return (
    <div data-highlight={previous !== trigger ? 'on' : didHighlight ? 'off' : null} {...props}>
      {children}
    </div>
  );
}

function AnimatedNumber({ value }) {
  let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  let display = useTransform(spring, (current) => Math.round(current).toLocaleString());
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <motion.span>{display}</motion.span>;
}

export default function Card({
  title,
  link,
  count,
  icon,
  ...props
}: {
  title: string;
  link: string;
  count: number;
  icon?: ReactNode;
  [props: string]: any;
}) {
  const [value, setValue] = useState(0);
  setTimeout(() => {
    setValue(count);
  }, 0);

  return (
    <Link
      href={link}
      {...props}
      className={cn(
        'rounded-md border shadow dark:border-neutral-800',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
      )}
    >
      <Highlight trigger={value} duration={450} className='group'>
        <div
          className={cn(
            'flex items-center justify-between gap-2 p-4 transition duration-1000',
            'group-data-[highlight=on]:bg-neutral-100 group-data-[highlight=on]:duration-300 dark:group-data-[highlight=on]:bg-neutral-800',
            'group-data-[highlight=off]:animate-[fadeOut_750ms_forwards] group-data-[highlight=on]:animate-[ripple_250ms_cubic-bezier(0.09,.6,.36,1)_forwards]',
          )}
        >
          <div>
            <p className='mb-1 space-x-2 text-xl font-extrabold text-neutral-800 transition-all duration-500 group-data-[highlight=on]:text-sky-500 dark:text-neutral-100'>
              <AnimatedNumber value={value} />
            </p>
            <p className='text-base font-semibold text-neutral-600 transition-all group-hover:text-sky-500 dark:text-neutral-300'>
              {title}
            </p>
          </div>
          <div
            className={cn(
              'h-12 w-12 text-neutral-300 transition-all duration-500 group-hover:text-sky-500 dark:text-neutral-700 dark:group-hover:text-sky-600',
              'group-data-[highlight=on]:text-sky-500 group-data-[highlight=on]:duration-300',
            )}
          >
            {icon}
          </div>
        </div>
      </Highlight>
    </Link>
  );
}

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useSpring, useTransform } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

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
      className={twMerge(
        'group flex items-center justify-between gap-2 rounded-md border p-4 shadow',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800',
      )}
    >
      <div>
        <p className='mb-1 space-x-2 text-xl font-extrabold text-neutral-800 dark:text-neutral-100'>
          <AnimatedNumber value={value} />
        </p>
        <p className='text-base font-semibold text-neutral-600 transition-all group-hover:text-sky-500 dark:text-neutral-300'>
          {title}
        </p>
      </div>
      <div className='h-12 w-12 text-neutral-300 transition-all duration-500 group-hover:text-sky-500 dark:text-neutral-700 dark:group-hover:text-sky-600'>
        {icon}
      </div>
    </Link>
  );
}

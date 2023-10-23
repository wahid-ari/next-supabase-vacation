import { twMerge } from 'tailwind-merge';

import s from './LoadingDots.module.css';

type Props = {
  className?: string;
  medium?: boolean;
  large?: boolean;
  [props: string]: any;
};

export default function LoadingDots({ className, medium, large, ...props }: Props) {
  const classNames = twMerge(
    'h-2 w-2 rounded-full bg-neutral-600 dark:bg-zinc-200',
    medium && 'h-3 w-3',
    large && 'h-4 w-4'
  );

  return (
    <span className={twMerge(s.root, 'inline-flex items-center gap-1 text-center leading-7', className)} {...props}>
      <span className={classNames} />
      <span className={classNames} />
      <span className={classNames} />
    </span>
  );
}

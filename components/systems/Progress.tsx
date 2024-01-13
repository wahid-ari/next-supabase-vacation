import { cn } from '@/libs/utils';

type Props = {
  className?: string;
  percent: number;
  [props: string]: any;
};

export default function Progress({ className, percent, ...props }: Props) {
  return (
    <div className={cn('h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800', className)}>
      <div {...props} className='h-1.5 rounded-full bg-sky-500' style={{ width: `${percent}%` }}></div>
    </div>
  );
}

Progress.percentage = ({ className, percent, ...props }: Props) => {
  return (
    <div className='w-full rounded-full bg-neutral-200 dark:bg-neutral-800'>
      <div
        {...props}
        className={cn(
          'rounded-full p-0.5 text-center text-xs font-medium leading-none',
          percent > 0 ? 'bg-sky-500 text-sky-100' : 'text-neutral-800 dark:text-neutral-200',
          className,
        )}
        style={{ width: percent + '%' }}
      >
        {percent > 0 ? `${percent} %` : '0%'}
      </div>
    </div>
  );
};

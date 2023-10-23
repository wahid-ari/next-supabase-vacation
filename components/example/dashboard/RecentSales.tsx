import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

export function RecentSales() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='https://github.com/vercel.png' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='mr-auto flex flex-col sm:w-full sm:flex-row sm:items-center sm:justify-between'>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>Olivia Martin</p>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>olivia.martin@email.com</p>
          </div>
          <div className='ml-4 mt-1 font-medium sm:mt-0'>+$1,999.00</div>
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='https://github.com/vercel.png' alt='Avatar' />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className='mr-auto flex flex-col sm:w-full sm:flex-row sm:items-center sm:justify-between'>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>Jackson Lee</p>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>jackson.lee@email.com</p>
          </div>
          <div className='ml-4 mt-1 font-medium sm:mt-0'>+$39.00</div>
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='https://github.com/vercel.png' alt='Avatar' />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className='mr-auto flex flex-col sm:w-full sm:flex-row sm:items-center sm:justify-between'>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>Isabella Nguyen</p>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>isabella.ng@email.com</p>
          </div>
          <div className='ml-4 mt-1 font-medium sm:mt-0'>+$299.00</div>
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='https://github.com/vercel.png' alt='Avatar' />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className='mr-auto flex flex-col sm:w-full sm:flex-row sm:items-center sm:justify-between'>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>William Kim</p>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>will@email.com</p>
          </div>
          <div className='ml-4 mt-1 font-medium sm:mt-0'>+$99.00</div>
        </div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='https://github.com/vercel.png' alt='Avatar' />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className='mr-auto flex flex-col sm:w-full sm:flex-row sm:items-center sm:justify-between'>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>Sofia Davis</p>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>sofia.davis@email.com</p>
          </div>
          <div className='ml-4 mt-1 font-medium sm:mt-0'>+$39.00</div>
        </div>
      </div>
    </div>
  );
}

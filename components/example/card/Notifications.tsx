import { BellIcon, UserIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export function DemoNotifications() {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-1'>
        <div className='hover:text-accent-foreground -mx-2 flex items-start space-x-4 rounded-md p-2 pt-3 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800'>
          <BellIcon className='mt-px h-5 w-5' />
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>Everything</p>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>Email digest, mentions & all activity.</p>
          </div>
        </div>
        <div className='text-accent-foreground -mx-2 flex items-start space-x-4 rounded-md bg-neutral-100 p-2 pt-3 transition-all dark:bg-neutral-800'>
          <UserIcon className='mt-px h-5 w-5' />
          <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>Available</p>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>Only mentions and comments.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

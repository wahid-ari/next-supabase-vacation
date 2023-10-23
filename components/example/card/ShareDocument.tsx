'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';

export function DemoShareDocument() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>Anyone with the link can view this document.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-2'>
          <Input value='http://example.com/link/to/document' readOnly />
          <Button variant='secondary' className='h-[39px] shrink-0'>
            Copy Link
          </Button>
        </div>
        <Separator className='my-4' />
        <div className='space-y-4'>
          <h4 className='text-sm font-medium'>People with access</h4>
          <div className='grid gap-6'>
            <div className='flex items-center justify-between space-x-4'>
              <div className='flex items-center sm:space-x-4'>
                <Avatar className='hidden sm:block'>
                  <AvatarImage src='https://github.com/vercel.png' />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-medium leading-none'>Olivia Martin</p>
                  <p className='text-sm text-neutral-500 dark:text-neutral-400'>m@example.com</p>
                </div>
              </div>
              <Select defaultValue='edit'>
                <SelectTrigger className='ml-auto w-[110px]'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='edit'>Can edit</SelectItem>
                  <SelectItem value='view'>Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center justify-between space-x-4'>
              <div className='flex items-center sm:space-x-4'>
                <Avatar className='hidden sm:block'>
                  <AvatarImage src='https://github.com/vercel.png' />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-medium leading-none'>Isabella Nguyen</p>
                  <p className='text-sm text-neutral-500 dark:text-neutral-400'>b@example.com</p>
                </div>
              </div>
              <Select defaultValue='view'>
                <SelectTrigger className='ml-auto w-[110px]'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='edit'>Can edit</SelectItem>
                  <SelectItem value='view'>Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

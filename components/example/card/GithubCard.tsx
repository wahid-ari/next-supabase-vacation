'use client';

import { useState } from 'react';
import { ChevronDownIcon, CircleIcon, PlusIcon, StarIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Separator } from '@/components/ui/Separator';
import { Toggle } from '@/components/ui/Toggle';

export function DemoGithub() {
  const [starred, setStarred] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between gap-2'>
          <CardTitle>NextJS</CardTitle>
          <div className='flex items-center space-x-2'>
            <Toggle
              pressed={starred}
              size='sm'
              variant='outline'
              onPressedChange={setStarred}
              aria-label='Star'
              className='h-8 px-1.5'
            >
              {starred ? (
                <>
                  <StarIcon className='mr-1 size-4 fill-yellow-500 text-yellow-500' />
                  Starred
                </>
              ) : (
                <>
                  <StarIcon className='mr-1 size-4' />
                  Star
                </>
              )}
            </Toggle>
            <Separator orientation='vertical' className='h-[20px]' />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='px-2 shadow-none'>
                  <ChevronDownIcon className='text-secondary-foreground size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' alignOffset={-5} className='w-[200px]' forceMount>
                <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Future Ideas</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon className='mr-2 size-4' /> Create List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardDescription>Beautifully designed components built with Radix UI and Tailwind CSS.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400'>
          <div className='flex items-center'>
            <CircleIcon className='mr-1 size-3 fill-sky-400 text-sky-400' />
            TypeScript
          </div>
          <div className='flex items-center'>
            {starred ? (
              <>
                <StarIcon className='mr-1 size-4 fill-yellow-500 text-yellow-500' />
                Star
              </>
            ) : (
              <>
                <StarIcon className='mr-1 size-4' />
                Star
              </>
            )}{' '}
            20K
          </div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  );
}

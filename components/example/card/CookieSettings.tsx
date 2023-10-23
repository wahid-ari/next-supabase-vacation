'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';

export function DemoCookieSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <CardDescription>Manage your cookie settings here.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='flex items-center justify-between space-x-2'>
          <Label htmlFor='necessary' className='flex flex-col space-y-1'>
            <span>Strictly Necessary</span>
            <span className='font-normal leading-snug text-neutral-500 dark:text-neutral-400'>
              These cookies are essential in order to use the website and use its features.
            </span>
          </Label>
          <Switch id='necessary' defaultChecked />
        </div>
        <div className='flex items-center justify-between space-x-2'>
          <Label htmlFor='functional' className='flex flex-col space-y-1'>
            <span>Functional Cookies</span>
            <span className='font-normal leading-snug text-neutral-500 dark:text-neutral-400'>
              These cookies allow the website to provide personalized functionality.
            </span>
          </Label>
          <Switch id='functional' />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='outline' className='w-full'>
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  );
}

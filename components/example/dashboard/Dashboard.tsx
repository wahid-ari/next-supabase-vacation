import Image from 'next/image';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

import { Areachart } from '@/components/example/dashboard/Areachart';
import { DateRangePicker } from '@/components/example/dashboard/DateRangePicker';
import { Linechart } from '@/components/example/dashboard/Linechart';
import { MainNav } from '@/components/example/dashboard/MainNav';
import { Overview } from '@/components/example/dashboard/Overview';
import { Piechart } from '@/components/example/dashboard/Piechart';
import { RecentSales } from '@/components/example/dashboard/RecentSales';
import TeamSwitcher from '@/components/example/dashboard/TeamSwitcher';
import { UserNav } from '@/components/example/dashboard/UserNav';

export default function DashboardPage() {
  return (
    <>
      <div className='mb-8 md:hidden'>
        <Image
          src='https://github.com/vercel.png'
          width={880}
          height={466}
          alt='Dashboard'
          className='block dark:hidden'
          unoptimized
        />
        <Image
          src='https://github.com/vercel.png'
          width={880}
          height={466}
          alt='Dashboard'
          className='hidden dark:block'
          unoptimized
        />
      </div>
      <div className='flex-col md:flex'>
        <div className='border-b dark:border-b-neutral-700'>
          <div className='flex items-center pb-4'>
            <TeamSwitcher />
            <MainNav className='mx-2 sm:mx-6' />
            <div className='ml-auto flex items-center space-x-4'>
              <Input type='search' placeholder='Search...' className='hidden md:flex md:w-[200px] lg:w-[250px]' />
              <UserNav />
            </div>
          </div>
        </div>
        <div className='flex-1 space-y-4 pt-4'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
            <div className='flex items-center space-x-2'>
              <DateRangePicker className='hidden md:block' />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue='overview' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' className='hidden sm:block' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-neutral-600 dark:text-neutral-400'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$45,231.89</div>
                    <p className='text-xs text-neutral-600 dark:text-neutral-400'>+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-neutral-600 dark:text-neutral-400'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle cx='9' cy='7' r='4' />
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>
                    <p className='text-xs text-neutral-600 dark:text-neutral-400'>+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-neutral-600 dark:text-neutral-400'
                    >
                      <rect width='20' height='14' x='2' y='5' rx='2' />
                      <path d='M2 10h20' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+12,234</div>
                    <p className='text-xs text-neutral-600 dark:text-neutral-400'>+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-neutral-600 dark:text-neutral-400'
                    >
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-neutral-600 dark:text-neutral-400'>+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                <Card className='col-span-4'>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>
                <Card className='col-span-4 lg:col-span-3'>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>You made 265 sales this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value='analytics' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>LineChart</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Linechart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>AreaChart</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Areachart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>PieChart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Piechart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

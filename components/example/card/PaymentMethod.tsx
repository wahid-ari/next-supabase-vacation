import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

import { Icons } from '@/components/example/card/Icons';

export function DemoPaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <RadioGroup defaultValue='cards' className='grid grid-cols-3 gap-4'>
          <Label
            htmlFor='paypal'
            className='flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 [&:has([data-state=checked])]:border-sky-600 [&:has([data-state=checked])]:bg-neutral-100 dark:[&:has([data-state=checked])]:bg-neutral-800'
          >
            <RadioGroupItem value='paypal' id='paypal' className='sr-only' />
            <Icons.paypal className='mb-3 size-6' />
            Paypal
          </Label>
          <Label
            htmlFor='cards'
            className='flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 [&:has([data-state=checked])]:border-sky-600 [&:has([data-state=checked])]:bg-neutral-100 dark:[&:has([data-state=checked])]:bg-neutral-800'
          >
            <RadioGroupItem value='cards' id='cards' className='sr-only' />
            <Icons.cards className='mb-3 size-6' />
            Card
          </Label>
          <Label
            htmlFor='apple'
            className='flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 [&:has([data-state=checked])]:border-sky-600 [&:has([data-state=checked])]:bg-neutral-100 dark:[&:has([data-state=checked])]:bg-neutral-800'
          >
            <RadioGroupItem value='apple' id='apple' className='sr-only' />
            <Icons.apple className='mb-3 size-6' />
            Apple
          </Label>
        </RadioGroup>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>
          <Input id='name' placeholder='First Last' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='number'>Card number</Label>
          <Input id='number' placeholder='' />
        </div>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
          <div className='grid gap-2'>
            <Label htmlFor='month'>Expires</Label>
            <Select>
              <SelectTrigger id='month'>
                <SelectValue placeholder='Month' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>January</SelectItem>
                <SelectItem value='2'>February</SelectItem>
                <SelectItem value='3'>March</SelectItem>
                <SelectItem value='4'>April</SelectItem>
                <SelectItem value='5'>May</SelectItem>
                <SelectItem value='6'>June</SelectItem>
                <SelectItem value='7'>July</SelectItem>
                <SelectItem value='8'>August</SelectItem>
                <SelectItem value='9'>September</SelectItem>
                <SelectItem value='10'>October</SelectItem>
                <SelectItem value='11'>November</SelectItem>
                <SelectItem value='12'>December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='year'>Year</Label>
            <Select>
              <SelectTrigger id='year'>
                <SelectValue placeholder='Year' />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='col-span-2 grid gap-2 sm:col-span-1'>
            <Label htmlFor='cvc'>CVC</Label>
            <Input id='cvc' placeholder='CVC' />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Continue</Button>
      </CardFooter>
    </Card>
  );
}

'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

export function DemoReportAnIssue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an issue</CardTitle>
        <CardDescription>What area are you having problems with?</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='area'>Area</Label>
            <Select defaultValue='billing'>
              <SelectTrigger id='area'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='team'>Team</SelectItem>
                <SelectItem value='billing'>Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='security-level'>Security Level</Label>
            <Select defaultValue='2'>
              <SelectTrigger id='security-level'>
                <SelectValue placeholder='Select level' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>Severity 1</SelectItem>
                <SelectItem value='2'>Severity 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='subject'>Subject</Label>
          <Input id='subject' placeholder='I need help with...' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea id='description' placeholder='Please include all information relevant to your issue.' />
        </div>
      </CardContent>
      <CardFooter className='justify-between space-x-2'>
        <Button variant='ghost'>Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}

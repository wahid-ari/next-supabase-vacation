import * as React from 'react';
import { Check, Plus, Send } from 'lucide-react';

import { cn } from '@/libs/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/Command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';

const users = [
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png',
  },
] as const;

type User = (typeof users)[number];

export function DemoChat() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  const [messages, setMessages] = React.useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
  ]);

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center'>
          <div className='flex items-center space-x-2 md:space-x-4'>
            <Avatar>
              <AvatarImage src='/avatars/01.png' alt='Image' />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>Sofia Davis</p>
              <p className='text-sm text-neutral-500 dark:text-neutral-400'>m@example.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size='icon' variant='outline' className='ml-auto rounded-full' onClick={() => setOpen(true)}>
                  <Plus className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user' ? 'ml-auto bg-sky-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800',
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setMessages((prev) => [
                ...prev,
                {
                  role: 'user',
                  content: message,
                  // content: event.currentTarget.message.value,
                },
                // {
                //   role: 'agent',
                //   content: 'Reply for ' + message,
                //   content: 'Reply for ' + event.currentTarget.message.value,
                // },
              ]);
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    role: 'agent',
                    content: 'Reply for ' + message,
                    // content: 'Reply for ' + event.currentTarget.message.value,
                  },
                ]);
                setMessage('');
              }, 500);
              // event.currentTarget.message.value = '';
            }}
            className='flex w-full items-center space-x-2'
          >
            <Input
              id='message'
              placeholder='Type your message...'
              className='flex-1'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type='submit' size='icon' disabled={message == '' ? true : false}>
              <Send className='size-4' />
              <span className='sr-only'>Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='gap-0 p-0 outline-none'>
          <DialogHeader className='px-4 pb-4 pt-5'>
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>Invite a user to this thread. This will create a new group message.</DialogDescription>
          </DialogHeader>
          <Command className='overflow-hidden rounded-t-none border-t dark:border-t-neutral-700'>
            <CommandInput placeholder='Search user...' />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className='p-2'>
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className='flex items-center px-2'
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        return setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
                      }

                      return setSelectedUsers([...users].filter((u) => [...selectedUsers, user].includes(u)));
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt='Image' />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='ml-2'>
                      <p className='text-sm font-medium leading-none'>{user.name}</p>
                      <p className='text-sm text-neutral-400 dark:text-neutral-500'>{user.email}</p>
                    </div>
                    {selectedUsers.includes(user) ? <Check className='text-primary ml-auto flex size-5' /> : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className='flex items-center border-t p-4 sm:justify-between dark:border-t-neutral-700'>
            {selectedUsers.length > 0 ? (
              <div className='mt-2 flex -space-x-2 overflow-hidden sm:mt-0'>
                {selectedUsers.map((user) => (
                  <Avatar key={user.email} className='border-background inline-block border-2'>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className='text-sm text-neutral-400 dark:text-neutral-500'>Select users to add to this thread.</p>
            )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

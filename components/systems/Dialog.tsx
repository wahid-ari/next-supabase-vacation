import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';
import { Transition } from '@headlessui/react';
import * as DialogRadix from '@radix-ui/react-dialog';
import { AlertTriangleIcon, InfoIcon, XIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

import Button from '@/components/systems/Button';

type Props = {
  children: ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  isDanger?: boolean;
  isEdit?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  showIcon?: boolean;
  confirmText?: string;
  [props: string]: any;
};

export default function Dialog({
  children,
  open,
  setOpen,
  title,
  isDanger,
  isEdit,
  onClose,
  onConfirm,
  showIcon,
  confirmText = 'Confirm',
  ...props
}: Props) {
  return (
    <DialogRadix.Root open={open} onOpenChange={setOpen}>
      <Transition.Root show={open}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <DialogRadix.Overlay
            forceMount
            className='fixed inset-0 z-50 bg-black/40 transition-opacity dark:bg-black/70'
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <DialogRadix.Content
            {...props}
            forceMount
            className={cn(
              'fixed z-50 w-[90%] max-w-lg rounded-lg',
              'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white dark:bg-neutral-900',
            )}
          >
            <DialogRadix.Close
              className={
                'absolute right-3.5 top-3.5 rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              }
            >
              <XIcon className='h-4 w-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400' />
            </DialogRadix.Close>

            <div className={cn('p-5', showIcon && 'sm:flex sm:gap-4')}>
              {showIcon ? (
                isDanger ? (
                  <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0'>
                    <AlertTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                  </div>
                ) : (
                  <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0'>
                    <InfoIcon className='h-6 w-6 text-blue-600' aria-hidden='true' />
                  </div>
                )
              ) : null}
              <div className='mt-3 sm:mt-0'>
                <DialogRadix.Title className='text-center text-lg font-medium text-neutral-800 dark:text-neutral-100 sm:text-left'>
                  {title}
                </DialogRadix.Title>
                <div className='mt-2 text-sm font-normal tracking-wide text-neutral-600 dark:text-neutral-300'>
                  {children}
                </div>
              </div>
            </div>

            <div className='justify-end gap-3 px-5 pb-5 sm:flex'>
              <Button.secondary className='mb-2 w-full focus:ring-2 sm:mb-0 sm:w-auto' onClick={onClose}>
                Cancel
              </Button.secondary>
              {isDanger ? (
                <Button.danger className='w-full sm:w-auto' onClick={onConfirm}>
                  Delete
                </Button.danger>
              ) : isEdit ? (
                <Button className='w-full sm:w-auto' onClick={onConfirm}>
                  {confirmText}
                </Button>
              ) : (
                <Button.success className='w-full sm:w-auto' onClick={onConfirm}>
                  {confirmText}
                </Button.success>
              )}
            </div>
          </DialogRadix.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogRadix.Root>
  );
}

'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;
// https://sonner.emilkowal.ski/getting-started
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        // https://sonner.emilkowal.ski/styling#tailwind-css
        classNames: {
          toast:
            'group toast !py-3 group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          title: 'text-sm',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          // error: 'dark:!bg-red-950 dark:!border-red-950 dark:!text-red-500',
          // closeButton: 'dark:!bg-neutral-700 dark:!text-neutral-200'
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

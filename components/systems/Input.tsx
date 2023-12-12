import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [props: string]: any;
};

export default function Input({ className, type, name, placeholder, value, defaultValue, onChange, ...props }: Props) {
  return (
    <div className='mb-4'>
      <input
        {...props}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={twMerge(
          'mt-2 w-full rounded-md border border-neutral-300 px-4 py-[0.6rem] text-sm font-medium outline-none transition-all',
          'bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100',
          'focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-neutral-700 dark:focus:border-sky-500 dark:focus:ring-sky-500',
          'disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:opacity-50 dark:disabled:bg-neutral-800',
          className,
        )}
      />
    </div>
  );
}

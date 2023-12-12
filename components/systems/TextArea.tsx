import { twMerge } from 'tailwind-merge';

type Props = {
  label?: string;
  className?: string;
  name: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height?: number;
  [props: string]: any;
};

export default function TextArea({
  label,
  className,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  height,
  ...props
}: Props) {
  return (
    <div className='mb-4'>
      {label && (
        <label htmlFor={name} className='block text-sm font-medium text-neutral-800 dark:text-neutral-200'>
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={name}
        name={name}
        rows={height}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={twMerge(
          'mt-2 w-full rounded-md bg-white p-3 text-sm outline-none transition-all dark:bg-neutral-900 dark:text-white',
          'min-h-[80px] border border-neutral-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:border-neutral-700',
          'disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:opacity-50 dark:disabled:bg-neutral-800',
          className,
        )}
      />
    </div>
  );
}

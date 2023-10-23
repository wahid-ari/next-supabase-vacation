import { twMerge } from 'tailwind-merge';

type Props = {
  label?: string;
  className?: string;
  name?: string;
  value?: string | number;
  onChange?: () => void;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  [props: string]: any;
};

export default function Checkbox({
  label,
  className,
  name,
  value,
  onChange,
  checked,
  defaultChecked,
  disabled,
  ...props
}: Props) {
  return (
    <div className='group mb-3 flex items-center'>
      <input
        {...props}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        type='checkbox'
        className={twMerge(
          'h-4 w-4 rounded border-neutral-300 dark:border-neutral-700',
          'text-sky-500 dark:bg-neutral-900 dark:checked:bg-sky-500',
          'focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-500 dark:ring-offset-neutral-900',
          'disabled:bg-neutral-100 dark:disabled:bg-neutral-800',
          'disabled:checked:bg-sky-500 dark:disabled:checked:bg-sky-500',
          'group-hover:cursor-pointer group-hover:disabled:cursor-not-allowed',
          className
        )}
      />
      <label
        htmlFor={name}
        className={twMerge(
          'ml-2 text-sm text-neutral-800 group-hover:cursor-pointer dark:text-neutral-300',
          disabled && 'group-hover:cursor-not-allowed'
        )}
      >
        {label}
      </label>
    </div>
  );
}

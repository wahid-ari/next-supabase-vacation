import { useEffect, useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/libs/utils';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Checkbox } from '@/components/ui/Checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/Command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from '@/components/ui/use-toast';

import Layout from '@/components/layout/Layout';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

const InputFormSchema = z.object({
  username: z
    .string({
      required_error: 'Username required',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
});

const InputArrayFormSchema = z.object({
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
});

const CheckboxFormSchema = z.object({
  mobile: z.boolean().default(true).optional(),
});

const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',
  },
];
const CheckboxMultiFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const DatePickerFormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
});

const RadioFormSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
});

const SelectFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
});

const SwitchFormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

const TextareaFormSchema = z.object({
  bio: z
    .string({
      required_error: 'Bio required',
    })
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
});

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
];
const ComboboxFormSchema = z.object({
  language: z.string({
    required_error: 'Please select a language.',
  }),
});

export default function FormPage() {
  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  const [text, setText] = useState('');
  const formInput = useForm<z.infer<typeof InputFormSchema>>({
    resolver: zodResolver(InputFormSchema),
    defaultValues: {
      username: text,
    },
  });
  setTimeout(() => {
    setText('username');
  }, 1000);
  useEffect(() => {
    formInput.reset({
      username: text,
    });
  }, [text]);

  const formInputArray = useForm<z.infer<typeof InputArrayFormSchema>>({
    resolver: zodResolver(InputArrayFormSchema),
    defaultValues: {
      urls: [{ value: 'https://shadcn.com' }, { value: 'http://twitter.com/shadcn' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'urls',
    control: formInputArray.control,
  });

  const formCheckbox = useForm<z.infer<typeof CheckboxFormSchema>>({
    resolver: zodResolver(CheckboxFormSchema),
    defaultValues: {
      mobile: true,
    },
  });

  const formCheckboxMulti = useForm<z.infer<typeof CheckboxMultiFormSchema>>({
    resolver: zodResolver(CheckboxMultiFormSchema),
    defaultValues: {
      items: ['recents', 'home'],
    },
  });

  const formDatePicker = useForm<z.infer<typeof DatePickerFormSchema>>({
    resolver: zodResolver(DatePickerFormSchema),
  });

  const formRadio = useForm<z.infer<typeof RadioFormSchema>>({
    resolver: zodResolver(RadioFormSchema),
  });

  const formSelect = useForm<z.infer<typeof SelectFormSchema>>({
    resolver: zodResolver(SelectFormSchema),
  });

  const formSwitch = useForm<z.infer<typeof SwitchFormSchema>>({
    resolver: zodResolver(SwitchFormSchema),
    defaultValues: {
      security_emails: true,
    },
  });

  const formTextarea = useForm<z.infer<typeof TextareaFormSchema>>({
    resolver: zodResolver(TextareaFormSchema),
  });

  const formCombobox = useForm<z.infer<typeof ComboboxFormSchema>>({
    resolver: zodResolver(ComboboxFormSchema),
  });

  function onSubmit(data: z.infer<typeof InputFormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-neutral-100 p-4 dark:bg-neutral-950'>
          <code className='text-neutral-800 dark:text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Layout title='Form - MyVacation' description='Example Form - MyVacation'>
      <div className='relative'>
        <Title>Form</Title>
        <span className='absolute left-[65px] top-1 flex size-5 animate-bounce items-center justify-center'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75' />
          <span className='relative inline-flex size-3 rounded-full bg-sky-500' />
        </span>
      </div>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 sm:columns-3 dark:text-sky-500'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input'>
              Input
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#checkbox'>
              Checkbox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#datepicker'>
              DatePicker
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#radiogroup'>
              RadioGroup
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#select'>
              Select
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#switch'>
              Switch
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#textarea'>
              Textarea
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#combobox'>
              Combobox
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper
        id='input'
        name='Input'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/input#form'
      >
        <Form {...formInput}>
          <form onSubmit={formInput.handleSubmit(onSubmit)}>
            <FormField
              control={formInput.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage className='!-mt-[1px]' />
                </FormItem>
              )}
            />

            <Button type='submit' className='mt-6'>
              Submit
            </Button>
          </form>
        </Form>
        <br />
        <br />
        <Form {...formInputArray}>
          <form onSubmit={formInputArray.handleSubmit(onSubmit)} className='space-y-8'>
            <div>
              <div className={cn(fields.length < 1 ? 'block' : 'hidden')}>
                <FormLabel>URLs</FormLabel>
                <FormDescription className='pt-2'>
                  Add links to your website, blog, or social media profiles.
                </FormDescription>
              </div>
              {fields.map((field, index) => (
                <FormField
                  control={formInputArray.control}
                  key={field.id}
                  name={`urls.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>URLs</FormLabel>
                      <FormDescription className={cn(index !== 0 && 'sr-only')}>
                        Add links to your website, blog, or social media profiles.
                      </FormDescription>
                      <FormControl>
                        <div className='!mb-3 flex items-center'>
                          <Input {...field} aria-label={`url-${index}`} />
                          <Button
                            title='Remove'
                            aria-label='Remove'
                            type='button'
                            variant='destructive'
                            size='sm'
                            className='ml-3 size-7'
                            onClick={() => remove(index)}
                          >
                            X
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type='button' variant='outline' size='sm' className='mt-2' onClick={() => append({ value: '' })}>
                Add URL
              </Button>
              <Button type='button' variant='outline' size='sm' className='ml-2 mt-2' onClick={() => remove()}>
                Remove All
              </Button>
            </div>
            <Button type='submit'>Update URLs</Button>
          </form>
        </Form>
      </Wrapper>

      <Wrapper
        id='checkbox'
        name='Checkbox'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/checkbox#form'
      >
        <Form {...formCheckbox}>
          <form onSubmit={formCheckbox.handleSubmit(onSubmit)}>
            <FormField
              control={formCheckbox.control}
              name='mobile'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 dark:border-neutral-800'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id='mobile' aria-label='mobile' />
                  </FormControl>
                  <div className='space-y-2 leading-none'>
                    <FormLabel>Use different settings for my mobile devices</FormLabel>
                    <FormDescription>
                      You can manage your mobile notifications in the{' '}
                      <Link href='/design/form#checkbox' className='text-sky-500 transition-all hover:text-sky-600'>
                        mobile settings
                      </Link>{' '}
                      page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-6'>
              Submit
            </Button>
          </form>
        </Form>
        <br />
        <br />
        <Form {...formCheckboxMulti}>
          <form onSubmit={formCheckboxMulti.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={formCheckboxMulti.control}
              name='items'
              render={() => (
                <FormItem>
                  <div className='mb-3'>
                    <FormLabel>Sidebar</FormLabel>
                    <FormDescription>Select the items you want to display in the sidebar.</FormDescription>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={formCheckboxMulti.control}
                      name='items'
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className='flex flex-row items-start space-x-3 space-y-0'>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                id={item.id}
                                aria-label={item.id}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>{item.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Wrapper>

      <Wrapper
        id='datepicker'
        name='DatePicker'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/date-picker#form'
      >
        <Form {...formDatePicker}>
          <form onSubmit={formDatePicker.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={formDatePicker.control}
              name='dob'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-neutral-600 dark:text-neutral-300',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className='ml-auto size-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Wrapper>

      <Wrapper
        id='radiogroup'
        name='RadioGroup'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/radio-group#form'
      >
        <Form {...formRadio}>
          <form onSubmit={formRadio.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
            <FormField
              control={formRadio.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Notify me about...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='all' aria-label='All new messages' />
                        </FormControl>
                        <FormLabel className='font-normal'>All new messages</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='mentions' aria-label='Direct messages and mentions' />
                        </FormControl>
                        <FormLabel className='font-normal'>Direct messages and mentions</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='none' aria-label='Nothing' />
                        </FormControl>
                        <FormLabel className='font-normal'>Nothing</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Wrapper>

      <Wrapper
        id='select'
        name='Select'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/select#form'
      >
        <Form {...formSelect}>
          <form onSubmit={formSelect.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={formSelect.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger aria-label='Select email'>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='m@example.com'>m@example.com</SelectItem>
                      <SelectItem value='m@google.com'>m@google.com</SelectItem>
                      <SelectItem value='m@support.com'>m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your <Link href='/examples/forms'>email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Wrapper>

      <Wrapper
        id='switch'
        name='Switch'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/switch#form'
      >
        <Form {...formSwitch}>
          <form onSubmit={formSwitch.handleSubmit(onSubmit)} className='w-full space-y-6'>
            <div>
              <h3 className='mb-4 text-lg font-medium'>Email Notifications</h3>
              <div className='space-y-4'>
                <FormField
                  control={formSwitch.control}
                  name='marketing_emails'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 dark:border-neutral-800'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>Marketing emails</FormLabel>
                        <FormDescription>Receive emails about new products, features, and more.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} aria-label='marketing' />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formSwitch.control}
                  name='security_emails'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 dark:border-neutral-800'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>Security emails</FormLabel>
                        <FormDescription>Receive emails about your account security.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                          aria-label='security'
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Wrapper>

      <Wrapper
        id='textarea'
        name='Textarea'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/textarea#form'
      >
        <Form {...formTextarea}>
          <form onSubmit={formTextarea.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={formTextarea.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Tell us a little bit about yourself' className='resize-none' {...field} />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Wrapper>

      <Wrapper
        id='combobox'
        name='Combobox'
        noChildren
        noClassName
        noProps
        docs='https://ui.shadcn.com/docs/components/combobox#form'
      >
        <Form {...formCombobox}>
          <form onSubmit={formCombobox.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={formCombobox.control}
              name='language'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Language</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          aria-label='select-language'
                          className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value
                            ? languages.find((language) => language.value === field.value)?.label
                            : 'Select language'}
                          <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput placeholder='Search framework...' />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                formCombobox.setValue('language', language.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 size-4',
                                  language.value === field.value ? 'text-emerald-600 opacity-100' : 'opacity-0',
                                )}
                              />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </Wrapper>
    </Layout>
  );
}

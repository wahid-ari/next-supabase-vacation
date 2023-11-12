import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { faker } from '@faker-js/faker';
import { Menu, Transition } from '@headlessui/react';
import * as HoverCard from '@radix-ui/react-hover-card';
import { ArrowRightIcon, ChevronDownIcon, MoreHorizontal } from 'lucide-react';
import ReactSelect from 'react-select';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { z } from 'zod';

import { tabledata } from '@/utils/table-data';
import { validateFormObject } from '@/validations/zod';
import { useDebounce } from '@/hooks/use-debounce';
import useToast from '@/hooks/use-hot-toast';
import { useMounted } from '@/hooks/use-mounted';

import { Button as ButtonUi } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import Layout from '@/components/layout/Layout';
import Badge from '@/components/systems/Badge';
import Button from '@/components/systems/Button';
import Card from '@/components/systems/Card';
import Checkbox from '@/components/systems/Checkbox';
import Code from '@/components/systems/Code';
import Container from '@/components/systems/Container';
import Dialog from '@/components/systems/Dialog';
import FileInput from '@/components/systems/FileInput';
import Heading from '@/components/systems/Heading';
import Input from '@/components/systems/Input';
import InputDebounce from '@/components/systems/InputDebounce';
import Label from '@/components/systems/Label';
import LabeledInput from '@/components/systems/LabeledInput';
import LinkButton from '@/components/systems/LinkButton';
import LoadingDots from '@/components/systems/LoadingDots';
import Modal from '@/components/systems/Modal';
import Progress from '@/components/systems/Progress';
import Radio from '@/components/systems/Radio';
import ReactTable from '@/components/systems/ReactTable';
import SearchBox from '@/components/systems/SearchBox';
import Section from '@/components/systems/Section';
import Select from '@/components/systems/Select';
import SelectBox from '@/components/systems/SelectBox';
import Shimmer from '@/components/systems/Shimmer';
import ShowMore from '@/components/systems/ShowMore';
import Table from '@/components/systems/Table';
import TableSimple from '@/components/systems/TableSimple';
import Tabs from '@/components/systems/Tabs';
import Text from '@/components/systems/Text';
import TextArea from '@/components/systems/TextArea';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

const selectBoxData = [
  {
    id: 1,
    name: 'Select 1',
  },
  {
    id: 2,
    name: 'Select 2',
  },
  {
    id: 3,
    name: 'Select 3',
  },
];

const searchBoxData = [
  {
    id: 1,
    name: 'Option 1',
  },
  {
    id: 2,
    name: 'Option 2',
  },
  {
    id: 3,
    name: 'Option 3',
  },
];

export default function Example() {
  const mounted = useMounted();
  const [inputDebounce, setInputDebounce] = useState('');
  const debouncedValue = useDebounce(inputDebounce);
  const [inputDebounceValue, setInputDebounceValue] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDangerDialog, setOpenDangerDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDangerModal, setOpenDangerModal] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [user, setUser] = useState({
    username: '',
    email: '',
    angka: '',
    angka_positif: '',
  });
  const [admin, setAdmin] = useState({
    usernamee: '',
    emaill: '',
    age: '',
    password: '',
    confirmPassword: '',
  });
  // validation zod
  const [userZod, setUserZod] = useState({
    username_object: '',
    email_object: '',
    age_object: '',
    password_object: '',
    confirmPassword_object: '',
  });
  const [errorsZod, setErrorsZod] = useState({
    username_object: '',
    email_object: '',
    age_object: '',
    password_object: '',
    confirmPassword_object: '',
  });

  function addToast() {
    pushToast({ message: 'This is a success toast message', isError: false });
  }

  function addToastError() {
    pushToast({ message: 'This is a error toast message', isError: true });
  }

  function toastAsync() {
    const toastId = pushToast({
      message: 'Loading Posting Async Data',
      isLoading: true,
    });
    setTimeout(() => {
      updateToast({ toastId, message: 'Posting Data Async Success', isError: false });
    }, 2000);
  }

  function dissmissAllToast() {
    dismissToast();
  }

  let userSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username required')
      .matches(/^[A-Za-z]+$/, 'Username must be alphabet'),
    email: yup.string().required('Email required').email('Email must be valid').typeError('Email must be valid'),
    angka: yup
      .number()
      .required('Number required')
      .integer('Number must be integer not float')
      .typeError('Number must be valid'),
    angka_positif: yup
      .number()
      .required('Number positive required')
      .positive('Number positive must be positif')
      .integer('Number positive must be integer not float')
      .typeError('Number positive must be valid'),
  });

  const zodSchema = z
    .object({
      usernamee: z
        .string()
        .regex(/^[A-Za-z]+$/, { message: 'Username must be alphabet without space' })
        .min(1, { message: 'Username is required' }),
      emaill: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
      age: z
        .number({
          required_error: 'Age is required',
          invalid_type_error: 'Age is required',
        })
        .positive({ message: 'Age must be a positive number' })
        .gt(17, { message: 'Age must be a greater than 17' })
        .int({ message: 'Age must be an integer' }),
      password: z
        .string()
        .nonempty({
          message: 'Password is required',
        })
        .min(8, { message: 'Password length minimal is 8' }),
      confirmPassword: z.string().nonempty({
        message: 'Confirm Password is required',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Oops! Password doesnt match',
    });

  async function checker(schema: any, param: any) {
    try {
      await schema.validate(param, { abortEarly: false });
      return { valid: true };
    } catch (err) {
      return { valid: false, errors: err.errors };
    }
  }

  async function checkValid() {
    try {
      const { valid, errors } = await checker(userSchema, user);
      if (!valid && errors) {
        dismissToast();
        errors.forEach((el) => {
          pushToast({ message: el, isError: true });
        });
      }
      // console.log(valid);
      // console.log(errors);
      if (valid) {
        const toastId = pushToast({
          message: 'Posting YUP Data',
          isLoading: true,
        });
        setTimeout(() => {
          updateToast({ toastId, message: 'Success Posting YUP Data', isError: false });
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function checkValidZod(e: any) {
    e.preventDefault();
    try {
      const validZod = zodSchema.safeParse(admin);
      if (validZod.success === false) {
        dismissToast();
        // console.log(validZod.error);
        // console.log(validZod.error.issues);
        validZod.error.issues.forEach((el) => {
          pushToast({ message: el.message, isError: true });
        });
      } else {
        const toastId = pushToast({
          message: 'Posting ZOD Data',
          isLoading: true,
        });
        setTimeout(() => {
          updateToast({ toastId, message: 'Success Posting ZOD Data', isError: false });
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleUserChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleAdminChange(e) {
    let valueNumber = e.target.name == 'age' ? Number(e.target.value) : e.target.value;
    setAdmin({
      ...admin,
      // [e.target.name]: e.target.value,
      [e.target.name]: valueNumber,
    });
  }

  async function checkValidZodObject(e: any) {
    e.preventDefault();
    const { valid, errors } = await validateFormObject(userZod);
    if (valid) {
      const toastId = pushToast({
        message: 'Posting ZOD Object Data',
        isLoading: true,
      });
      setTimeout(() => {
        updateToast({ toastId, message: 'Success Posting ZOD Object Data', isError: false });
      }, 2000);
      setErrorsZod(null);
    } else {
      // @ts-ignore
      setErrorsZod(errors);
      return;
    }
  }

  function handleUserRHFChange(e: any) {
    let valueNumber = e.target.name == 'age_object' ? Number(e.target.value) : e.target.value;
    setUserZod({
      ...userZod,
      // [e.target.name]: e.target.value,
      [e.target.name]: valueNumber,
    });
  }

  function onNext() {}

  function onPrev() {}

  const [selectBox, setSelectBox] = useState();
  function handleSelectBoxChange(e) {
    setSelectBox(e);
  }

  const [selectedSearchBox, setSelectedSearchBox] = useState(null);
  const [querySearchBox, setQuerySearchBox] = useState('');
  const filteredSearchBox =
    querySearchBox === ''
      ? searchBoxData
      : searchBoxData.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(querySearchBox.toLowerCase().replace(/\s+/g, '')),
        );

  const reactSelectData = [
    {
      value: 1,
      label: 'Romance',
    },
    {
      value: 2,
      label: 'Comedy',
    },
    {
      value: 3,
      label: 'History',
    },
  ];

  const [reactSelect, setReactSelect] = useState();

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`#`}
              className='rounded text-sm font-medium text-sky-500 hover:text-sky-600 focus:border-sky-500 
            focus:outline-none focus:ring-2 focus:ring-sky-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 300,
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          // console.log(`${values.id} - ${values.name} - ${original.cover} - ${original.artists.id} - ${original.artists.name}`)
          return (
            <div>
              <Link
                href={`#`}
                className='mr-2 rounded bg-sky-600 px-[6px] py-[3px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!px-[6px] !py-[2px]'
                // onClick={() => handleShowDeleteModal(values.id, values.name)}
              >
                Delete
              </Button.danger>
            </div>
          );
        },
      },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 300,
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        width: 10,
        disableSortBy: true,
        Cell: ({ row }) => {
          const data = row.original;
          return (
            <div className='relative'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ButtonUi variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </ButtonUi>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.name)}>
                    Copy Name
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [],
  );

  function createUser() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
  }
  const fakerUsers = useMemo(() => faker.helpers.multiple(createUser, { count: 50 }), []);

  const tableInstance = useRef(null);
  const [inputDebounceValues, setInputDebounceValues] = useState('');
  const tableInstances = useRef(null);
  const [filteredLength, setFilteredLength] = useState(0);
  useEffect(() => {
    setFilteredLength(tableInstances?.current?.rows?.length);
  }, [inputDebounceValues]);

  const [file, setFile] = useState({ name: '' });
  function handleFileChange(e: any) {
    setFile({ ...file, name: e.target.files[0].name, [e.target.name]: e.target.files[0] });
  }

  const [selectedColor, setSelectedColor] = useState('blue');
  function handleSelectColor(e: any) {
    setSelectedColor(e.target.value);
  }

  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  return (
    <Layout title='Components - MyVacation' description='Example Components - MyVacation'>
      <Title>Components</Title>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#validation'>
              Validation (YUP)
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#validation-zod'>
              Validation (ZOD)
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#validation-zod-object'>
              Validation (ZOD Object)
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dialog'>
              Dialog
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#modal'>
              Modal
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#selectbox'>
              SelectBox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#searchbox'>
              SearchBox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#react-select'>
              ReactSelect
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#reacttable'>
              ReactTable
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dropdownmenu'>
              DropdownMenu
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#code'>
              Code
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#usetoast'>
              useToast
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#hover-card'>
              HoverCard
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#badge'>
              Badge
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#button'>
              Button
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#linkbutton'>
              LinkButton
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#checkbox'>
              Checkbox
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#container'>
              Container
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#heading'>
              Heading
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input'>
              Input
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#inputdisabled'>
              Input disabled
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#fileinput'>
              FileInput
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#label'>
              Label
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#labeledinput'>
              LabeledInput
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#labeledinputdisabled'>
              LabeledInput disabled
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input-debounce-hook'>
              Input (Debounce Hook)
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#input-debounce'>
              InputDebounce
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#text-area'>
              TextArea
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#textarea-disabled'>
              TextArea disabled
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#select'>
              Select
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#progress'>
              Progress
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#radio'>
              Radio
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#shimmer'>
              Shimmer
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabs'>
              Tabs
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabspanel'>
              Tabs.panel
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#table'>
              Table
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabletr'>
              Table.tr
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tabletd'>
              Table.td
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#table-simple'>
              TableSimple
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tablesimple-tr'>
              TableTableSimple.tr
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#tablesimple-td'>
              TableTableSimple.td
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#text'>
              Text
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#card'>
              Card
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#section'>
              Section
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#show-more'>
              ShowMore
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#loading-dots'>
              LoadingDots
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#loading-skeleton'>
              LoadingSkeleton
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper id='validation' name='Validation (yup)' noChildren noClassName noProps>
        <LabeledInput
          data-testid='username-yup'
          label='Username'
          name='username'
          value={user.username}
          placeholder='Username'
          onChange={handleUserChange}
        />
        <LabeledInput
          data-testid='email-yup'
          label='Email'
          name='email'
          type='email'
          value={user.email}
          placeholder='Email'
          onChange={handleUserChange}
        />
        <LabeledInput
          data-testid='number-yup'
          type='number'
          label='Number'
          name='angka'
          value={user.angka}
          placeholder='Number'
          onChange={handleUserChange}
        />
        <LabeledInput
          data-testid='positive-yup'
          type='number'
          min={0}
          label='Positif Number'
          name='angka_positif'
          value={user.angka_positif}
          placeholder='Positif Number'
          onChange={handleUserChange}
        />
        <Button onClick={checkValid}>Submit Yup</Button>
      </Wrapper>

      <Wrapper id='validation-zod' name='Validation (zod)' noChildren noClassName noProps>
        <form onSubmit={checkValidZod}>
          <LabeledInput
            data-testid='username-zod'
            label='Username'
            name='usernamee'
            value={admin.usernamee}
            placeholder='Username'
            onChange={handleAdminChange}
          />
          <LabeledInput
            data-testid='email-zod'
            label='Email'
            name='emaill'
            type='email'
            value={admin.emaill}
            placeholder='Email'
            onChange={handleAdminChange}
          />
          <LabeledInput
            data-testid='age-zod'
            type='number'
            label='Age'
            name='age'
            value={admin.age}
            placeholder='Number'
            onChange={handleAdminChange}
          />
          <LabeledInput
            data-testid='password-zod'
            type='password'
            label='Password'
            name='password'
            value={admin.password}
            placeholder='Password'
            onChange={handleAdminChange}
          />
          <LabeledInput
            data-testid='confirmPassword-zod'
            type='password'
            label='Confirm Password'
            name='confirmPassword'
            value={admin.confirmPassword}
            placeholder='Confirm Password'
            onChange={handleAdminChange}
          />
          <Button type='submit'>Submit Zod</Button>
        </form>
      </Wrapper>

      <Wrapper id='validation-zod-object' name='Validation (zod object)' noChildren noClassName noProps>
        <form onSubmit={checkValidZodObject}>
          <LabeledInput
            data-testid='username-object'
            label='Username'
            name='username_object'
            value={userZod.username_object}
            placeholder='Username'
            onChange={handleUserRHFChange}
          />
          {errorsZod?.username_object && (
            <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.username_object}</span>
          )}
          <LabeledInput
            data-testid='email-object'
            label='Email'
            name='email_object'
            type='email'
            value={userZod.email_object}
            placeholder='Email'
            onChange={handleUserRHFChange}
          />
          {errorsZod?.email_object && <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.email_object}</span>}
          <LabeledInput
            data-testid='age-object'
            type='number'
            label='Age'
            name='age_object'
            value={userZod.age_object}
            placeholder='Number'
            onChange={handleUserRHFChange}
            min={0}
            onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />
          {errorsZod?.age_object && <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.age_object}</span>}

          <LabeledInput
            data-testid='password-object'
            type='password'
            label='Password'
            name='password_object'
            value={userZod.password_object}
            placeholder='Password'
            onChange={handleUserRHFChange}
          />
          {errorsZod?.password_object && (
            <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.password_object}</span>
          )}
          <LabeledInput
            data-testid='confirmPassword-object'
            type='password'
            label='Confirm Password'
            name='confirmPassword_object'
            value={userZod.confirmPassword_object}
            placeholder='Confirm Password'
            onChange={handleUserRHFChange}
          />
          {errorsZod?.confirmPassword_object && (
            <span className='-mt-2 mb-4 block text-red-500'>{errorsZod?.confirmPassword_object}</span>
          )}
          <Button type='submit'>Submit Zod Object</Button>
        </form>
        <p className='mt-4 flex flex-col'>
          Ref
          <span>
            <a
              href='https://next-form-validation.vercel.app/example/zod-object'
              target='_blank'
              rel='noreferrer'
              className='text-sky-500 transition-all hover:text-sky-600'
            >
              Zod Object
            </a>
          </span>
        </p>
        <p>
          <a
            href='https://next-form-validation.vercel.app/example/zod-object-validation'
            target='_blank'
            rel='noreferrer'
            className='text-sky-500 transition-all hover:text-sky-600'
          >
            Zod Object Validation
          </a>
        </p>
      </Wrapper>

      <Wrapper
        id='dialog'
        name='Dialog (Radix)'
        noClassName
        noProps
        props={['open', 'setOpen', 'title', 'children', 'isDanger', 'onClose', 'onConfirm', 'showIcon']}
      >
        <Button onClick={() => setOpenDialog(true)}>Open Dialog</Button>
        <br />
        <br />

        <Dialog
          data-testid='dialog'
          title='Confirmation'
          open={openDialog}
          showIcon
          setOpen={setOpenDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={() => setOpenDialog(false)}
        >
          Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
          consectetur aliquip mollit nisi irure quis Lorem eu non sit.
        </Dialog>

        <Button.danger onClick={() => setOpenDangerDialog(true)}>Open Danger Dialog</Button.danger>

        <Dialog
          data-testid='dialog-danger'
          title='Delete Confirmation'
          open={openDangerDialog}
          showIcon
          isDanger
          setOpen={setOpenDangerDialog}
          onClose={() => setOpenDangerDialog(false)}
          onConfirm={() => setOpenDangerDialog(false)}
        >
          Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.
        </Dialog>
      </Wrapper>

      <Wrapper
        id='modal'
        name='Modal (HeadlessUI)'
        noClassName
        noProps
        props={['open', 'title', 'children', 'isDanger', 'onClose', 'onConfirm', 'showIcon', 'confirmText']}
      >
        <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
        <br />
        <br />

        <Modal
          data-testid='modal'
          title='Confirmation'
          open={openModal}
          showIcon
          onClose={() => setOpenModal(false)}
          onConfirm={() => setOpenModal(false)}
        >
          Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
          consectetur aliquip mollit nisi irure quis Lorem eu non sit.
        </Modal>

        <Button.danger onClick={() => setOpenDangerModal(true)}>Open Danger Modal</Button.danger>

        <Modal
          data-testid='modal-danger'
          title='Delete Confirmation'
          open={openDangerModal}
          showIcon
          isDanger
          onClose={() => setOpenDangerModal(false)}
          onConfirm={() => setOpenDangerModal(false)}
        >
          Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.
        </Modal>
      </Wrapper>

      <Wrapper
        id='selectbox'
        name='SelectBox'
        noClassName
        noChildren
        props={['label', 'name', 'value', 'placeholder', 'onChange', 'options']}
      >
        <SelectBox
          data-testid='selectbox'
          label='Select Box'
          placeholder='Select Box'
          value={selectBox}
          onChange={handleSelectBoxChange}
          options={selectBoxData}
        />
      </Wrapper>

      <Wrapper
        id='searchbox'
        name='SearchBox'
        noClassName
        noChildren
        props={['label', 'name', 'value', 'placeholder', 'onChange', 'query', 'onChangeQuery', 'afterLeave', 'options']}
      >
        <SearchBox
          data-testid='searchbox'
          label='Search Box'
          value={selectedSearchBox}
          placeholder='Search or Select'
          onChange={setSelectedSearchBox}
          onChangeQuery={(e) => setQuerySearchBox(e.target.value)}
          afterLeave={() => setQuerySearchBox('')}
          options={filteredSearchBox}
          query={querySearchBox}
        />
        <Text data-testid='searchbox-value'>{selectedSearchBox?.name}</Text>
      </Wrapper>

      <Wrapper
        id='react-select'
        name='ReactSelect'
        noChildren
        props={[
          'instanceId',
          'options',
          'isMulti',
          'noOptionsMessage',
          'value',
          'onChange',
          'placeholder',
          'name',
          'classNamePrefix',
          'theme',
        ]}
      >
        <Label htmlFor='reactselect' className='mb-2'>
          Category
        </Label>
        <ReactSelect
          id='reactselect'
          instanceId='reactselect'
          aria-label='React Select'
          // @ts-ignore
          options={reactSelectData}
          isMulti
          noOptionsMessage={() => 'Not Found'}
          value={reactSelect}
          // @ts-ignore
          onChange={setReactSelect}
          placeholder='Search or Select'
          name='reactselect'
          classNamePrefix='react-select'
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: `#0ea5e9`,
              primary25: `#0ea5e9`,
              primary50: `#0ea5e9`,
              neutral40: `#EF4444`,
            },
          })}
        />
      </Wrapper>

      <Wrapper
        id='reacttable'
        name='React Table'
        props={['columns', 'data', 'page_size', 'bordered', 'itemPerPage', 'keyword', 'showInfo', 'filteredLength']}
        noProps
        noWrap
      >
        <LabeledInput
          label='Search Data'
          id='caridata'
          name='caridata'
          placeholder='Keyword'
          onChange={(e) => {
            tableInstance.current.setGlobalFilter(e.target.value);
          }}
        />
        <ReactTable data-testid='reacttable' columns={column} data={tabledata} ref={tableInstance} page_size={5} />
        <br />
        <InputDebounce
          label='Search'
          id='inputdebounces'
          name='inputdebounces'
          placeholder='Search'
          value={inputDebounceValues}
          onChange={(value) => {
            setInputDebounceValues(value);
            tableInstances?.current?.setGlobalFilter(value);
          }}
        />
        {mounted ? (
          <ReactTable
            columns={columns}
            data={fakerUsers}
            ref={tableInstances}
            page_size={10}
            itemPerPage={[10, 20, 50, 100]}
            keyword={inputDebounceValues}
            showInfo
            filteredLength={filteredLength}
          />
        ) : null}
      </Wrapper>

      <Wrapper id='dropdownmenu' name='DropdownMenu' noChildren noClassName noProps>
        <Menu as='div' className='relative'>
          {({ open }) => (
            <>
              <Menu.Button
                className={twMerge(
                  'flex items-center rounded font-medium text-neutral-600 transition-all hover:text-neutral-900',
                  'dark:text-neutral-300 dark:hover:text-neutral-100',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                )}
              >
                Menu
                <ChevronDownIcon
                  className={twMerge('ml-1 h-5 w-4 transition-all duration-200', open ? 'rotate-180' : 'rotate-0')}
                  aria-hidden='true'
                />
              </Menu.Button>
              <Transition
                enter='transition ease-in-out duration-300'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in-out duration-100'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='mt-2 w-32 origin-top-right rounded-md border bg-white shadow-md focus:outline-none dark:border-neutral-800 dark:bg-neutral-900'>
                  <div className='space-y-1 px-2 py-2'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href='/setting'
                          className={twMerge(
                            'flex w-full rounded px-2 py-1.5 text-sm',
                            active
                              ? 'bg-neutral-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                              : 'text-neutral-700 dark:text-neutral-300',
                          )}
                        >
                          Setting
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href='/design/ui'
                          className={twMerge(
                            'flex w-full rounded px-2 py-1.5 text-sm',
                            active
                              ? 'bg-neutral-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                              : 'text-neutral-700 dark:text-neutral-300',
                          )}
                        >
                          UI
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={twMerge(
                            'flex w-full rounded px-2 py-1.5 text-sm',
                            active
                              ? 'bg-neutral-100 text-sky-600 transition-all dark:bg-neutral-800 dark:text-sky-500'
                              : 'text-neutral-700 dark:text-neutral-300',
                          )}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </Wrapper>

      <Wrapper id='code' name='Code' noChildren props={['name', 'code', 'lang']}>
        <Code
          data-testid='code'
          code={`import useToast from '@/utils/useToast()'

const { updateToast, pushToast, dismissToast } = useToast();

function toastAsync() {
  const toastId = pushToast({
    message: "Loading Posting Data",
    isLoading: true,
  });
  setTimeout(() => {
    updateToast({ toastId, message: "Posting Data Success", isError: false });
  }, 3000);
};`}
        />
      </Wrapper>

      <Wrapper id='usetoast' name='useToast (hook)' noProps noChildren noClassName>
        <Code
          code={`import useToast from '@/utils/useToast()'

const { updateToast, pushToast, dismissToast } = useToast();

function addToast() {
  pushToast({ message: "This is a toast message", isError: false });
};

function addToastError() {
  pushToast({ message: "This is a toast message", isError: true });};

function toastAsync() {
  const toastId = pushToast({
    message: "Loading Posting Data",
    isLoading: true,
  });
  setTimeout(() => {
    updateToast({ toastId, message: "Posting Data Success", isError: false });
  }, 3000);
};

function dissmissAllToast() {
  dismissToast()
}`}
        />
      </Wrapper>

      <div className='flex flex-wrap items-center gap-2'>
        <Button data-testid='toastbutton' onClick={addToast}>
          Show Me Toast
        </Button>
        <Button.danger data-testid='toastbutton-error' onClick={addToastError}>
          Show Me Error Toast
        </Button.danger>
        <Button.success data-testid='toastbutton-async' onClick={toastAsync}>
          Toast with async
        </Button.success>
        <Button.secondary data-testid='toastbutton-dismiss' onClick={dissmissAllToast}>
          Dismiss Toast
        </Button.secondary>
      </div>

      <Wrapper id='hover-card' name='HoverCard'>
        <HoverCard.Root>
          <HoverCard.Trigger data-testid='hovercard' asChild>
            <Link
              href='#'
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              Hover Me
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              side='top'
              data-testid='hovercard-content'
              className={twMerge(
                'z-50 max-h-40 max-w-sm overflow-auto rounded-md border shadow-md',
                'bg-white p-2.5 !text-[15px] leading-5 text-neutral-700',
                'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:scrollbar-thumb-neutral-800',
              )}
            >
              Laborum sint culpa nisi commodo. Reprehenderit et laborum do commodo et fugiat elit ullamco. Tempor culpa
              elit officia deserunt est amet anim. Irure nostrud esse aliquip commodo. Veniam ullamco irure non sunt
              elit nulla cillum. Tempor ea anim non laboris consectetur aliqua laborum do enim. Anim aliquip tempor
              dolore irure.
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </Wrapper>

      <Wrapper
        id='badge'
        name='Badge'
        variant={['dark', 'red', 'green', 'yellow', 'indigo', 'pink']}
        props={['isLarge']}
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Badge data-testid='badge'>badge</Badge>
          <Badge.dark data-testid='badge-dark'>dark</Badge.dark>
          <Badge.red data-testid='badge-red'>red</Badge.red>
          <Badge.green data-testid='badge-green'>green</Badge.green>
          <Badge.yellow data-testid='badge-yellow'>yellow</Badge.yellow>
          <Badge.indigo data-testid='badge-indigo'>indigo</Badge.indigo>
          <Badge.purple data-testid='badge-purple'>purple</Badge.purple>
          <Badge.pink data-testid='badge-pink'>pink</Badge.pink>
        </div>
        <br />
        <br />
        <div className='flex flex-wrap items-center gap-2'>
          <Badge isLarge data-testid='badge-large'>
            badge
          </Badge>
          <Badge.dark isLarge data-testid='badge-dark-large'>
            dark
          </Badge.dark>
          <Badge.red isLarge data-testid='badge-red-large'>
            red
          </Badge.red>
          <Badge.green isLarge data-testid='badge-green-large'>
            green
          </Badge.green>
          <Badge.yellow isLarge data-testid='badge-yellow-large'>
            yellow
          </Badge.yellow>
          <Badge.indigo isLarge data-testid='badge-indigo-large'>
            indigo
          </Badge.indigo>
          <Badge.purple isLarge data-testid='badge-purple-large'>
            purple
          </Badge.purple>
          <Badge.pink isLarge data-testid='badge-pink-large'>
            pink
          </Badge.pink>
        </div>
      </Wrapper>

      <Wrapper
        id='button'
        name='Button'
        variant={['success', 'danger', 'secondary', 'tertary']}
        props={['type', 'value', 'disabled', 'onClick']}
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Button data-testid='button-primary'>Primary</Button>
          <Button.success data-testid='button-success'>Success</Button.success>
          <Button.danger data-testid='button-danger' className='flex items-center gap-2'>
            <ArrowRightIcon className='h-4 w-4' />
            Danger
          </Button.danger>
          <Button.secondary data-testid='button-secondary'>Secondary</Button.secondary>
          <Button.tertary data-testid='button-tertary'>Tertary</Button.tertary>
          <Button data-testid='button-disabled' disabled>
            Disabled
          </Button>
        </div>
      </Wrapper>

      <Wrapper id='linkbutton' name='LinkButton' variant={['secondary', 'tertary']} props={['href']}>
        <div className='flex flex-wrap items-center gap-2'>
          <LinkButton href='/design#linkbutton' className='flex items-center gap-2' data-testid='link-button'>
            <ArrowRightIcon className='h-4 w-4' />
            Link Button
          </LinkButton>
          <LinkButton.secondary href='/design#linkbutton' data-testid='link-button-secondary'>
            Link Button Secondary
          </LinkButton.secondary>
          <LinkButton.tertary href='/design#linkbutton' data-testid='link-button-tertary'>
            Link Button Tertary
          </LinkButton.tertary>
        </div>
      </Wrapper>

      <Wrapper
        id='checkbox'
        name='Checkbox'
        props={['name', 'label', 'value', 'onChange', 'checked', 'defaultChecked', 'disabled']}
        noChildren
      >
        <Checkbox name='checkbox-default' label='Checkbox' data-testid='checkbox' />
        <Checkbox name='checkbox-checked' label='Checkbox Checked' data-testid='checkbox-checked' defaultChecked />
        <Checkbox disabled name='checkbox-disabled' label='Checkbox Disabled' data-testid='checkbox-disabled' />
        <Checkbox
          disabled
          name='checkbox-checked-disabled'
          label='Checkbox Checked Disabled'
          data-testid='checkbox-checked-disabled'
          defaultChecked
        />
      </Wrapper>

      <Wrapper id='container' name='Container' props={['small']}>
        <Container data-testid='container'>
          <Text>Container</Text>
        </Container>
        <Container small data-testid='container-small'>
          <Text>Container Small</Text>
        </Container>
      </Wrapper>

      <Wrapper id='heading' name='Heading' props={['h1', 'h2', 'h3']}>
        <Heading h1 data-testid='heading-h1'>
          Heading 1
        </Heading>
        <Heading h2 data-testid='heading-h2'>
          Heading 2
        </Heading>
        <Heading h3 data-testid='heading-h3'>
          Heading 3
        </Heading>
        <Heading data-testid='heading-h4'>Heading 4 (default)</Heading>
      </Wrapper>

      <Wrapper id='input' name='Input' props={['type', 'name', 'placeholder', 'value', 'defaultValue', 'onChange']}>
        <Input name='inputt' placeholder='Input default' data-testid='input' />
      </Wrapper>

      <Wrapper
        id='inputdisabled'
        name='Input disabled'
        props={['type', 'name', 'placeholder', , 'value', 'defaultValue', 'onChange']}
      >
        <Input
          name='input-disabled'
          placeholder='Input default'
          defaultValue='Has a value'
          data-testid='input-disabled'
          disabled
        />
      </Wrapper>

      <Wrapper id='label' name='Label'>
        <Label data-testid='label'>Label</Label>
      </Wrapper>

      <Wrapper
        id='labeledinput'
        name='LabeledInput'
        props={['label', 'type', 'name', 'placeholder', 'value', 'defaultValue', 'onChange', 'wrapperClassName']}
      >
        <LabeledInput
          label='Email'
          name='email-labeledinput'
          placeholder='Email'
          type='text'
          data-testid='labeledinput'
        />
        <LabeledInput
          label='Password'
          name='passwordd'
          placeholder='Your Password'
          type='password'
          data-testid='labeledinput-password'
        />
      </Wrapper>

      <Wrapper
        id='labeledinputdisabled'
        name='LabeledInput disabled'
        props={['label', 'type', 'name', 'placeholder', 'value', 'defaultValue', 'onChange', 'wrapperClassName']}
      >
        <LabeledInput
          label='Confirmation Password'
          name='confirmation'
          placeholder='confirmation'
          defaultValue='password'
          type='password'
          data-testid='labeledinput-disabled'
          disabled
        />
      </Wrapper>

      <Wrapper
        id='input-debounce-hook'
        name='Input (Debounce Hook)'
        props={['type', 'name', 'placeholder', 'value', 'onChange']}
      >
        <Input
          name='input-debounce-hook'
          placeholder='Input debounce hook'
          data-testid='input-debounce-hook'
          onChange={(e) => setInputDebounce(e.target.value)}
        />
        <Text data-testid='input-debounce-hook-text'>{debouncedValue}</Text>
        <Text>Slower</Text>
      </Wrapper>

      <Wrapper
        id='input-debounce'
        name='InputDebounce'
        props={[
          'label',
          'type',
          'name',
          'placeholder',
          'value',
          'onChange',
          'className',
          'wrapperClassName',
          'debounce',
        ]}
        noChildren
      >
        <InputDebounce
          label='Input Debounce'
          name='inputdebounce'
          placeholder='Input Debounce'
          value={inputDebounceValue}
          onChange={(value) => setInputDebounceValue(value)}
          data-testid='inputdebounce'
        />
        <Text data-testid='inputdebounce-text'>{inputDebounceValue}</Text>
        <Text>Faster</Text>
      </Wrapper>

      <Wrapper
        id='text-area'
        name='TextArea'
        props={['label', 'className', 'name', 'placeholder', 'value', 'defaultValue', 'onChange', 'height']}
        noChildren
      >
        <TextArea label='TextArea' name='textarea' placeholder='text area' data-testid='textarea' />
      </Wrapper>

      <Wrapper
        id='textarea-disabled'
        name='TextArea disabled'
        props={['label', 'className', 'name', 'placeholder', 'value', 'defaultValue', 'onChange', 'height']}
        noChildren
      >
        <TextArea
          label='TextArea'
          name='textareadisabled'
          placeholder='text area'
          data-testid='textarea-disabled'
          disabled
        />
      </Wrapper>

      <Wrapper id='fileinput' name='FileInput' props={['className', 'label', 'name', 'value', 'onChange']} noChildren>
        <FileInput
          data-testid='fileinput'
          label='File'
          name='File'
          value={file ? file.name : ''}
          onChange={handleFileChange}
          accept='.pdf'
        />
      </Wrapper>

      <Wrapper id='select' name='Select' props={['label', 'name', 'value', 'onChange', 'defaultValue']}>
        <Select
          label='Select Color'
          name='color'
          value={selectedColor ? selectedColor : 'Choose Color'}
          onChange={handleSelectColor}
          data-testid='select'
        >
          <Select.option value='red'>Red</Select.option>
          <Select.option value='blue'>Blue</Select.option>
          <Select.option value='green'>Green</Select.option>
        </Select>
      </Wrapper>

      <Wrapper id='selectnativeoption' name='Select.option' props={['value']} noClassName>
        <Select.option value='red' data-testid='selectoption-red'>
          Red
        </Select.option>
        <Select.option value='blue' data-testid='selectoption-blue'>
          Blue
        </Select.option>
        <Select.option value='green' data-testid='selectoption-green'>
          Green
        </Select.option>
      </Wrapper>

      <Wrapper id='progress' name='Progress' variant={['percentage']} props={['percent']} noChildren>
        <Progress percent={45} data-testid='progress' />
        <br />
        <Progress.percentage percent={0} data-testid='progress-zero' />
        <br />
        <Progress.percentage percent={75} data-testid='progress-percent' />
      </Wrapper>

      <Wrapper
        id='radio'
        name='Radio'
        props={['name', 'label', 'value', 'onChange', 'checked', 'defaultChecked', 'disabled']}
        noChildren
      >
        <Radio name='radio' value='radio-blue' label='Blue' data-testid='radio' />
        <Radio name='radio' value='radio-red' label='Red' defaultChecked data-testid='radio-checked' />
        <Radio disabled name='radios' label='Radio Disabled' data-testid='radio-disabled' />
        <Radio
          disabled
          name='radioss'
          label='Radio Checked Disabled'
          defaultChecked
          data-testid='radio-checked-disabled'
        />
      </Wrapper>

      <Wrapper id='shimmer' name='Shimmer' noChildren noProps>
        <Shimmer className='max-w-[5rem] mb-2' data-testid='shimmer' />
        <Shimmer className='max-w-[10rem] mb-2' />
        <Shimmer className='max-w-[15rem]' />
      </Wrapper>

      <Wrapper id='tabs' name='Tabs' props={['items']}>
        <Tabs items={['Tab A', 'Tab B', 'Tab C']} data-testid='tabs'>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content A</Heading>
          </Tabs.panel>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content B</Heading>
          </Tabs.panel>
          <Tabs.panel>
            <Heading className='mb-0'>Tab Content C</Heading>
          </Tabs.panel>
        </Tabs>
      </Wrapper>

      <Wrapper id='tabitem' name='Tabs.panel'>
        <Tabs items={['Tab']}>
          <Tabs.panel data-testid='tabs-panel'>
            <Heading className='mb-0'>Tabs Panel</Heading>
          </Tabs.panel>
        </Tabs>
      </Wrapper>

      <Wrapper
        id='table'
        name='Table'
        props={['head', 'totalPage', 'totalData', 'currentPage', 'next', 'prev', 'rowPerPage', 'noPagination']}
        noWrap
      >
        <Table
          totalPage={5}
          totalData={50}
          currentPage={1}
          next={onNext}
          prev={onPrev}
          data-testid='table'
          head={
            <>
              <Table.th shrink>No</Table.th>
              <Table.th>Column 1</Table.th>
              <Table.th>Column 2</Table.th>
              <Table.th>Column 3</Table.th>
              <Table.th>Column 4</Table.th>
              <Table.th>Column 5</Table.th>
              <Table.th>Column 6</Table.th>
              <Table.th>Column 7</Table.th>
              <Table.th>Column 8</Table.th>
            </>
          }
        >
          {[...Array(5).keys()].map((e, index) => {
            return (
              <Table.tr key={index}>
                <Table.td shrink>{index + 1}</Table.td>
                <Table.td className='text-center'>
                  <Badge>badge</Badge>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.red>badge red</Badge.red>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.dark>badge dark</Badge.dark>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.green>badge green</Badge.green>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.yellow>badge yellow</Badge.yellow>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.indigo>badge indigo</Badge.indigo>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.purple>badge purple</Badge.purple>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.pink>badge pink</Badge.pink>
                </Table.td>
              </Table.tr>
            );
          })}
        </Table>
      </Wrapper>

      <Wrapper id='tabletr' name='Table.tr' noWrap>
        <Table>
          <Table.tr data-testid='table-tr'>
            <Table.td>
              <Badge>Table.tr</Badge>
            </Table.td>
          </Table.tr>
        </Table>
      </Wrapper>

      <Wrapper id='tabletd' name='Table.td' props={['shrink']} noWrap>
        <Table>
          <Table.tr>
            <Table.td data-testid='table-td'>
              <Badge>Table.td</Badge>
            </Table.td>
          </Table.tr>
        </Table>
      </Wrapper>

      <Wrapper id='table-simple' name='TableSimple' props={['head', 'bordered', 'caption', 'wrapperClassName']} noWrap>
        <TableSimple
          data-testid='table-simple'
          caption='Table 3.1: Badge'
          head={
            <>
              <TableSimple.th shrink>No</TableSimple.th>
              <TableSimple.th>Column 1</TableSimple.th>
              <TableSimple.th>Column 2</TableSimple.th>
              <TableSimple.th>Column 3</TableSimple.th>
              <TableSimple.th>Column 4</TableSimple.th>
              <TableSimple.th>Column 5</TableSimple.th>
            </>
          }
        >
          {[...Array(5).keys()].map((e, index) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td shrink>{index + 1}</TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge>badge</Badge>
                </TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge.red>badge red</Badge.red>
                </TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge.dark>badge dark</Badge.dark>
                </TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge.green>badge green</Badge.green>
                </TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge.yellow>badge yellow</Badge.yellow>
                </TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
      </Wrapper>

      <Wrapper id='tablesimple-tr' name='TableSimple.tr' noWrap noProps>
        <TableSimple>
          <TableSimple.tr data-testid='tablesimple-tr'>
            <TableSimple.td>
              <Badge>TableSimple.tr</Badge>
            </TableSimple.td>
          </TableSimple.tr>
        </TableSimple>
      </Wrapper>

      <Wrapper id='tablesimple-td' name='TableSimple.td' props={['shrink', 'bordered']} noWrap noProps>
        <TableSimple>
          <TableSimple.tr>
            <TableSimple.td data-testid='tablesimple-td'>
              <Badge>TableSimple.td</Badge>
            </TableSimple.td>
          </TableSimple.tr>
        </TableSimple>
      </Wrapper>

      <Wrapper id='text' name='Text' variant={['light', 'medium', 'semibold', 'bold', 'extrabold']}>
        <Text.light data-testid='text-light' className='mb-2'>
          Light
        </Text.light>
        <Text data-testid='text' className='mb-2'>
          Default
        </Text>
        <Text.medium data-testid='text-medium' className='mb-2'>
          Medium
        </Text.medium>
        <Text.semibold data-testid='text-semibold' className='mb-2'>
          Semibold
        </Text.semibold>
        <Text.bold data-testid='text-bold' className='mb-2'>
          Bold
        </Text.bold>
        <Text.extrabold data-testid='text-extrabold' className='mb-2'>
          Extrabold
        </Text.extrabold>
      </Wrapper>

      <Wrapper id='card' name='Card'>
        <Card data-testid='card'>
          <Text>Card Content</Text>
        </Card>
      </Wrapper>

      <Wrapper id='section' name='Section' variant={['small']}>
        <Section data-testid='section'>
          <Text>Section Default</Text>
        </Section>
        <Section.small data-testid='section-small'>
          <Text>Section Small</Text>
        </Section.small>
      </Wrapper>

      <Wrapper id='show-more' name='ShowMore' props={['count']}>
        <ShowMore data-testid='showmore'>
          Id amet commodo exercitation aliqua irure exercitation adipisicing ipsum cillum elit. Cillum non dolor cillum
          mollit incididunt tempor quis reprehenderit labore velit sunt anim ipsum quis. Id nostrud anim ut excepteur
          pariatur. Eu ad esse nisi et fugiat. Exercitation culpa cupidatat consequat veniam commodo aute id enim Lorem
          id consectetur aliqua. Quis culpa do est non irure aliquip proident exercitation aliqua mollit anim dolor
          labore.
        </ShowMore>
      </Wrapper>

      <Wrapper id='loading-dots' name='LoadingDots' props={['medium', 'large']} noChildren>
        <LoadingDots data-testid='loadingdots' />
        <br />
        <br />
        <LoadingDots medium data-testid='loadingdots-medium' />
        <br />
        <br />
        <LoadingDots large data-testid='loadingdots-large' />
      </Wrapper>

      <Wrapper id='loading-skeleton' name='LoadingSkeleton' noClassName noProps noChildren>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <Shimmer className='space-y-5 rounded-2xl'>
            <div className='h-24 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='space-y-3'>
              <div className='h-3 w-3/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-4/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-2/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>

          <Shimmer className='space-y-5 rounded-2xl'>
            <div className='h-44 w-full rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>

          <Shimmer className='space-y-5 rounded-2xl'>
            <div className='space-y-3'>
              <div className='h-3 w-3/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-4/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-2/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
            <div className='space-y-3'>
              <div className='h-3 w-1/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-2/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-3/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-4/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='w-5/5 h-3 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>

          <Shimmer className='space-y-5 rounded-2xl'>
            <div className='h-24 w-24 rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='space-y-3'>
              <div className='h-3 w-3/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-4/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-2/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>

          <Shimmer className='rounded-2xl h-8' />

          <Shimmer className='rounded-full h-20 w-20' />

          <Shimmer className='rounded h-20' />

          <Shimmer className='rounded-3xl h-20 w-20' />
        </div>
      </Wrapper>
    </Layout>
  );
}

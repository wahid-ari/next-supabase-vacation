import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { DataTable } from '@/components/ui/DataTable';
import { DataTableColumnHeader } from '@/components/ui/DataTable/DataTableColumnHeader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const data: Payment[] = [
  {
    id: '123451',
    amount: 100,
    status: 'pending',
    email: 'amparo@qnekt.com',
  },
  {
    id: '123452',
    amount: 125,
    status: 'processing',
    email: 'daisy@stelaecor.com',
  },
  {
    id: '123453',
    amount: 150,
    status: 'success',
    email: 'hawkins@silodyne.com',
  },
  {
    id: '123454',
    amount: 175,
    status: 'failed',
    email: 'heath@calcu.com',
  },
  {
    id: '123455',
    amount: 200,
    status: 'pending',
    email: 'nellie@portaline.com',
  },
  {
    id: '123456',
    amount: 225,
    status: 'processing',
    email: 'dianewil@comveyor.com',
  },
  {
    id: '123457',
    amount: 250,
    status: 'success',
    email: 'jenning@vitricomp.com',
  },
  {
    id: '123458',
    amount: 275,
    status: 'failed',
    email: 'sophie@aeora.com',
  },
  {
    id: '123459',
    amount: 300,
    status: 'pending',
    email: 'kimhes@mitroc.com',
  },
  {
    id: '1234510',
    amount: 325,
    status: 'processing',
    email: 'conway@flotonic.com',
  },
  {
    id: '1234511',
    amount: 450,
    status: 'success',
    email: 'stafford@rooforia.com',
  },
  {
    id: '1234512',
    amount: 575,
    status: 'failed',
    email: 'burksmul@extrawear.com',
  },
  {
    id: '1234513',
    amount: 600,
    status: 'pending',
    email: 'renawel@vicon.com',
  },
  {
    id: '1234514',
    amount: 625,
    status: 'processing',
    email: 'newmane@pyramax.com',
  },
  {
    id: '1234515',
    amount: 650,
    status: 'success',
    email: 'landry@genesynk.com',
  },
  {
    id: '1234516',
    amount: 675,
    status: 'failed',
    email: 'franks@pasturia.com',
  },
  {
    id: '1234517',
    amount: 700,
    status: 'pending',
    email: 'tamika@diginetic.com',
  },
  {
    id: '1234518',
    amount: 725,
    status: 'processing',
    email: 'cleveland@vetron.com',
  },
  {
    id: '1234519',
    amount: 750,
    status: 'success',
    email: 'shelbye@dadabase.com',
  },
  {
    id: '1234520',
    amount: 775,
    status: 'failed',
    email: 'terry@volax.com',
  },
  {
    id: '1234521',
    amount: 800,
    status: 'pending',
    email: 'dums@elox.com',
  },
  {
    id: '1234522',
    amount: 825,
    status: 'processing',
    email: 'genzy@hola.com',
  },
  {
    id: '1234523',
    amount: 850,
    status: 'success',
    email: 'milen@trust.com',
  },
  {
    id: '1234524',
    amount: 875,
    status: 'failed',
    email: 'konek@gmail.com',
  },
];

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        id='Select all'
        aria-label='Select all'
        title='Select all'
      />
    ),
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          id={`Select ${id}`}
          aria-label={`Select ${id}`}
          title={`Select ${id}`}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button variant='ghost' className='-ml-4' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const data = row.original;
      if (data.status == 'pending') {
        return (
          <span className='rounded-full border border-orange-600 bg-orange-100 px-2 pb-0.5 text-[13px] font-medium text-orange-600'>
            {data.status}
          </span>
        );
      } else if (data.status == 'processing') {
        return (
          <span className='rounded-full border border-sky-600 bg-sky-100 px-2 pb-0.5 text-[13px] font-medium text-sky-600'>
            {data.status}
          </span>
        );
      } else if (data.status == 'success') {
        return (
          <span className='rounded-full border border-emerald-600 bg-emerald-100 px-2 pb-0.5 text-[13px] font-medium text-emerald-600'>
            {data.status}
          </span>
        );
      } else {
        return (
          <span className='rounded-full border border-red-600 bg-red-100 px-2 pb-0.5 text-[13px] font-medium text-red-600'>
            {data.status}
          </span>
        );
      }
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    header: () => <div className='text-right'>Actions</div>,
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className='relative text-right font-medium'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' title='Open Action' className='h-8 w-8 p-0 hover:bg-neutral-200'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.email)}>
                Copy email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default function DataTableDemo() {
  return (
    <div className='mx-auto'>
      <DataTable columns={columns} data={data} itemPerPage={[5, 10, 20]} />
    </div>
  );
}

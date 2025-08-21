'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Eye,  Trash2 } from 'lucide-react'

export const EmployeeColumn = (handleDeleteEmployee, handleEditEmployee) => [
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      return (
        <div className='grid grid-cols-3 w-5'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <EllipsisVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handleEditEmployee(row)}
                className='cursor-pointer text-blue-400'
              >
                <Eye className='mr-2 h-4 w-4' />
                View
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleDeleteEmployee(row)}
                className='cursor-pointer text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  },
  {
    accessorKey: 'id',
    header: '#',
    size: 80,
    cell: ({ row }) => (
      <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        {row.original.employeeCode == null ? "-" : `#${row.original.employeeCode}`}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Contact Information',
    cell: ({ row }) => (
      <div className="space-y-1">
        <span className="">{row.original.name}-{row.original.companyEmail}-{row.original.phone}</span>

      </div>
    ),
  },
  // {
  //   accessorKey: 'employeeCode',
  //   header: 'Employee Code',
  //   cell: ({ row }) => row.original.employeeCode,
  // },

  {
    accessorKey: 'designation',
    header: 'Designation',
    cell: ({ row }) => row.original.designation,
  },
  // {
  //   accessorKey: 'dateOfJoining',
  //   header: 'Joining Date',
  //   cell: ({ row }) =>
  //     new Date(row.original.dateOfJoining).toLocaleDateString(),
  // },
  // {
  //   accessorKey: 'meta',
  //   header: 'PAN Card',
  //   cell: ({ row }) => {
  //     const pan = row.original.meta.find((m) => m.metaKey === '_panCard');
  //     return pan?.metaValue || '-';
  //   },
  // },
  {
    accessorKey: 'meta_bloodGroup',
    header: 'Blood Group',
    cell: ({ row }) => {
      const blood = row.original.meta.find((m) => m.metaKey === '_bloodGroup');
      return blood?.metaValue || '-';
    },
  },
  {
    accessorKey: '_currentShiftp',
    header: 'Current Shift',
    cell: ({ row }) => {
      const blood = row.original.meta.find((m) => m.metaKey === '_currentShift');
      return blood?.metaValue || '-';
    },
  },
  {
    accessorKey: 'meta_emergencyContact',
    header: 'Emergency Contact',
    cell: ({ row }) => {
      const phone = row.original.meta.find((m) => m.metaKey === '_emergencyContactNumber');
      return (
        <div className="space-y-1">
          <div className="">{phone?.metaValue || '-'}</div>
        </div>
      );
    },
  },

]

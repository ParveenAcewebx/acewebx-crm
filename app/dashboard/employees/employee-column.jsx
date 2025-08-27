'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Cake, ChartSpline, Edit, EllipsisVertical, Eye, PartyPopper, Trash2 } from 'lucide-react'
import moment from 'moment'

export const EmployeeColumn = (handleDeleteEmployee, handleEditEmployee, handleEdit, handleBirthdays, handleAnniversary, handleIncrement) => [
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
              {/* Edit */}
              <DropdownMenuItem
                onClick={() => handleEdit(row)}
                className='cursor-pointer text-green-400'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              {/* Birthday */}
              <DropdownMenuItem
                onClick={() => handleBirthdays(row)}
                className='cursor-pointer text-orange-400'
              >
                <Cake className='mr-2 h-4 w-4' />
                Birthdays
              </DropdownMenuItem>
              {/* anniversary */}
              <DropdownMenuItem
                onClick={() => handleAnniversary(row)}
                className='cursor-pointer text-pink-400'
              >
                <PartyPopper className='mr-2 h-4 w-4' />
                Anniversaries
              </DropdownMenuItem>
              {/* Increment */}
              <DropdownMenuItem
                onClick={() => handleIncrement(row)}
                className='cursor-pointer text-yellow-500'
              >
                <ChartSpline className='mr-2 h-4 w-4' />
                Increments
              </DropdownMenuItem>



              {/* <DropdownMenuItem
                onClick={() => handleDeleteEmployee(row)}
                className='cursor-pointer text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem> */}

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


  {
    accessorKey: 'designation',
    header: 'Designation',
    cell: ({ row }) => row.original.designation,
  },

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
    accessorKey: 'dateOfJoining',
    header: 'Associated From',
    cell: ({ row }) => {

      const dateOfJoin = row?.original?.dateOfJoining

      const start = moment(dateOfJoin, "YYYY-MM-DD");
      const end = moment(); // current date

      // Get years, months, days separately
      const years = end.diff(start, "years");
      start.add(years, "years");

      const months = end.diff(start, "months");
      start.add(months, "months");

      const days = end.diff(start, "days");

      let formatted = "";

      if (years > 0 && months > 0) {
        formatted = `${years}y, ${months}m`;
      } else if (years > 0) {
        formatted = `${years}y`;
      } else if (months > 0) {
        formatted = `${months}m`;
      } else {
        formatted = `${days}d`;
      }

      return (
        <>
          {formatted}
        </>
      )



    }
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

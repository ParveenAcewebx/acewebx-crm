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

export const InactiveEmployeeColumn = (handleDeleteEmployee, handleEditEmployee, handleEdit, handleBirthdays, handleAnniversary, handleIncrement) => [
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
      <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-medium">
        {row.original.employeeCode == null ? "-" : `#${row.original.employeeCode}`}
      </div>
    ),
  },


  {
    accessorKey: 'name',
    header: 'Contact Information',
    cell: ({ row }) => (
      <div className="space-y-1">
        <span className=""> <b>{row.original.name}</b> | {row.original.companyEmail} | {row.original.phone}</span>

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
    const value = blood?.metaValue?.toLowerCase() || '-';

    const bgColors = {
      'o+': 'bg-green-100 text-green-800',
      'o-': 'bg-green-200 text-green-900',
      'a+': 'bg-blue-100 text-blue-800',
      'a-': 'bg-blue-200 text-blue-900',
      'b+': 'bg-yellow-100 text-yellow-800',
      'b-': 'bg-yellow-200 text-yellow-900',
      'ab+': 'bg-pink-100 text-pink-800',
      'ab-': 'bg-pink-200 text-pink-900',
      "unknown" : 'bg-white-200 text-black-900'
    };

    const colorClass = bgColors[value] || 'bg-gray-100 text-gray-800';

    // Uppercase display
    const displayValue = value !== '-' ? value.toUpperCase() : '-';

    return (
      <div
        className={`inline-flex items-center justify-center w-10 h-6 rounded-full font-normaltext-sm ${colorClass}`}
      >
        {displayValue}
      </div>
    );
  }
},
  {
    accessorKey: 'meta_bloodGroup',
    header: 'Associated From',
    cell: ({ row }) => {

      const dateOfJoin = row?.original?.dateOfJoining

      const dateOfExit = row.original.meta.find((m) => m.metaKey === '_exitDate');

      const start = moment(dateOfJoin, "YYYY-MM-DD");
      const end = moment(dateOfExit?.metaValue || ""); // current date

      // Get years, months, days separately
      const years = end.diff(start, "years");
      start.add(years, "years");

      const months = end.diff(start, "months");
      start.add(months, "months");

      const days = end.diff(start, "days");

      let formatted = "";

      if (years > 0 && months > 0) {
        formatted = `${years}Y, ${months}M`;
      } else if (years > 0) {
        formatted = `${years}Y`;
      } else if (months > 0) {
        formatted = `${months}M`;
      } else {
        formatted = `${days}D`;
      }


      return (
        <>
          {formatted == "NaND" ? "-" : formatted}
        </>
      )



    }
  },
   {
  accessorKey: '_currentShift',
  header: 'Current Shift',
  cell: ({ row }) => {
    let shift = row.original.meta.find((m) => m.metaKey === '_currentShift')?.metaValue || '-';

    // Capitalize first letter
    shift = shift.charAt(0).toUpperCase() + shift.slice(1).toLowerCase();

    let color = '';
    switch (shift.toLowerCase()) {
      case 'day':
        color = '#008080'; // Teal
        break;
      case 'night':
        color = '#4B0082'; // Indigo
        break;
      case 'staggered':
        color = '#FF8C00'; // Dark Orange
        break;
      default:
        color = '#000000'; // Black for unknown
    }

    return <span style={{ color }}>{shift}</span>;
  }
},
  {
    accessorKey: 'meta_emergencyContact',
    header: 'Emergency Contact',
    cell: ({ row }) => {
      const phone = row.original.meta.find((m) => m.metaKey === '_emergencyContactNumber');
      return (
        <div className="space-y-1">
          <div className="font-medium">{phone?.metaValue || '-'}</div>
        </div>
      );
    },
  },

]
'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const SkillColumn = (handleDeleteTaskTag, handleEditTaskTag) => [

  {
    accessorKey: 'id',
    header: '#ID',
    size: 80,
    cell: ({ row }) => (
      <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        {`#EMP-${row.original.id}`}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Contact Info',
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="font-medium">{row.original.name}</div>
        <div className="text-sm text-gray-500">{row.original.personalEmail}</div>
        <div className="text-sm text-gray-500">{row.original.phone}</div>
      </div>
    ),
  },
  {
    accessorKey: 'companyEmail',
    header: 'Company Email',
    cell: ({ row }) => row.original.companyEmail,
  },
  {
    accessorKey: 'designation',
    header: 'Designation',
    cell: ({ row }) => row.original.designation,
  },
  {
    accessorKey: 'dateOfJoining',
    header: 'Joining Date',
    cell: ({ row }) =>
      new Date(row.original.dateOfJoining).toLocaleDateString(),
  },
  {
    accessorKey: 'meta',
    header: 'PAN Card',
    cell: ({ row }) => {
      const pan = row.original.meta.find((m) => m.metaKey === '_panCard');
      return pan?.metaValue || '-';
    },
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
    accessorKey: 'meta_emergencyContact',
    header: 'Emergency Contact',
    cell: ({ row }) => {
      const name = row.original.meta.find((m) => m.metaKey === '_emergencyContactName');
      const phone = row.original.meta.find((m) => m.metaKey === '_emergencyContactNumber');
      return (
        <div className="space-y-1">
          <div>{name?.metaValue || '-'}</div>
          <div className="text-sm text-gray-500">{phone?.metaValue || '-'}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <div className='flex space-x-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-green-600 hover:bg-green-50'
                  onClick={() => handleEditTaskTag(row)}
                >
                  <Edit className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-red-600 hover:bg-red-50'
                  onClick={() => handleDeleteTaskTag(row)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      )
    }
  }
]

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

export const EventColumn = (handleDeleteTaskTag, handleEditTaskTag) => [

  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => row.original.id
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.original.title
  },
  {
    accessorKey: 'toDate',
    header: 'From/To',
    cell: ({ row }) => (
      <>
        <span>
          {`${row.original?.fromDate} to ${row.original?.toDate}`}
        </span>
      </>
    )
  },
  {
    accessorKey: 'isHoliday',
    header: 'Is Holiday',
    cell: ({ row }) =>
      row?.original?.isHoliday
  },
  {
    accessorKey: 'isExpired',
    header: 'Is Expired',
    cell: ({ row }) =>
      row?.original?.isExpired
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

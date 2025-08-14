'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'

export const EventColumn = (handleDeleteEvent, handleEditEvent) => [
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      return (
        <div className='grid grid-cols-3 w-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <EllipsisVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
              onClick={() => handleEditEvent(row)}
              className='cursor-pointer text-green-600'
            >
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteEvent(row)}
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

]

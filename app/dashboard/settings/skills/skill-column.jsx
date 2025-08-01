'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'

export const SkillColumn = (handleDeleteTaskTag, handleEditTaskTag) => [

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
                onClick={() => handleEditTaskTag(row)}
                className='cursor-pointer text-blue-400'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleDeleteTaskTag(row)}
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
    header: '#ID',
    size: 80,
    cell: ({ row }) => (
      <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        {`#SKILL-${row.original.id}`}
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.original.title
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) =>
      row?.original?.type
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) =>
  //     row?.original?.status
  // },

]

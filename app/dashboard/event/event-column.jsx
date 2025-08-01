'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'

export const EventColumn = (handleDeleteTaskTag, handleEditTaskTag) => [
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
              className='cursor-pointer text-green-600'
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
        {`#EVN-${row.original?.id}`}
      </div>
    )
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
  // {
  //   accessorKey: 'action',
  //   header: 'Actions',
  //   cell: ({ row }) => {
  //     return (
  //       <TooltipProvider>
  //         <div className='flex space-x-2'>
  //           <Tooltip>
  //             <TooltipTrigger asChild>
  //               <Button
  //                 variant='ghost'
  //                 size='icon'
  //                 className='text-green-600 hover:bg-green-50'
  //                 onClick={() => handleEditTaskTag(row)}
  //               >
  //                 <Edit className='h-4 w-4' />
  //               </Button>
  //             </TooltipTrigger>
  //             <TooltipContent>Edit</TooltipContent>
  //           </Tooltip>

  //           <Tooltip>
  //             <TooltipTrigger asChild>
  //               <Button
  //                 variant='ghost'
  //                 size='icon'
  //                 className='text-red-600 hover:bg-red-50'
  //                 onClick={() => handleDeleteTaskTag(row)}
  //               >
  //                 <Trash2 className='h-4 w-4' />
  //               </Button>
  //             </TooltipTrigger>
  //             <TooltipContent>Delete</TooltipContent>
  //           </Tooltip>
  //         </div>
  //       </TooltipProvider>
  //     )
  //   }
  // }
]

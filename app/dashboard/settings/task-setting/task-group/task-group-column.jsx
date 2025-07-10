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

export const TaskGroupColumn = (handleDeleteScope, handleEditScope) => [
  // {
  //   accessorKey: 'action',
  //   header: 'Action',
  //   cell: ({ row }) => {
  //     return (
  //       <div className='grid grid-cols-3'>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant='ghost' className='h-8 w-8 p-0'>
  //               <EllipsisVertical className='h-5 w-5' />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align='end'>
  //             <DropdownMenuItem
  //               onClick={() => handleEditScope(row)}
  //               className='cursor-pointer text-green-600'
  //             >
  //               <Edit className='mr-2 h-4 w-4' />
  //               Edit
  //             </DropdownMenuItem>
  //             <DropdownMenuItem
  //               onClick={() => handleDeleteScope(row)}
  //               className='cursor-pointer text-red-600'
  //             >
  //               <Trash2 className='mr-2 h-4 w-4' />
  //               Delete
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //     )
  //   }
  // },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => row.original.id
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
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
                  onClick={() => handleEditScope(row)}
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
                  onClick={() => handleDeleteScope(row)}
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

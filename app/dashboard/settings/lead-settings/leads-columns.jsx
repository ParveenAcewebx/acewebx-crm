'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'

export const LeadSettingsColumns = (handleDeleteLeads, handleEditLeads) => [
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
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      const color = row?.original?.color || '#ffffff'
      console.log('color', color)
      const backgroundColor = `${color}20`
      return (
        <div
          className='inline-block rounded border px-3 py-1 text-sm font-medium'
          style={{
            backgroundColor: backgroundColor,
            color: color
          }}
        >
          {color}
        </div>
      )
    }
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
                  onClick={() => handleEditLeads(row)}
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
                  onClick={() => handleDeleteLeads(row)}
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

'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Eye } from 'lucide-react'

export const CoverColumn = handlePreviewLeads => [
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            type='button'
            size='icon'
            className='text-gray-600 hover:bg-gray-300'
            onClick={() => handlePreviewLeads(row)}
          >
            <Eye className='h-5 w-5' />
          </Button>
        </TooltipTrigger>
        <TooltipContent className='rounded-sm bg-gray-600 text-sm'>
          Preview
        </TooltipContent>
      </Tooltip>
    )
  },
  {
    header: 'Rev Id',
    cell: ({ row }) => row?.original?.id
  },
  {
    accessorKey: 'projectName',
    header: 'Project Name',
    cell: ({ row }) => `${row?.original?.projectName}`
  },
  {
    accessorKey: 'quote_date',
    header: 'Quote Date',
    cell: ({ row }) => {
      const rawDate = row?.original?.log?.data?.quote_date
      if (!rawDate) return 'No Date'
  
      const date = new Date(rawDate)
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }) 
    }
  }
,  
{
  accessorKey: 'plan_date',
  header: 'Plan Date',
  cell: ({ row }) => {
    const rawDate = row?.original?.log?.data?.plan_date
    if (!rawDate) return 'No Date'

    const date = new Date(rawDate)
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }) 
  }
}
,
  {
    accessorKey: 'plan_note',
    header: 'Plan Notes',
    cell: ({ row }) => row?.original?.log?.data?.plan_note || "_"
  },

  {
    accessorKey: 'updated_at',
    header: 'Last Updated Date',
    cell: ({ row }) => {
      const rawDate = row?.original?.log?.data?.updated_at
      if (!rawDate) return 'No Date'
  
      const date = new Date(rawDate)
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }) 
    }
    // cell: ({ row }) => {
    //   const date = new Date(row?.original?.updated_at)
    //   return date.toISOString().split('T')[0] // "YYYY-MM-DD"
    // }
  }
]

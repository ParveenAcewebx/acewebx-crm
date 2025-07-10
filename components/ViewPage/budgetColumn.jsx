'use client'

import { format } from 'date-fns'
import { ChevronDown, ChevronLeft, Edit, Eye } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export const budgetColumn = (
  handleEditBudgetBook,
  expandedRowId,
  handleToggleAccordion
) => [
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      console.log('row11', row)

      return (
        <div className='flex gap-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => handleEditBudgetBook(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='h-4 w-4' />
              </div>
            </TooltipTrigger>
            <TooltipContent side='top' className=''>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/dashboard/budget-book/preview?id=${row?.original?.id}`}
              >
                <div className='cursor-pointer text-green-600'>
                  <Eye className='h-4 w-4' />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side='top' className=''>
              <p>View</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )
    }
  },
  {
    id: 'revId',
    header: '',
    cell: () => ''
  },
  {
    id: 'projectName',
    header: 'Project Name',
    cell: ({ row }) => row.original.budget_book?.name || '-'
  },
  {
    id: 'leadName',
    header: 'Lead Assign',
    cell: ({ row }) => row.original.lead?.project?.name || '-'
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => row.original.address || '-'
  },
  {
    accessorKey: 'quote_date',
    header: 'Quote Date',
    cell: ({ row }) =>
      format(new Date(row.original.quote_date), 'MM/dd/yyyy') || '-'
  },
  {
    accessorKey: 'total',
    header: 'Price',
    cell: ({ row }) => row.original.total || '-'
  },

  {
    accessorKey: 'plan_status',
    header: 'Plan Status',
    cell: ({ row }) => {
      const address = row.original.plan_status || '-'
      const truncated = address
        ? address.split(' ').slice(0, 5).join(' ') +
          (address.split(' ').length > 5 ? '...' : '')
        : ''

      return (
        <Tooltip>
          <TooltipTrigger className='cursor-pointer truncate'>
            {truncated}
          </TooltipTrigger>
          {address && (
            <TooltipContent className='w-auto rounded-sm bg-gray-600 text-sm'>
              {address}
            </TooltipContent>
          )}
        </Tooltip>
      )
    }
  },
  {
    id: 'expand_icon',
    header: '',
    cell: ({ row }) => {
      const isExpanded = expandedRowId === row.original.id
      const budgetChildLength = row?.original?.budgetBookChild?.length > 0

      return budgetChildLength ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => handleToggleAccordion(row.original.id)}
              className='cursor-pointer'
            >
              {isExpanded ? (
                <ChevronDown className='!h-4 !w-4' />
              ) : (
                <ChevronLeft className='!h-4 !w-4' />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className='mr-32'>
            <p>{isExpanded ? 'Hide Review' : 'Show Revision'}</p>
          </TooltipContent>
        </Tooltip>
      ) : null
    }
  }
]

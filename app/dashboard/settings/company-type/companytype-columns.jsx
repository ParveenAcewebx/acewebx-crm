'use client'

import { errorMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Edit, Trash2 } from 'lucide-react'
export const CompanyTypeColumns = (
  handleDeleteCompanyType,
  handleEditCompanyType
) => [
  {
    id: 'id',
    header: 'Id',
    cell: ({ row }) => row?.original?.id
  },
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => row?.original?.name
  },
  {
    accessorKey: 'backgroundColor',
    header: 'BackgroundColor',
    cell: ({ row }) => {
      const color = row?.original?.backgroundColor || '#ffffff'
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
    accessorKey: 'sortOrder',
    header: 'Sort Order',
    cell: ({ row }) => row?.original?.sortOrder
  },
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <div className='flex space-x-2'>
            {/* Edit Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-green-600 hover:bg-green-50'
                  onClick={() => handleEditCompanyType(row)}
                >
                  <Edit className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            {/* Delete Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* Wrapper div allows tooltip to work even if button is disabled */}
                <div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-red-600 hover:bg-red-50'
                    disabled={row?.original?.id === 1}
                    onClick={() => {
                      if (row?.original?.id === 1) {
                        errorMessage({
                          description: 'This record cannot be deleted.'
                        })
                        return
                      }
                      handleDeleteCompanyType(row)
                    }}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {row?.original?.id === 1
                  ? 'This record cannot be deleted.'
                  : 'Delete'}
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      )
    }
  }
]

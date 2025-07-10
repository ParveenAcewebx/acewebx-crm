'use client'

import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'

export const PipelineStatusColumns = (handleDeleteLeads, handleEditLeads) => [
  // {
  //   accessorKey: 'id',
  //   header: 'Id',
  //   cell: ({ row }) => row?.original?.id
  // },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    accessorKey: 'materialType',
    header: 'Pipeline Type',
    cell: ({ row }) => row.original.materialType
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const statuses = row.original.statusGroup?.pipelineStatus || []
      return (
        <div className='flex gap-2 max-w-2xl flex-wrap'>
          {statuses.map((s, index) => (
            <span
              key={s.id}
              className='rounded-xl text-theme-color font-medium'
            >
              {s.status}{index < statuses.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      )
    }
  },
  
  {
    accessorKey: 'action',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className='grid'>
          <div className='flex space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              className='text-green-600 hover:bg-green-50'
              onClick={() => handleEditLeads(row)}
            >
              <Edit className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-red-600 hover:bg-red-50'
              onClick={() => handleDeleteLeads(row)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )
    }
  }
]

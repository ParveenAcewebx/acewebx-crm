'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Trash2 } from 'lucide-react'

export const ticketColumn = (handleDeleteTask, handleEditTask) => [
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <EllipsisVertical className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => handleEditTask(row)}
                className='cursor-pointer text-green-600'
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteTask(row)}
                className='cursor-pointer text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant='ghost'
            size='icon'
            className='text-green-600 hover:bg-green-300'
            onClick={() => handleEditTask(row)}
          >
            <Edit className='h-5 w-5' />
          </Button>
        </>
      )
    }
  },
  {
    id: 'ticketName',
    header: 'Ticket Name',
    cell: ({ row }) =>
      `#${row.original.lead_id}-Leadname | Piplene |${row.original.pipelineStatus.name}`
  },

  {
    id: 'ticketGroup',
    header: 'Ticket Group',
    cell: ({ row }) => row.original.ticketGroup?.name
  },
  {
    accessorKey: 'ticketStatus',
    header: 'Ticket Status',
    cell: ({ row }) => row.original?.ticketStatus?.title
  },
  {
    accessorKey: 'ticketSubject',
    header: 'Ticket Subject',
    cell: ({ row }) => row.original.ticketSubject?.name
  },
  {
    accessorKey: 'project',
    header: 'Project',
    cell: ({ row }) => row.original?.project?.name
  },

  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => row.original?.company?.name
  },

  {
    accessorKey: 'user',
    header: 'Assigned User',
    cell: ({ row }) => row.original?.ticketUsers?.map(item => item?.user?.name)
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => new Date(row.original?.updated_at).toLocaleDateString()
  },
  {
    accessorKey: 'lead_tags',
    header: 'Lead Tag',
    cell: ({ row }) => row.original?.lead_tags?.map(item => item.tag?.title)
  },
  {
    accessorKey: 'ticketUrgencyId',
    header: 'Ticket Urgency',
    cell: ({ row }) => row.original?.ticketUrgency?.name
  }
]

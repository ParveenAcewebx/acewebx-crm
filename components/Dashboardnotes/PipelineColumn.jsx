'use client'

import { formatDistanceToNow } from 'date-fns'

export const pipelineColumn = ({ editData }) => [
  //   {
  //     accessorKey: 'currentPipeline',
  //     header: 'Current Pipeline',
  //     cell: ({ row }) => {
  //       return (
  //         <span>{row.original?.someField || editData?.pipelineType?.name}</span>
  //       )
  //     }
  //   },

  {
    accessorKey: 'Pipeline',
    header: 'Pipeline',
    cell: ({ row }) => row?.original?.sales_pipeline?.name
  },
  {
    accessorKey: 'Status',
    header: 'From Status',
    cell: ({ row }) => row?.original?.to_status?.name
  },
  {
    accessorKey: 'Status',
    header: 'To Status',
    cell: ({ row }) => row?.original?.from_status?.name
  },
  {
    accessorKey: 'updatedBy',
    header: 'Updated By',
    cell: ({ row }) => row?.original?.user?.name
  },
  {
    accessorKey: 'assignTo',
    header: 'Assigned To',
    cell: ({ row }) => row?.original?.assigned_user?.name
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => row?.original?.notes
  },

  {
    accessorKey: 'update',
    header: 'Updated',
    cell: ({ row }) => {
      return (
        <>
          {formatDistanceToNow(new Date(row?.original?.updated_at), {
            addSuffix: true
          })}
        </>
      )
    }
  }
]

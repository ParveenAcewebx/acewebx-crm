// components/tables/InventoryColumns.js

import FormInputField from '@/components/share/form/FormInputField'

export const InventoryRecevingColumns = handleRowClick => [
  {
    accessorKey: 'line',
    header: 'Line',
    cell: ({ row, index }) => (
      <button
        onClick={() => handleRowClick(row.original)}
        className='hover:text-blue-800'
      >
        00{row.index + 1}
      </button>
    )
  },

  {
    accessorKey: 'item',
    header: 'Item Number',
    cell: ({ row }) => row.original.item
  },
  {
    accessorKey: 'desc',
    header: 'Description',
    cell: ({ row }) => row.original.description
  },
  {
    accessorKey: 'qtyOrdered',
    header: 'Quantity Ordered',
    cell: ({ row }) => row.original.order
  },
  {
    accessorKey: 'uom',
    header: 'U/M',
    cell: ({ row }) => row.original.uom
  },
  {
    accessorKey: 'qtyReceived',
    header: 'Quantity Received',
    cell: ({ row }) => (
      <FormInputField
        name='qtyReceived'
        type='number'
        max={row.original.order} // dynamically set max
      />
    )
  },
  {
    accessorKey: 'receivedToDate',
    header: 'Received To Date',
    cell: ({ row }) => row.original.receToDate
  },
  {
    accessorKey: 'qtyBilled',
    header: 'Quantity Billed',
    cell: ({ row }) => row.original.qtyBilled
  },
  {
    accessorKey: 'manualBilled',
    header: 'Manual B/O?',
    cell: ({ row }) => row.original.bo
  },
  {
    accessorKey: 'receivedExt',
    header: 'Received Extension',
    cell: ({ row }) => row.original.receivedExt
  },
  {
    accessorKey: 'expectDate',
    header: 'Expect Date',
    cell: ({ row }) => row.original.exptDate
  }
]

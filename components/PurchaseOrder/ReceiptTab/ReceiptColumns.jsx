export const Receiptcolumns = ({ onOpenPanel }) => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const index = row?.original?.id
      return (
        <span
          className='cursor-pointer text-blue-500 hover:underline'
          onClick={() => onOpenPanel(row.original, index)}
        >
        {index}
     </span>
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'order',
    header: 'Order'
  }
]

import { DataTable } from '@/components/Table'
import { useState } from 'react'
import { Receiptcolumns } from './ReceiptColumns'
import ReceiptTabPanel from './ReceiptPanel'

const ReceiptTab = form => {
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  const getList = [
    { name: 'abc', id: '1', order: '123' },
    { name: 'xyz', id: '2', order: '456' }
  ]

  const columns = Receiptcolumns({
    onOpenPanel: (rowData, index) => {
      setSelectedRow(rowData)
      setSelectedIndex(index)
      setOpenDrawer(true)
    }
  })

  return (
    <div>
      <DataTable data={getList} columns={columns} />
      {selectedRow !== null && (
        <ReceiptTabPanel
          index={selectedIndex}
          form={form}
          open={openDrawer}
          setOpen={setOpenDrawer}
        />
      )}
    </div>
  )
}

export default ReceiptTab

import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DataTable } from '../Table'
import { SalesOrderColumn } from './salesOrderColumn'

const SalesOrderTable = ({ editId }) => {
  const methods = useForm()
  const [loading, setLoading] = useState(false)
  const [getList, setGetList] = useState([])
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)
  const [totalRecord, setTotalRecord] = useState()
  const router = useRouter()
  useEffect(() => {
    const fetchSalesOrderData = async () => {
      try {
        const response = await api.get(`get-material-quote-list/${editId}`)

        setGetList(response?.data?.data?.data)
        setTotalRecord(response?.data?.data?.total)
      } catch (error) {}
    }
    fetchSalesOrderData()
  }, [page, length])
  const handleEditSalesOrder = row => {
    router.push(`/dashboard/sales-order/list/edit?id=${row?.original?.id}`)
  }
  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'length') {
        const val = value.length
        setLength(val === 'all' ? totalRecord || 9999 : Number(val))
        setPage(1)
      }
    })
    return () => subscription.unsubscribe()
  }, [methods, totalRecord])
  return (
    <>
      <DataTable
        data={getList}
        loading={loading}
        columns={SalesOrderColumn(handleEditSalesOrder)}
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />
    </>
  )
}

export default SalesOrderTable

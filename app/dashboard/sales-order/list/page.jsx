'use client'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import MaterialQuotesService from '@/services/Leads/material'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DialogBox from '@/components/modal/DialogBox'
import { SalesColumn } from './sales-column'

const MaterialQuotesList = () => {
  const methods = useForm()
  const [salesOrder, setSalesOrder] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const router = useRouter()
  // function to get the sales order list
  const fetchSalesOrder = async () => {
    try {
      const response = await MaterialQuotesService.getMaterialQuotesList(length, page)
      if (response.status === 200) {
        setLoading(true)
        setSalesOrder(response.data.data)
        setTotalRecord(response?.data?.meta?.total)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSalesOrder()
  }, [page, length])

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res =
          await MaterialQuotesService.deleteMaterialQuoteById(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          fetchSalesOrder()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  // handler to delete the Sales Order
  const handleDeleteSalesOrder = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  // handler redirect to the Edit Form
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
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='All Sales Order' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/sales-order/add`)}
        >
          <Plus />
          Add Sales Order
        </Button>
      </div>
      <DataTable
        data={salesOrder}
        loading={loading}
        columns={SalesColumn(handleDeleteSalesOrder, handleEditSalesOrder)}
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />
      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
    </>
  )
}

export default MaterialQuotesList

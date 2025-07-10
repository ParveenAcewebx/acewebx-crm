'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import PurchaseOrderService from '@/services/PurchaseOrder/purchase-order'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PurchaseOrderColumn } from './purchase-column'

const PrchaseOrderList = () => {
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [searchFilter, setSearchFilter] = useState(null)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const router = useRouter()
  const fetchPurchaseOrder = async () => {
    try {
      const response = await PurchaseOrderService.getPurchaseorder(page, length)
      console.log("responseresponseresponse",response)
      if (response?.status == 200) {
        setList(response?.data?.data)
        setTotalRecord(response?.data?.data?.length)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPurchaseOrder()
  }, [page, length])
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await PurchaseOrderService.deletePurchaseorder(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          fetchPurchaseOrder()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleDeletePurchase = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  const handleEditPurchase = row => {
    router.push(`/dashboard/purchase-order/edit?id=${row.original.id}`)
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='All Purchase Order' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/purchase-order/add`)}
        >
          <Plus />
          Add Purchase Order
        </Button>
      </div>
      <DataTable
        data={getList}
        loading={loading}
        columns={PurchaseOrderColumn(handleDeletePurchase, handleEditPurchase)}
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

export default PrchaseOrderList

'use client'
import LayoutHeader from '@/components/layoutHeader'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import InventoryServices from '@/services/Inventory/Inventory'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { WarehouseColumns } from './warehouse-columns'
import DialogBox from '@/components/modal/DialogBox'

const WarehouseList = () => {
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [deleteIndex, setDeleteIndex] = useState(null)

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  console.log('totalRecord', totalRecord)

  const getAllList = async () => {
    try {
      setLoading(true)
      const res = await InventoryServices.AllWarehouse(page, length)
      if (res?.status === 200) {
        console.log('res---all', res)
        setList(res.data.data)
        setTotalRecord(res.data.meta.total)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllList()
  }, [page, length])

  // delete budget
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await InventoryServices.deleteWarehouse(deleteIndex)
        console.log('res', res)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          successMessage({ description: res?.data?.message })
          getAllList()
        }
      } catch (error) {
        console.log('error', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteContact = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditContact = row => {
    router.push(`/dashboard/inventory/warehouse/edit?id=${row.original.id}`)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
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
        <LayoutHeader pageTitle='Warehouse List' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/inventory/warehouse/add`)}
        >
          <Plus />
          Add Warehouse
        </Button>
      </div>

      <FormProvider {...methods}>
        <FormSelectField
          name='length'
          className='h-10 w-28'
          form={methods}
          options={LengthData}
        />
      </FormProvider>
      <DataTable
        data={getList}
        loading={loading}
        columns={WarehouseColumns(handleDeleteContact, handleEditContact)}
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

export default WarehouseList

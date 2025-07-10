'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { TermsCodesServices } from '@/services/Settings/TermsCodes'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ReceiverColumns } from './receiver-columns'
import { ReceiverServices } from '@/services/Settings/receiver'

const ReceiverList = () => {
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
  const getListReceiver = async () => {
    try {
      setLoading(true)
      const res = await ReceiverServices.GetAllReceiver(page, length)
      if (res?.status === 200) {
        setList(res?.data?.data?.records)
        setTotalRecord(res?.data?.data?.total_records)
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
    getListReceiver()
  }, [page, length])

  // delete budget
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await ReceiverServices.deleteReceiver(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          successMessage({ description: res?.data?.message })
          getListReceiver()
        }
      } catch (error) {
        console.log('error', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
   // delete table row
  const handleDeleteReceiver = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }

  // edit table row
  const handleEditReceiver = row => {
    router.push(`/dashboard/settings/receiver/edit?id=${row.original.id}`)
  }

  // delete modal close
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
        <LayoutHeader pageTitle='Receiver List' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/settings/receiver/add`)}
        >
          <Plus />
          Add Receiver
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
        columns={ReceiverColumns(handleDeleteReceiver, handleEditReceiver)}
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

export default ReceiverList

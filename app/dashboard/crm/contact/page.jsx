'use client'
import LayoutHeader from '@/components/layoutHeader'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { ContactServices } from '@/services/Crm/project'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ContactPreview from './ContactPreview'
import { contactsColumnsBudget } from './contacts-columns'
import DialogBox from '@/components/modal/DialogBox'

const Contacts = () => {
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [previewData, setPreviewData] = useState([])
  const [openPreview, setOpenPreview] = useState(false)
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  const getListBudgetBook = async () => {
    try {
      setLoading(true)
      const res = await ContactServices.getAllContact(page, length)
      if (res?.status === 200) {
        console.log('res---all', res)
        setList(res.data.data)
        setTotalRecord(res.data.meta.total)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListBudgetBook()
  }, [page, length])

  // delete budget
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await ContactServices.deleteContact(deleteIndex)
        console.log('res', res)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          successMessage({ description: res?.data?.message })
          getListBudgetBook()
        }
      } catch (error) {
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
    router.push(`/dashboard/crm/contact/edit?id=${row.original.id}`)
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

  const handleOpenPreview = () => {
    setOpenPreview(false)
  }
  const handlePreviewOpen = row => {
    const Data = getList?.filter(item => item?.id == row?.original?.id)
    if (Data) {
      setOpenPreview(true)
      setPreviewData(Data)
    }
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Contact List' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/crm/contact/add`)}
        >
          <Plus />
          Add Contacts
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
        columns={contactsColumnsBudget(
          handleDeleteContact,
          handleEditContact,
          handlePreviewOpen
        )}
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
      <ContactPreview
        previewData={previewData}
        openPreview={openPreview}
        handleOpenPreview={handleOpenPreview}
      />
    </>
  )
}

export default Contacts

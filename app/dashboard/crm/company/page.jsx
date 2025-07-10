'use client'
import LayoutHeader from '@/components/layoutHeader'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CompanyColumns } from './company-columns'
import CompanyPreview from './CompanyPreview'
import DialogBox from '@/components/modal/DialogBox'
import CompaniesServices from '@/services/Crm/company'

const Contacts = () => {
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [openPreview, setOpenPreview] = useState(false)
  const [previewData, setPreviewData] = useState([])
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  const getListBudgetBook = async () => {
    try {
      setLoading(true)
      const res = await CompaniesServices.companies(page, length)
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
    getListBudgetBook()
  }, [page, length])

  // delete budget
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await CompaniesServices.deleteCompanies(deleteIndex)
        console.log('res', res)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          successMessage({ description: res?.data?.message })
          getListBudgetBook()
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
    router.push(`/dashboard/crm/company/edit?id=${row.original.id}`)
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
        <LayoutHeader pageTitle='Company List' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/crm/company/add`)}
        >
          <Plus />
          Add Company
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
        columns={CompanyColumns(
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

      <CompanyPreview
        previewData={previewData}
        openPreview={openPreview}
        handleOpenPreview={handleOpenPreview}
      />
    </>
  )
}

export default Contacts

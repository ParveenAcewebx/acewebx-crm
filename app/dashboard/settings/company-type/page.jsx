'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { CompanyTypeServices } from '@/services/Crm/company'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CompanyTypeColumns } from './companytype-columns'

const Contacts = () => {
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [deleteIndex, setDeleteIndex] = useState(null)

  console.log('getListgetList', getList)
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  console.log('totalRecord', totalRecord)


  // get all list of company type
  const getAllList = async () => {
    try {
      setLoading(true)
      const res = await CompanyTypeServices.allCompaniesType(page, length)
      if (res?.status === 200) {
        console.log('res---all', res)
        setList(res.data.data)
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
        const res = await CompanyTypeServices.deleteCompaniesType(deleteIndex)
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

  // delete table row
  const handleDeleteCompanyType = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }

  // edit table row
  const handleEditCompanyType = row => {
    router.push(`/dashboard/settings/company-type/edit?id=${row.original.id}`)
  }

  // close delete modal
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
        <LayoutHeader pageTitle='Company Type List' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/settings/company-type/add`)}
        >
          <Plus />
          Add Company Type
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
        columns={CompanyTypeColumns(
          handleDeleteCompanyType,
          handleEditCompanyType
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
    </>
  )
}

export default Contacts

'use client'
import AddBrand from '@/components/ItemSettings/Brands/AddBrand'
import EditBrand from '@/components/ItemSettings/Brands/EditBrands'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import LeadSettingModal from '@/components/modal/LeadsettingModal'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import ItemSettingsServices from '@/services/Settings/ItemSettings'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LeadInteractionColumns } from '../../lead-settings/interaction-type/interaction-columns'

const BrandsList = () => {
  const [editData, setEditData] = useState(null)
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [OpenModal, setOpenModal] = useState(false)

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  console.log('totalRecord', totalRecord)
  const getAllList = async () => {
    try {
      setLoading(true)
      const res = await ItemSettingsServices.AllBrands(page, length)
      if (res?.status === 200) {
        console.log('res---all', res)
        setList(res.data.data)
        setTotalRecord(res.data.meta.total)
        setEditData(null)
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
        const res = await ItemSettingsServices.deleteBrands(deleteIndex)
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
    setEditData(row.original) // store row data
    setOpenModal(true)
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

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleModalClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Brand List' />
        <Button className='site-button' onClick={handleOpenModal}>
          <Plus />
          Add Brand
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
        columns={LeadInteractionColumns(handleDeleteContact, handleEditContact)}
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
      <LeadSettingModal
        submitOpenModal={OpenModal}
        submitHandleModalClose={() => {
          setOpenModal(false)
          setEditData(null)
        }}
        description={
          editData ? (
            <EditBrand
              handleModalClose={handleModalClose}
              getAllList={getAllList}
              editData={editData}
            />
          ) : (
            <AddBrand
              handleModalClose={handleModalClose}
              getAllList={getAllList}
            />
          )
        }
        message={editData ? 'Edit Brand' : 'Add Brand'}
      />
    </>
  )
}

export default BrandsList

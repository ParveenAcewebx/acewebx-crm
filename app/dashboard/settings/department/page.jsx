'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import LeadSettingModal from '@/components/modal/LeadsettingModal'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import NewDepartmentServices from '@/services/Settings/department'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DepartmentColumns } from './department-columns'
import AddDepartment from './Department/DepartmentAdd'
import EditDepartment from './Department/EditDepartment'

const AllDepartmentList = () => {
  useDocumentTitle('All Department')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [length, setLength] = useState(10)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [OpenModal, setOpenModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  // get all department list
  const getListDepartment = async () => {
    try {
      setLoading(true)
      const res = await NewDepartmentServices.AllNewDeapartment(page, length)
      if (res?.status === 200) {
        setList(res?.data?.data?.data)
        setTotalRecord(res?.data?.data?.total)
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
    getListDepartment()
  }, [page, length])

  // delete budget
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res =
          await NewDepartmentServices.deleteNewDeapartment(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          successMessage({ description: res?.data?.message })
          getListDepartment()
        }
      } catch (error) {
        console.log('error', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteDepartment = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  // edit table row
  const handleEditDepartment = row => {
    setEditId(row?.original?.id)
    setOpenModal(true) // open modal
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
  const handleModalClose = () => {
    setOpenModal(false)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Department List' />
        <Button className='site-button' onClick={handleOpenModal}>
          <Plus />
          Add Deapartment
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
        columns={DepartmentColumns(
          handleDeleteDepartment,
          handleEditDepartment
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

      <LeadSettingModal
        submitOpenModal={OpenModal}
        submitHandleModalClose={() => {
          setOpenModal(false)
          setEditId(null)
        }}
        description={
          editId ? (
            <EditDepartment
              handleModalClose={handleModalClose}
              getListDepartment={getListDepartment}
              id={editId}
            />
          ) : (
            <AddDepartment
              handleModalClose={handleModalClose}
              getListDepartment={getListDepartment}
            />
          )
        }
        message={editId ? 'Edit Department' : 'Add Department'}
      />
    </>
  )
}

export default AllDepartmentList

'use client'
import DialogBox from '@/components/modal/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import AddLeadsTag from '@/components/LeadSetting/LeadTag/AddLeadTag'
import EditLeadTag from '@/components/LeadSetting/LeadTag/EditLeadTag'
import LeadSettingModal from '@/components/modal/LeadsettingModal'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import LeadsSettingServices from '@/services/Settings/LeadSetting'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LeadSettingsColumns } from '../leads-columns'

const LeadsTag = () => {
  const [editData, setEditData] = useState(null)
  useDocumentTitle('Leads Tag')
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [length, setLength] = useState(10)
  const [OpenModal, setOpenModal] = useState(false)

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
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

  const getListLeads = async () => {
    try {
      setLoading(true)
      const res = await LeadsSettingServices.getTags(page, length)
      if (res?.status === 200) {
        setList(res?.data?.data)
        setTotalRecord(res?.data?.meta?.total)
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
    getListLeads()
  }, [page, length])

  // delete table row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await LeadsSettingServices.deleteTagsById(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getListLeads()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteLeads = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditLeads = row => {
    setEditData(row.original) // store row data
    setOpenModal(true) // open modal
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleModalClose = () => {
    setOpenModal(false)
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Lead Tags List' />
        <Button className='site-button' onClick={handleOpenModal}>
          <Plus />
          Add Tags
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
        columns={LeadSettingsColumns(handleDeleteLeads, handleEditLeads)}
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
            <EditLeadTag
              handleModalClose={handleModalClose}
              getListLeads={getListLeads}
              editData={editData}
            />
          ) : (
            <AddLeadsTag
              handleModalClose={handleModalClose}
              getListLeads={getListLeads}
            />
          )
        }
        message={editData ? 'Edit Leads Tags' : 'Add Leads Tag'}
      />
    </>
  )
}

export default LeadsTag

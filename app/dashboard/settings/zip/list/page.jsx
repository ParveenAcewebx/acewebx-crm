'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import LeadSettingModal from '@/components/modal/LeadsettingModal'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import AddZipCode from '@/components/Zip/AddZip'
import { ZipCodeServices } from '@/services/Settings/ZipCode'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ZipColumn } from './zipColumn'

const ZipList = () => {
  const [getList, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [length, setLength] = useState(10)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [submitOpenModal, setSubmitOpenModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  const fetchZipCode = async () => {
    try {
      const response = await ZipCodeServices.GetAllZipCode(page, length)
      if (response.status === 200) {
        setList(response?.data?.data)
        setTotalRecord(response?.data?.meta?.total)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchZipCode()
  }, [page, length])
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await ZipCodeServices.deleteZipCode(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          fetchZipCode()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteScope = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  const handleEditScope = row => {
    if (row?.original?.id) {
      const filterData = getList.filter(item => item.id === row?.original?.id)
      setEditData(filterData[0])
      setSubmitOpenModal(true)
    }
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
  const handleOpenTagModal = () => {
    setSubmitOpenModal(true)
    setEditData(null)
  }
  const submitHandleModalClose = () => {
    setSubmitOpenModal(false)
  }
  return (
    <>
      <div>
        <div className='mb-3 flex items-center justify-between'>
          <LayoutHeader pageTitle='Zip Code' />
          <Button className='site-button' onClick={handleOpenTagModal}>
            <Plus />
            Add Zip Code
          </Button>
        </div>
        <DataTable
          columns={ZipColumn(handleDeleteScope, handleEditScope)}
          data={getList}
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
          loading={loading}
        />
        <DialogBox
          onDelete={onDelete}
          description='Are you certain you want to proceed with this deletion?'
          deleteOpenModal={deleteOpenModal}
          deleteHandleModalClose={deleteHandleModalClose}
        />

        <LeadSettingModal
          submitOpenModal={submitOpenModal}
          onOpenChange={isOpen => {
            setSubmitOpenModal(isOpen)
            if (!isOpen) {
              setEditData(null) // clear form when modal closes
            }
          }}
          submitHandleModalClose={submitHandleModalClose}
          description={
            <AddZipCode
              setSubmitOpenModal={setSubmitOpenModal}
              fetchZipCode={fetchZipCode}
              editData={editData}
            />
          }
          message={editData ? 'Edit Zip Code' : 'Add Zip Code'}
        />
      </div>
    </>
  )
}

export default ZipList

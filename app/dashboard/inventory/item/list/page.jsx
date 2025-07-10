'use client'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { MaterialService } from '@/services/Leads/material'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MaterialItemColumn } from './material-column'
import DialogBox from '@/components/modal/DialogBox'

const MaterialList = () => {
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const router = useRouter()
  const fetchUser = async () => {
    try {
      const response = await MaterialService.getMaterialList(length, page)
      if (response.status === 200) {
        setLoading(true)
        setUser(response.data.data)
        setTotalRecord(response?.data?.meta?.total)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [page, length])

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await MaterialService.deleteMaterialById(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          fetchUser()
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
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleEditLeads = row => {
    router.push(`/dashboard/inventory/item/list/edit?id=${row?.original?.id}`)
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
        <LayoutHeader pageTitle='All Item' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/inventory/item/add`)}
        >
          <Plus />
          Add Item
        </Button>
      </div>
      <DataTable
        data={user}
        loading={loading}
        columns={MaterialItemColumn(handleDeleteLeads, handleEditLeads)}
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

export default MaterialList

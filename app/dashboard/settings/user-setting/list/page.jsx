'use client'
import DialogBox from '@/components/modal/DialogBox'
import LeadSettingModal from '@/components/modal/LeadsettingModal'
import UserServices from '@/services/Settings/UserSetting'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import EditUser from '@/components/UserSetting/EditUser'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserSettingColumn } from './user-column'
import LayoutHeader from '@/components/layoutHeader'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const UserList = () => {
  const methods = useForm()
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [submitOpenModal, setSubmitOpenModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const router = useRouter()
  const fetchUser = async () => {
    try {
      const response = await UserServices.GetAllUser(page, length)
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
        const res = await UserServices.deleteUserById(deleteIndex)
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
    if (row?.original?.id) {
      const filterData = user.filter(item => item.id === row?.original?.id)
      setEditData(filterData[0])
      setSubmitOpenModal(true)
    }
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

  const submitHandleModalClose = () => {
    setSubmitOpenModal(false)
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='All Users' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/settings/user-setting/add`)}
        >
          <Plus />
          Add User
        </Button>
      </div>
      <DataTable
        data={user}
        loading={loading}
        columns={UserSettingColumn(handleDeleteLeads, handleEditLeads)}
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
        submitOpenModal={submitOpenModal}
        onOpenChange={isOpen => {
          setSubmitOpenModal(isOpen)
          if (!isOpen) {
            setEditData(null) // clear form when modal closes
          }
        }}
        submitHandleModalClose={submitHandleModalClose}
        description={
          <EditUser
            setSubmitOpenModal={setSubmitOpenModal}
            fetchUser={fetchUser}
            editData={editData}
          />
        }
        message={'Edit User'}
      />
    </>
  )
}

export default UserList

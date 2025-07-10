'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import { DataTable } from '@/components/Table'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import BudgetScopeService from '@/services/BudgetBook/Budget-scope-api'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScopeColumn } from './scopeColumn'

const ScopeList = () => {
  const [getList, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [length, setLength] = useState(10)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const router = useRouter()
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })
  const fetScopeList = async () => {
    try {
      const response = await BudgetScopeService.GetAllScopes(page, length)
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
    fetScopeList()
  }, [page, length])

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await BudgetScopeService.deleteScopeById(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          fetScopeList()
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
    setDeleteIndex(row?.original?.id)
    setDeleteOpenModal(true)
  }

  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleEditScope = row => {
    router.push(
      `/dashboard/settings/budget-book-setting/edit?id=${row?.original?.id}`
    )
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
  console.log('getList', getList)
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Scope' />
        <Button
          className='site-button'
          onClick={() =>
            router.push(`/dashboard/settings/budget-book-setting/scope`)
          }
        >
          <Plus />
          Add Scope
        </Button>
      </div>
      <DataTable
        data={getList}
        loading={loading}
        columns={ScopeColumn(handleDeleteScope, handleEditScope)}
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

export default ScopeList

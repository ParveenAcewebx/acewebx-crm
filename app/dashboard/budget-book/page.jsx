'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import BudgetBookService from '@/services/BudgetBook/budget-book-api'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { columnsBudget } from './budget-book-columns'

const AllInventory = () => {
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const [deleteIndex, setDeleteIndex] = useState(null)
  const length = 10

  const getListBudgetBook = async () => {
    try {
      setLoading(true)
      const res = await BudgetBookService.projects(page, length)
      if (res?.status === 200) {
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
        const res = await BudgetBookService.deleteBudgetById(deleteIndex)
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
  const handleDeleteBudget = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditBudget = row => {
    router.push(`/dashboard/budget-book/edit?id=${row.original.id}`)
  }
  const handleQuotesBudget = row => {
    router.push(`/dashboard/budget-book/preview?id=${row.original.id}`)
  }
  const handleCoverBudget = row => {
    router.push(`/dashboard/budget-book/pdf?id=${row.original.id}`)
  }
  const handleVePrintBudget = row => {
    router.push(`/dashboard/budget-book/ve-option?id=${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  // Quote Detail
  const handleSendQuote = async row => {
    try {
      const data = {
        id: row?.original?.lead?.id,
        budgetId: row?.original?.id,
        link: `/quotes-preview/preview?id=${row?.original?.id}&custm=${row?.original?.lead?.secretId}`,
        email: row?.original?.contact_email
      }
      const response = await api.post(`/send-link-mail`, data)
      if (response?.status == 200) {
        successMessage({ description: response?.data?.message })
      }
    } catch (error) {}
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Budget Book' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/budget-book/add`)}
        >
          <Plus />
          Add Budget Book
        </Button>
      </div>
      <DataTable
        data={getList}
        loading={loading}
        columns={columnsBudget(
          handleDeleteBudget,
          handleEditBudget,
          handleCoverBudget,
          handleQuotesBudget,
          handleVePrintBudget,
          handleSendQuote
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

export default AllInventory

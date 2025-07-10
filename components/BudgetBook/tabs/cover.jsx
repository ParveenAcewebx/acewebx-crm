'use client'

import { DataTable } from '@/components/Table'
import api from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CoverColumn } from './cover-column'

export default function BudgetCoverTab({
  hideShowMap,
  revisionID,
  handleHideShow
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const budgetId = searchParams.get('id')
  const [getList, setList] = useState([])

  const fetchCoverData = async () => {
    try {
      const response = await api?.get(`/projects/budget-history/${budgetId}`)
      if (response?.status === 200) {
        const data = response?.data?.data?.budgetHistory || []

        const filteredData = data.filter(item => item?.revision_status == 1)
        setList(filteredData)
      }
    } catch (err) {
      console.error('Error fetching budget history:', err)
    }
  }

  useEffect(() => {
    fetchCoverData()
  }, [hideShowMap, revisionID, handleHideShow])

  const handlePreviewLeads = async row => {
    router.push(`/dashboard/budget-book/cover-preview?id=${row?.original?.id}`)
  }
  return (
    <>
      <DataTable data={getList} columns={CoverColumn(handlePreviewLeads)} />
    </>
  )
}

'use client'

import LayoutHeader from '@/components/layoutHeader'
import LeadsServices from '@/services/Leads/lead'
import { errorMessage } from '@/components/ToasterMessage'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { DashboardLeadTabs } from '@/components/ViewPage/dashboard-lead-tabs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


const LeadDashboard = () => {
  useDocumentTitle('View Lead Dashboard')
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get('id')

  const [leadData, setLeadData] = useState([])
  const [loading, setLoading] = useState(true)
  //   const form = useForm({})
  const fetchLeadById = async () => {
    try {
      setLoading(true)
      const response = await LeadsServices.getleadById(editId)
  
      if (response.status === 200) {
        if (response?.data?.status === true) {
          setLeadData(response?.data?.data)
        } else {
          errorMessage({ description: response?.data?.message })
        }
      }
    } catch (err) {
      if (err) {
        errorMessage({
          description: err?.response?.data?.message || err?.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (editId) {
      fetchLeadById()
    }
  }, [editId])

  return (
    <>
      <LayoutHeader pageTitle={'Lead'} />

      <DashboardLeadTabs editData={leadData} editId={editId} fetchLeadById={fetchLeadById}/>
    </>
  )
}

export default LeadDashboard

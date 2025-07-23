
'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Card, CardContent } from '@/components/ui/card'
import Candidate from '@/services/cadidateApis/CandidateApi'
import SalesCandidate from '@/services/cadidateApis/SalesCandidateApi'
import LayoutHeader from '@/components/layoutHeader'
import DcsModal from '@/components/modal/dscForm'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import ActivitiesList from '@/components/ActivitiesList'
import ChatCompo from '../../sales-chat/Chat'
import EditSalesJobApplication from '../../SalesCandidateEdit'

function Page({params}) {
  const router = useRouter()
  // useDocumentTitle('View Lead Dashboard')
  const id = params?.id
  const editId = id
  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal

  const [candidateData, setCandidateData] = useState({})
  const [candidateUrl, setCandidateUrl] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const handleGetApi = async () => {
    try {
      const apiData = await SalesCandidate.viewSalesCandidate(editId)
      setCandidateData(apiData?.data?.data)
    } catch (error) {
      console.error('API error', error)
    }
  }
  useEffect(() => {
    if (id) {
      handleGetApi()
    }
  }, [id, router])

  // document popup:-
  const handleClickOpen = async () => {
    try {
      const apiData = await Candidate.viewCandidate(id)
      setCandidateUrl(apiData?.data?.data?.meta?._resume)
    } catch (error) {
      console.error('API error', error)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const percent = Math.round(((candidateData?.expectedSalary - candidateData?.currentSalary) * 100) / candidateData?.currentSalary)

  const [candidateBusiness, setCandidateBusiness] = useState([])
  const [candidateShifts, setCandidateShifts] = useState([])
  const [candidatePlatForm, setCandidatePlatForm] = useState([])


  useEffect(() => {

    if (candidateData?.businessMethods) {

      const candidateBusi = JSON?.parse(candidateData?.businessMethods)
      setCandidateBusiness(candidateBusi)
    }
    if (candidateData?.preferredShift) {

      const candidateShift = JSON?.parse(candidateData?.preferredShift)
      setCandidateShifts(candidateShift)
    }
    if (candidateData?.leadPlatforms) {

      const PlatForm = JSON?.parse(candidateData?.leadPlatforms)
      setCandidatePlatForm(PlatForm)
    }
  }, [candidateData?.businessMethods, candidateData?.leadPlatforms, candidateData?.preferredShift])


  const dosOpenModal = (e) => {
    e.preventDefault()
    setDcsModalOpen(true)
  }



  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const candidateDataGetById = async id => {
    try {
      setLoading(true)
      const response = await SalesCandidate.salesCandidateGetById(id)
      if (response?.data?.status === true) {
        const resumePath = response?.data?.data?.resume
        setUrl(resumePath)
      }
    } catch (error) {
      console.error('Submission Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return
    candidateDataGetById(id)
  }, [id])

  // Activity :-
  const [activitiesData, setActivitiesData] = useState()

  const getActivities = async () => {
    try {
      const res = await SalesCandidate.activitySalesCandidate("candidateSales" , editId)
      console.log("res", res)
      if (res?.data?.status === true) {
        setActivitiesData(res?.data?.data)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    getActivities()
  }, [])

  const pathname = usePathname() 
  const currentTab = pathname?.endsWith('edit') ? 'edit' : 'detail'
  const handleTabChange = (value) => {
    router.replace(value) 
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Sales Candidate Deatils' />
      </div>
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b ' >
          <TabsList>
            <TabsTrigger className='rounded-none px-4 py-1.5 !shadow-none' value="detail">Details</TabsTrigger>
            <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="edit">Edit</TabsTrigger>
          </TabsList>
        </TabsList>
        <TabsContent value='detail'>
          {/* Top Section */}
     
        </TabsContent>
        <TabsContent value='edit'>
          <EditSalesJobApplication editId={editId} />
        </TabsContent>
      </Tabs>

    </>
  )
}

export default Page

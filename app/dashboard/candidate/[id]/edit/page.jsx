
'use client'

import React, { useEffect, useState } from 'react'
import {usePathname, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import Candidate from '@/services/cadidateApis/CandidateApi'
import DcsModal from '@/components/modal/dscForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CommonLayout from '@/components/CommonLayouyt'
import ActivitiesList from '@/components/ActivitiesList'
import EditCandidate from '../../EditCandidate'
import ChatCompo from '../../chat/Chat'

function Page({ params }) {
  const router = useRouter()
  const id = params?.id
  const editId = id

  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal
  const [candidateData, setCandidateData] = useState({})
  const [candidateShifts, setCandidateShifts] = useState([])
  const handleGetApi = async () => {
    try {
      const apiData = await Candidate.viewCandidate(editId)
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



  


  const percent = Math.round(((candidateData?.expectedSalary - candidateData?.currentSalary) * 100) / candidateData?.currentSalary)

  useEffect(() => {
    if (candidateData?.meta?._preferredShift) {

      const candidateShift = JSON?.parse(candidateData?.meta?._preferredShift)
      setCandidateShifts(candidateShift)
    }
  }, [candidateData?.meta?._preferredShift])

  const dosOpenModal = (e) => {
    e.preventDefault()
    setDcsModalOpen(true)
  }


  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const candidateDataGetById = async id => {
    try {
      setLoading(true)
      const response = await Candidate.candidateGetById(id)
      if (response?.data?.status === true) {
        const resumePath = response?.data?.data?.resume?.filePath
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

  const [activitiesData, setActivitiesData] = useState()

  const getActivities = async () => {
    try {
      const res = await Candidate.activityDevCandidate("candidates", editId)
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
      <CommonLayout pageTitle='Candidate Detail' />

      <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b ' >
        <TabsList>
          <TabsTrigger  className='rounded-none px-4 py-1.5 !shadow-none' value="detail">Details</TabsTrigger>
          <TabsTrigger  className='rounded-none p-1.5 px-4 !shadow-none' value="edit">Edit</TabsTrigger>
        </TabsList>
      </TabsList>

        <TabsContent value="detail">
        </TabsContent>
        <TabsContent value='edit'>
          <EditCandidate editId={editId} />
        </TabsContent>
      </Tabs>


    </>
  )
}

export default Page
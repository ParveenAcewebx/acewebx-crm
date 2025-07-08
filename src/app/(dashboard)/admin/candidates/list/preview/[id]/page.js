'use client'

import Candidate from '@/components/services/CandidateApi'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
  const { id } = useParams()
  const editId = id
  const [candidateData, setCandidateData] = useState([])

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
  }, [id])
  return (
    <div>
      {/* <h2>PDF Document Preview</h2> */}
      {candidateData?.meta?._resume ? (
        <iframe
          src={decodeURIComponent(`${process.env.NEXT_PUBLIC_API_BASE_URL}${candidateData?.meta?._resume}`)}
          width='100%'
          height='600px'
          title='PDF Preview'
        />
      ) : (
        <p>No document URL provided.</p>
      )}
    </div>
  )
}

export default Page

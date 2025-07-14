// 'use client'

// import LayoutHeader from '@/components/layoutHeader'
// import LeadsServices from '@/services/Leads/lead'
// import { errorMessage } from '@/components/ToasterMessage'
// import useDocumentTitle from '@/components/utils/useDocumentTitle'
// import { DashboardLeadTabs } from '@/components/ViewPage/dashboard-lead-tabs'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'


// const LeadDashboard = () => {
//   useDocumentTitle('View Lead Dashboard')
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const editId = searchParams.get('id')

//   const [leadData, setLeadData] = useState([])
//   const [loading, setLoading] = useState(true)
//   //   const form = useForm({})
//   const fetchLeadById = async () => {
//     try {
//       setLoading(true)
//       const response = await LeadsServices.getleadById(editId)
  
//       if (response.status === 200) {
//         if (response?.data?.status === true) {
//           setLeadData(response?.data?.data)
//         } else {
//           errorMessage({ description: response?.data?.message })
//         }
//       }
//     } catch (err) {
//       if (err) {
//         errorMessage({
//           description: err?.response?.data?.message || err?.message
//         })
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (editId) {
//       fetchLeadById()
//     }
//   }, [editId])

//   return (
//     <>
//       <LayoutHeader pageTitle={'Lead'} />

//       <DashboardLeadTabs editData={leadData} editId={editId} fetchLeadById={fetchLeadById}/>
//     </>
//   )
// }

// export default LeadDashboard
'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
// import Candidate from '@/components/services/CandidateApi'
// import CandidateChart from '@/components/CadidateChart'
// import DocumentVeiw from '@/components/DocumentVeiw'
// import ChatCompo from '@/components/ChatCompo'
// import TitleForPage from '@/components/TitleForPage'
import { Card, CardContent } from '@/components/ui/card'
import Candidate from '@/services/cadidateApis/CandidateApi'
import ChatCompo from '../chat/Chat'

function Page() {
  const router = useRouter()
  // useDocumentTitle('View Lead Dashboard')
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const editId = id
  const [candidateData, setCandidateData] = useState({})
  const [candidateUrl, setCandidateUrl] = React.useState('')
  const [open, setOpen] = React.useState(false)
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

  return (
    <div>
      {/* <TitleForPage title='Candidate Details' /> */}

      <section className='first-row'>
        <div className='user-name'>
          <span variant='h1'>{candidateData?.name}</span>
        </div>
        <div className='resume' onClick={handleClickOpen}>
          <div className='resmume-text'>
            <span variant='h2'>View Resume</span>
          </div>
          <img src='/images/pages/eye.png' alt='trophy image' height={11} />
        </div>
      </section>

      <section className='user-profile'>
        <div class='left-iteam'>
          <div className='first-section'>
            <Card className='box'>
              <CardContent>
                <img src='/images/pages/date.png' alt='trophy image' height={60} className='' />
                <div>
                  <span>Date of Birth*</span>
                  <span variant='h4'>{candidateData?.dob}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/gender.png' alt='trophy image' height={60} className='' />
                <div>
                  <span>Gender</span>
                  <span variant='h4'>{candidateData?.meta?._gender}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/number.png' alt='trophy image' height={60} className='' />
                <div>
                  <span>Contact Number</span>
                  <span variant='h4'>{candidateData?.phone}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/location.png' alt='trophy image' height={60} className='' />
                <div>
                  <span>Current Location</span>
                  <span variant='h4'>{candidateData?.meta?._currentLocation}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/applying.png' alt='trophy image' height={60} className='' />
                <div>
                  <span>Designation Applying For</span>
                  <span variant='h4'>{candidateData?.meta?._designationApplyingFor}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/experience.png' alt='trophy image' height={60} className='' />
                <div>
                  <span>Total Experience</span>
                  <span variant='h4'>{candidateData?.totalExperience}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='salery-section'>
            <Card className='salery-box'>
              <CardContent>
                {/* chart */}
                {/* <CandidateChart current={candidateData?.currentSalary} expect={candidateData?.expectedSalary} /> */}

                <div className='salery-outer'>
                  <div className='salery-content'>
                    <img src='/images/pages/rs.png' alt='trophy image' height={35} className='' />
                    <div className='salery-inner'>
                      <span>Current Salary </span>
                      <span variant='h4'>{candidateData?.currentSalary}</span>
                    </div>
                  </div>

                  <div className='salery-content'>
                    <img src='/images/pages/rs.png' alt='trophy image' height={35} className='' />

                    <div className='salery-inner'>
                      <span>Expected Salary </span>
                      <span variant='h4'>{candidateData?.expectedSalary}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='slaery-right-boxes'>
            <Card className='box'>
              <CardContent>
                <img src='/images/pages/company.png' alt='trophy image' height={60} className='' />
                <div>
                  <span>Last/Current Company Name</span>
                  <span variant='h4'>{candidateData?.meta?._currentCompanyName}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/vacancy.png' alt='trophy image' height={60} className='' />
                <div>
                  <span>How did you hear about this vacancy?</span>
                  <span variant='h4'>{candidateData?.meta?._source}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='right-iteam'>
          <Card>
            <CardContent className='box'>
              <div className='shift'>
                <span>Preferred Shift  </span>
                <span variant='h4'>{candidateData?.meta?._preferredShift}</span>
              </div>

              <div className='shift'>
                <span>Notice Period  </span>
                <span variant='h4'>{candidateData?.noticePeriod} Days</span>
              </div>

              <div className='Reason'>
                <span variant='h4'>Reason for Change  </span>
                <span>{candidateData?.meta?._reasonForChange}</span>
              </div>
            </CardContent>
          </Card>
          {/* chat  */}
          <ChatCompo />

        </div>
      </section>

      <div className='Reference'>
        <Card>
          <CardContent>
            <div>
              <span>Reference 1 </span>
              <div className='refrence-inner'>
                <span variant='h4'>{candidateData?.meta?._referenceName}</span>
                <span variant='h4'>{candidateData?.meta?._referenceContactNumber}</span>
                <span variant='h4'>{candidateData?.meta?._referenceDesignation}</span>
                <span variant='h4'>{candidateData?.meta?._referenceExperience}</span>
              </div>
            </div>

            <div className='reffrence-outer'>
              <span>Reference 2 </span>
              <div className='refrence-inner'>
                <span variant='h4'>{candidateData?.meta?._referenceName}</span>
                <span variant='h4'>{candidateData?.meta?._referenceContactNumber}</span>
                <span variant='h4'>{candidateData?.meta?._referenceDesignation}</span>
                <span variant='h4'>{candidateData?.meta?._referenceExperience}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <DocumentVeiw
        candidateUrl={candidateUrl}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      /> */}
    </div>
  )
}

export default Page
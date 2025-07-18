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
import DcsModal from '@/components/modal/dscForm'

function Page() {
  const router = useRouter()
  // useDocumentTitle('View Lead Dashboard')
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const editId = id

  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal

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


  const percent = Math.round(((candidateData?.expectedSalary - candidateData?.currentSalary) * 100) / candidateData?.currentSalary)
  const [candidateShifts   ,setCandidateShifts]= useState([])

  useEffect(()=>{
    if(candidateData?.meta?._preferredShift){

      const candidateShift = JSON?.parse(candidateData?.meta?._preferredShift)
      setCandidateShifts(candidateShift)
    }
  },[candidateData?.meta?._preferredShift])

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


  return (
    <div>
      {/* <TitleForPage title='Candidate Details' /> */}

      <section className='tittle-bar'>
        <div className='user-name'>
          <span variant='h1'>{candidateData?.name}</span>
        </div>
        <div className='resume' onClick={(e)=>dosOpenModal(e)}>
          <a href="">
            <div className='resmume-text'>
              <span variant='h2'>View Resume</span>
            </div>
            <img src='/images/pages/eye.png' alt='trophy image' height={11} />
          </a>
        </div>
      </section>

      <section className='user-profile'>
        <div class='left-iteam'>
          <div className='first-section'>
            <Card className='box'>
              <CardContent>
                <img src='/images/pages/date.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'> Date of Birth*</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.dob}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/gender.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Gender</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._gender}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/number.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Contact Number</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.phone}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/location.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Current Location</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._currentLocation}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/applying.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Designation Applying For</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._designationApplyingFor}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/experience.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Total Experience</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.totalExperience}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='salery-section'>
            <Card className='salery-box salery-new'>
              <CardContent>
                {/* chart */}
                {/* <CandidateChart current={candidateData?.currentSalary} expect={candidateData?.expectedSalary} /> */}

                <div className='salery-outer'>
                  <div className='salery-content'>
                    <img src='/images/pages/rs.png' alt='trophy image' height={35} className='' />
                    <div className='salery-inner'>
                      <span className='tittle'>Current Salary </span> <br />
                      <span className='subtittle' variant='h4'>{candidateData?.currentSalary}</span>
                    </div>
                     </div>
                      </div>

             
              </CardContent>

              <Card>  
                <CardContent>
                 <div className='salery-outer'>
                <div className='salery-content'>
                    <img src='/images/pages/rs.png' alt='trophy image' height={35} className='' />
                     <div className='salery-inner'>
                   <span className='tittle'>Expected Salary </span> <br />
                    <span className='subtittle' variant='h4'>{candidateData?.expectedSalary}</span>
                    </div>  </div>  </div>
          </CardContent>
            </Card>
            </Card>



   {/* Percentage */}
            <Card>
              <CardContent>
                <div className="salery-hike-outer">
                  <div className='salery-hike'>
                    <img src='/images/pages/rs.png' alt='trophy image' height={65} className='' />

                    <div className='salery-inner'>
                      <span className='tittle'>Hike </span> <br />
                      <span className='subtittle' variant='h4'>{percent}%</span>
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
                  <span className='tittle'>Last/Current Company Name</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._currentCompanyName}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/vacancy.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>How did you hear about this vacancy?</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._source}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='right-iteam'>
          <Card>
            <CardContent className='box'>
              <div className='shift'>
                <span className='tittle'>Preferred Shift  </span> <br />
                {candidateShifts?.map((v,i)=><span key={i} className='subtittle gap-3 ' variant='h4'>{v}, </span>)}

              </div>

              <div className='shift'>
                <span className='tittle'>Notice Period  </span> <br />
                <span className='subtittle' variant='h4'>{candidateData?.noticePeriod} Days</span>
              </div>

              <div className='Reason'>
                <span className='tittle' variant='h4'>Reason for Change  </span> <br />
                <span className='subtittle'>{candidateData?.meta?._reasonForChange}</span>
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
              <span className='tittle'>Reference 1 </span> <br />
              <div className='refrence-inner subtittle'>
                <span variant='h4'>{candidateData?.meta?._referenceName}</span>
                <span variant='h4'>{candidateData?.meta?._referenceContactNumber}</span>
                <span variant='h4'>{candidateData?.meta?._referenceDesignation}</span>
                <span variant='h4'>{candidateData?.meta?._referenceExperience}</span>
              </div>
            </div>

            <div className='reffrence-outer'>
              <span className='tittle'>Reference 2 </span> <br />
              <div className='refrence-inner subtittle'>
                <span variant='h4'>{candidateData?.meta?._referenceName}</span>
                <span variant='h4'>{candidateData?.meta?._referenceContactNumber}</span>
                <span variant='h4'>{candidateData?.meta?._referenceDesignation}</span>
                <span variant='h4'>{candidateData?.meta?._referenceExperience}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DcsModal
        isOpen={dcsModalOpen}
        onClose={() => setDcsModalOpen(false)}
        dcsValue={""}
        url={url}
        loading={loading}
      />
    </div>
  )
}

export default Page
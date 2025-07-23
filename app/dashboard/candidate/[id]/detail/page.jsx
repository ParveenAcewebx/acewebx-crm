
'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Card, CardContent } from '@/components/ui/card'
import Candidate from '@/services/cadidateApis/CandidateApi'
import DcsModal from '@/components/modal/dscForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CommonLayout from '@/components/CommonLayouyt'
import ActivitiesList from '@/components/ActivitiesList'
import EditCandidate from '../../EditCandidate'
import ChatCompo from '../../chat/Chat'
import { gendColor } from '@/lib/genderColor'

function Page({params}) {
  const router = useRouter()
  const id = params?.id
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
  const [candidateShifts, setCandidateShifts] = useState([])

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
      const res = await Candidate.activityDevCandidate("candidates" , editId)
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


  const gendColor = (val) => {
    if (val === "female") return "!bg-pink-400"
    if (val === "male") return "!bg-blue-500"
    if (val === "others") return "!bg-green-500"
    return "!bg-[#b82025]"
  }
const genCol = gendColor(candidateData?.meta?._gender)
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
        
        <CardContent className={`tittle-bar ${genCol}`}>
        <div className='user-name'>
                <span variant='h1'>{candidateData?.name} ({candidateData?.email})</span>
              </div>
              <div className='resume' onClick={(e) => dosOpenModal(e)}>
                <a href="">
                  <div className='resmume-text'>
                    <span variant='h2'>View Resume</span>
                  </div>
                  <img src='/images/pages/eye.png' alt='trophy image' height={11} />
                </a>
              </div>
            </CardContent>
          
          <div className='grid grid-cols-2 gap-4'>
            {/* Left Section */}


            <div>
              <div className='grid grid-cols-3 gap-4'>
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





{/* working Deve */}

               <div className="grid grid-cols-2 gap-4">
      {/* Current & Expected Salary Card */}
       <div>
     <Card className="min-h-[277px]">
       <CardContent>
         {/* Current Salary */}
           <div className="salery-outer">
              <div className="salery-content">
                    <img src="/images/pages/rs.png" alt="trophy image" height={35} />
                    <div className="salery-inner">
                  <span className="tittle">Current Salary</span><br />
                <span className="subtittle">{candidateData?.currentSalary}</span>
            </div>
          </div>
        </div>

        {/* Expected Salary */}
        <div className="salery-outer mt-4">
          <div className="salery-content">
            <img src="/images/pages/rs.png" alt="trophy image" height={35} />
            <div className="salery-inner">
              <span className="tittle">Expected Salary</span><br />
              <span className="subtittle">{candidateData?.expectedSalary}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Hike Card */}
  <div>
    <Card className="min-h-[277px]">
      <CardContent>
        <div className="w-full">
          <div className="salery-hike">
            <img src="/images/pages/rs.png" alt="trophy image" height={65} />
            <div className="salery-inner">
              <span className="tittle">Hike</span><br />
              <span className="subtittle">{percent}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
              </div>








              <div className='grid grid-cols-2 gap-4'>
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

            <div>
              {/* Right Section */}
              <Card className='w-full  border rounded-lg shadow-sm'>
                <CardContent>
                  <div className='grid grid-cols-2 gap-3'>
                    <Card className='border '>
                      <CardContent>
                        <span className='tittle'>Preferred Shift  </span> <br />
                        {candidateShifts?.map((v, i) => <span key={i} className='subtittle gap-3 ' variant='h4'>{v}, </span>)}
                      </CardContent>

                    </Card>

                    <Card className='border'>
                      <CardContent>
                        <span className='tittle'>Notice Period  </span> <br />
                        <span className='subtittle' variant='h4'>{candidateData?.noticePeriod} Days</span>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className='border'>
                    <CardContent><span className='tittle' variant='h4'>Reason for Change  </span> <br />
                      <span className='subtittle'>{candidateData?.meta?._reasonForChange}</span></CardContent>
                  </Card>
                </CardContent>
              </Card>
              {/* chat  */}
              <ChatCompo id={editId} />
              <ActivitiesList activitiesData={activitiesData}/>
            </div>
          </div>
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
                <DcsModal
                  isOpen={dcsModalOpen}
                  onClose={() => setDcsModalOpen(false)}
                  dcsValue={""}
                  url={url}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value='edit'>
          <EditCandidate editId={editId} />
        </TabsContent>
      </Tabs>


    </>
  )
}

export default Page
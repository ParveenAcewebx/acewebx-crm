
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
import EditSalesJobApplication from '../../SalesCandidateEdit'
import ChatCompo from '../../sales-chat/Chat'

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
  const gendColor = (val) => {
    if (val === "female") return "!bg-pink-400"
    if (val === "male") return "!bg-blue-500"
    if (val === "others") return "!bg-green-500"
    return "!bg-[#b82025]"
  }
const genCol = gendColor(candidateData?.gender)
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
          <div className={`tittle-bar ${genCol}`}>
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
          </div>


          {/* Main Section */}
          <div className='grid grid-cols-2 gap-4'>
            {/* Left Section */}
            <div>
              <div className='grid grid-cols-3 gap-4'>
                <Card className='box'>
                  <CardContent>
                    <img src='/images/pages/date.png' alt='trophy image' height={60} className='' />
                    <div>
                      <span className='tittle'> Date of Joining*</span> <br />
                      <span className='subtittle' variant='h4'>{candidateData?.joiningDate}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className='box'>
                  <CardContent>
                    <img src='/images/pages/target.png' alt='trophy image' height={60} className='' />
                    <div>
                      <span className='tittle'>Fresh Business Target</span> <br />
                      <span className='subtittle' variant='h4'>{candidateData?.freshBusinessTarget}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className='box'>
                  <CardContent>
                    <img src='/images/pages/business-methods.png' alt='trophy image' height={60} className='' />
                    <div>
                      <span className='tittle'>Business Methods</span> <br />
                      {candidateBusiness?.map((v, i) => <span key={i} className='subtittle' variant='h4'>{v}</span>)}

                    </div>
                  </CardContent>
                </Card>
                <Card className='box'>
                  <CardContent>
                    <img src='/images/pages/lead-platforms.png' alt='trophy image' height={60} className='' />
                    <div>
                      <span className='tittle'>Lead Platforms</span> <br />
                      {candidatePlatForm?.map((v, i) => <span key={i} className='subtittle gap-3 ' variant='h4'>{v}, </span>)}

                    </div>
                  </CardContent>
                </Card>
                <Card className='box'>
                  <CardContent>
                    <img src='/images/pages/regions.png' alt='trophy image' height={60} className='' />
                    <div>
                      <span className='tittle'>Preferred Regions</span> <br />
                      <span className='subtittle' variant='h4'>{candidateData?.preferredRegions}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className='box'>
                  <CardContent>
                    <img src='/images/pages/sales.png' alt='trophy image' height={60} className='' />
                    <div>
                      <span className='tittle'>Top Sales Achievement</span> <br />
                      <span className='subtittle' variant='h4'>{candidateData?.topSalesAchievement}</span>
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
                    <img src='/images/pages/target.png' alt='trophy image' height={60} className='' />
                    <div>
                      <span className='tittle'>Achieved Target</span> <br />
                      <span className='subtittle' variant='h4'>{candidateData?.achievedTarget}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className='box'>
                  <CardContent>
                    <img src='/images/pages/applying.png' alt='trophy image' height={60} className='' />
                    <div>
                      <span className='tittle'>Designation Applying For</span> <br />
                      <span className='subtittle' variant='h4'>{candidateData?.designationApplyingFor}</span>
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
              <div className='grid grid-cols-2 gap-4'>
                <div className='' >
                  <Card className='salery-box salery-new min-h-[275px]' >
                    <CardContent>
                      {/* chart */}
                      {/* <CandidateChart current={candidateData?.currentSalary} expect={candidateData?.expectedSalary} /> */}

                      <div className='salery-outer'>
                        <div className='salery-content'>
                          <img src='/images/pages/rs.png' alt='trophy image' height={35} className='' />
                          <div className='salery-inner'>
                            <span className='tittle'>Current Salary </span> <br />
                            <span className='subtittle' variant='h4'>{candidateData?.currentSalary}</span>
                          </div>
                        </div>
                      </div>


                    </CardContent>


                    <CardContent>
                      <div className='salery-outer'>
                        <div className='salery-content'>
                          <img src='/images/pages/rs.png' alt='trophy image' height={35} className='' />
                          <div className='salery-inner'>
                            <span className='tittle'>Expected Salary </span> <br />
                            <span className='subtittle' variant='h4'>{candidateData?.expectedSalary}</span>
                          </div>  </div>  </div>
                    </CardContent>

                  </Card>
                </div>

                <div className='min-h-[220px]'>
                  <Card className='min-h-[220px]'>
                    <CardContent>
                      <div className="salery-hike-outer ">
                        <div className='salery-hike'>
                          <img src='/images/pages/rs.png' alt='trophy image' height={65} className='' />

                          <div className='salery-inner'>
                            <span className='tittle'>Hike </span> <br />
                            <span className='subtittle' variant='h4'>{percent}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <Card className='w-full  border rounded-lg shadow-sm'>
                <CardContent>
                  <div className='grid grid-cols-2 gap-3'>
                    <Card className='border '>
                      <CardContent>
                        <span className='tittle'>Preferred Shift  </span> <br />
                        {candidateShifts && candidateShifts?.map((v, i) => <span key={i} className='subtittle gap-3 ' variant='h4'>{v}, </span>)}

                      </CardContent>

                    </Card>

                    <Card className='border'>
                      <CardContent>
                        <span className='tittle'>Notice Period  </span> <br />
                        <span className='subtittle' variant='h4'>{candidateData?.noticePeriod} Days</span>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className='border'>
                    <CardContent><span className='tittle' variant='h4'>Reason for Change  </span> <br />
                      <span className='subtittle'>{candidateData?.reasonForLeaving}</span></CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* chat  */}
              <ChatCompo id={id} />
              <ActivitiesList activitiesData={activitiesData} />

            </div>
            <DcsModal
              isOpen={dcsModalOpen}
              onClose={() => setDcsModalOpen(false)}
              dcsValue={""}
              url={url}
              loading={loading}
            />

          </div>
        </TabsContent>
        <TabsContent value='edit'>
          <EditSalesJobApplication editId={editId} />
        </TabsContent>
      </Tabs>

    </>
  )
}

export default Page

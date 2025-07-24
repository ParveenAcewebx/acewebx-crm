
'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Card, CardContent } from '@/components/ui/card'
import Candidate from '@/services/cadidateApis/CandidateApi'
import SalesCandidate from '@/services/cadidateApis/SalesCandidateApi'
import LayoutHeader from '@/components/layoutHeader'
import DcsModal from '@/components/modal/dscForm'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import ActivitiesList from '@/components/ActivitiesList'
import ChatCompo from '../../sales-chat/Chat'
import { Mail, Phone, UserIcon } from 'lucide-react'
import CommonLayout from '@/components/CommonLayouyt'
import { Button } from '@/components/ui/button'
import { errorMessage, successMessage } from '@/components/ToasterMessage'

function Page({ params }) {
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
      try {
        const candidateBusi = JSON.parse(candidateData.businessMethods);
        setCandidateBusiness(candidateBusi);
      } catch (err) {
        setCandidateBusiness([]); // fallback to raw string
      }
    }

    if (candidateData?.preferredShift) {
      try {
        const candidateShift = JSON.parse(candidateData.preferredShift);
        setCandidateShifts(candidateShift || []);
      } catch (err) {
        setCandidateShifts([]); // fallback to single value array
      }
    }

    if (candidateData?.leadPlatforms) {
      try {
        const PlatForm = JSON.parse(candidateData.leadPlatforms);
        setCandidatePlatForm(PlatForm);
      } catch (err) {
        setCandidatePlatForm([]); // fallback to raw string
      }
    }
  }, [
    candidateData?.businessMethods,
    candidateData?.leadPlatforms,
    candidateData?.preferredShift
  ]);



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
      const res = await SalesCandidate.activitySalesCandidate("candidateSales", editId)
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
  const genderColor = (val) => {
    if (val === "female") return "!bg-pink-700"
    if (val === "male") return "!bg-blue-500"
    if (val === "others") return "w-full h-16 bg-[linear-gradient(to_right,_red,_orange,_yellow,_green,_blue,_indigo,_violet)]"
    return "!bg-gray-400"
  }

  const genderCol = genderColor(candidateData?.gender)

  // send sales walk-in form:-
  const handleSendWalkInForm = async row => {
    try {
      const sendEmailLin = await SalesCandidate.sendSalesWalkInLink(
        row.original.id
      )

      if (sendEmailLin?.data?.status == true) {
        successMessage({
          description: 'Link sent successfully to the mail.'
        })
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: 'Something Went Wrong!'
      })
    }
  }

  return (
    <>

      <CommonLayout pageTitle='Sales Candidate Deatils' />

      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className='inline-flex h-9 items-center p-1 text-muted-foreground custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b'>
          <TabsList>
            <TabsTrigger className='rounded-none px-4 py-1.5 !shadow-none' value="detail">Details</TabsTrigger>
            <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="edit">Edit</TabsTrigger>
          </TabsList>
        </TabsList>
        <TabsContent value='detail'>
          {/* Top Section */}
          <div className={`tittle-bar ${genderCol}`}>
            <div className='user-name flex items-center gap-2 text-base font-medium text-gray-800'>
              <UserIcon className='w-5 h-5 text-yellow-600' />
              <span>{candidateData?.name} </span>

              <Mail className='w-5 h-5 text-yellow-600 ml-4' />
              <span>{candidateData?.email?.toLowerCase()} </span>

              <Phone className='w-5 h-5 text-yellow-600 ml-4' />
              <span>{candidateData?.phone}</span>
            </div>

            <div className=' resume-btn'>
              <div>
                <Button
                  onClick={handleSendWalkInForm}
                  size='icon'
                  variant='outline'
                  className='shrink-0 border-red-400 hover:bg-accent'
                >
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#C21E56'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='w-5 h-5'
                  >
                    <path d='M22 2L11 13' />
                    <path d='M22 2L15 22L11 13L2 9L22 2Z' />
                  </svg>
                </Button>
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
          </div>


          {/* Main Section */}

          {/* Left Section */}
          <div className="flex gap-4 ">
            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/target.png' alt='trophy image' className='w-[60px] h-[60px]' />
                <div>
                  <span className='tittle'>Fresh Business Target</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.freshBusinessTarget}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/business-methods.png' alt='trophy image' className='w-[60px] h-[60px]' />
                <div>
                  <span className='tittle'>Business Methods</span> <br />
                  {candidateBusiness?.map((v, i) => <span key={i} className='subtittle' variant='h4'>{v}{i < candidateBusiness?.length - 1 ? ', ' : ''}</span>)}

                </div>
              </CardContent>
            </Card>
            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/lead-platforms.png' alt='trophy image' className='w-[60px] h-[60px] rounded-full object-cover' />

                <div>
                  <span className='tittle'>Lead Platforms</span> <br />
                  {candidatePlatForm?.map((v, i) => <span key={i} className='subtittle gap-3 ' variant='h4'>{v}{i < candidatePlatForm?.length - 1 ? ', ' : ''} </span>)}

                </div>
              </CardContent>
            </Card>
            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/regions.png' alt='trophy image' className='w-[60px] h-[60px]' />

                <div>
                  <span className='tittle'>Preferred Regions</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.preferredRegions}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4">
            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/sales.png' alt='trophy image' className='w-[60px] h-[60px]' />
                <div>
                  <span className='tittle'>Top Sales Achievement</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.topSalesAchievement}</span>
                </div>
              </CardContent>
            </Card>
            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/target.png' alt='trophy image' className='' />
                <div>
                  <span className='tittle'>Achieved Target</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.achievedTarget}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/experience.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Experience</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.totalExperience}</span>
                </div>
              </CardContent>
            </Card>
          </div>




          <div className="flex gap-4">
            <Card className='salery-box salery-new  flex' >
              <CardContent>
                <div className='salery-outer'>
                  <div className='salery-content flex gap-4'>
                    <img src='/images/pages/rs.png' alt='trophy image' className='w-[60px] h-[60px] rounded-full object-cover' />

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
                    <div className='salery-inner'>
                      <span className='tittle'>Expected Salary </span> <br />
                      <span className='subtittle' variant='h4'>{candidateData?.expectedSalary}</span>
                    </div>  </div>  </div>
              </CardContent>
            </Card>


            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/hike.png' alt='trophy image' height={65} className='' />
                <div>
                  <span className='tittle'>Hike </span> <br />
                  <span className='subtittle' variant='h4'>{percent}%</span>
                </div>
              </CardContent>
            </Card>




            <Card className='box'>
              <CardContent className="flex gap-3">
                <img src='/images/pages/PreferredShift .png' alt='trophy image' className='w-[60px] h-[60px]' />
                <div>
                  <span className='tittle'>Preferred Shift  </span> <br />
                  {candidateShifts && candidateShifts?.map((v, i) => <span key={i} className='subtittle gap-3 ' variant='h4'>{v}{i < candidateShifts?.length - 1 ? ', ' : ''} </span>)}
                </div>
              </CardContent>
            </Card>



            {/* <Card className='box'>
                 <CardContent className="flex gap-3">
                  <img src='/images/pages/Notice Period.png' alt='trophy image' height={60} className='' />
                  <div>
                  <span className='tittle'>Notice Period </span> <br />
                     <span className='subtittle' variant='h4'>{candidateData?.noticePeriod} Days</span>
                  </div>
                </CardContent>
              </Card> */}


          </div>




          {/* Right Section */}
          <div>
            <div className="flex gap-4 py-4">

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
          {/* <EditSalesJobApplication editId={editId} /> */}
        </TabsContent>
      </Tabs>

    </>
  )
}

export default Page

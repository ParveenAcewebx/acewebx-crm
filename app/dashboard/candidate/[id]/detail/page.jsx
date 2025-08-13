
'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DcsModal from '@/components/modal/dscForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CommonLayout from '@/components/CommonLayouyt'
import ActivitiesList from '@/components/ActivitiesList'
import EditCandidate from '../../EditCandidate'
import ChatCompo from '../../chat/Chat'
import { Mail, Phone, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Candidate from '@/services/candidates/CandidateApi'

function Page({ params }) {
  const router = useRouter()
  const id = params?.id
  const editId = id
  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal
  const [candidateData, setCandidateData] = useState({})
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [activitiesData, setActivitiesData] = useState()

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
  const [candidateShifts, setCandidateShifts] = useState([])

  useEffect(() => {
    if (candidateData?.meta?._preferredShift) {
      try {
        const candidateShift = JSON?.parse(candidateData?.meta?._preferredShift)
        setCandidateShifts(candidateShift)

      } catch (error) {
        setCandidateShifts([])

      }


    }
  }, [candidateData?.meta?._preferredShift])

  const dosOpenModal = (e) => {
    e.preventDefault()
    setDcsModalOpen(true)
  }


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


  // Activity function :-
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

  //Function for colour :-
  const genderColor = (val) => {
    if (val === "female") return "!bg-pink-700"
    if (val === "male") return "!bg-blue-500"
    if (val === "others") return "w-full h-16 bg-[linear-gradient(to_right,_red,_orange,_yellow,_green,_blue,_indigo,_violet)]"
    return "!bg-gray-400"
  }


  const genderCol = genderColor(candidateData?.meta?._gender)


  // send walk-in form
  const handleSendWalkInForm = async row => {
    try {
      const sendEmailLin = await Candidate.sendWalkInLink(id)

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
      <CommonLayout pageTitle='Candidate Detail' />

      <Tabs value={currentTab} onValueChange={handleTabChange} className='mt-3'>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b custom-tabs ' >
          <TabsList>
            <TabsTrigger className='rounded-none px-4 py-1.5 !shadow-none' value="detail">Details</TabsTrigger>
            <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="edit">Edit</TabsTrigger>
          </TabsList>
        </TabsList>


        <TabsContent value="detail">

          <CardContent className={`tittle-bar ${genderCol}`}>
            <div className='user-name flex items-center gap-2 text-base font-medium text-gray-800'>
              <UserIcon className='w-5 h-5 text-gray-200' />
              <span>{candidateData?.name} </span>

              <Mail className='w-5 h-5 text-gray-200 ml-4' />
              <span>{candidateData?.email?.toLowerCase()} </span>

              <Phone className='w-5 h-5 text-gray-200 ml-4' />
              <span>{candidateData?.phone}</span>
            </div>

            <div className=' resume-btn'>
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleSendWalkInForm}
                      size='icon'
                      variant='outline'
                      className='shrink-0  hover:bg-accent sendIcon'
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
                  </TooltipTrigger>
                  <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
                    Send Walk In Form
                  </TooltipContent>
                </Tooltip>


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
          </CardContent>


          {/* Left Section */}

          <div className="flex gap-4">
            <Card className='box'>
              <CardContent className='flex items-center gap-4'>
                <img src='/images/pages/location.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Location</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._currentLocation}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent className='flex items-center gap-4'>

                <img src='/images/pages/applying.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Designation</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._designationApplyingFor}</span>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent className='flex items-center gap-4'>

                <img src='/images/pages/experience.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Experience</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.totalExperience}</span>
                </div>
              </CardContent>
            </Card>
            <Card className='box'>
              <CardContent className='flex items-center gap-4'>

                <img src='/images/pages/company.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Company</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._currentCompanyName}</span>
                </div>
              </CardContent>
            </Card>
            <Card className='box'>
              <CardContent className='flex items-center gap-4'>

                <img src='/images/pages/Notice Period.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Notice Period  </span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.noticePeriod} Days</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* working Deve */}


          {/* Current & Expected Salary Card */}
          <div className=" flex gap-4  ">
            <Card className="">
              <CardContent className='flex justify-between items-center'>
                {/* Current Salary */}
                <div className="salery-outer ">
                  <div className="salery-content flex justify-between gap-4 items-center">
                    <img src="/images/pages/rs.png" alt="trophy image" />
                    <div className="salery-inner">
                      <span className="tittle">Current Salary</span><br />
                      <span className="subtittle">{candidateData?.currentSalary}</span>
                    </div>
                  </div>
                </div>

                {/* Expected Salary */}
                <div className="salery-outer">
                  <div className="salery-inner">
                    <span className="tittle">Expected Salary</span><br />
                    <span className="subtittle">{candidateData?.expectedSalary}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hike Card */}
            {/* <ChartForHike percent={percent}/> */}
            <Card className='box border   rounded-[10px]'>
              <CardContent className='flex items-center gap-4 '>
                <img src='/images/pages/hike.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Hike</span> <br />
                  <span className="subtittle">{percent}%</span>
                </div>
              </CardContent>
            </Card>



            <Card className='box'>
              <CardContent className='flex items-center gap-4'>

                <img src='/images/pages/vacancy.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Source</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._source}</span>
                </div>
              </CardContent>
            </Card>
            <Card className='box'>
              <CardContent className='flex items-center gap-4'>
                <img src='/images/pages/PreferredShift .png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Preferred Shift</span> <br />
                  {candidateShifts?.map((v, i) => (
                    <span key={i} className='subtittle gap-3' variant='h4'>
                      {v}{i < candidateShifts.length - 1 ? ', ' : ''}
                    </span>
                  ))}                </div>
              </CardContent>
            </Card>
            {/* chat  */}
          </div>

          <div className="flex gap-4 py-4">
            <ChatCompo id={editId} />
            <ActivitiesList activitiesData={activitiesData} />
            <div className="Reference mt-0 rounded-xl bg-card text-card-foreground w-full mb-5 ">
              <Card>
                <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                  <CardTitle className='flex justify-between'>
                    <div className='!text-lg '>Reference</div>

                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    {candidateData?.meta?._reference1Name && <div className='mb-4'>
                      <p className='font-semibold mb-1'>Reference 1</p>
                      <p><span className='font-semibold'>Name:</span> {candidateData?.meta?._reference1Name}</p>
                      <p><span className='font-semibold'>Phone:</span> {candidateData?.meta?._reference1ContactNumber}</p>
                      <p><span className='font-semibold'>Skill:</span> {candidateData?.meta?._reference1Designation}</p>
                      <p><span className='font-semibold'>Experience:</span> {candidateData?.meta?._reference1Experience}</p>
                    </div>}

                    {candidateData?.meta?._reference2Name && <div>
                      <p className='font-semibold mb-1'>Reference 2</p>
                      <p><span className='font-semibold'>Name:</span> {candidateData?.meta?._reference2Name}</p>
                      <p><span className='font-semibold'>Phone:</span> {candidateData?.meta?._reference2ContactNumber}</p>
                      <p><span className='font-semibold'>Skill:</span> {candidateData?.meta?._reference2Designation}</p>
                      <p><span className='font-semibold'>Experience:</span> {candidateData?.meta?._reference2Experience}</p>
                    </div>
                    }
                    {!candidateData?.meta?._reference2Name && !candidateData?.meta?._reference1Name && "No Reference Found!"}
                  </div>
                  <DcsModal
                    isOpen={dcsModalOpen}
                    onClose={() => setDcsModalOpen(false)}
                    dcsValue={''}
                    url={url}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </div>
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
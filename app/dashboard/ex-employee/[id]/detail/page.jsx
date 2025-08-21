
'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CommonLayout from '@/components/CommonLayouyt'
import ActivitiesList from '@/components/ActivitiesList'
import { Eye, EyeClosed, EyeOff, Mail, PartyPopper, Phone, UserIcon } from 'lucide-react'
import { errorMessage } from '@/components/ToasterMessage'
import EmployeesApi from '@/services/employees/EmployeesApi'
import Link from 'next/link'
import EmployeeChatCompo from '@/app/dashboard/employee/chat/Chat'


function Page({ params }) {
  const router = useRouter()
  const id = params?.id
  const editId = id
  const [candidateData, setCandidateData] = useState({})
  const [activitiesData, setActivitiesData] = useState()
  const [salaryHide, setSalaryHide] = useState(false)
  const [hikeHide, setHikeHide] = useState(false)

  const pathname = usePathname()
  // Get Data by Id:)
  const handleGetApi = async () => {
    try {
      const apiData = await EmployeesApi.getByIdEmployees(editId)
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



  // Activity function :-
  const getActivities = async () => {
    try {
      const res = await EmployeesApi.activityDevEmployees("employees", editId)
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




  // Get last part of the path
  const currentTab = pathname?.split('/').pop() || 'detail'

  const handleTabChange = (value) => {
    // Replace current route with new tab route (assuming same base path)
    const basePath = pathname?.split('/').slice(0, -1).join('/')
    router.replace(`${basePath}/${value}`)
  }

  //Function for colour :-
  const genderColor = (val) => {
    if (val === "female") return "!bg-pink-700"
    if (val === "male") return "!bg-blue-500"
    if (val === "others") return "w-full h-16 bg-[linear-gradient(to_right,_red,_orange,_yellow,_green,_blue,_indigo,_violet)]"
    return "!bg-gray-400"
  }

  const genderCol = genderColor(candidateData?.meta?._gender)


  const incrementAmount =
    candidateData?.events?.[0]?.meta?.find((m) => m.metaKey === "_incrementAmount")
      ?.metaValue || "";

  return (
    <>
      <CommonLayout pageTitle='Ex Employee Detail' />
      <Tabs value={currentTab} onValueChange={handleTabChange} className='mt-2'>
        <TabsList className='custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b custom-tabs ' >
          <TabsList>
            <TabsTrigger className='rounded-none px-4 py-1.5 !shadow-none' value="detail">Details</TabsTrigger>
            <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="edit">Edit</TabsTrigger>
            <TabsTrigger className='rounded-none px-4 py-1.5 !shadow-none' value="birthdays">Birthdays</TabsTrigger>
            <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="anniversaries">Anniversaries</TabsTrigger>
            <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="increments">Increments</TabsTrigger>
          </TabsList>
        </TabsList>


        <TabsContent value="detail">

          <CardContent className={`tittle-bar ${genderCol}`}>
            <div className='user-name flex items-center gap-2 text-base font-medium text-gray-800 topbarDetail'>
              <UserIcon className='w-5 h-5 text-gray-200' />
              <span>{candidateData?.name} </span>

              <Mail className='w-5 h-5 text-gray-200 ml-4' />
              <span> <Link className="!text-gray-200 no-underline hover:underline "
                href={`mailto:${candidateData?.companyEmail?.toLowerCase()}`}> {candidateData?.companyEmail?.toLowerCase()}</Link> </span>

              <Phone className='w-5 h-5 text-gray-200 ml-4' />
              <span> <Link className=" !text-gray-200 no-underline hover:underline "
                href={`tel:${candidateData?.phone}`} >{candidateData?.phone}</Link></span>

              {candidateData?.anniversaryCelebration && candidateData?.anniversaryCelebration !== null && <>
                <PartyPopper className='w-5 h-5 text-gray-200 ml-4' />
                <span>{candidateData?.anniversaryCelebration}</span></>}

            </div>

          </CardContent>


          {/* Left Section */}

          <div class="flex gap-4">


            <Card className='box'>
              <CardContent className='flex items-center gap-4'>

                <img src='/images/pages/applying.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Designation</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.designation}</span>
                </div>
              </CardContent>
            </Card>
            <Card className='box'>
              <CardContent className='flex items-center gap-4'>

                <img src='/images/pages/PreferredShift .png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>D.O.B</span> <br />
                  <span className='subtittle' variant='h4'>{candidateData?.dobDocument}</span>
                </div>
              </CardContent>
            </Card>
            <Card className='box'>
              <CardContent className='flex items-center gap-4'>

                <img src='/images/pages/company.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='subtittle' variant='h4'>{candidateData?.meta?._bankName}</span><br />
                  <span className='text-sm text-gray-700' variant='h4'>{candidateData?.meta?._bankAccountNumber}</span><br />
                  <span className='text-sm text-gray-700' variant='h4'>{candidateData?.meta?._bankIfscCode}</span>

                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent className='flex items-center gap-4'>
                <img src='/images/pages/PreferredShift .png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Current Shift</span> <br />
                  {candidateData?.meta?._currentShift
                  }                </div>
              </CardContent>
            </Card>

          </div>

          {/* working Deve */}


          {/* Current & Expected Salary Card */}
          <div class=" flex gap-4  ">
            <Card className="relative">
              {/* Toggle salary visibility icon */}
              <div className="absolute top-2 right-2 cursor-pointer">
                {salaryHide ? (
                  <Eye size={16} onClick={() => setSalaryHide(false)} />
                ) : (
                  <EyeOff size={16} onClick={() => setSalaryHide(true)} />
                )}
              </div>

              <CardContent className="flex justify-between items-center">
                {/* Current Salary */}
                <div className="salery-outer">
                  <div className="salery-content flex justify-between gap-4 items-center">
                    <img src="/images/pages/rs.png" alt="trophy image" />
                    <div className="salery-inner">
                      <span className="tittle">Current Salary</span>
                      <br />
                      <span className="subtittle">
                        {salaryHide ? candidateData?.meta?._currentSalary : (
                          "*****"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* Hike Card */}
            <Card className='relative'>
              {/* Toggle salary visibility icon */}
              <div className="absolute top-2 right-2 cursor-pointer">
                {hikeHide ? (
                  <Eye size={16} onClick={() => setHikeHide(false)} />
                ) : (
                  <EyeOff size={16} onClick={() => setHikeHide(true)} />
                )}
              </div>

              <CardContent className='flex items-center gap-4 '>
                <img src='/images/pages/hike.png' alt='trophy image' height={60} className='' />
                <div>
                  {/* ₹ */}
                  <span className='tittle'>Last Hike</span> <br />
                  <span className="subtittle">
                    {hikeHide ? (
                      <>
                        {incrementAmount}
                      </>
                    ) : (
                      "*****"
                    )}
                  </span>

                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <Link target='_blank' href={candidateData?.meta?._adharCard || ''}>
                <CardContent className='flex items-center gap-4'>

                  <img src='/images/pages/vacancy.png' alt='trophy image' height={60} className='' />
                  <div>
                    <span className='tittle'>Aadhar Card</span> <br />
                    <span className='subtittle' variant='h4'></span>
                  </div>
                </CardContent>
              </Link>
            </Card>

            <Card className='box'><Link target='_blank' href={candidateData?.meta?._panCard || ''}>
              <CardContent className='flex items-center gap-4'>
                <img src='/images/pages/PreferredShift .png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Pan Card</span> <br />
                  <span className='subtittle' variant='h4'></span>

                </div>
              </CardContent>
            </Link>
            </Card>

            {/* chat  */}
          </div>

          <div className="flex gap-4 py-4">
            <EmployeeChatCompo id={editId} />
            <ActivitiesList activitiesData={activitiesData} />

          </div>
        </TabsContent>
        <TabsContent value='edit'>
        </TabsContent>
        <TabsContent value='birthdays'>
        </TabsContent>
        <TabsContent value='anniversaries'>
        </TabsContent>
        <TabsContent value='increments'>
        </TabsContent>
      </Tabs>


    </>
  )
}

export default Page
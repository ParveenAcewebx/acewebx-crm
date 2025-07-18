
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Card, CardContent } from '@/components/ui/card'
import Candidate from '@/services/cadidateApis/CandidateApi'
import SalesCandidate from '@/services/cadidateApis/SalesCandidateApi'
import LayoutHeader from '@/components/layoutHeader'
import ChatCompo from '../../candidate-details/chat/Chat'

function Page() {
  const router = useRouter()
  // useDocumentTitle('View Lead Dashboard')
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const editId = id
  const [candidateData, setCandidateData] = useState({})
  console.log("candidateData",candidateData)
  const [candidateUrl, setCandidateUrl] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const handleGetApi = async () => {
    try {
      const apiData = await SalesCandidate.viewSalesCandidate(editId)
      console.log("apiDataapiData", apiData)
      setCandidateData(apiData?.data?.data)
    } catch (error) {
      console.error('API error', error)
    }
  }
  console.log("apiDataapiData")
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

  const [candidateBusiness   ,setCandidateBusiness]= useState([])
  const [candidateShifts   ,setCandidateShifts]= useState([])
  const [candidatePlatForm   ,setCandidatePlatForm]= useState([])


  useEffect(()=>{

    if(candidateData?.businessMethods){

      const candidateBusi = JSON?.parse(candidateData?.businessMethods)
      setCandidateBusiness(candidateBusi)
    }
    if(candidateData?.preferredShift){

      const candidateShift = JSON?.parse(candidateData?.preferredShift)
      setCandidateShifts(candidateShift)
    }
    if(candidateData?.leadPlatforms){

      const PlatForm = JSON?.parse(candidateData?.leadPlatforms)
      setCandidatePlatForm(PlatForm)
    }
  },[candidateData?.businessMethods, candidateData?.leadPlatforms, candidateData?.preferredShift])
  return (
    <div>
      {/* <TitleForPage title='Candidate Details' /> */}
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Sales Candidate Deatils' />
      </div>

      <section className='tittle-bar'>
        <div className='user-name'>
          <span variant='h1'>{candidateData?.name}</span>
        </div>
        <div className='resume' onClick={handleClickOpen}>
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
                  {candidateBusiness?.map((v,i)=><span key={i} className='subtittle' variant='h4'>{v}</span>)}
                  
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/lead-platforms.png' alt='trophy image' height={60} className='' />
                <div>
                  <span className='tittle'>Lead Platforms</span> <br />
                  {candidatePlatForm?.map((v,i)=><span key={i} className='subtittle gap-3 ' variant='h4'>{v}, </span>)}

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
                <span className='subtittle'>{candidateData?.reasonForLeaving}</span>
              </div>
            </CardContent>
          </Card>
          {/* chat  */}
          <ChatCompo />

        </div>
      </section>


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
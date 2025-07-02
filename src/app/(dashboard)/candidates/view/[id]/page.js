'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Candidate from '@/components/services/CandidateApi'
import CandidateChart from '@/components/CadidateChart'
import DocumentVeiw from '@/components/DocumentVeiw'

function Page() {
  const router = useRouter()
  const { id } = useParams()
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
      <section className='first-row'>
        <div className='user-name'>
          <Typography variant='h1'>{candidateData?.name}</Typography>
        </div>
        <div className='resume' onClick={handleClickOpen}>
          <div className='resmume-text'>
            <Typography variant='h2' >
              View Resume
            </Typography>
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
                  <Typography>Date of Birth*</Typography>
                  <Typography variant='h4'>{candidateData?.dob}</Typography>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/gender.png' alt='trophy image' height={60} className='' />
                <div>
                  <Typography>Gender</Typography>
                  <Typography variant='h4'>{candidateData?.meta?._gender}</Typography>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/number.png' alt='trophy image' height={60} className='' />
                <div>
                  <Typography>Contact Number</Typography>
                  <Typography variant='h4'>{candidateData?.phone}</Typography>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/location.png' alt='trophy image' height={60} className='' />
                <div>
                  <Typography>Current Location</Typography>
                  <Typography variant='h4'>{candidateData?.meta?._currentLocation}</Typography>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/applying.png' alt='trophy image' height={60} className='' />
                <div>
                  <Typography>Designation Applying For</Typography>
                  <Typography variant='h4'>{candidateData?.meta?._designationApplyingFor}</Typography>
                </div>
              </CardContent>
            </Card>

            <Card className='box'>
              <CardContent>
                <img src='/images/pages/experience.png' alt='trophy image' height={60} className='' />
                <div>
                  <Typography>Total Experience</Typography>
                  <Typography variant='h4'>{candidateData?.totalExperience}</Typography>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='salery-section'>
            <Card className='salery-box'>
              <CardContent>
                <CandidateChart current={candidateData?.currentSalary} expect={candidateData?.expectedSalary} />

                <div className='salery-outer'>
                  <div className='salery-content'>
                    <img src='/images/pages/rs.png' alt='trophy image' height={35} className='' />
                    <div className='salery-inner'>
                      <Typography>Current Salary </Typography>
                      <Typography variant='h4'>{candidateData?.currentSalary}</Typography>
                    </div>
                  </div>

                  <div className='salery-content'>
                    <img src='/images/pages/rs.png' alt='trophy image' height={35} className='' />

                    <div className='salery-inner'>
                      <Typography>Expected Salary </Typography>
                      <Typography variant='h4'>{candidateData?.expectedSalary}</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className='slaery-right-boxes'>
              <Card className='box'>
                <CardContent>
                  <img src='/images/pages/company.png' alt='trophy image' height={60} className='' />
                  <div>
                    <Typography>Last/Current Company Name</Typography>
                    <Typography variant='h4'>{candidateData?.meta?._currentCompanyName}</Typography>
                  </div>
                </CardContent>
              </Card>

              <Card className='box'>
                <CardContent>
                  <img src='/images/pages/vacancy.png' alt='trophy image' height={60} className='' />
                  <div>
                    <Typography>How did you hear about this vacancy?</Typography>
                    <Typography variant='h4'>{candidateData?.meta?._source}</Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className='Reference'>
            <Card>
              <CardContent>
                <div>
                  <Typography>Reference 1 </Typography>
                  <div className='refrence-inner'>
                    <Typography variant='h4'>{candidateData?.meta?._referenceName}</Typography>
                    <Typography variant='h4'>{candidateData?.meta?._referenceContactNumber}</Typography>
                    <Typography variant='h4'>{candidateData?.meta?._referenceDesignation}</Typography>
                    <Typography variant='h4'>{candidateData?.meta?._referenceExperience}</Typography>
                  </div>
                </div>

                <div className='reffrence-outer'>
                  <Typography>Reference 2 </Typography>
                  <div className='refrence-inner'>
                    <Typography variant='h4'>{candidateData?.meta?._referenceName}</Typography>
                    <Typography variant='h4'>{candidateData?.meta?._referenceContactNumber}</Typography>
                    <Typography variant='h4'>{candidateData?.meta?._referenceDesignation}</Typography>
                    <Typography variant='h4'>{candidateData?.meta?._referenceExperience}</Typography>
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
                <Typography>Preferred Shift  </Typography>
                <Typography variant='h4'>{candidateData?.meta?._preferredShift}</Typography>
              </div>

              <div className='shift'>
                <Typography>Notice Period  </Typography>
                <Typography variant='h4'>{candidateData?.noticePeriod} Days</Typography>
              </div>

              <div className='Reason'>
                <Typography variant='h4'>Reason for Change  </Typography>
                <Typography>{candidateData?.meta?._reasonForChange}</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className='message-box'>
            <CardContent>
              <div className='mesaage-content'>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.  
                </Typography>
              </div>

              <div className='mesaage-content'>
                <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Typography>
              </div>

              <div className='mesaage-content'>
                <Typography>Lorem Ipsum is simply dummy text. </Typography>
              </div>

              <div class='chat-input'>
                <input type='text' placeholder='Type your Message Here...' />
                <button class='send-button'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#8C57FF'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='M22 2L11 13' />
                    <path d='M22 2L15 22L11 13L2 9L22 2Z' />
                  </svg>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <DocumentVeiw
        candidateUrl={candidateUrl}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
    </div>
  )
}

export default Page

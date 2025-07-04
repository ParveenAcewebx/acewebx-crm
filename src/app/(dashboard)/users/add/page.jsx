'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import FormInput from '@/components/FormInput'
import FormMobileDatePicker from '@/components/forminputs/FormMobileDatePicker'
import FormInputSelect from '@/components/forminputs/FormInputSelect'
import Candidate from '@/components/services/CandidateApi'
import { errorMsg, successMsg } from '@/components/toaster/Toaster'
import { GenderData, walkInFormDefaultValues } from '@/components/constants/StaticData'
import { CandidateFormValidation } from '@/components/CandidateFormValidation'
import Loader from '@/components/Loader'
import dayjs from 'dayjs'

function AddUser() {
  const [step, setStep] = useState(0)
  const [loader, setLoader] = useState(false)

  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger // <-- add this
  } = useForm({
    mode: 'onChange', // or 'onChange' or 'all'
    defaultValues: walkInFormDefaultValues,
    resolver: yupResolver(CandidateFormValidation)
  })

  const onSubmit = async data => {
    setLoader(true)
    try {
      const formData = new FormData()

      const file = data.resume?.[0] // Assuming data.logo is a FileList or array
      if (file) {
        formData.append('resume', file)
      }
      // Append all non-file fields
      Object.entries(data).forEach(([key, value]) => {
        // Special handling for 'resume' field

        formData.append(key, value)
      })

      // Submit via API
      const response = await Candidate.addCandidate(formData)
      if (response?.status) {
        successMsg('Candidate form submitted successfully!')
        reset()
        setLoader(false)

        router.push('/thankyou')
      }
    } catch (error) {
      console.error('Submission Error:', error)
      setLoader(false)
      errorMsg(error?.message || 'Something went wrong while submitting the form.')
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-start relative w-full mobile-view'>
      <div className='bg-gradient-to-br from-[#8C57FF]-100 via-white to-[#8C57FF]-100 p-10 rounded-xl  w-full max-w-3xl z-10 border border-greed-100'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6 walking'>Add User</h2>

        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
          <div
            className={step == 3 ? 'grid grid-cols-1 md:grid-cols-1 gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}
          >
            <FormInput
              name='name'
              className='colum-box-bg-change'
              label='Full Name'
              control={control}
              errors={errors}
              inputType='text'
            />
            <FormInput
              name='email'
              className='colum-box-bg-change'
              label='Email'
              control={control}
              errors={errors}
              inputType='email'
            />
            <FormMobileDatePicker
              name='dob'
              label='Date of Birth'
              control={control}
              inputFormat='YYYY-MM-DD'
              errors={errors}
              className='colum-box-bg-change'
              maxDate={dayjs('2005-12-31')}
            />

            <FormInputSelect
              name='gender'
              label='Gender'
              control={control}
              errors={errors}
              inputType='text'
              options={GenderData}
              className='colum-box-bg-change'
            />
            <FormInput
              name='phone'
              className='colum-box-bg-change'
              label='Contact Number'
              control={control}
              errors={errors}
              inputType='tel'
            />
            <FormInput
              className='colum-box-bg-change'
              name='currentLocation'
              label='Current Location'
              control={control}
              errors={errors}
              inputType='text'
            />
          </div>

          {/* Navigation Buttons */}
          <div className={`flex mt-10 justify-end`}>
            <Button type='submit' variant='contained' className='!text-white bg-[#8C57FF]'>
              {loader ? <Loader /> : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser

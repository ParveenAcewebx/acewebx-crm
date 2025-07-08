'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import FormInput from '@/components/FormInput'
import FormMobileDatePicker from '@/components/forminputs/FormMobileDatePicker'
import FormInputSelect from '@/components/forminputs/FormInputSelect'
import FormInputFileUploaderSingle from '@/components/forminputs/FormInputFileUploaderSingle'
import FormTextarea from '@/components/forminputs/FormTextarea'
import Candidate from '@/components/services/CandidateApi'
import { errorMsg, successMsg } from '@/components/toaster/Toaster'
import {
  designationOptions,
  GenderData,
  preferredShiftOptions,
  totalExperienceOptions,
  walkInFormDefaultValues
} from '@/components/constants/StaticData'
import { CandidateFormValidation } from '@/components/CandidateFormValidation'
import ReCAPTCHA from 'react-google-recaptcha'
import Loader from '@/components/Loader'
import dayjs from 'dayjs'
import PhoneMaskInput from '@/components/forminputs/PhoneMaskInput'

function WalkInForm() {
  const [step, setStep] = useState(0)
  const [loader, setLoader] = useState(false)
  const [recaptcha, setRecaptcha] = useState([])

  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: walkInFormDefaultValues,
    resolver: yupResolver(CandidateFormValidation)
  })

  const stepFields = [
    ['name', 'email', 'dob', 'gender', 'phone', 'currentLocation', 'designationApplyingFor', 'totalExperience'],
    [
      'currentSalary',
      'expectedSalary',
      'currentCompanyName',
      'noticePeriod',
      'preferredShift',
      'reasonForChange',
      'resume'
    ]
  ]

  function onReCAPTCHAChange(value) {
    setRecaptcha(value)
    setValue('recaptcha', value)
  }

  const nextStep = async () => {
    const valid = await trigger(stepFields[step])
    if (valid) {
      setStep(prev => Math.min(prev + 1, 2))
    }
  }

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0))
  const reValue = watch('recaptcha')

  const onSubmit = async data => {
    setLoader(true)
    try {
      const formData = new FormData()

      formData.append('g-recaptcha-response', recaptcha)
      const file = data.resume?.[0]
      if (file) {
        formData.append('resume', file)
      }

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await Candidate.addCandidate(formData)

      if (response?.status == true) {
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
    <div
      className='min-h-screen flex flex-col items-center justify-start bg-white relative w-full mobile-view'
      style={{
        backgroundImage: "url('/images/backgroud-ace.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0
      }}
    >
      <div className='text-center z-10 w-2xs acewebx-logo'>
        <img src='./acewebxlogo.png' alt='Acewebx Logo' className='h-25 w-40' />
      </div>

      <div className='bg-gradient-to-br from-red-100 via-white to-red-100 p-10 rounded-xl shadow-md w-full max-w-3xl z-10 border border-red-100'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6 walking'>Job Application</h2>
        <p className='text-sm text-gray-500 mb-4'>Step {step + 1} of 2</p>

        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Personal Info */}
          {step === 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormInput
                name='name'
                label='Full Name'
                control={control}
                errors={errors}
                inputType='text'
                className='colum-box-bg-change'
              />
              <FormInput
                name='email'
                label='Email'
                control={control}
                errors={errors}
                inputType='email'
                className='colum-box-bg-change'
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
                options={GenderData}
                className='colum-box-bg-change'
              />
              <PhoneMaskInput
                name='phone'
                label='Contact Number'
                control={control}
                errors={errors}
                inputType='tel'
                className='colum-box-bg-change'
              />
              <FormInput
                name='currentLocation'
                label='Current Location'
                control={control}
                errors={errors}
                inputType='text'
                className='colum-box-bg-change'
              />
              <FormInputSelect
                name='designationApplyingFor'
                label='Designation Applying For'
                control={control}
                errors={errors}
                options={designationOptions}
                className='colum-box-bg-change'
              />
              <FormInputSelect
                name='totalExperience'
                label='Total Experience'
                control={control}
                errors={errors}
                options={totalExperienceOptions}
                className='colum-box-bg-change'
              />
            </div>
          )}

          {/* Step 2: Job Details */}
          {step === 1 && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                <FormInput
                  name='currentSalary'
                  label='Current Salary'
                  control={control}
                  errors={errors}
                  inputType='number'
                  className='colum-box-bg-change'
                />
                <FormInput
                  name='expectedSalary'
                  label='Expected Salary'
                  control={control}
                  errors={errors}
                  inputType='number'
                  className='colum-box-bg-change'
                />
                <FormInput
                  name='currentCompanyName'
                  label='Current Company'
                  control={control}
                  errors={errors}
                  inputType='text'
                  className='colum-box-bg-change'
                />
                <FormInput
                  name='noticePeriod'
                  label='Notice Period (Days)'
                  control={control}
                  errors={errors}
                  inputType='number'
                  className='colum-box-bg-change'
                />
              </div>
              <FormInputSelect
                name='preferredShift'
                label='Preferred Shift'
                control={control}
                errors={errors}
                options={preferredShiftOptions}
                className='colum-box-bg-change !w-[100%] '
              />
              <FormTextarea
                name='reasonForChange'
                label='Reason for Change'
                control={control}
                errors={errors}
                multiline
                className='col-span-2 border border-gray-600 !h-[160px]'
                style={{
                  width: '100%',
                  resize: 'none',
                  marginTop: '25px',
                  overflow: 'auto',
                  padding: '15px',
                  borderColor: '#ccc',
                  borderRadius: '4px'
                }}
              />

              <FormInputFileUploaderSingle
                name='resume'
                control={control}
                label='Drop Resume here or click to upload.'
                errors={errors}
                className='col-span-2 flex mt-4 items-center flex-col border border-dashed !bg-white border-gray-600 rounded-lg p-4 w-full cursor-pointer'
              />

              <div className='col-span-2 mt-4'>
                <ReCAPTCHA sitekey='6LfSqW8rAAAAABmLFmZcFxFQZgfcUusAJNdVXdXn' onChange={onReCAPTCHAChange} />
                {reValue === undefined && <span className='text-red-600 text-sm'>{errors?.recaptcha?.message}</span>}
              </div>
            </>
          )}

          {/* Navigation */}
          <div className={`flex mt-10 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
            {step > 0 && (
              <Button
                variant='outlined'
                onClick={prevStep}
                className='border border-red-500 text-[#B82025] hover:bg-white hover:text-[#B82025]'
              >
                Back
              </Button>
            )}

            {step < 1 ? (
              <Button variant='contained' onClick={nextStep} className='!text-white bg-[#B82025]'>
                Next
              </Button>
            ) : (
              <Button type='submit' variant='contained' className='!text-white bg-[#B82025]'>
                {loader ? <Loader /> : 'Submit'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default WalkInForm

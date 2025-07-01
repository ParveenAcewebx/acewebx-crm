'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { Button, FormHelperText } from '@mui/material'

import FormInput from '@/components/FormInput'
import FormMobileDatePicker from '@/components/forminputs/FormMobileDatePicker'
import FormInputSelect from '@/components/forminputs/FormInputSelect'
import FormInputFileUploaderSingle from '@/components/forminputs/FormInputFileUploaderSingle'
import FormTextarea from '@/components/forminputs/FormTextarea'

import Candidate from '@/components/services/CandidateApi'
import { errorMsg, successMsg } from '@/components/toaster/Toaster'
import {
  designationOptions,
  experienceOptions,
  GenderData,
  preferredShiftOptions,
  sourceOption,
  totalExperienceOptions,
  walkInFormDefaultValues
} from '@/components/constants/StaticData'
import { CandidateFormValidation } from '@/components/CandidateFormValidation'
import ReCAPTCHA from 'react-google-recaptcha'
import { Key } from 'lucide-react'

function WalkInForm() {
  const [step, setStep] = useState(0)
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
    mode: 'onTouched', // or 'onChange' or 'all'
    defaultValues: walkInFormDefaultValues,
    resolver: yupResolver(CandidateFormValidation)
  })
  const [recaptcha, setRecaptcha] = useState([])

  // const Sitekey="6LfSqW8rAAAAABmLFmZcFxFQZgfcUusAJNdVXdXn"

  function onReCAPTCHAChange(value) {
    setRecaptcha(value)
    setValue('recaptcha', value)
  }
  const stepFields = [
    ['name', 'email', 'dob', 'gender', 'phone', 'currentLocation'], // Step 0
    [
      'designationApplyingFor',
      'totalExperience',
      'currentSalary',
      'expectedSalary',
      'currentCompanyName',
      'noticePeriod',
      'preferredShift',
      'source'
    ], // Step 1
    [
      'reference1Name',
      'reference1ContactNumber',
      'reference1Designation',
      'reference1Experience',
      'reference2Name',
      'reference2ContactNumber',
      'reference2Designation',
      'reference2Experience'
    ], // Step 2
    ['reasonForChange', 'resume'] // Step 3
  ]

  const onSubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('g-recaptcha-response', recaptcha)
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
        router.push('/thankyou')
      }
    } catch (error) {
      console.error('Submission Error:', error)
      errorMsg(error?.message || 'Something went wrong while submitting the form.')
    }
  }

  const nextStep = async () => {
    const valid = await trigger(stepFields[step])
    if (valid) {
      setStep(prev => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => setStep(prev => Math.max(prev - 1, 0))

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-white relative w-full mobile-view'>
      <div className="absolute inset-0 bg-[url('/background-honeycomb.png')] opacity-10" />
      <img src='/backgroud-ace.png' alt='Left Background' className='absolute left-0 bottom-0 h-full z-0 w-full' />

      <div className='text-center z-10 w-2xs acewebx-logo'>
        <img src='./acewebxlogo.png' alt='Acewebx Logo' className='h-25 w-40' />
      </div>

      <div className='bg-gradient-to-br from-red-100 via-white to-red-100 p-10 rounded-xl shadow-md w-full max-w-3xl z-10 border border-red-100'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6 walking'>Walk-in Form</h2>

        <p className='text-sm text-gray-500 mb-4'>Step {step + 1} of 4</p>

        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
          <div
            className={step == 3 ? 'grid grid-cols-1 md:grid-cols-1 gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}
          >
            {/* STEP 1: Personal Information */}
            {step === 0 && (
              <>
                <FormInput name='name' label='Full Name' control={control} errors={errors} inputType='text' />
                <FormInput name='email' label='Email' control={control} errors={errors} inputType='email' />
                <FormMobileDatePicker
                  name='dob'
                  label='Date of Birth'
                  control={control}
                  inputFormat='YYYY-MM-DD'
                  errors={errors}
                />

                <FormInputSelect
                  name='gender'
                  label='Gender'
                  control={control}
                  errors={errors}
                  inputType='text'
                  options={GenderData}
                />
                {/* <FormInput name='gender' label='Gender' control={control} errors={errors} inputType='text' /> */}
                <FormInput name='phone' label='Contact Number' control={control} errors={errors} inputType='tel' />
                <FormInput
                  name='currentLocation'
                  label='Current Location'
                  control={control}
                  errors={errors}
                  inputType='text'
                />
              </>
            )}

            {/* STEP 2: Job Details */}
            {step === 1 && (
              <>
                <FormInputSelect
                  name='designationApplyingFor'
                  label='Designation Applying For'
                  control={control}
                  errors={errors}
                  options={designationOptions}
                />
                <FormInputSelect
                  name='totalExperience'
                  label='Total Experience'
                  control={control}
                  errors={errors}
                  options={totalExperienceOptions}
                />
                <FormInput
                  name='currentSalary'
                  label='Current Salary'
                  control={control}
                  errors={errors}
                  inputType='number'
                />
                <FormInput
                  name='expectedSalary'
                  label='Expected Salary'
                  control={control}
                  errors={errors}
                  inputType='number'
                />
                <FormInput
                  name='currentCompanyName'
                  label='Current Company'
                  control={control}
                  errors={errors}
                  inputType='text'
                />
                <FormInput
                  name='noticePeriod'
                  label='Notice Period'
                  control={control}
                  errors={errors}
                  inputType='number'
                />
                <FormInputSelect
                  name='preferredShift'
                  label='Preferred Shift'
                  control={control}
                  errors={errors}
                  options={preferredShiftOptions}
                />
                <FormInputSelect
                  name='source'
                  label='How did you hear about this vacancy?'
                  control={control}
                  errors={errors}
                  options={sourceOption}
                />
              </>
            )}

            {/* STEP 3: References */}
            {step === 2 && (
              <>
                {/* Reference 1 */}
                <FormInput
                  name='reference1Name'
                  label='Reference 1 Name'
                  control={control}
                  errors={errors}
                  inputType='text'
                />
                <FormInput
                  name='reference1ContactNumber'
                  label='Reference 1 Contact Number'
                  control={control}
                  errors={errors}
                  inputType='text'
                />
                <FormInput
                  name='reference1Designation'
                  label='Reference 1 Designation'
                  control={control}
                  errors={errors}
                  inputType='text'
                />
                <FormInputSelect
                  name='reference1Experience'
                  label='Reference 1 Experience'
                  control={control}
                  errors={errors}
                  options={experienceOptions}
                />
                {/* Reference 2 */}
                <FormInput
                  name='reference2Name'
                  label='Reference 2 Name'
                  control={control}
                  errors={errors}
                  inputType='text'
                />
                <FormInput
                  name='reference2ContactNumber'
                  label='Reference 2 Contact Number'
                  control={control}
                  errors={errors}
                  inputType='text'
                />
                <FormInput
                  name='reference2Designation'
                  label='Reference 2 Designation'
                  control={control}
                  errors={errors}
                  inputType='text'
                />
                <FormInputSelect
                  name='reference2Experience'
                  label='Reference 2 Experience'
                  control={control}
                  errors={errors}
                  options={experienceOptions}
                />
              </>
            )}

            {/* STEP 4: Location, Reason, Resume */}
            {step === 3 && (
              <>
                <FormTextarea
                  name='reasonForChange'
                  label='Reason for Change'
                  control={control}
                  errors={errors}
                  multiline
                  className='border  border-gray-600 !h-[160px]'
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
                  className='flex mt-4 items-center flex-col border border-dashed border-gray-600 rounded-lg p-4 w-full cursor-pointer'
                />
                <ReCAPTCHA sitekey='6LfSqW8rAAAAABmLFmZcFxFQZgfcUusAJNdVXdXn' onChange={onReCAPTCHAChange} />
                <FormHelperText className='text-red-600'>{errors?.recaptcha?.message}</FormHelperText>
              </>
            )}
          </div>

          {/* Navigation Buttons */}
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

            {step < 3 ? (
              <Button variant='contained' onClick={nextStep} className='!text-white bg-[#B82025]'>
                Next
              </Button>
            ) : (
              <Button type='submit' variant='contained' className='!text-white bg-[#B82025]'>
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default WalkInForm

'use client'
import FormInput from '@/components/FormInput'
import { Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CandidateFormValidation } from '@/components/CandidateFormValidation'
import { useRouter } from 'next/navigation'
import { errorMsg, successMsg } from '@/components/toaster/Toaster'
import Candidate from '@/components/services/CandidateApi'
import FormMobileDatePicker from '@/components/forminputs/FormMobileDatePicker'
import FormInputSelect from '@/components/forminputs/FormInputSelect'
import {
  designationOptions,
  designationoptionss,
  experienceOptions,
  sourceOption,
  totalExperienceOptions,
  walkInFormDefaultValues
} from '@/components/constents/StaticData'

function WalkInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: walkInFormDefaultValues,
    // resolver: yupResolver(CandidateFormValidation)
  })

  const router = useRouter()

  // add candidate:-
  const onSubmit = async data => {
    console.log('datadata', data)

    try {
      const response = await Candidate.addCandidate(data)
      if (response.status) {
        successMsg('Candidate form Submit Successfully!')
        router.push('/thankyou')
      }
    } catch (error) {
      console.log('error', error)
      errorMsg(error.message)
    }

    // reset()
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-white relative w-full mobile-view'>
      <div className="absolute inset-0 bg-[url('/background-honeycomb.png')] opacity-10" />
      {/* Left & Right Background Images */}
      <img
        src='/backgroud-ace.png'
        alt='Left Background'
        className='absolute left-0 bottom-0 h-full  z-0 bg-cover bg-no-repeat w-full'
      />
      {/* Logo */}
      <div className=' text-center z-10 w-2xs acewebx-logo'>
        <img
          src='./acewebxlogo.png'
          alt='Acewebx Logo'
          className='h-25 w-40 
'
        />
      </div>

      {/* Form Container */}
      <div className='bg-gradient-to-br from-red-100 via-white to-red-100 p-10 rounded-xl shadow-md w-full max-w-3xl z-10 border border-red-100'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6 walking'>Walk-in Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='name'
            control={control}
            label='Full Name'
            errors={errors}
          />{' '}
          <FormInput
            className='bg-white'
            inputType='email'
            name='email'
            control={control}
            label='Email'
            errors={errors}
            color=''
          />
          <FormMobileDatePicker
            className='bg-white'
            inputFormat='YYYY-MM-DD'
            name='dob'
            control={control}
            label='Date of Birth'
            errors={errors}
            color=''
          />
          <FormInput
            className='bg-white'
            inputType='text'
            name='gender'
            control={control}
            label='Gender'
            errors={errors}
            color=''
          />
          <FormInput
            className='bg-white'
            inputType='number'
            name='phone'
            control={control}
            label='Contact Number'
            errors={errors}
            color=''
          />
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='currentLocation'
            control={control}
            label='Current Location'
            errors={errors}
          />
          {/* select input */}
          <FormInputSelect
            options={designationOptions}
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            name='designationApplyingFor'
            control={control}
            label='Designation Applying For'
            errors={errors}
          />
          <FormInputSelect
            options={totalExperienceOptions}
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='totalExperience'
            control={control}
            label='Total Experience'
            errors={errors}
          />{' '}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='number'
            name='currentSalary'
            control={control}
            label='Current Salary'
            errors={errors}
          />{' '}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='number'
            name='expectedSalary'
            control={control}
            label='Expected Salary'
            errors={errors}
          />
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='currentCompanyName'
            control={control}
            label='Last/Current Company Name'
            errors={errors}
          />
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='noticePeriod'
            control={control}
            label='Notice Period'
            errors={errors}
          />
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reasonForChange'
            control={control}
            label='Reason for Change'
            errors={errors}
          />
          {/* multiselect */}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='preferredShift'
            control={control}
            label='Preferred Shift'
            errors={errors}
          />
          {/* select */}
          <FormInputSelect
            options={sourceOption}
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='source'
            control={control}
            label='How did you hear about this vacancy?'
            errors={errors}
          />
          {/* file upload */}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='resume'
            control={control}
            label='Upload Resume'
            errors={errors}
          />
          {/* step-3 google form fields */}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reference1Name'
            control={control}
            label='Reference 1 Name'
            errors={errors}
          />{' '}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reference1ContactNumber'
            control={control}
            label='Reference 1 Contact Number'
            errors={errors}
          />{' '}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reference1Designation'
            control={control}
            label='Reference 1 Designation'
            errors={errors}
          />{' '}
          {/* select input */}
          <FormInputSelect
            options={experienceOptions}
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reference1Experience'
            control={control}
            label='Reference 1 Experience'
            errors={errors}
          />{' '}
          {/*2nd */}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reference2Name'
            control={control}
            label='Reference 2 Name'
            errors={errors}
          />{' '}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reference2ContactNumber'
            control={control}
            label='Reference 2 Contact Number'
            errors={errors}
          />{' '}
          <FormInput
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reference2Designation'
            control={control}
            label='Reference 2 Designation'
            errors={errors}
          />{' '}
          {/* select input */}
          <FormInputSelect
            options={experienceOptions}
            className='bg-white text-[#333333] border border-gray-300 hover:border-[#333333] focus:border-[#333333] focus:text-[#333333] focus:outline-none'
            inputType='text'
            name='reference2Experience'
            control={control}
            label='Reference 2 Experience'
            errors={errors}
          />{' '}
          {/* Submit Button */}
          <div className='md:col-span-2 flex justify-end'>
            <Button
              type='submit'
              variant='contained'
              className='!text-[#B82025] hover:!text-white   !border-red-700  hover:!bg-[#B82025] bg-transparent primary-btn'
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WalkInForm

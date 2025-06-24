'use client'
import FormInput from '@/components/FormInput'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CandidateFormValidation } from '@/components/CandidateFormValidation'
import { useRouter } from 'next/navigation'
import { errorMsg, successMsg } from '@/components/toaster/Toaster'
import Candidate from '@/components/services/CandidateApi'
import axios from 'axios'

function SubmitForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    },
    resolver: yupResolver(CandidateFormValidation)
  })

  const router = useRouter()

  const onSubmit = async data => {
    const payload = {
      name: data?.firstname,
      email: data?.email,
      phone: data?.phone,
      totalExperience: '3.5',
      relevantExperience: '2.5',
      dob: '2001-11-12',
      currentSalary: '600000.000',
      expectedSalary: '800000',
      noticePeriod: '30'
    }

    try {
      const response = await Candidate.addCandidate(payload)
      if (response.status) {
        successMsg('Candidate form Submit Successfully!')
        router.push('/thankyou')
      }
    } catch (error) {
      console.log('error', error)
      errorMsg(error.message)
    }

    reset()
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-white relative w-full mobile-view'>
      <div className="absolute inset-0 bg-[url('/background-honeycomb.png')] opacity-10" />
      {/* Left & Right Background Images */}
      <img
        src='/backgroud-ace.png'
        alt='Left Background'
        className='absolute left-0 bottom-0 h-full  z-0 bg-cover
bg-no-repeat w-full'
      />
      {/* Logo */}
      <div
        className=' text-center z-10 w-2xs acewebx-logo
'
      >
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
            name='firstname'
            control={control}
            label='First Name'
            errors={errors}
          />

          <FormInput
            className='bg-white'
            inputType='text'
            name='lastname'
            control={control}
            label='Last Name'
            errors={errors}
            color=''
          />
          <FormInput
            className='bg-white'
            inputType='email'
            name='email'
            control={control}
            label='Email'
            errors={errors}
            color=''
          />
          <FormInput
            className='bg-white'
            inputType='number'
            name='phone'
            control={control}
            label='Phone'
            errors={errors}
            color=''
          />

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

export default SubmitForm

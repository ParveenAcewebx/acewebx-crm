'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import FormInput from '@/components/FormInput'
import FormInputSelect from '@/components/forminputs/FormInputSelect'
import { errorMsg, successMsg } from '@/components/toaster/Toaster'
import { designationOptions } from '@/components/constants/StaticData'
import Loader from '@/components/Loader'
import UsersApi from '@/components/services/UsersApi'
import TitleForPage from '@/components/TitleForPage'
import { UsersFormValidation } from '@/components/validations/UsersFormValidation'
import { yupResolver } from '@hookform/resolvers/yup'

function AddUser() {
  const [loader, setLoader] = useState(false)

  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange', // or 'onChange' or 'all'
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: ''
      // role: '',
    },
    resolver: yupResolver(UsersFormValidation)
  })

  const onSubmit = async data => {
    setLoader(true)
    try {
      // Submit via API
      const response = await UsersApi.addUser(data)
      if (response?.status) {
        successMsg('Candidate form submitted successfully!')
        reset()
        setLoader(false)

        router.push('/users/list')
      }
    } catch (error) {
      console.error('Submission Error:', error)
      errorMsg(error?.message || 'Something went wrong while submitting the form.')
      setLoader(false)
    }
  }

  return (
    <>
      {/* <h2 className='text-2xl font-semibold text-gray-800 mb-6 walking items-right'></h2> */}
      <TitleForPage title='Add User' />

      <div className='min-h-screen flex flex-col items-right justify-start relative w-full '>
        <div className='bg-white p-10 rounded-xl  w-full max-w-8xl z-10 border border-greed-100'>
          <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
              <FormInput
                name='password'
                className='colum-box-bg-change'
                label='Password'
                control={control}
                errors={errors}
                inputType='password'
              />

              <FormInput
                name='phone'
                className='colum-box-bg-change'
                label='Contact Number'
                control={control}
                errors={errors}
                inputType='tel'
              />
            </div>
            {/* <div className='mt-6'>
              <FormInput
                className='colum-box-bg-change'
                name='role'
                label='Role'
                control={control}
                errors={errors}
                inputType='number'
              />
            </div> */}
            {/* Navigation Buttons */}
            <div className={`flex mt-10 justify-end`}>
              <Button type='submit' variant='contained' className='!text-white bg-[#8C57FF]'>
                {loader ? <Loader /> : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddUser

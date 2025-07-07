'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import FormInput from '@/components/FormInput'
import { errorMsg, successMsg } from '@/components/toaster/Toaster'
import Loader from '@/components/Loader'
import UsersApi from '@/components/services/UsersApi'
import TitleForPage from '@/components/TitleForPage'
import { yupResolver } from '@hookform/resolvers/yup'
import { UsersFormValidation } from '@/components/validations/UsersFormValidation'

function EditUser() {
  const { id } = useParams()
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
     
    },
    resolver: yupResolver(UsersFormValidation)
  })

  const onSubmitUpdate = async data => {
    setLoader(true)
    try {
      // Submit via API
      const response = await UsersApi.editUser(id, data)
      if (response?.status) {
        successMsg('Candidate form submitted successfully!')
        reset()
        setLoader(false)

        router.push('/users/list')
      }
    } catch (error) {
      console.error('Submission Error:', error)
      setLoader(false)
      errorMsg(error?.message || 'Something went wrong while submitting the form.')
    }
  }

  const getUserDataById = async () => {
    try {
      // Submit via API
      const response = await UsersApi.getByIdUser(id)
      if (response?.status) {
        reset(response?.data?.data)
        setLoader(false)
      }
    } catch (error) {
      console.error(' Error:', error)
      setLoader(false)
      errorMsg(error?.message || 'Something went wrong!')
    }
  }

  useEffect(() => {
    getUserDataById()
  }, [id])

  return (
    <>
      <TitleForPage title='Edit User' />
      <div className='min-h-screen flex flex-col items-right justify-start relative w-full mobile-view'>
        <div className='bg-gradient-to-br from-[#8C57FF]-100 via-white to-[#8C57FF]-100 p-10 rounded-xl  w-full max-w-3xl z-10 border border-greed-100'>
          <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmitUpdate)}>
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

            {/* Navigation Buttons */}
            <div className={`flex mt-10 justify-end`}>
              <Button type='submit' variant='contained' className='!text-white bg-[#8C57FF]'>
                {loader ? <Loader /> : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>{' '}
    </>
  )
}

export default EditUser

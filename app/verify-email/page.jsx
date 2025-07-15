'use client'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const Verification = () => {
  const [verifyEmail, setVerifyEmail] = useState(false)
  const form = useForm()
  const router = useRouter()
  const onSubmitEmail = async data => {
    try {
      const response = await api.get(
        `/candidate/getCandidateByEmail?email=${data?.email}`
      )
      if (response?.status == 200) {
        successMessage({ description: response?.data?.message })
        setVerifyEmail(true)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({ description: error?.message })
    }
  }
  useEffect(() => {
    return () => {
      setVerifyEmail('')
    }
  }, [])
  return (
    <div>
      <div className='flex min-h-[60vh] items-center justify-center'>
        {!verifyEmail ? (
          <Card className='w-full max-w-md shadow-lg'>
            <CardHeader>
              <CardTitle className='text-center text-xl font-semibold'>
                Verify Your Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitEmail)}
                  className='space-y-4'
                >
                  <FormInputField
                    name='email'
                    type='email'
                    form={form}
                    placeholder='Enter Your Email'
                    label='Email'
                  />
                  <Button type='submit' className='w-full'>
                    Verify Email
                  </Button>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        ) : (
          'Check Your Mail'
        )}
      </div>
    </div>
  )
}

export default Verification

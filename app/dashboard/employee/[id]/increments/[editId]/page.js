'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import CommonLayout from '@/components/CommonLayouyt'
import FormDatePicker from '@/components/share/form/datePicker'
import { errorMessage } from '@/components/ToasterMessage'
import AnniversariesApi from '@/services/cadidateApis/employees/AnniversariesApi'
import IncrementsTabApi from '@/services/cadidateApis/employees/IncrementsTabApi'
// import { yupResolver } from '@hookform/resolvers/yup'  // Uncomment if using validation
// import { EventValidation } from '@/validations/EventValidation' // Add your schema if needed

function EditIncrement() {
  const { id, editId } = useParams()
  const eventId = editId
  const router = useRouter()

  const [loader, setLoader] = useState(false)

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      eventDate: '',
    },
    // resolver: yupResolver(EventValidation), // Uncomment if you add Yup schema
  })

  const onSubmit = async (data) => {
    setLoader(true)
    try {
      const response = await IncrementsTabApi.editIncrements(id, eventId, data)
      if (response?.data?.status === true) {
        setLoader(false)
        router.back()
      } else {
        setLoader(false)
        errorMessage({ description: 'Failed to update event.' })
      }
    } catch (error) {
      setLoader(false)
      console.error('Submission Error:', error?.message)
      errorMessage({ description: error?.message || 'Something went wrong.' })
    }
  }

  const candidateDataGetById = async () => {
    try {
      const response = await IncrementsTabApi.getByIdIncrements(id, eventId)
      if (response?.data?.status === true) {
        const data = response?.data?.data
        if (data?.eventDate) {
       let eventDate=   new Date(data?.eventDate + 'T00:00:00')
          form.reset({
            eventDate: eventDate, // Ensure correct key
          })
        }
      }
    } catch (error) {
      console.error('Fetch Error:', error)
      errorMessage({
        description:
          error?.message || 'Something went wrong while fetching event data.',
      })
    }
  }

  useEffect(() => {
    if (id && eventId) {
      candidateDataGetById()
    }
  }, [id, eventId])

  return (
    <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>
      <div className='flex justify-between'>
        <CommonLayout pageTitle='Edit Increment' />
      </div>

      <div className='mt-5'></div>
      <div>
        <FormProvider {...form}>
          <form
            encType='multipart/form-data'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='mb-4 mt-6 grid grid-cols-2 gap-6 md:grid-cols-2'>
              <FormDatePicker
                name='eventDate'
                label='Event Date'
                form={form}
                inputFormat='YYYY-MM-DD'
                className='Date'
                disabled={{ before: new Date('2024-12-31') }}
                defaultMonth={new Date()}
              />
            </div>

            {/* Submit Button */}
            <div className='mt-10 flex justify-start'>
              <Button
                type='submit'
                variant='contained'
                className='bg-[#B82025] text-white'
                disabled={loader}
              >
                {loader ? <Loader className='animate-spin' /> : 'Submit'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default EditIncrement

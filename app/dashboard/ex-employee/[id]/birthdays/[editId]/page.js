'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader } from 'lucide-react'
import CommonLayout from '@/components/CommonLayouyt'
import { errorMessage } from '@/components/ToasterMessage'
import IncrementsTabApi from '@/services/employees/IncrementsTabApi'
import FormSelectField from '@/components/share/form/FormSelect'
import { isHoliday } from '@/components/constants/StaticData'
import * as Yup from 'yup'
import FormInputField from '@/components/share/form/FormInputField'
import { yupResolver } from '@hookform/resolvers/yup'
import CurrentAndNextYearDatepicker from '@/components/share/form/CurrentAndNextYearDatepicker'

function EditBirthdays() {
  const { id, editId } = useParams()
  const eventId = editId
  const router = useRouter()
  const [loader, setLoader] = useState(false)

  const schema = Yup.object({
    bannerUrl: Yup.string().url('Enter a valid URL'),
  });

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      eventDate: '',
    },
    resolver: yupResolver(schema),

  })

  const onSubmit = async (data) => {
    setLoader(true)
    const newData = {
      ...data,
      empEventId: editId,
      eventType: 'birthday',
    }

    try {
      const response = await IncrementsTabApi.saveEmployeeMetaData(newData)
      if (response?.data?.status === true) {
        router.back()
      } else {
        errorMessage({ description: 'Failed to update event.' })
      }
    } catch (error) {
      console.error('Submission Error:', error?.message)
      errorMessage({ description: error?.message || 'Something went wrong.' })
    } finally {
      setLoader(false)
    }
  }

  const candidateDataGetById = async () => {
    try {
      const response = await IncrementsTabApi.getByIdIncrements(Number(eventId))
      const eventData = response?.data?.data?.birthday

      if (eventData) {
        const newData = {
          ...eventData,
          eventDate: new Date(eventData?.eventDate + 'T00:00:00'),
        }
        form.reset(newData)
      }
    } catch (error) {
      console.error('Fetch Error:', error)
      errorMessage({
        description: error?.message || 'Something went wrong while fetching event data.',
      })
    }
  }

  useEffect(() => {
    if (id && eventId) {
      candidateDataGetById()
    }
  }, [id, eventId])

  const isBannerCreated = form.watch('isBannerCreated')
  useEffect(()=>{
    if(isBannerCreated == "no"){
    form.setValue("bannerUrl", "")
    }
    },[form, isBannerCreated])
    

  return (
    <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>
      <div className='flex justify-between'>
        <CommonLayout pageTitle='Edit Birthday' />
      </div>
      <div>
        <Button onClick={() => router.push(`/dashboard/ex-employee/${id}/birthdays`)} >
          <ArrowLeft />  Back To The Birthdays
        </Button></div>
      <div className='mt-5' />

      <FormProvider {...form}>
        <form
          encType='multipart/form-data'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='mb-4 mt-6 grid grid-cols-2 gap-6 md:grid-cols-2'>
            <FormSelectField
              name='isBannerCreated'
              label='Banner'
              form={form}
              options={isHoliday}
              className='colum-box-bg-change'
            />

            {isBannerCreated === 'yes' && (
              <FormInputField
                name='bannerUrl'
                label='Banner URL'
                form={form}
                inputType='text'
                className='colum-box-bg-change'
              />
            )}



            <FormSelectField
              name='isSocialMediaPost'
              label='Social Media Post'
              form={form}
              options={isHoliday}
              className='colum-box-bg-change'
            />

            <FormSelectField
              name='isGiftVoucherCreated'
              label='Gift Voucher'
              form={form}
              options={isHoliday}
              className='colum-box-bg-change'
            />
            <CurrentAndNextYearDatepicker
              name='eventDate'
              label='Event Date'
              form={form}
              inputFormat='YYYY-MM-DD'
              className='Date'
              disabled={{ before: new Date('2024-12-31') }}
              defaultMonth={new Date()}
            />
          </div>

          <div className='mt-10 flex justify-end'>
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
  )
}

export default EditBirthdays

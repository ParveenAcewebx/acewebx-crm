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
import FormTextArea from '@/components/share/form/TextArea'
import IncrementChatCompo from '../chat/Chat'
import CurrentAndNextYearDatepicker from '@/components/share/form/CurrentAndNextYearDatepicker'
import IncrementPreview from '@/components/modal/IncrementPreview'

function EditIncrement() {
  const { id, editId } = useParams()
  const eventId = editId
  const router = useRouter()

  const [loader, setLoader] = useState(false)
  const [incrementData, setIncrementData] = useState({})
  const [incrementModalOpen, setIncrementModalOpen] = useState(false)
  const [checkIsIncrementFromYes, setcheckIsIncrementFromYes] = useState()
  const [incrementMeta, setIncrementMeta] = useState([])
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      eventDate: '',
    },
  })

  const onSubmit = async (data) => {
    setLoader(true)
    const newData = { ...data, empEventId: editId, eventType: "increment" }
    try {
      const response = await IncrementsTabApi.saveEmployeeMetaData(newData)
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
      const response = await IncrementsTabApi.getByIdIncrements(Number(eventId));
      if (response?.data?.data) {
        const eventData = response?.data?.data?.increment;
        const newData = { ...eventData, eventDate: new Date(eventData?.eventDate + 'T00:00:00') }
        setIncrementData(response?.data?.data?.incrementApplication)
        setcheckIsIncrementFromYes(eventData?.employeeSubmittedIncrementForm)
        form.reset(newData);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      errorMessage({
        description: error?.message || "Something went wrong while fetching event data.",
      });
    }
  };


  const metaDataInrementPreview = async () => {
    try {
      const response = await IncrementsTabApi.getByIdIncrementsMetaData(Number(eventId));
      if (response?.data?.data) {
        setIncrementData(response?.data?.data?.incrementApplication)
        setIncrementMeta(response?.data?.data?.incrementMeta)
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      errorMessage({
        description: error?.message || "Something went wrong while fetching event data.",
      });
    }
  }

  useEffect(() => {
    if (id && eventId) {
      candidateDataGetById()
      metaDataInrementPreview()
    }
  }, [id, eventId])


  const isReviewedByHod = form.watch("reviewedByHod")
  const isoneToOneMeeting = form.watch("oneToOneMeeting")
  const isfinalDiscussion = form.watch("finalDiscussion")

  useEffect(() => {
    if (isReviewedByHod == "no") {
      form.setValue("hodReviewRemark", "")
    }
    if (isoneToOneMeeting == "no") {
      form.setValue("oneToOneMeetingRemark", "")
    }
    if (isfinalDiscussion == "no") {
      form.setValue("finalDiscussionRemark", "")
    }
  }, [isReviewedByHod, isoneToOneMeeting, isfinalDiscussion, form])




  const AddvanceOpenModal = () => {
    setIncrementModalOpen(true)
  }
  return (
    <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>
      <div className='flex justify-between'>
        <CommonLayout pageTitle='Edit Increment' />
      </div>



      <div className='flex justify-between mt-3'>
        <Button onClick={() => router.push(`/dashboard/employee/${id}/increments`)} >
          <ArrowLeft />  Back To The Increments
        </Button>

        {
          checkIsIncrementFromYes == "yes" && (
            <Button onClick={() => AddvanceOpenModal()}>
              Review Form
            </Button>)
        }

      </div>

      <div className='w-[100%] mb-4 mt-6 grid grid-cols-2 gap-6 md:grid-cols-2'>
        <FormProvider {...form}>
          <form
            encType='multipart/form-data'
            onSubmit={form.handleSubmit(onSubmit)}
          >

            <div className='mb-4 mt-6 grid grid-cols-2 gap-6 md:grid-cols-2'>
              <FormSelectField
                name='incrementFormSent'
                label='Send Increment Application?'
                form={form}
                options={isHoliday}
                className='colum-box-bg-change'
              />

              <FormSelectField
                name='employeeSubmittedIncrementForm'
                label='Employee Filled Application?'
                form={form}
                options={isHoliday}
                className='colum-box-bg-change'
              />
              <FormSelectField
                name='reviewedByHod'
                label='Reviewed By HOD?'
                form={form}
                options={isHoliday}
                className='colum-box-bg-change'
              />

              {/* text area */}
              {
                isReviewedByHod == "yes" && (
                  <FormTextArea
                    name='hodReviewRemark'
                    label='Reviewed By HOD Remark'
                    form={form}
                    multiline
                    inputType='text'
                    className='col-span-2'
                    style={{
                      border: '1px solid #e9e9e9',
                      height: '47px',
                      outline: 'none'
                    }}
                  />

                )
              }

              <FormSelectField
                name='oneToOneMeeting'
                label='HOD One-to-One Meeting?'
                form={form}
                options={isHoliday}
                className='colum-box-bg-change'
              />

              {/* text area */}
              {
                isoneToOneMeeting == "yes" && (
                  <FormTextArea
                    name='oneToOneMeetingRemark'
                    label='HOD One-to-One Meeting Remark'
                    form={form}
                    multiline
                    inputType='text'
                    className='col-span-2'
                    style={{
                      border: '1px solid #e9e9e9',
                      height: '47px',
                      outline: 'none'
                    }}
                  />

                )
              }



              {/* ------------ */}

              <FormSelectField
                name='finalDiscussion'
                label=' Final Discussion'
                form={form}
                options={isHoliday}
                className='colum-box-bg-change'
              />




              {/* text area */}
              {
                isfinalDiscussion == "yes" && (
                  <FormTextArea
                    name='finalDiscussionRemark'
                    label='Final Discussion Remark'
                    form={form}
                    multiline
                    inputType='text'
                    className='col-span-2'
                    style={{
                      border: '1px solid #e9e9e9',
                      height: '47px',
                      outline: 'none'
                    }}
                  />

                )
              }
              <FormSelectField
                name='hrMeeting'
                label='HR Meeting'
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


            {/* Submit Button */}
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
        {/* </div> */}

        {/* <div className='w-[30%] '> */}
        <IncrementChatCompo id={editId} />

        {/* </div> */}
      </div>

      <IncrementPreview
        isOpen={incrementModalOpen}
        incrementsData={incrementData}
        incrementMeta={incrementMeta}
        onClose={() => setIncrementModalOpen(false)}
      />
    </div>
  )
}

export default EditIncrement

'use client'
import { IncrementFormDefaultValues, YesNoOptions } from '@/components/constants/StaticData'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import { IncrementFormValidation } from '@/components/form-validations/IncrementFormValidation'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import FormTextArea from '@/components/share/form/TextArea'
import { Button } from '@/components/ui/button'
import IncrementAPi from '@/services/cadidateApis/increment/IncrementAPi'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import PageExpired from '@/app/url-expired/page'

function EditIncrementApplicationForm() {
  const { id } = useParams()
  const editId = id
  const [step, setStep] = useState(0)
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  const [isVerify, setIsVerify] = useState(true)
  const [eventID, setEventID] = useState("")

  const form = useForm({
    mode: 'onChange',
    defaultValues: IncrementFormDefaultValues,
    resolver: yupResolver(IncrementFormValidation),
  })

  const appraisalFields = [
    [
      'name',
      'acewebxTenure',
      'totalExperience',
      'totalProjects',
      'ratingOnProjects',
      'clientCalls',
      'clientConverted',
      'newSkills',
      'experienceWithAcewebx',
      'improvementAreas',
    ],
    [
      'currentSalary',
      'expectedSalary',
      'raiseJustified',
      'ShortTermGoals',
      'Suggestions',
      'weaknesses',
      'longTermGoals',
      'keyAchievements',
    ],
  ]

  const nextStep = async (e) => {
    setLoader(true)
    const isStepValid = await form.trigger(appraisalFields[step])
    e.preventDefault()
    if (isStepValid) {
      setStep(prev => prev + 1)
    }
    setLoader(false)
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 0))
    setLoader(false)
  }




  const onSubmit = async data => {
    setLoader(true)
    const newData = { ...data, verifyToken: editId}
    try {
      const response = await IncrementAPi.addIncrementAPi(newData)
      if (response?.data?.status == true) {
        setLoader(false)
        successMessage({ description: 'Updated SuccessFully!' })
        router.push('/thankyou')
      }
    } catch (error) {
      setLoader(false)
      console.log("error:--------->", error)
      setLoader(false)
      errorMessage(
        error?.message || 'Something went wrong while submitting the form.'
      )

    }
  }



  const candidateDataGetById = async () => {
    try {
      const response = await IncrementAPi.getByIdVerifyIncrementAPi(editId);
      console.log("response", response)
      if (response?.data?.status === true) {
        const empId = response?.data?.data?.id;
        setEventID(empId)
        // setIsEplId(empId)
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setIsVerify(error?.status)
      // errorMessage(
      //   error?.message || 'Something went wrong while submitting the form.'
      // );
    }
  };



  useEffect(() => {
    if (!editId) return
    candidateDataGetById(editId)
  }, [editId])



  return (
    <>
      {isVerify == false ? (
        <>
          {/* <span className='text-2xl'></span> */}
          <PageExpired />
        </>
      ) : (
        <div
          className='mobile-view relative flex min-h-screen w-full flex-col items-center justify-start bg-white'
          style={{
            backgroundImage: "url('/images/backgroud-ace.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: 0,
            backgroundAttachment: 'fixed',
          }}
        >
          <div className='w-2xs acewebx-logo z-10 text-center'>
            <img src='../acewebxlogo.png' alt='Acewebx Logo' className='h-25 w-40' />
          </div>

          <div className='z-10 w-full max-w-3xl rounded-xl border border-red-100 bg-gradient-to-br from-red-100 via-white to-red-100 p-10 shadow-md '>
            <h2 className='walking mb-6 text-2xl font-semibold text-gray-800'>
              Increment Application
            </h2>
            <h4 className='mb-8'>
              Please fill out this form to apply for a salary increment based on your performance, achievements, and contributions. Your responses will help management evaluate your eligibility for the expected raise.
            </h4>
            <p className='mb-4 text-sm text-gray-500'>Step {step + 1} of 2</p>

            <FormProvider {...form}>
              <form encType='multipart/form-data' onSubmit={form.handleSubmit(onSubmit)}>
                {step === 0 && (
                  <>
                    <div className=' mb-3 grid grid-cols-1 gap-6 md:grid-cols-1'>
                      <FormInputField name='name' className="!h-[3.8rem]" label='Name' inputType='text' form={form} /></div>
                    <div className='mb-3  grid grid-cols-1 gap-6 md:grid-cols-2'>

                      <FormInputField name='acewebxTenure' className="!h-[3.8rem]" label='Tenure with AceWebX (in years).' inputType='number' form={form} />
                      <FormInputField name='totalExperience' className="!h-[3.8rem]" label='Overall Years of Experience.' inputType='number' form={form} />
                    </div>

                    <div className='mb-3  grid grid-cols-1 gap-6'>
                      <FormTextArea name='experienceWithAcewebx' label='Describe Your Working Experience So Far with AceWebX.' form={form} className='col-span-2' />
                    </div>

                    <div className='mb-3  grid grid-cols-2 gap-6'>
                      <FormInputField name='totalProjects' className="!h-[3.8rem]" label='Projects Completed Last Year.' inputType='number' form={form} />
                      <FormInputField name='ratingOnProjects' className="!h-[3.8rem]" label='Rating on Completed Projects (e.g. 4.5/5).' inputType='number' form={form} />
                    </div>

                    <div className='mb-3  grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <FormSelectField name='clientCalls' className="!h-[3.8rem]" label='Did You Participate in Any Client Calls?' form={form} options={YesNoOptions} />
                      <FormSelectField name='clientConverted' className="!h-[3.8rem]" label='Clients Converted via Test Jobs.' form={form} options={YesNoOptions} />
                    </div>

                    <div className='mb-3  grid grid-cols-2 gap-6 md:grid-cols-2'>
                      <FormInputField name='newSkills' className="!h-[3.8rem]" label='New Skills Acquired in the Last Year.' inputType='text' form={form} />
                      <FormTextArea name='improvementAreas' label='Areas Needing Improvement' form={form} className='col-span-2' />

                    </div>

                  </>
                )}

                {step === 1 && (
                  <>
                    <div className='mb-3  grid grid-cols-2 gap-6 md:grid-cols-2'>
                      <FormInputField name='currentSalary' label='Current Salary (Monthly).' className="!h-[3.8rem]" inputType='number' form={form} />
                      <FormInputField name='expectedSalary' label='Expected Raise (%) or ₹' className="!h-[3.8rem]" inputType='number' form={form} />
                    </div>

                    <div className='mb-3  grid grid-cols-1 gap-6 md:grid-cols-1'>
                      <FormTextArea name='raiseJustified' label='Why Do You Feel the Expected Raise Is Justified?' form={form} className='col-span-2' />
                    </div>

                    <div className='mb-3  grid grid-cols-2 gap-6 md:grid-cols-2'>

                      <FormTextArea name='ShortTermGoals' label='Your Short-Term Goals.' form={form} className='col-span-2' />
                      <FormTextArea name='longTermGoals' label='Your Long-Term Goals.' form={form} className='col-span-2' />
                    </div>
                    <div className='mb-3  grid grid-cols-2 gap-6 md:grid-cols-2'>

                      <FormTextArea name='weaknesses' label='Your Weaknesses.' form={form} className='col-span-2' />
                      <FormTextArea name='keyAchievements' label='Key Achievements This Cycle.' form={form} className='col-span-2' />

                    </div>
                    <div className='mb-3  grid grid-cols-1 gap-6 md:grid-cols-1'>

                      <FormTextArea name='Suggestions' label='Suggestions for Improving Team Processes or Company Culture.' form={form} className='col-span-2' />
                    </div>
                  </>

                )}

                <div className={`mt-10 flex ${step === 0 ? 'justify-end' : 'justify-between'}`}>
                  {step > 0 && (
                    <Button variant='outlined' onClick={prevStep} className='border border-red-500 text-[#B82025] hover:bg-white hover:text-[#B82025]'>
                      Back
                    </Button>
                  )}
                  {step < 1 ? (
                    <Button variant='contained' onClick={(e) => nextStep(e)} className='bg-[#B82025] !text-white'>
                      Next
                    </Button>
                  ) : (
                    <Button type='submit' variant='contained' className='bg-[#B82025] !text-white'>
                      {loader ? <Loader /> : 'Submit'}
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>)}
    </>

  )
}

export default EditIncrementApplicationForm

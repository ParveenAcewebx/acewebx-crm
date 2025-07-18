'use client'
import {
  designationOptions,
  editWalkInForm,
  GenderData,
  preferredShiftOptions,
  sourceOption,
  totalExperienceOptions
} from '@/components/constants/StaticData'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FormProvider, useForm } from 'react-hook-form'
// import Loader from '@/components/Loader'
import PageExpired from '@/app/url-expired/page'
import { errorMessage } from '@/components/ToasterMessage'
import LayoutHeader from '@/components/layoutHeader'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import FormInputFileUploaderSingle from '@/components/share/form/SingleFileUpload'
import FormTextArea from '@/components/share/form/TextArea'
import FormDatePicker from '@/components/share/form/datePicker'
import { Button } from '@/components/ui/button'
import Candidate from '@/services/cadidateApis/CandidateApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import FormMultiSelectField from '@/components/share/form/FormMultiSelect'
import { CandidateFormValidationEditClient } from '@/components/form-validations/CandidateFormValidationEditClient'
import moment from 'moment';
function EditJobApplicationForm() {
  const { id } = useParams()
  const [step, setStep] = useState(2)
  const [loader, setLoader] = useState(false)
  const [recaptcha, setRecaptcha] = useState([])
  const [submitAddValidation, setSubmitAddValidation] = useState(false)
  const [isVerify, setIsVerify] = useState(true)
  const [candiId, setCandiId] = useState('')
  const router = useRouter()
  const form = useForm({
    mode: 'onChange',
    defaultValues: editWalkInForm,
    resolver:
      step === 2 && !submitAddValidation
        ? undefined
        : yupResolver(CandidateFormValidationEditClient)
  })

  const stepFields = [
    [
      'name',
      'email',
      'dob',
      'gender',
      'phone',
      'currentLocation',
      'designationApplyingFor',
      'totalExperience'
    ],
    [
      'currentSalary',
      'expectedSalary',
      'currentCompanyName',
      'noticePeriod',
      'preferredShift',
      'reasonForChange',
      'resume'
    ],
    [
      'reference1Name',
      'reference1ContactNumber',
      'reference1Designation',
      'reference1Experience',
      'reference2Name',
      'reference2ContactNumber',
      'reference2Designation',
      'reference2Experience',
      'source',
      'currentAddress',
      'permanentAddress',
      'lastIncrementDate',
      'lastIncrementAmount'
    ]
  ]

  function onReCAPTCHAChange(value) {
    setRecaptcha(value)
    form.setValue('recaptcha', value)
  }

  const nextStep = async () => {
    const isStepValid = await form.trigger(stepFields[step])
    if (isStepValid) {
      setStep(prev => prev + 1)
      setLoader(false)
      form.unregister('recaptcha', { keepError: false })
    }
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 0))
    setSubmitAddValidation(false)
    setLoader(false)
    form.unregister('recaptcha', { keepError: false })
  }
  const reValue = form.watch('recaptcha')

  const onSubmit = async data => {
    setSubmitAddValidation(true)

    if (reValue == undefined) {
      return
    }
    setLoader(true)
    try {
      const formData = new FormData()

      formData.append('g-recaptcha-response', recaptcha)
      const file = data.resume?.[0]
      if (file) {
        formData.append('resume', file)
      }

      const preferred = JSON.stringify(data?.preferredShift)

      // Object.entries(data).forEach(([key, value]) => {
      //   if (key === 'preferredShift') return // skip it
      //   formData.append(key, value)
      // })



      Object.entries(data).forEach(([key, value]) => {
        if (key === 'preferredShift') return;
      
        if (key === 'dob' || key === 'lastIncrementDate') {
          formData.append(key, moment(value).format('YYYY-MM-DD'));
        } else {
          formData.append(key, value);
        }
      });
      formData.append('preferredShift',preferred)

      const response = await Candidate.updateWalkinCandidate(candiId, formData)
      if (response?.data?.status == true) {
        // successMessage('Candidate form submitted successfully!')
        form.reset()
        setLoader(false)
        router.push('/thankyou')
      }
    } catch (error) {
      setLoader(false)
      errorMessage(
        error?.message || 'Something went wrong while submitting the form.'
      )
      if (error?.message == 'reCaptcha verification failed.') {
        form.unregister('recaptcha', { keepError: false })
      }
    }
  }
  const urlToFile = async (url, fileName) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const contentType = blob.type || 'application/octet-stream'

    return new File([blob], fileName, { type: contentType })
  }

  const candidateDataGetById = async (id, form) => {
    try {
      const response = await Candidate.candidateGetByUUID(id)
      if (response?.data?.status === true) {
        const data = response?.data?.data
        const meta = data?.meta
        setCandiId(data?.id)
        const joiningDate = new Date(data.dob + 'T00:00:00')

        const dataForSet = {
          name: data?.name,
          email: data?.email,
          dob: joiningDate,
          gender: meta?._gender,
          phone: data?.phone,
          currentLocation: meta?._currentLocation,
          designationApplyingFor: meta?._designationApplyingFor,
          totalExperience: data?.totalExperience,
          currentSalary: data?.currentSalary,
          expectedSalary: data?.expectedSalary,
          currentCompanyName: meta?._currentCompanyName,
          noticePeriod: data?.noticePeriod,
          reasonForChange: meta?._reasonForChange,
          preferredShift: JSON.parse(meta?._preferredShift),
          reference1Name: meta?._reference1Name,
          reference1ContactNumber: meta?._reference1ContactNumber,
          reference1Designation: meta?._reference1Designation,
          reference1Experience: meta?._reference1Experience,
          reference2Name: meta?._reference2Name,
          reference2ContactNumber: meta?._reference2ContactNumber,
          reference2Designation: meta?._reference2Designation,
          reference2Experience: meta?._reference2Experience,
          source: meta?._source,
          currentAddress: meta?._currentAddress,
          permanentAddress: meta?._permanentAddress,
          lastIncrementDate: new Date(meta?._lastIncrementDate + 'T00:00:00'),
          lastIncrementAmount: meta?._lastIncrementAmount,
          resume: null // temporarily null until file is loaded
        }

        // Set form fields first
        form.reset(dataForSet)

        // Then load and set the resume file if available
        const resumePath = meta?._resume
        if (resumePath) {
          const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}${resumePath}`
          const fileName = resumePath.split('/').pop() || 'resume.pdf'

          try {
            const fileObj = await urlToFile(fileUrl, fileName)
            form.setValue('resume', fileObj)
          } catch (err) {
            console.error('Failed to convert resume URL to File:', err)
          }
        }
      }
    } catch (error) {
      // errorMessage({ description: error?.message })
      setIsVerify(error?.status)
    }
  }

  useEffect(() => {
    if (!id) return
    candidateDataGetById(id, form)
  }, [id])

  return (
    <>
      {isVerify == false ? (
        <>
          {/* <span className='text-2xl'></span> */}
          <PageExpired />
        </>
      ) : (
        <>
          <div
            className='mobile-view relative flex min-h-screen w-full flex-col items-center justify-start bg-white'
            style={{
              backgroundImage: "url('/images/backgroud-ace.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: 0,
              backgroundAttachment: 'fixed'
            }}
          >
          <div className='w-2xs acewebx-logo z-10 text-center'>
            <img
              src='../acewebxlogo.png'
              alt='Acewebx Logo'
              className='h-25 w-40'
            />
          </div>

          <div className='z-10 w-full max-w-3xl rounded-xl border border-red-100 bg-gradient-to-br from-red-100 via-white to-red-100 p-10 shadow-md'>
            <div className='flex justify-between'>
              <LayoutHeader pageTitle={`Walk-In Form`} />
              {step == 2 && (
                <Button
                  onClick={() => setStep(0)}
                  style={{ fontWeight: '600' }}
                  type='button'
                  variant='contained'
                  className='bg-[#B82025] !text-white'
                >
                  Review Application
                </Button>
              )}
            </div>
            <h4 className='mb-8'>
              Please fill out this form with accurate details. The information
              will be used for the interview process.
            </h4>
            <p className='mb-4 text-sm text-gray-500'>Step {step + 1} of 3</p>
            <FormProvider {...form}>
              <form
                encType='multipart/form-data'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Step 0: Personal Info */}
                {step === 0 && (
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <FormInputField
                      name='name'
                      disable={true}
                      label='Full Name'
                      form={form}
                      inputType='text'
                      className='colum-box-bg-change'
                    />
                    <FormInputField
                      name='email'
                      label='Email'
                      disable={true}
                      form={form}
                      inputType='email'
                      className='colum-box-bg-change'
                    />
                    <FormDatePicker
                      name='dob'
                      label='Date of Birth'
                      form={form}
                      inputFormat='YYYY-MM-DD'
                      className='datepickerouter'
                      disabled={{ after: new Date('2005-12-31') }}
                      defaultMonth={new Date('2005-12-31')}
                    />
                    <FormSelectField
                      name='gender'
                      label='Gender'
                      form={form}
                      options={GenderData}
                      className='colum-box-bg-change'
                    />
                    <FormInputField
                      name='phone'
                      label='Contact Number'
                      form={form}
                      inputType='number'
                      className='colum-box-bg-change'
                    />
                    <FormInputField
                      name='currentLocation'
                      label='Current Location'
                      form={form}
                      inputType='text'
                      className='colum-box-bg-change'
                    />
                    <FormSelectField
                      name='designationApplyingFor'
                      label='Designation Applying For'
                      form={form}
                      options={designationOptions}
                      className='colum-box-bg-change'
                    />
                    <FormSelectField
                      name='totalExperience'
                      label='Total Experience'
                      form={form}
                      options={totalExperienceOptions}
                      className='colum-box-bg-change'
                    />
                  </div>
                )}

                {/* Step 1: Job Details */}
                {step === 1 && (
                  <>
                    <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <FormInputField
                        name='currentSalary'
                        label='Current Salary (Monthly)'
                        form={form}
                        inputType='number'
                        className='colum-box-bg-change'
                      />
                      <FormInputField
                        name='expectedSalary'
                        label='Expected Salary (Monthly)'
                        form={form}
                        inputType='number'
                        className='colum-box-bg-change'
                      />
                      <FormInputField
                        name='currentCompanyName'
                        label='Current Company'
                        form={form}
                        inputType='text'
                        className='colum-box-bg-change'
                      />
                      <FormInputField
                        name='noticePeriod'
                        label='Notice Period (Days)'
                        form={form}
                        inputType='number'
                        className='colum-box-bg-change'
                      />
                    </div>
                    <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                      <FormMultiSelectField
                        name='preferredShift'
                        label='Preferred Shift'
                        form={form}
                        options={preferredShiftOptions}
                        className='colum-box-bg-change !w-[100%]'
                      />
                    </div>
                    <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                      <FormTextArea
                        name='reasonForChange'
                        label='Reason for Change'
                        form={form}
                        multiline
                        className='col-span-2 !h-[160px] border border-gray-600'
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
                    </div>
                    <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                      <FormInputFileUploaderSingle
                        name='resume'
                        control={form.control}
                        form={form}
                        label='Drop Resume here or click to upload'
                      />
                    </div>
                  </>
                )}
                {/* Step 2: only edit time Details */}

                {step === 2 && (
                  <>
                    <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <FormDatePicker
                        name='lastIncrementDate'
                        label='Last Increment Date'
                        form={form}
                        inputFormat='YYYY-MM-DD'
                        className='datepickerouter'
                        disabled={''}
                        defaultMonth={new Date()}
                      />
                      <FormInputField
                        name='lastIncrementAmount'
                        label='Last Increment Amount'
                        form={form}
                        inputType='number'
                        className='colum-box-bg-change'
                      />

                      {/* refrences */}
                      {/* expe-1 */}

                      <FormInputField
                        name='reference1Name'
                        label='Reference1 Name'
                        form={form}
                        inputType='text'
                        className='colum-box-bg-change'
                      />
                      <FormInputField
                        name='reference1ContactNumber'
                        label='Reference1 Contact Number'
                        form={form}
                        inputType='number'
                        className='colum-box-bg-change'
                      />
                      {/* select */}
                      <FormSelectField
                        name='reference1Designation'
                        label='Reference1 Designation'
                        form={form}
                        options={designationOptions}
                        className='colum-box-bg-change'
                      />
                      {/* select */}
                      <FormSelectField
                        name='reference1Experience'
                        label='Reference1 Experience'
                        form={form}
                        options={totalExperienceOptions}
                        className='colum-box-bg-change'
                      />
                      {/* expe-2 */}
                      <FormInputField
                        name='reference2Name'
                        label='Reference2 Name'
                        form={form}
                        inputType='text'
                        className='colum-box-bg-change'
                      />
                      <FormInputField
                        name='reference2ContactNumber'
                        label='Reference2 Contact Number'
                        form={form}
                        inputType='number'
                        className='colum-box-bg-change'
                      />
                      {/* select */}
                      <FormSelectField
                        name='reference2Designation'
                        label='Reference2 Designation'
                        form={form}
                        options={designationOptions}
                        className='colum-box-bg-change'
                      />
                      {/* select */}
                      <FormSelectField
                        name='reference2Experience'
                        label='Reference2 Experience'
                        form={form}
                        options={totalExperienceOptions}
                        className='colum-box-bg-change'
                      />
                    </div>
                    <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                      <FormSelectField
                        name='source'
                        label='How did you hear about us'
                        form={form}
                        options={sourceOption}
                        className='colum-box-bg-change !w-[100%]'
                      />
                    </div>
                    <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <FormTextArea
                        name='currentAddress'
                        label='Current Address'
                        form={form}
                        multiline
                        inputType='text'
                        className='col-span-2 !h-[160px] border border-gray-600'
                      />
                      <FormTextArea
                        name='permanentAddress'
                        label='Permanent Address (As Per Aadhaar)'
                        form={form}
                        multiline
                        inputType='text'
                        className='col-span-2 !h-[160px] border border-gray-600'
                      />
                    </div>
                    <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                      <div className='col-span-2 mt-4'>
                        <ReCAPTCHA
                          sitekey='6LfSqW8rAAAAABmLFmZcFxFQZgfcUusAJNdVXdXn'
                          onChange={onReCAPTCHAChange}
                        />
                        {reValue === undefined && (
                          <span className='text-sm text-red-600'>
                            {form?.formState?.errors?.recaptcha?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* ---------------- */}
                  </>
                )}
                {/* Navigation */}
                <div
                  className={`mt-10 flex ${step === 0 ? 'justify-end' : 'justify-between'}`}
                >
                  {step > 0 && (
                    <Button
                      variant='outlined'
                      onClick={prevStep}
                      className='border border-red-500 text-[#B82025] hover:bg-white hover:text-[#B82025]'
                    >
                      Back
                    </Button>
                  )}

                  {step < 2 ? (
                    <Button
                      variant='contained'
                      onClick={nextStep}
                      className='bg-[#B82025] !text-white'
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type='submit'
                      variant='contained'
                      className='bg-[#B82025] !text-white'
                    >
                      {loader ? <Loader /> : 'Update'}
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        
          </div>
        </>
      )}
    </>
  )
}

export default EditJobApplicationForm

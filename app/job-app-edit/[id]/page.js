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
import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FormProvider, useForm } from 'react-hook-form'

// import Loader from '@/components/Loader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { CandidateFormValidation } from '@/components/form-validations/CandidateFormValidation'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import PhoneMaskInput from '@/components/share/form/PhoneMaskInput'
import FormInputFileUploaderSingle from '@/components/share/form/SingleFileUpload'
import FormTextArea from '@/components/share/form/TextArea'
import FormDatePicker from '@/components/share/form/datePicker'
import { Button } from '@/components/ui/button'
import Candidate from '@/services/cadidateApis/CandidateApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import { CandidateFormValidationEdit } from '@/components/form-validations/CandidateFormValidationEdit'

function EditJobApplicationForm() {
  const { id } = useParams()
  const [step, setStep] = useState(0)
  const [loader, setLoader] = useState(false)
  const [recaptcha, setRecaptcha] = useState([])
  const [submitAddValidation, setSubmitAddValidation] = useState(false)
  const router = useRouter()
  const form = useForm({
    mode: 'onChange',
    defaultValues: editWalkInForm,
    resolver:
      step === 2 && !submitAddValidation
        ? undefined
        : yupResolver(CandidateFormValidationEdit)
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

  // const hasClickedOnce = useRef(false)
  // const clickCount = useRef(0)

  const onSubmit = async data => {
    // clickCount.current += 1

    setSubmitAddValidation(true)

    if (reValue == undefined) {
      return
    }
    console.log('TTTTTTTTTTTTTTTTTTT')
    setLoader(true)
    try {
      const formData = new FormData()

      formData.append('g-recaptcha-response', recaptcha)
      const file = data.resume?.[0]
      if (file) {
        formData.append('resume', file)
      }

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const response = await Candidate.updateCandidate(id, formData)
      if (response?.data?.status == true) {
        successMessage('Candidate form submitted successfully!')
        form.reset()
        setLoader(false)
        router.push('/thankyou')
      }
    } catch (error) {
      console.error('Submission Error:', error)
      setLoader(false)
      errorMessage(
        error?.message || 'Something went wrong while submitting the form.'
      )
    }
  }

  const candidateDataGetById = async () => {
    try {
      const response = await Candidate.candidateGetById(id)

      if (response?.data?.status == true) {
        const mataData = response?.data?.data?.meta
        const resumeUrl = `${process.env.NEXT_PUBLIC_API_URL}${mataData?._resume}`
        console.log('resumeUrl', resumeUrl)
        const dataForSet = {
          name: response?.data?.data?.name,
          email: response?.data?.data?.email,
          dob: response?.data?.data?.dob,
          gender: mataData._gender,
          phone: response?.data?.data?.phone,
          currentLocation: mataData?._currentLocation,
          designationApplyingFor: mataData?._designationApplyingFor,
          totalExperience: response?.data?.data?.totalExperience,
          currentSalary: response?.data?.data?.currentSalary,
          expectedSalary: response?.data?.data?.expectedSalary,
          currentCompanyName: mataData?._currentCompanyName,
          noticePeriod: response?.data?.data?.noticePeriod,
          reasonForChange: mataData?._reasonForChange,
          preferredShift: mataData?._preferredShift,
          // resume: resumeUrl,
          reference1Name: mataData?._reference1Name,
          reference1ContactNumber: mataData?._reference1ContactNumber,
          reference1Designation: mataData?._reference1Designation,
          reference1Experience: mataData?._reference1Experience,
          reference2Name: mataData?._reference2Name,
          reference2ContactNumber: mataData?._reference2ContactNumber,
          reference2Designation: mataData?._reference2Designation,
          reference2Experience: mataData?._reference2Experience,
          source: mataData?._source,
          currentAddress: mataData?._currentAddress,
          permanentAddress: mataData?._permanentAddress,
          lastIncrementDate: mataData?._lastIncrementDate,
          lastIncrementAmount: mataData?._lastIncrementAmount
        }
        form.reset(dataForSet)
      }
    } catch (error) {
      console.error('Submission Error:', error)
      errorMessage(
        error?.message || 'Something went wrong while submitting the form.'
      )
    }
  }

  useEffect(() => {
    candidateDataGetById()
  }, [id])
  return (
    <div
      className='mobile-view relative flex min-h-screen w-full flex-col items-center justify-start bg-white'
      style={{
        backgroundImage: "url('/images/backgroud-ace.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0
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
        <h2 className='walking mb-6 text-2xl font-semibold text-gray-800'>
          Job Application
        </h2>
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
                  label='Full Name'
                  form={form}
                  inputType='text'
                  className='colum-box-bg-change'
                />
                <FormInputField
                  name='email'
                  label='Email'
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
                  inputType='tel'
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
                <FormSelectField
                  name='preferredShift'
                  label='Preferred Shift'
                  form={form}
                  options={preferredShiftOptions}
                  className='colum-box-bg-change !w-[100%]'
                />
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

                <FormInputFileUploaderSingle
                  name='resume'
                  control={form.control}
                  form={form}
                  label='Drop Resume here or click to upload'
                />
              </>
            )}
            {/* Step 2: only edit time Details */}

            {step === 2 && (
              <>
                <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <FormInputField
                    name='currentAddress'
                    label='Current Address'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='permanentAddress'
                    label='Permanent Address (As Per Aadhaar)'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />

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
                <FormSelectField
                  name='source'
                  label='How did you hear about us'
                  form={form}
                  options={sourceOption}
                  className='colum-box-bg-change !w-[100%]'
                />
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
  )
}

export default EditJobApplicationForm

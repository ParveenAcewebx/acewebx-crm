'use client'
import {
  businessGenerate,
  onlinePlatforms,
  preferredShiftOptions,
  salesCandidateDefaultValue,
  totalExperienceOptions
} from '@/components/constants/StaticData'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FormProvider, useForm } from 'react-hook-form'

// import Loader from '@/components/Loader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { SalesCandidateValidation } from '@/components/form-validations/SalesCandidateValidation'
import LayoutHeader from '@/components/layoutHeader'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import FormInputFileUploaderSingle from '@/components/share/form/SingleFileUpload'
import FormTextArea from '@/components/share/form/TextArea'
import FormDatePicker from '@/components/share/form/datePicker'
import { Button } from '@/components/ui/button'
import SalesCandidate from '@/services/cadidateApis/SalesCandidateApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'

function EditSalesJobApplicationForm() {
  const { id } = useParams()

  const [loader, setLoader] = useState(false)
  const [recaptcha, setRecaptcha] = useState([])
  const [candEmail , setCandEmail] = useState("")

  const router = useRouter()
  const form = useForm({
    mode: 'onChange',
    defaultValues: salesCandidateDefaultValue,
    resolver: yupResolver(SalesCandidateValidation)
  })

  function onReCAPTCHAChange(value) {
    setRecaptcha(value)
    form.setValue('recaptcha', value)
  }

  const reValue = form.watch('recaptcha')

  const urlToFile = async (url, fileName) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const contentType = blob.type || 'application/octet-stream'

    return new File([blob], fileName, { type: contentType })
  }

  const candidateDataGetById = async () => {
    try {
      const response = await SalesCandidate.salesCandidateGetById(id)
      if (response?.data?.status === true) {
        const data = response?.data?.data
        setCandEmail(data?.email)
        // Set form fields first
        form.reset(data)

        // Then load and set the resume file if available
        const resumePath = data?.resume
        if (resumePath) {
          const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}${resumePath}`
          const fileName = resumePath.split('/').pop() || 'resume.pdf'

          try {
            const fileObj = await urlToFile(fileUrl, fileName)
            console.log('fileObjfileObj', fileObj)

            form.setValue('resume', fileObj)
          } catch (err) {
            console.error('Failed to convert resume URL to File:', err)
          }
        }
      }
    } catch (error) {
      errorMessage({ description: error?.message })
    }
  }

  const onSubmit = async data => {
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

      const response = await SalesCandidate.updateSalesCandidate(id, formData)
      if (response?.data?.status == true) {
        form.reset()
        setLoader(false)
        successMessage({ description: 'Updated SuccessFully!' })
        router.push('/dashboard/admin/candidate-sales')
      }
    } catch (error) {
      setLoader(false)

      console.error('Submission Error:', error?.message)
      errorMessage({ description: error?.message })
      if (error?.message == 'reCaptcha verification failed.') {
        form.unregister('recaptcha', { keepError: false })
      }
    }
  }

  useEffect(() => {
    if (!id) return

    candidateDataGetById()
  }, [id])
  return (
    <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start bg-white'>
      {/* <div className='w-2xs acewebx-logo z-10 text-center'>
        <img src='./acewebxlogo.png' alt='Acewebx Logo' className='h-25 w-40' />
      </div> */}
      {}
      <div className=''>
        <div className='flex justify-between'>
          <LayoutHeader pageTitle={`Sales Candidate Details (${candEmail})`} />
        </div>
        <div className=''>
          <FormProvider {...form}>
            <form
              encType='multipart/form-data'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
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
                  name='joiningDate'
                  label='When can you join? '
                  form={form}
                  inputFormat='YYYY-MM-DD'
                  className='datepickerouter'
                  disabled={{ before: new Date('2024-12-31') }}
                  defaultMonth={new Date()}
                />
                {/* <FormSelectField
                name='gender'
                label='Gender'
                form={form}
                options={GenderData}
                className='colum-box-bg-change'
              /> */}
                <FormInputField
                  name='phone'
                  label='Contact Number'
                  form={form}
                  inputType='number'
                  className='colum-box-bg-change'
                />
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
                />{' '}
                <FormInputField
                  name='monthlySalesTarget'
                  label='Current Monthly Sales Target ($)'
                  form={form}
                  inputType='number'
                  className='colum-box-bg-change'
                />
                <FormSelectField
                  name='preferredShift'
                  label='Preferred Shift'
                  form={form}
                  options={preferredShiftOptions}
                  className='colum-box-bg-change !w-[100%]'
                />
                <FormInputField
                  name='preferredRegions'
                  label='Preferred Geographic Regions for Sales'
                  form={form}
                  inputType='text'
                  className='colum-box-bg-change'
                />
              </div>

              <div className='mb-4 mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormInputField
                  name='freshBusinessTarget'
                  label='New Business Monthly Target ($)'
                  form={form}
                  className='colum-box-bg-change'
                />
                <FormSelectField
                  name='totalExperience'
                  label='How many years of experience do you have in sales? '
                  form={form}
                  options={totalExperienceOptions}
                  className='colum-box-bg-change'
                />
                <FormInputField
                  name='achievedTarget'
                  label='Targets Achieved from Assigned Monthly Targets ($)'
                  form={form}
                  inputType='text'
                  className='colum-box-bg-change'
                />
                <FormSelectField
                  name='leadPlatforms'
                  label='Which online platforms do you use for lead generation? '
                  form={form}
                  options={onlinePlatforms}
                  className='colum-box-bg-change'
                />
              </div>

              <div className='mb-4 mt-6 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <FormSelectField
                  name='businessMethods'
                  label='How do you generate business?'
                  form={form}
                  options={businessGenerate}
                  className='colum-box-bg-change'
                />
              </div>

              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'></div>
              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <FormTextArea
                  name='reasonForLeaving'
                  label='Reason for leaving your current company?'
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
                {/* textarea */}
                <FormTextArea
                  name='topSalesAchievement'
                  label='Describe your most successful sales achievement. '
                  f
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
                />{' '}
              </div>
              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <FormInputFileUploaderSingle
                  name='resume'
                  control={form.control}
                  form={form}
                  label='Drop Resume here or click to upload'
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

              {/* Navigation */}
              <div className={`mt-10 flex justify-end`}>
                <Button
                  type='submit'
                  variant='contained'
                  className='bg-[#B82025] !text-white'
                >
                  {loader ? <Loader /> : 'Submit'}
                </Button>
              </div>
            </form>
          </FormProvider>{' '}
        </div>
      </div>
    </div>
  )
}

export default EditSalesJobApplicationForm

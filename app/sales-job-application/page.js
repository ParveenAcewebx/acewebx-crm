'use client'
import {
  businessGenerate,
  GenderData,
  onlinePlatforms,
  preferredShiftOptions,
  salesCandidateDefaultValue,
  totalExperienceOptions
} from '@/components/constants/StaticData'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FormProvider, useForm } from 'react-hook-form'
import { errorMessage } from '@/components/ToasterMessage'
import { SalesCandidateValidation } from '@/components/form-validations/SalesCandidateValidation'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import FormInputFileUploaderSingle from '@/components/share/form/SingleFileUpload'
import FormTextArea from '@/components/share/form/TextArea'
import FormDatePicker from '@/components/share/form/datePicker'
import { Button } from '@/components/ui/button'
import SalesCandidate from '@/services/cadidateApis/SalesCandidateApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import FormMultiSelectField from '@/components/share/form/FormMultiSelect'
import moment from 'moment'

function SalesJobApplicationForm() {
  const [loader, setLoader] = useState(false)
  const [recaptcha, setRecaptcha] = useState([])
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

  const onSubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('g-recaptcha-response', recaptcha)
      const file = data.resume?.[0]
      if (file) {
        formData.append('resume', file)
      }

      const preferred = JSON.stringify(data?.preferredShift)
      Object.entries(data).forEach(([key, value]) => {
        // Skip these keys entirely
        if (['preferredShift', 'businessMethods', 'leadPlatforms'].includes(key)) return;
      
        // Format 'joiningDate', append everything else as-is
        if (key === 'joiningDate') {
          formData.append(key, moment(value).format('YYYY-MM-DD'));
        } else {
          formData.append(key, value);
        }
      });
      
      formData.append('businessMethods',JSON.stringify(data?.businessMethods))
      formData.append('leadPlatforms',JSON.stringify(data?.leadPlatforms))
      formData.append('preferredShift',preferred)

      const response = await SalesCandidate.addSalesCandidate(formData)
      if (response?.data?.status == true) {
        form.reset()
        setLoader(false)
        router.push('/thankyou')
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
  return (
    <div
      className='mobile-view relative flex min-h-screen w-full flex-col items-center justify-start bg-white'
      style={{
        backgroundImage: "url('/images/backgroud-ace.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0,
        backgroundAttachment: "fixed"
      }}
    >
      <div className='w-2xs acewebx-logo z-10 text-center'>
        <img src='./acewebxlogo.png' alt='Acewebx Logo' className='h-25 w-40' />
      </div>

      <div className='z-10 w-full max-w-3xl rounded-xl border border-red-100 bg-gradient-to-br from-red-100 via-white to-red-100 p-10 shadow-md'>
        <h2 className='walking mb-6 text-2xl font-semibold text-gray-800'>
          Sales Candidate Job Application
        </h2>

        <h4 className='mb-8'>
          Thank you for your interest in joining AceWebX. Please fill out the
          following form with accurate information. This will help us evaluate
          your application before proceeding with the interview process. We look
          forward to learning more about your experience and how you can
          contribute to our team. If selected, our HR team will contact you for
          the next steps.
        </h4>
        <FormProvider {...form}>
          <form
            encType='multipart/form-data'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormInputField
                name='name'
                label='Full Name*'
                form={form}
                inputType='text'
                className='colum-box-bg-change'
              />
              <FormInputField
                name='email'
                label='Email*'
                form={form}
                inputType='email'
                className='colum-box-bg-change'
              />
              <FormDatePicker
                name='joiningDate'
                label='When can you join?*'
                form={form}
                inputFormat='YYYY-MM-DD'
                className='datepickerouter'
                disabled={{ before: new Date('2016-12-31') }}
                defaultMonth={new Date()}
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
                label='Contact Number*'
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
              <FormMultiSelectField
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

            <div className='mb-4 mt-6 grid grid-cols-1 gap-6 md:grid-cols-1'>
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
              <FormMultiSelectField
                name='leadPlatforms'
                label='Which online platforms do you use for lead generation? '
                form={form}
                options={onlinePlatforms}
                className='colum-box-bg-change'
              />
              <FormMultiSelectField
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
                className='col-span-2 !h-[160px] border '
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
                className='col-span-2 !h-[160px] border '
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
                label='Drop Resume here or click to upload*'
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
        </FormProvider>
      </div>
    </div>
  )
}

export default SalesJobApplicationForm

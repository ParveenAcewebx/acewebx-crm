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
import { FormProvider, useForm } from 'react-hook-form'

// import Loader from '@/components/Loader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { CandidateFormValidationEdit } from '@/components/form-validations/CandidateFormValidationEdit'
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

function EditCandidateDetails() {
  const { id } = useParams()
  const [loader, setLoader] = useState(false)
  const [recaptcha, setRecaptcha] = useState([])
  const [candEmail , setCandEmail] = useState("")
  const router = useRouter()
  const form = useForm({
    mode: 'onChange',
    defaultValues: editWalkInForm,
    // resolver: yupResolver(CandidateFormValidationEdit)
  })

 

  const reValue = form.watch('recaptcha')

  // const onSubmit = async data => {
  //   console.log("data",data)
  
  //   setLoader(true)
  //   try {
  //     const formData = new FormData()

  //     const file = data.resume?.[0]
  //     if (file) {
  //       formData.append('resume', file)
  //     }

  //     const preferred = JSON.stringify(data?.preferredShift)

  //     Object.entries(data).forEach(([key, value]) => {
  //       if (key === 'preferredShift') return // skip it
  //       formData.append(key, value)
  //     })
  //     formData.append('preferredShift',preferred)

  //     const response = await Candidate.updateCandidate(id, formData)
  //     if (response?.data?.status == true) {
  //       form.reset()
  //       setLoader(false)
  //       successMessage({ description: 'Updated SuccessFully!' })

  //       router.push('/dashboard/admin/candidates')
  //     }
  //   } catch (error) {
  //     setLoader(false)

  //     setLoader(false)
  //     errorMessage(
  //       error?.message || 'Something went wrong while submitting the form.'
  //     )
     
  //   }
  // }

  const onSubmit = async data => {
  
    setLoader(true)
    try {
      const formData = new FormData()

      // formData.append('g-recaptcha-response', recaptcha)
      const file = data.resume?.[0]
      if (file) {
        formData.append('resume', file)
      }

      const preferred = JSON.stringify(data?.preferredShift)

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'preferredShift') return // skip it
        formData.append(key, value)
      })
      formData.append('preferredShift',preferred)

      const response = await Candidate.updateCandidate(id, formData)
      if (response?.data?.status == true) {
        form.reset()
        setLoader(false)
        successMessage({ description: 'Updated SuccessFully!' })

        router.push('/dashboard/admin/candidates')
      }
    } catch (error) {
      setLoader(false)

      setLoader(false)
      errorMessage(
        error?.message || 'Something went wrong while submitting the form.'
      )
     
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
      const response = await Candidate.candidateGetById(id)

      if (response?.data?.status === true) {
        const data = response?.data?.data
        const meta = data?.meta
        setCandEmail(data?.email)
        const dataForSet = {
          name: data?.name,
          email: data?.email,
          dob: data?.dob,
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
          lastIncrementDate: meta?._lastIncrementDate,
          lastIncrementAmount: meta?._lastIncrementAmount,
          resume: null // temporarily null until file is loaded
        }

        // Set form fields first
        form.reset(dataForSet)

        // Then load and set the resume file if available
        const resumePath = response?.data?.data?.resume?.filePath
        // const resumePath = meta?._resume

        if (resumePath) {
          const fileUrl = `${process.env.NEXT_PUBLIC_API_URL}${resumePath}`
          console.log('fileUrlfileUrl', fileUrl)
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
      console.error('Submission Error:', error)
      errorMessage(
        error?.message || 'Something went wrong while submitting the form.'
      )
    }
  }

  useEffect(() => {
    if (!id) return
    candidateDataGetById(id, form)
  }, [id])

  console.log('formpppp', form.watch('resume'))
  return (
    <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>
    

      <div className='flex justify-between'>
        <LayoutHeader pageTitle={`Candidate Details (${candEmail})`} />
      </div>

      <div className='mt-5'>{/* <Separator /> */}</div>
      <div className=''>
        <FormProvider {...form}>
          <form
            encType='multipart/form-data'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <fieldset className='custom-raduis   bg-white font-semibold'>
                   <legend className="text-lg font-bold  pt-[65px] ml-[25px]">Personal Information</legend>
              <div class="multipart-field-one">
              <FormInputField
                  name='name'
                  label='Full Name'
                  form={form}
                  inputType='text'
                  className='colum-box-bg-change'
                  style={{ width: '50%' }}
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
               </div>
               <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 ace-reason'>
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
                      /></div>
               </fieldset>




                <fieldset className='custom-raduis   bg-white font-semibold'>
                <legend className="text-lg font-bold  pt-[65px] ml-[25px]"> Professional Information</legend>
               <div class="multipart-field-two">
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
              <FormSelectField
                name='source'
                label='How did you hear about us'
                form={form}
                options={sourceOption}
                className='colum-box-bg-change !w-[100%]'
              />
              <FormMultiSelectField
                name='preferredShift'
                label='Preferred Shift'
                form={form}
                options={preferredShiftOptions}
                className='colum-box-bg-change !w-[100%]'
              />
              </div>
           
              </fieldset>





            {/* Step 2: only edit time Details */}
                 <fieldset className='custom-raduis   bg-white font-semibold'>
                <legend className="text-lg font-bold  pt-[65px] ml-[25px]">Reference </legend>
              {/* <div class="multipart-field-three"> */}
             

              {/* refrences */}
              {/* expe-1 */}
               <div className='mb-4 grid grid-cols-4 gap-6 md:grid-cols-4 ace-reason'>
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
              {/* </div> */}
                </fieldset>



             
                <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1 ace-reason'>
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

            <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1 ace-reason'>
              <FormInputFileUploaderSingle
                name='resume'
                control={form.control}
                form={form}
                label='Drop Resume here or click to upload'
              />
            </div>
        
            {/* ---------------- */}

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

export default EditCandidateDetails
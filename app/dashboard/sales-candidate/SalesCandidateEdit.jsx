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
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
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
import { SalesCandidateValidationEdit } from '@/components/form-validations/SalesCandidateValidationEdit'
import moment from 'moment'
import SkillApi from '@/services/cadidateApis/settings/SkillApi'

function EditSalesJobApplication({ editId }) {
  const id = editId

  const [loader, setLoader] = useState(false)
  const [candEmail, setCandEmail] = useState("")

  const router = useRouter()
  const form = useForm({
    mode: 'onChange',
    defaultValues: salesCandidateDefaultValue,
    resolver: yupResolver(SalesCandidateValidationEdit)
  })

  // url to convert into file object:-----
  const urlToFile = async (url, fileName) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const contentType = blob.type || 'application/octet-stream'

    return new File([blob], fileName, { type: contentType })
  }


  //form data get by id :---- 
  const candidateDataGetById = async () => {
    try {
      const response = await SalesCandidate.salesCandidateGetById(id)
      if (response?.data?.status === true) {
        const data = response?.data?.data
        setCandEmail(data?.email)
        // Set form fields first
        form.reset(data)
        form?.setValue('preferredShift', JSON.parse(data?.preferredShift))
        form?.setValue('businessMethods', JSON.parse(data?.businessMethods))
        form?.setValue('leadPlatforms', JSON.parse(data?.leadPlatforms))
        form?.setValue('skill', JSON.parse(data?.skill))

        const joiningDate = new Date(data.joiningDate + 'T00:00:00')
        form?.setValue('joiningDate', joiningDate)

        // Then load and set the resume file if available
        const resumePath = data?.resume
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
      errorMessage({ description: error?.message })
    }
  }

  // update handler:--
  const onSubmit = async data => {
    try {
      const formData = new FormData()
      // need only those key and values which touched :-
      const dirtyFields = form.formState.dirtyFields
      const updateFieldsValue = Object.keys(dirtyFields);

      if (updateFieldsValue) {
        formData.append('updateField', JSON.stringify(updateFieldsValue))
      }
      const file = data.resume?.[0]
      if (file) {
        formData.append('resume', file)
      }

      const preferred = JSON.stringify(data?.preferredShift)
      Object.entries(data).forEach(([key, value]) => {
        // Skip these keys entirely
        if (['preferredShift', 'businessMethods', 'leadPlatforms', 'skill'].includes(key)) return;

        // Format 'joiningDate', append everything else as-is
        if (key === 'joiningDate') {
          formData.append(key, moment(value).format('YYYY-MM-DD'));
        } else {
          formData.append(key, value);
        }
      });

      formData.append('businessMethods', JSON.stringify(data?.businessMethods))
      formData.append('leadPlatforms', JSON.stringify(data?.leadPlatforms))
      formData.append("skill", JSON.stringify(data?.skill))
      formData.append('preferredShift', preferred)

      const response = await SalesCandidate.updateSalesCandidate(id, formData)
      if (response?.data?.status == true) {
        form.reset()
        setLoader(false)
        successMessage({ description: 'Updated SuccessFully!' })
        router.replace("detail")

        // router.push('/dashboard/candidate-sales')
      }
    } catch (error) {
      setLoader(false)

      console.error('Submission Error:', error?.message)
      errorMessage({ description: error?.message })

    }
  }




  useEffect(() => {
    if (!id) return

    candidateDataGetById()
  }, [id])


  const [skillsData, setSkillsData] = useState([])



  useEffect(() => {
    // This code runs only on the client side
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData = localStorage.getItem("globalSettings");
      console.log("storedData",storedData)
      const skillDataOption = JSON.parse(storedData)
      if (skillDataOption?.skills) {
        const candidateOptions = skillDataOption?.skills?.salesCandidate?.map((item) => ({
          label: item,
          value: item?.toLowerCase(), // assuming you meant to use lowercase
        }));
        setSkillsData(candidateOptions);

      }
    }
  }, []);

  console.log("skillsData",skillsData)
  return (
    <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start '>
      <div className=''>
        <div className=''>
          <FormProvider {...form}>
            <form
              encType='multipart/form-data'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <fieldset className='custom-raduis   bg-white font-semibold'>
                <legend className="text-lg font-bold  ml-[25px]">Personal Information</legend>
                <div class="multipart-field-one">
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
                    disabled={{ before: new Date('2024-12-31') }}
                    defaultMonth={new Date()}
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

                  <FormSelectField
                    name='gender'
                    label='Gender'
                    form={form}
                    options={GenderData}
                    className='colum-box-bg-change'
                  /></div>
              </fieldset>

              <fieldset className='custom-raduis   bg-white font-semibold'>
                <legend className="text-lg font-bold  pt-[65px] ml-[25px]">Sales Profile Overview</legend>
                <div class="multipart-field-two">
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
                </div>
              </fieldset>
              <fieldset className='custom-raduis   bg-white font-semibold'>
                <legend className="text-lg font-bold  pt-[65px] ml-[25px]"> Lead Generation & Business Strategy</legend>
                <div class="multipart-field-two-platfroms">
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
              </fieldset>

              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <FormMultiSelectField
                  name="skill"
                  form={form}
                  label="Skills"
                  options={skillsData}
                  placeholder="Enter Your Skills"
                  className="mt-2"
                /></div>
              <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1'>
                <FormTextArea
                  name='reasonForLeaving'
                  label='Reason for leaving your current company?'
                  form={form}
                  multiline
                  className='col-span-2 !h-[160px] border'
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

export default EditSalesJobApplication

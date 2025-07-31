'use client'
import {
  designationOptions,
  editWalkInForm,
  formDefaultValues,
  GenderData,
  preferredShiftOptions,
  RelationData,
  sourceOption,
  totalExperienceOptions
} from '@/components/constants/StaticData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import moment from 'moment';

// import Loader from '@/components/Loader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { CandidateFormValidationEdit } from '@/components/form-validations/CandidateFormValidationEdit'
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
import EmployeesApi from '@/services/cadidateApis/employees/EmployeesApi'
import CommonLayout from '@/components/CommonLayouyt'
import { EmployeeValidation } from '@/components/form-validations/EmployeeValidation'

function AddEmployees() {
  const [loader, setLoader] = useState(false)
  const [candEmail, setCandEmail] = useState("")
  const router = useRouter()
  const form = useForm({
    mode: 'onChange',
    defaultValues: formDefaultValues,
    resolver: yupResolver(EmployeeValidation)
  })



  const onSubmit = async data => {

    setLoader(true)
    try {
      const formData = new FormData()
   
      Object.entries(data).forEach(([key, value]) => {

        if (key === 'dobDocument' || key === 'dateOfJoining' || key === 'dobCelebration') {
          formData.append(key, moment(value).format('YYYY-MM-DD'));
        } else {
          formData.append(key, value);
        }
      });

      const response = await EmployeesApi.addEmployees(formData)
      console.log("response",response)
      if (response?.data?.status == true) {
        form.reset()
        setLoader(false)
        successMessage({ description: 'Added SuccessFully!' })
        router.push('/dashboard/employees')
      }
    } catch (error) {
      setLoader(false)

      setLoader(false)
      errorMessage(
        error?.message || 'Something went wrong while submitting the form.'
      )

    }
  }


 





  const isOther = form.watch("emergencyContactRelation")

  return (
    <>
      <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>

        <div className='flex justify-between'>
          <CommonLayout pageTitle={`Add Employee`} />
        </div>

        <div className=''>
          <FormProvider {...form}>
            <form
              encType='multipart/form-data'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Personal Info */}
              <fieldset className='custom-raduis   bg-white font-semibold'>
                <legend className="text-lg font-bold  ml-[25px]">Personal Information</legend>
                <div className="multipart-field-one">
                  <FormInputField
                    name='name'
                    label='Full Name'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='personalEmail'
                    label='Personal Email ID'
                    form={form}
                    inputType='email'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='phone'
                    label='Phone'
                    form={form}
                    inputType='number'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='alternatePhone'
                    label='Alternate Contact Number'
                    form={form}
                    inputType='number'
                    className='colum-box-bg-change'
                  />
                  <FormDatePicker
                    name='dobDocument'
                    label='Date of Birth (As per Documents)'
                    form={form}
                    inputFormat='YYYY-MM-DD'
                    className='datepickerouter'
                    defaultMonth={new Date('1995-01-01')}
                  />
                  <FormDatePicker
                    name='dobCelebration'
                    label='Actual Date of Birth (For Celebrations)'
                    form={form}
                    inputFormat='YYYY-MM-DD'
                    className='datepickerouter'
                    defaultMonth={new Date('1995-01-02')}
                  />

                  <FormTextArea
                    name='currentAddress'
                    label='Current Address'
                    form={form}
                    className='col-span-2'
                  />
                  <FormTextArea
                    name='permanentAddress'
                    label='Permanent Address'
                    form={form}
                    className='col-span-2'
                  />
                </div>
              </fieldset>

              {/* Professional Info */}
              <fieldset className='custom-raduis bg-white font-semibold'>
                <legend className="text-lg font-bold pt-[65px] ml-[25px]">Professional Information</legend>
                <div className="multipart-field-two">
                  <FormInputField
                    name='companyEmail'
                    label='Company Email ID'
                    form={form}
                    inputType='email'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='designation'
                    label='Designation'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormDatePicker
                    name='dateOfJoining'
                    label='Date of Joining'
                    form={form}
                    inputFormat='YYYY-MM-DD'
                    className='datepickerouter'
                    defaultMonth={new Date()}
                  />
                </div>
              </fieldset>

              {/* Documents */}
              <fieldset className='custom-raduis bg-white font-semibold'>
                <legend className="text-lg font-bold pt-[65px] ml-[25px]">Documents</legend>
                <div className="multipart-field-one ">
                  <FormInputField
                    name='aadharCard'
                    label='Aadhar Card Link'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='panCard'
                    label='PAN Card Link'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                </div>
              </fieldset>

              {/* Banking Details */}
              <fieldset className='custom-raduis bg-white font-semibold'>
                <legend className="text-lg font-bold pt-[65px] ml-[25px]">Banking Details</legend>
                <div className="multipart-field-two">
                  <FormInputField
                    name='bankName'
                    label='Bank Name'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='bankAccountNumber'
                    label='Bank Account Number'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='bankIFSC'
                    label='Bank IFSC Code'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                </div>
              </fieldset>

              {/* Emergency Details */}
              <fieldset className='custom-raduis bg-white font-semibold'>
                <legend className="text-lg font-bold pt-[65px] ml-[25px]">Emergency Contact Details</legend>
                <div className="multipart-field-one">
                  <FormInputField
                    name='bloodGroup'
                    label='Blood Group'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='emergencyContactName'
                    label='Emergency Contact Name'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='emergencyContactNumber'
                    label='Emergency Contact Number'
                    form={form}
                    inputType='number'
                    className='colum-box-bg-change'
                  />
                  <FormSelectField
                    name='emergencyContactRelation'
                    label='Emergency Contact Relationship'
                    form={form}
                    options={RelationData}
                    className='colum-box-bg-change'
                  />
                  {isOther == "others" ? (<FormInputField
                    name='other'
                    label='Other Emergency Contact Relationship'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />) : ""}
                </div>
              </fieldset>

              {/* Submit */}
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
    </>
  )
}

export default AddEmployees
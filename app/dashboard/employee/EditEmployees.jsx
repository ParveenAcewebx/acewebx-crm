'use client'
import {
  bloodGrupeType,
  currentShiftOptions,
  formDefaultValues,
  GenderData,
  RelationData,
  StatutsOptions
} from '@/components/constants/StaticData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import moment from 'moment';
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import FormTextArea from '@/components/share/form/TextArea'
import FormDatePicker from '@/components/share/form/datePicker'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import EmployeesApi from '@/services/employees/EmployeesApi'
import CommonLayout from '@/components/CommonLayouyt'
import { EmployeeValidation } from '@/components/form-validations/EmployeeValidation'
import FormMultiSelectField from '@/components/share/form/FormMultiSelect'

function EditEmployees({ editId }) {
  const [loader, setLoader] = useState(false)
  const [reportingManagerOptions, setReportingManagerOptions] = useState([])

  const router = useRouter()
  const form = useForm({
    mode: 'onChange',
    defaultValues: formDefaultValues,
    // resolver: yupResolver(EmployeeValidation)
  })


  const onSubmit = async (data) => {
    setLoader(true);

    try {
      const formData = new FormData();
      // Need only those keys which are touched
      const dirtyFields = form.formState.dirtyFields;
      const updateFieldsValue = Object.keys(dirtyFields);

      // if (data?.lastIncrementDate == "Invalid date") {
      //   formData.append('lastIncrementDate', "")

      // }

      if (updateFieldsValue) {
        formData.append('updateField', JSON.stringify(updateFieldsValue))
      }

      const reportingManagerValue = JSON.stringify(data?.reportingManager);

      Object.entries(data).forEach(([key, value]) => {
        const isDateField =
          key === 'dobDocument' ||
          key === 'dateOfJoining' ||
          key === 'dobCelebration'

        if (key === 'reportingManager') return; // skip, append later



        if (isDateField) {
          if (key === 'dobCelebration' || key === 'lastIncrementDate') {
            // Only format if the date is valid
            if (moment(value, moment.ISO_8601, true).isValid()) {
              formData.append(key, moment(value).format('YYYY-MM-DD'));
            } else {
              formData.append(key, '');
            }
          }
          else if (value) {
            // Other dates → only append if value exists
            formData.append(key, moment(value).format('YYYY-MM-DD'));
          }
        } else {
          formData.append(key, value ?? '');
        }
      });

      // Append reportingManager separately
      formData.append('reportingManager', reportingManagerValue);

      const response = await EmployeesApi.editEmployees(editId, formData);

      if (response?.data?.status === true) {
        form.reset();
        setLoader(false);
        successMessage({ description: 'Added Successfully!' });
        router.push('detail');
      }
    } catch (error) {
      console.log("error", error.message);
      setLoader(false);
      errorMessage(
        { description: error?.message }
      );
    }
  };

  const parseDateOrEmpty = (dateString) => {
    if (!dateString) return '';
    const parsed = new Date(dateString + 'T00:00:00');
    return isNaN(parsed) ? '' : parsed;
  };


  const candidateDataGetById = async (editId) => {
    try {
      const response = await EmployeesApi.getByIdEmployees(editId);

      if (response?.data?.status === true) {
        const data = response?.data?.data;
        const meta = data?.meta || {};
        // const joiningDate = new Date(data.dob + 'T00:00:00')
        const dataForSet = {
          // Personal Info
          name: data?.name || '',
          status: data?.status || '',
          personalEmail: data?.personalEmail || '',
          phone: data?.phone || '',
          uan: data?.uan || null,
          alternatePhone: data?.alternatePhone || '',
          dobDocument: parseDateOrEmpty(data?.dobDocument),
          dobCelebration: parseDateOrEmpty(data?.dobCelebration),
          currentAddress: data?.currentAddress || '',
          permanentAddress: data?.permanentAddress || '',
          referenceNumber: data.referenceNumber || '',
          employeeCode: data.employeeCode || '',
          companyEmail: data?.companyEmail || '',
          designation: data?.designation || '',
          dateOfJoining: parseDateOrEmpty(data?.dateOfJoining),

          // Documents
          adharCard: meta?._adharCard || '',
          panCard: meta?._panCard || '',
          otherDocumentLink: meta?._otherDocumentLink || '',

          // Banking Details
          bankName: meta?._bankName || '',
          bankAccountNumber: meta?._bankAccountNumber || '',
          bankIfscCode: meta?._bankIfscCode || '',

          // Emergency Details
          bloodGroup: meta?._bloodGroup || '',
          emergencyContactName: meta?._emergencyContactName || '',
          emergencyContactNumber: meta?._emergencyContactNumber || '',
          emergencyContactRelationship: meta?._emergencyContactRelationship?.toLowerCase() || '',
          emergencyContactRelationshipOther: meta?._emergencyContactRelationshipOther || '',

          // Additional Fields
          gender: meta?._gender?.toLowerCase() || '',
          currentSalary: meta?._currentSalary || '',
          currentShift: meta?._currentShift || '',
          // lastIncrementAmount: meta?._lastIncrementAmount || '',
          // lastIncrementDate: meta?._lastIncrementDate && moment(meta?._lastIncrementDate).format("YYYY-MM-DD") + "T00:00:00",

        };

        form.reset(dataForSet);
        form?.setValue('reportingManager', data?.reportingManager == undefined ? [] : JSON.parse(data?.reportingManager))

      }
    } catch (error) {
      console.error('Submission Error:', error);
      errorMessage(
        { description: error?.message }
      );
    }
  };



  useEffect(() => {
    if (!editId) return
    candidateDataGetById(editId)
  }, [editId])



  const isOther = form.watch("emergencyContactRelationship")


  //  localReportingManage :--

  useEffect(() => {
    // This code runs only on the client side
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData = localStorage.getItem("globalSettings");
      const skillDataOption = JSON.parse(storedData)
      if (skillDataOption?.reportingManager) {
        const candidateOptions = skillDataOption?.reportingManager?.map((item) => ({
          value: item.email,         // or item.id if you have IDs
          label: item.name,         // or item.name if you have names
        }));
        setReportingManagerOptions(candidateOptions);

      }
    }
  }, []);
  return (
    <>
      <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>

        <div className='flex justify-between'>
          <CommonLayout pageTitle={`Employee Edit`} />
        </div>

        <div className=''>
          <FormProvider {...form}>
            <form
              encType='multipart/form-data'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Personal Info */}
              <fieldset className='custom-raduis   bg-white font-semibold mb-9'>
                <legend className="text-lg font-bold  ml-[25px]">Personal Information</legend>
                <div className="multipart-field-one">
                  <FormInputField
                    name='name'
                    label='Full Name*'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='personalEmail'
                    label='Personal Email ID*'
                    form={form}
                    inputType='email'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='phone'
                    label='Phone*'
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
                    label='Date of Birth (As per Documents)*'
                    form={form}
                    inputFormat='YYYY-MM-DD'
                    className='datepickerouter'
                    defaultMonth={new Date('2006-01-01')}
                  />
                  <FormDatePicker
                    name='dobCelebration'
                    label='Actual Date of Birth (For Celebrations)'
                    form={form}
                    inputFormat='YYYY-MM-DD'
                    className='datepickerouter'
                    defaultMonth={new Date('2006-01-02')}
                  />
                  <FormSelectField
                    name='gender'
                    label='Gender'
                    form={form}
                    options={GenderData}
                    className='colum-box-bg-change'
                  />

                  <FormTextArea
                    name='currentAddress'
                    label='Current Address*'
                    form={form}
                    className='col-span-2'
                  />
                  <FormTextArea
                    name='permanentAddress'
                    label='Permanent Address*'
                    form={form}
                    className='col-span-2'
                  />
                </div>
              </fieldset>

              {/* Professional Info */}
              <fieldset className='custom-raduis bg-white font-semibold mb-9'>
                <legend className="text-lg font-bold  ml-[25px]">Professional Information</legend>
                <div className="multipart-field-one">
                  <FormInputField
                    name='companyEmail'
                    label='Company Email ID*'
                    form={form}
                    inputType='email'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='designation'
                    label='Designation*'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='currentSalary'
                    label='Current Salary (Monthly)'
                    form={form}
                    inputType='number'
                    className='colum-box-bg-change'
                  />
                  <FormDatePicker
                    name='dateOfJoining'
                    label='Date of Joining*'
                    form={form}
                    inputFormat='YYYY-MM-DD'
                    className='datepickerouter'
                    defaultMonth={new Date()}
                    disabled={{ before: new Date('2016-12-31') }}

                  />
                  {/* <FormDatePicker
                    name='lastIncrementDate'
                    label='Last Increment Date'
                    form={form}
                    inputFormat='YYYY-MM-DD'
                    className='datepickerouter'
                    defaultMonth={new Date()}
                  />
                  <FormInputField
                    name='lastIncrementAmount'
                    label='Last Increment Amount'
                    form={form}
                    inputType='number'
                    className='colum-box-bg-change'
                  /> */}
                  <FormSelectField
                    name='currentShift'
                    label='Current Shift'
                    form={form}
                    options={currentShiftOptions}
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='referenceNumber'
                    label='Reference Number'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  /> <FormInputField
                    name='employeeCode'
                    label='Employee Code'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormMultiSelectField
                    name='reportingManager'
                    label='Reporting Manager'
                    form={form}
                    options={reportingManagerOptions}
                    className='colum-box-bg-change'
                  />
                  <FormSelectField
                    name='status'
                    label='Status'
                    form={form}
                    options={StatutsOptions}
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='uan'
                    label='UAN'
                    form={form}
                    inputType='number'
                    className='colum-box-bg-change'
                  />
                </div>
              </fieldset>

              {/* Documents */}
              <fieldset className='custom-raduis bg-white font-semibold mb-9'>
                <legend className="text-lg font-bold  ml-[25px]">Documents</legend>
                <div className="multipart-field-one ">
                  <FormInputField
                    name='adharCard'
                    label='Aadhar Card Link*'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='panCard'
                    label='PAN Card Link*'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='otherDocumentLink'
                    label='Other Document Link'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                </div>
              </fieldset>

              {/* Banking Details */}
              <fieldset className='custom-raduis bg-white font-semibold mb-9'>
                <legend className="text-lg font-bold  ml-[25px]">Banking Details</legend>
                <div className="multipart-field-one">
                  <FormInputField
                    name='bankName'
                    label='Bank Name*'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='bankAccountNumber'
                    label='Bank Account Number*'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />

                  {/* ADD NOTE HERE SMALL */}
                  <div className='bankIfc space-y-2  '>
                    <FormInputField
                      name='bankIfscCode'
                      label='Bank IFSC Code*'
                      form={form}
                      inputType='text'
                      className='colum-box-bg-change'
                    />
                    <div style={{ lineHeight: "0px" }} className='text-slate-400 text-xs w-full text-start'>
                      Ex: PUNB0073800
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Emergency Details */}
              <fieldset className='custom-raduis bg-white font-semibold mb-9'>
                <legend className="text-lg font-bold  ml-[25px]">Emergency Contact Details</legend>
                <div className="multipart-field-one">
                  <FormSelectField
                    name='bloodGroup'
                    label='Blood Group*'
                    form={form}
                    options={bloodGrupeType}
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='emergencyContactName'
                    label='Emergency Contact Name*'
                    form={form}
                    inputType='text'
                    className='colum-box-bg-change'
                  />
                  <FormInputField
                    name='emergencyContactNumber'
                    label='Emergency Contact Number*'
                    form={form}
                    inputType='number'
                    className='colum-box-bg-change'
                  />
                  <FormSelectField
                    name='emergencyContactRelationship'
                    label='Emergency Contact Relationship*'
                    form={form}
                    options={RelationData}
                    className='colum-box-bg-change'
                  />
                  {isOther == "others" ? (<FormInputField
                    name='emergencyContactRelationshipOther'
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

export default EditEmployees
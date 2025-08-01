'use client'
import {
    bloodGrupeType,
    currentShiftOptions,
    formDefaultValues,
    GenderData,
    RelationData
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
import EmployeesApi from '@/services/cadidateApis/employees/EmployeesApi'
import CommonLayout from '@/components/CommonLayouyt'
import { EmployeeValidation } from '@/components/form-validations/EmployeeValidation'

function EditEmployees({ editId }) {
    const [loader, setLoader] = useState(false)
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

            // Need only those keys which are touched
            const dirtyFields = form.formState.dirtyFields;

            const updateFieldsValue = Object.keys(dirtyFields);
            if (updateFieldsValue) {
                formData.append('updateField', JSON.stringify(updateFieldsValue))
            }

            Object.entries(data).forEach(([key, value]) => {

                if (key === 'dobDocument' || key === 'dateOfJoining' || key === 'dobCelebration' || key === "lastIncrementDate") {
                    formData.append(key, moment(value).format('YYYY-MM-DD'));
                } else {
                    formData.append(key, value);
                }
            });

            const response = await EmployeesApi.editEmployees(editId, formData)
            if (response?.data?.status == true) {
                form.reset()
                setLoader(false)
                successMessage({ description: 'Updated SuccessFully!' })
                router.push('detail')
            }
        } catch (error) {
            setLoader(false)
            console.log("error:---------> for error formate check", error)
            setLoader(false)
            errorMessage(
                error?.message || 'Something went wrong while submitting the form.'
            )

        }
    }



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
                    personalEmail: data?.personalEmail || '',
                    phone: data?.phone || '',
                    alternatePhone: data?.alternatePhone || '',
                    dobDocument: new Date(data?.dobDocument + 'T00:00:00') || '',
                    dobCelebration: new Date(data?.dobCelebration + 'T00:00:00') || '',
                    currentAddress: data?.currentAddress || '',
                    permanentAddress: data?.permanentAddress || '',

                    // Professional Info
                    companyEmail: data?.companyEmail || '',
                    designation: data?.designation || '',
                    dateOfJoining: new Date(data?.dateOfJoining + 'T00:00:00') || '',

                    // Documents
                    adharCard: meta?._adharCard || '',
                    panCard: meta?._panCard || '',
                    otherDocumentLink:meta?._otherDocumentLink || '',
                    // Banking Details
                    bankName: meta?._bankName || '',
                    bankAccountNumber: meta?._bankAccountNumber || '',
                    bankIfscCode: meta?._bankIfscCode || '',

                    // Emergency Details
                    bloodGroup: meta?._bloodGroup || '',
                    emergencyContactName: meta?._emergencyContactName || '',
                    emergencyContactNumber: meta?._emergencyContactNumber || '',
                    emergencyContactRelationship: meta?._emergencyContactRelationship || '',
                    emergencyContactRelationshipOther: meta?._emergencyContactRelationshipOther || '',

                    // Additional Fields
                    gender: meta?._gender || '',
                    currentSalary: meta?._currentSalary || '',
                    currentShift: meta?._currentShift || '',
                    lastIncrementAmount: meta?._lastIncrementAmount || '',
                    lastIncrementDate: new Date(meta?._lastIncrementDate + 'T00:00:00') || '',
                };

                form.reset(dataForSet);
            }
        } catch (error) {
            console.error('Submission Error:', error);
            errorMessage(
                error?.message || 'Something went wrong while submitting the form.'
            );
        }
    };



    useEffect(() => {
        if (!editId) return
        candidateDataGetById(editId)
    }, [editId])



    const isOther = form.watch("emergencyContactRelationship")

    return (
        <>
            <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>

                <div className='flex justify-between'>
                    <CommonLayout pageTitle={`Edit Employee`} />
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
                                    <FormSelectField
                                        name='gender'
                                        label='Gender'
                                        form={form}
                                        options={GenderData}
                                        className='colum-box-bg-change'
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
                            <fieldset className='custom-raduis bg-white font-semibold mb-9'>
                                <legend className="text-lg font-bold  ml-[25px]">Professional Information</legend>
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
                                    <FormInputField
                                        name='currentSalary'
                                        label='Current Salary (Monthly)'
                                        form={form}
                                        inputType='number'
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
                                    <FormDatePicker
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
                                    />
                                    <FormSelectField
                                        name='currentShift'
                                        label='Current Shift'
                                        form={form}
                                        options={currentShiftOptions}
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
                                        name='bankIfscCode'
                                        label='Bank IFSC Code'
                                        form={form}
                                        inputType='text'
                                        className='colum-box-bg-change'
                                    />
                                </div>
                            </fieldset>

                            {/* Emergency Details */}
                            <fieldset className='custom-raduis bg-white font-semibold mb-9'>
                                <legend className="text-lg font-bold  ml-[25px]">Emergency Contact Details</legend>
                                <div className="multipart-field-one">
                                    <FormSelectField
                                        name='bloodGroup'
                                        label='Blood Group'
                                        form={form}
                                        // inputType='text'
                                        options={bloodGrupeType}
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
                                        name='emergencyContactRelationship'
                                        label='Emergency Contact Relationship'
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
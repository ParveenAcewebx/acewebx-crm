'use client'
import {
    IncrementFormDefaultValues,
    overAllExperienceOptions,
    totalExperienceOptions,
    YesNoOptions
} from '@/components/constants/StaticData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import FormTextArea from '@/components/share/form/TextArea'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import CommonLayout from '@/components/CommonLayouyt'
import IncrementAPi from '@/services/increment/IncrementAPi'
import { IncrementFormValidation } from '@/components/form-validations/IncrementFormValidation'

function EditIncrementForm({ editId }) {
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const form = useForm({
        mode: 'onChange',
        defaultValues: IncrementFormDefaultValues,
        resolver: yupResolver(IncrementFormValidation),
    })

    // Submit Handler:)
    const onSubmit = async data => {
        setLoader(true)
        try {
            const response = await IncrementAPi.editIncrementAPi(editId, data)
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
                { description: error?.message }
            );

        }
    }


    // GetDataById Handler:)
    const candidateDataGetById = async (editId) => {
        try {
            const response = await IncrementAPi.getByIdIncrementAPi(editId);
            if (response?.data?.status === true) {
                const data = response?.data?.data;

                form.reset(data);
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




    return (
        <>
            <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>

                <div className='flex justify-between'>
                    <CommonLayout pageTitle={`Edit Increment`} />
                </div>

                <div className=''>
                    <FormProvider {...form}>
                        <form encType='multipart/form-data' onSubmit={form.handleSubmit(onSubmit)}>

                            <>
                                <div className=' mb-3 grid grid-cols-1 gap-6 md:grid-cols-1'>
                                    <FormInputField name='name' className="!h-[3.8rem]" label='Name*' inputType='text' form={form} /></div>
                                <div className='mb-3  grid grid-cols-1 gap-6 md:grid-cols-2'>

                                    <FormSelectField name='acewebxTenure' className="!h-[3.8rem]" options={totalExperienceOptions} label='Tenure with AceWebX (in years)*' inputType='number' form={form} />
                                    <FormSelectField name='totalExperience' className="!h-[3.8rem]" options={overAllExperienceOptions} label='Overall Years of Experience*' inputType='number' form={form} />
                                </div>

                                <div className='mb-3  grid grid-cols-1 gap-6'>
                                    <FormTextArea name='experienceWithAcewebx' label='Describe Your Working Experience So Far with AceWebX*' form={form} className='col-span-2' />
                                </div>

                                <div className='mb-3  grid grid-cols-2 gap-6'>
                                    <FormSelectField name='totalProjects' className="!h-[3.8rem]" options={totalExperienceOptions} label='Projects Completed Last Year*' inputType='number' form={form} />
                                    <FormInputField name='ratingOnProjects' className="!h-[3.8rem]" label='Rating on Completed Projects (e.g. 4.5/10)*' inputType='number' form={form} />
                                </div>

                                <div className='mb-3  grid grid-cols-1 gap-6 md:grid-cols-2'>
                                    <FormSelectField name='clientCalls' className="!h-[3.8rem]" label='Did You Participate in Any Client Calls?*' form={form} options={YesNoOptions} />
                                    <FormSelectField name='clientConverted' className="!h-[3.8rem]" label='Clients Converted via Test Jobs*' form={form} options={YesNoOptions} />
                                </div>

                                <div className='mb-3  grid grid-cols-2 gap-6 md:grid-cols-2'>
                                    <FormInputField name='newSkills' className="!h-[3.8rem]" label='New Skills Acquired in the Last Year*' inputType='text' form={form} />
                                    <FormTextArea name='improvementAreas' label='Areas Needing Improvement*' form={form} className='col-span-2' />

                                </div>

                            </>



                            <>
                                <div className='mb-3  grid grid-cols-2 gap-6 md:grid-cols-2'>
                                    <FormInputField name='currentSalary' label='Current Salary (Monthly)*' className="!h-[3.8rem]" inputType='number' form={form} />
                                    <FormInputField name='expectedSalary' label='Expected Raise (%) or ₹*' className="!h-[3.8rem]" inputType='number' form={form} />
                                </div>

                                <div className='mb-3  grid grid-cols-1 gap-6 md:grid-cols-1'>
                                    <FormTextArea name='raiseJustified' label='Why Do You Feel the Expected Raise Is Justified?*' form={form} className='col-span-2' />
                                </div>

                                <div className='mb-3  grid grid-cols-2 gap-6 md:grid-cols-2'>

                                    <FormTextArea name='ShortTermGoals' label='Your Short-Term Goals*' form={form} className='col-span-2' />
                                    <FormTextArea name='longTermGoals' label='Your Long-Term Goals*' form={form} className='col-span-2' />
                                </div>
                                <div className='mb-3  grid grid-cols-2 gap-6 md:grid-cols-2'>

                                    <FormTextArea name='weaknesses' label='*Your Weaknesses.' form={form} className='col-span-2' />
                                    <FormTextArea name='keyAchievements' label='Key Achievements This Cycle*' form={form} className='col-span-2' />

                                </div>
                                <div className='mb-3  grid grid-cols-1 gap-6 md:grid-cols-1'>

                                    <FormTextArea name='Suggestions' label='Suggestions for Improving Team Processes or Company Culture*' form={form} className='col-span-2' />
                                </div>
                            </>



                            <div className={`mt-10 flex justify-end`}>

                                <Button type='submit' variant='contained' className='bg-[#B82025] !text-white'>
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

export default EditIncrementForm
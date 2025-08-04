'use client'

import {
    IncrementFormDefaultValues,
    YesNoOptions,
} from '@/components/constants/StaticData'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import { IncrementFormValidation } from '@/components/form-validations/IncrementFormValidation'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import FormTextArea from '@/components/share/form/TextArea'
import { Button } from '@/components/ui/button'

function IncrementApplicationForm() {
    const [step, setStep] = useState(0)
    const [loader, setLoader] = useState(false)
    const [recaptcha, setRecaptcha] = useState(null)
    const [submitAddValidation, setSubmitAddValidation] = useState(false)
    const router = useRouter()

    const form = useForm({
        mode: 'onChange',
        defaultValues: IncrementFormDefaultValues,
        resolver: yupResolver(IncrementFormValidation),
    })

    const appraisalFields = [
        [
            'name',
            'tenureWithAceWebX',
            'overallExperienceYears',
            'projectsCompletedLastYear',
            'projectFeedbackRating',
            'participatedInClientCalls',
            'convertedClientsViaTestJobs',
            'newSkillsAcquiredLastYear',
            'currentSalary',
        ],
        [
            'expectedSalaryRaise',
            'areasOfImprovement',
            'raiseJustification',
            'shortTermGoals',
            'teamOrCultureSuggestions',
            'weaknesses',
            'longTermGoals',
            'keyAchievements',
            'experienceWithAceWebX',
        ],
    ]

    const nextStep = async (e) => {
        setLoader(true)
        const isStepValid = await form.trigger(appraisalFields[step])
        e.preventDefault()
        if (isStepValid) {
            setStep(prev => prev + 1)
        }
        setLoader(false)
    }

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 0))
        setSubmitAddValidation(false)
        setLoader(false)
    }

    const onSubmit = async data => {
        if (step == 0) return
        console.log("ggggggggggggggggggggggg")
        setSubmitAddValidation(true)
        if (!data.currentSalary || !form.watch('recaptcha')) return

        // Simulate submit action
        console.log('Submitting form:', data)
        setLoader(false)
        form.reset()
        router.push('/thankyou')
    }

    return (
        <div
            className='mobile-view relative flex min-h-screen w-full flex-col items-center justify-start bg-white'
            style={{
                backgroundImage: "url('/images/backgroud-ace.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                margin: 0,
                backgroundAttachment: 'fixed',
            }}
        >
            <div className='w-2xs acewebx-logo z-10 text-center'>
                <img src='./acewebxlogo.png' alt='Acewebx Logo' className='h-25 w-40' />
            </div>

            <div className='z-10 w-full max-w-3xl rounded-xl border border-red-100 bg-gradient-to-br from-red-100 via-white to-red-100 p-10 shadow-md '>
                <h2 className='walking mb-6 text-2xl font-semibold text-gray-800'>
                    Increment Application
                </h2>
                <h4 className='mb-8'>
                    Please fill out this form to apply for a salary increment based on your performance, achievements, and contributions. Your responses will help management evaluate your eligibility for the expected raise.
                </h4>
                <p className='mb-4 text-sm text-gray-500'>Step {step + 1} of 2</p>

                <FormProvider {...form}>
                    <form encType='multipart/form-data' onSubmit={form.handleSubmit(onSubmit)}>
                        {step === 0 && (
                            <>
                                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                    <FormInputField name='name' label='Name' inputType='text' form={form} />
                                    <FormInputField name='tenureWithAceWebX' label='Tenure with AceWebX (in years)' inputType='number' form={form} />
                                    <FormInputField name='overallExperienceYears' label='Overall Years of Experience' inputType='number' form={form} />
                                    <FormInputField name='projectFeedbackRating' label='Rating on Completed Projects (e.g. 4.5/5)' inputType='text' form={form} />
                                    <FormSelectField name='participatedInClientCalls' label='Did You Participate in Any Client Calls?' form={form} options={YesNoOptions} />
                                    <FormSelectField name='convertedClientsViaTestJobs' label='Clients Converted via Test Jobs' form={form} options={YesNoOptions} />
                                    <FormInputField name='newSkillsAcquiredLastYear' label='New Skills Acquired in the Last Year' inputType='text' form={form} />
                                    <FormInputField name='currentSalary' label='Current Salary (Monthly)' inputType='number' form={form} />
                                </div>
                                <div className='grid grid-cols-1 gap-6'>
                                    <FormInputField name='projectsCompletedLastYear' label='Number of Projects Completed in the Last Year' inputType='number' form={form} />
                                </div>
                            </>
                        )}

                        {step === 1 && (
                            <>
                                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                    <FormInputField name='expectedSalaryRaise' label='Expected Raise (%) or ₹' className="!h-[3.8rem]" inputType='number' form={form} />
                                    <FormTextArea name='areasOfImprovement' label='Areas Needing Improvement' form={form} className='col-span-2' />
                                    <FormTextArea name='raiseJustification' label='Raise Justification' form={form} className='col-span-2' />
                                    <FormTextArea name='shortTermGoals' label='Your Short-Term Goals' form={form} className='col-span-2' />
                                    <FormTextArea name='teamOrCultureSuggestions' label='Suggestions for Team/Culture' form={form} className='col-span-2' />
                                    <FormTextArea name='weaknesses' label='Your Weaknesses' form={form} className='col-span-2' />
                                    <FormTextArea name='longTermGoals' label='Your Long-Term Goals' form={form} className='col-span-2' />
                                    <FormTextArea name='keyAchievements' label='Key Achievements This Cycle' form={form} className='col-span-2' />

                                </div>
                                <div className='grid grid-cols-1 gap-6'>
                                    <FormTextArea name='experienceWithAceWebX' label='Experience at AceWebX' form={form} className='col-span-2' />
                                </div></>

                        )}

                        <div className={`mt-10 flex ${step === 0 ? 'justify-end' : 'justify-between'}`}>
                            {step > 0 && (
                                <Button variant='outlined' onClick={prevStep} className='border border-red-500 text-[#B82025] hover:bg-white hover:text-[#B82025]'>
                                    Back
                                </Button>
                            )}
                            {step < 1 ? (
                                <Button variant='contained' onClick={(e) => nextStep(e)} className='bg-[#B82025] !text-white'>
                                    Next
                                </Button>
                            ) : (
                                <Button type='submit' variant='contained' className='bg-[#B82025] !text-white'>
                                    {loader ? <Loader /> : 'Submit'}
                                </Button>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default IncrementApplicationForm

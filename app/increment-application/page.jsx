'use client'
import {
    designationOptions,
    GenderData,
    IncrementFormDefaultValues,
    preferredShiftOptions,
    totalExperienceOptions,
    walkInFormDefaultValues,
    YesNoOptions
} from '@/components/constants/StaticData'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FormProvider, useForm } from 'react-hook-form'
import moment from 'moment';
import { errorMessage } from '@/components/ToasterMessage'
import { CandidateFormValidation } from '@/components/form-validations/CandidateFormValidation'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import FormInputFileUploaderSingle from '@/components/share/form/SingleFileUpload'
import FormTextArea from '@/components/share/form/TextArea'
import FormDatePicker from '@/components/share/form/datePicker'
import { Button } from '@/components/ui/button'
import Candidate from '@/services/cadidateApis/CandidateApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import { IncrementFormValidation } from '@/components/form-validations/IncrementFormValidation'

function IncrementApplicationForm() {
    const [step, setStep] = useState(0)
    const [loader, setLoader] = useState(false)
    const [recaptcha, setRecaptcha] = useState([])
    const [submitAddValidation, setSubmitAddValidation] = useState(false)
    const router = useRouter()

    const form = useForm({
        mode: 'onChange',
        defaultValues: IncrementFormDefaultValues,
        resolver:yupResolver(IncrementFormValidation)
    })



    const appraisalFields = [
            [
              'name',
              'tenureWithAceWebX',
              'overallExperienceYears',
              'projectsCompletedLastYear',
              'projectFeedbackRating',
              'participatedInClientCalls',
            ],
            [
              'convertedClientsViaTestJobs',
              'newSkillsAcquiredLastYear',
              'areasOfImprovement',
              'currentSalary',
              'expectedSalaryRaise',
              'raiseJustification',
            ],
            [
              'shortTermGoals',
              'teamOrCultureSuggestions',
              'weaknesses',
              'keyAchievements',
              'longTermGoals',
              'experienceWithAceWebX', // <- move here!
            ]
          ]
          



    function onReCAPTCHAChange(value) {
        setRecaptcha(value)
        form.setValue('recaptcha', value)
    }

    const nextStep = async () => {
        const currentField = appraisalFields[step]
        const isStepValid = await form.trigger(currentField)
      
        if (!isStepValid) {
          console.log('Validation failed for:', currentField)
          return
        }
      
        setStep(prev => prev + 1)
        setLoader(false)
        form.unregister('recaptcha', { keepError: false })
      }
      

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 0))
    setSubmitAddValidation(false)
    setLoader(false)
    form.unregister('recaptcha', { keepError: false })
  }
    const reValue = form.watch('recaptcha')


    // add candidate handler:---
    const onSubmit = async data => {
        setSubmitAddValidation(true)
        if (data?.currentSalary == '' || reValue == undefined) {
            return
        }

        // try {
        //     const formData = new FormData()

        //     formData.append('g-recaptcha-response', recaptcha)
        //     const file = data.resume?.[0]
        //     if (file) {
        //         formData.append('resume', file)
        //     }

        //     const preferred = JSON.stringify(data?.preferredShift)

        //     Object.entries(data).forEach(([key, value]) => {
        //         if (key === 'preferredShift') return;
        //         if (key === 'dob' || key === 'lastIncrementDate') {
        //             formData.append(key, moment(value).format('YYYY-MM-DD'));
        //         } else {
        //             formData.append(key, value);
        //         }
        //     });
        //     formData.append('preferredShift', preferred)

        //     const response = await Candidate.addCandidate(formData)
        //     if (response?.data?.status == true) {
        //         form.reset()
        //         setLoader(false)
        //         router.push('/thankyou')
        //     }
        // } catch (error) {
        //     setLoader(false)

        //     console.error('Submission Error:', error?.message)
        //     errorMessage({ description: error?.message })
        //     if (error?.message == 'reCaptcha verification failed.') {
        //         form.unregister('recaptcha', { keepError: false })
        //     }
        // }
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

            <div className='z-10 w-full max-w-3xl rounded-xl border border-red-100 bg-gradient-to-br from-red-100 via-white to-red-100 p-10 shadow-md '>
                <h2 className='walking mb-6 text-2xl font-semibold text-gray-800'>
                    Increment Application
                </h2>
                <h4 className='mb-8'>
                    Please fill out this form to apply for a salary increment based on your performance, achievements, and contributions.
                    Your responses will help management evaluate your eligibility for the expected raise.
                </h4>
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
                                    label='Name'
                                    form={form}
                                    inputType='text'
                                    className='colum-box-bg-change'
                                />
                                <FormInputField
                                    name='tenureWithAceWebX'
                                    label='Tenure with AceWebX (in years)'
                                    form={form}
                                    inputType='number'
                                    className='colum-box-bg-change'
                                />
                                <FormInputField
                                    name='overallExperienceYears'
                                    label='Overall Years of Experience'
                                    form={form}
                                    inputType='number'
                                    className='colum-box-bg-change'
                                />

                                <FormInputField
                                    name='projectsCompletedLastYear'
                                    label='Number of Projects Completed in the Last Year'
                                    form={form}
                                    inputType='number'
                                    className='colum-box-bg-change'
                                />
                                <FormInputField
                                    name='projectFeedbackRating'
                                    label='Rating on Completed Projects (e.g. 4.5/5)'
                                    form={form}
                                    inputType='text'
                                    className='colum-box-bg-change'
                                />
                                <FormSelectField
                                    name='participatedInClientCalls'
                                    label='Did You Participate in Any Client Calls?'
                                    form={form}
                                    options={YesNoOptions}
                                    className='colum-box-bg-change'
                                />
                            </div>
                        )}

                        {/* Step 1: increm Details */}
                        {step === 1 && (
                            <>
                                <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
                                    <FormSelectField
                                        name='convertedClientsViaTestJobs'
                                        label='Clients Converted via Test Jobs'
                                        form={form}
                                        options={YesNoOptions}
                                        className='colum-box-bg-change'
                                    />
                                    <FormInputField
                                        name='newSkillsAcquiredLastYear'
                                        label='New Skills Acquired in the Last Year'
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
                                    <FormInputField
                                        name='expectedSalaryRaise'
                                        label='Expected Raise (%) or Amount'
                                        form={form}
                                        inputType='number'
                                        className='colum-box-bg-change'
                                    />
                                    <FormTextArea
                                        name='areasOfImprovement'
                                        label='What Areas Do You Believe Need Improvement?'
                                        form={form}
                                        className='col-span-2'
                                    />

                                    <FormTextArea
                                        name='raiseJustification'
                                        label='Why Do You Feel the Expected Raise Is Justified?'
                                        form={form}
                                        className='col-span-2'
                                    />
                                </div>



                            </>
                        )}

                        {/* step 2: increment  */}

                        {step === 2 && (
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>


                                <FormTextArea
                                    name='shortTermGoals'
                                    label='What Are Your Short-Term Goals?'
                                    form={form}
                                    className='col-span-2'
                                />
                                <FormTextArea
                                    name='teamOrCultureSuggestions'
                                    label='Suggestions for Team or Culture Improvement'
                                    form={form}
                                    className='col-span-2'
                                />
                                <FormTextArea
                                    name='weaknesses'
                                    label='What Are Your Weaknesses?'
                                    form={form}
                                    className='col-span-2'
                                />
                                <FormTextArea
                                    name='longTermGoals'
                                    label='What Are Your Long-Term Goals?'
                                    form={form}
                                    className='col-span-2'
                                />
                                <FormTextArea
                                    name='keyAchievements'
                                    label='What Are Your Key Achievements in the Current Appraisal Cycle?'
                                    form={form}
                                    className='col-span-2'
                                />

                                <FormTextArea
                                    name='experienceWithAceWebX'
                                    label='Describe Your Working Experience So Far with AceWebX'
                                    form={form}
                                    className='col-span-2'
                                />
                            </div>
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

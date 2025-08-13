'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { errorMessage } from '@/components/ToasterMessage'
import IncrementsTabApi from '@/services/employees/IncrementsTabApi'
import FormTextArea from '@/components/share/form/TextArea'
import FormInputField from '@/components/share/form/FormInputField'

function ReviewEditIncrement() {
    const { id, editId } = useParams()
    const eventId = editId
    const router = useRouter()
    const [loader, setLoader] = useState(false)

    const form = useForm({
        mode: 'onChange',
        defaultValues: {
            eventDate: '',
        },
    })

    const onSubmit = async (data) => {
        console.log("data", data)
        // setLoader(true)
        // const newData = { ...data, empEventId: editId, eventType: "increment" }
        // try {
        //     const response = await IncrementsTabApi.saveEmployeeMetaData(newData)
        //     if (response?.data?.status === true) {
        //         setLoader(false)
        //         router.back()
        //     } else {
        //         setLoader(false)
        //         errorMessage({ description: 'Failed to update event.' })
        //     }
        // } catch (error) {
        //     setLoader(false)
        //     console.error('Submission Error:', error?.message)
        //     errorMessage({ description: error?.message || 'Something went wrong.' })
        // }
    }

    const candidateDataGetById = async () => {
        // try {
        //     const response = await IncrementsTabApi.getByIdIncrements(Number(eventId));
        //     if (response?.data?.data) {
        //         const eventData = response?.data?.data?.increment;
        //         const newData = { ...eventData, eventDate: new Date(eventData?.eventDate + 'T00:00:00') }
        //         setIncrementData(response?.data?.data?.incrementApplication)
        //         setcheckIsIncrementFromYes(eventData?.employeeSubmittedIncrementForm)
        //         form.reset(newData);
        //     }
        // } catch (error) {
        //     console.error("Fetch Error:", error);
        //     errorMessage({
        //         description: error?.message || "Something went wrong while fetching event data.",
        //     });
        // }
    };




    useEffect(() => {
        if (id && eventId) {
            candidateDataGetById()
        }
    }, [id, eventId])





    const incrementsData = {
        id: 1,
        empId: 101,
        name: "John Doe",
        acewebxTenure: "2 years",
        totalExperience: "5 years",
        experienceWithAcewebx: "2 years",
        totalProjects: "12",
        ratingOnProjects: "4.5",
        clientCalls: "25",
        clientConverted: "10",
        newSkills: "React, Node.js, AWS",
        improvementAreas: "Time management, Testing",
        currentSalary: "50000",
        expectedSalary: "60000",
        raiseJustified: "Yes",
        shortTermGoals: "Complete AWS certification",
        longTermGoals: "Become a Tech Lead",
        weaknesses: "Procrastination, Documentation",
        keyAchievements: "Led project X to success, Won employee of the month",
        suggestions: "Improve deployment automation",
        reviewedBy: "Jane Smith",
        reviewDate: "2025-08-12",
        performanceRating: "Excellent",
        strengthsByReportingManager: "Strong leadership, Great problem-solving skills",
        areasOfImprovement: "Better client communication",
        managerComments: "Keep up the great work!",
        recommendedRaise: "10%",
        promotionRecommendation: "Yes",
        promotionDetails: "Promote to Senior Developer",
        createdAt: "2025-08-12 10:00:00",
        updatedAt: "2025-08-12 10:30:00"
    }


    const AddvanceOpenModal = () => {
        setIncrementModalOpen(true)
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
                <img
                    src='../../acewebxlogo.png'
                    alt='Acewebx Logo'
                    className='h-25 w-40'
                />
            </div>

            <div className='z-10 w-full max-w-3xl rounded-xl border border-red-100 bg-gradient-to-br from-red-100 via-white to-red-100 p-10 shadow-md'>
                <h2 className='walking mb-6 text-2xl font-semibold text-gray-800'>
                    Increment Preview
                </h2>

                <h4 className='mb-8'>

                </h4>


                <div className=" bg-white pt-2  !">
                    <div className="mb-4 ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Name</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.name}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Acewebx Tenure</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.acewebxTenure}</span>
                        </div>
                    </div>

                    <div className="mb-4 ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Total Experience</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.totalExperience}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Experience With Acewebx</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.experienceWithAcewebx}</span>
                        </div>
                    </div>

                    <div className="mb-4 ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Total Projects</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.totalProjects}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Rating On Projects</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.ratingOnProjects}</span>
                        </div>
                    </div>

                    <div className="mb-4 ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Client Calls</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.clientCalls}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Client Converted</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.clientConverted}</span>
                        </div>
                    </div>

                    <div className="mb-4 ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">New Skills</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.newSkills}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Improvement Areas</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.improvementAreas}</span>
                        </div>
                    </div>

                    <div className="mb-4 ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Current Salary</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.currentSalary}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Expected Salary</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.expectedSalary}</span>
                        </div>
                    </div>

                    <div className="mb-4 ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Raise Justified</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.raiseJustified}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Short Term Goals</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.shortTermGoals}</span>
                        </div>
                    </div>

                    <div className="mb-4  ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Long Term Goals</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.longTermGoals}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Weaknesses</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.weaknesses}</span>
                        </div>
                    </div>

                    <div className="mb-4 ml-1 grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Key Achievements</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.keyAchievements}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Suggestions</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.suggestions}</span>
                        </div>
                    </div>


                </div>
                <FormProvider {...form}>
                    <form
                        encType='multipart/form-data'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >

                        <div className='mb-4 ml-1 mt-6 grid grid-cols-2 gap-6 md:grid-cols-2'>
                            <FormInputField
                                name='recommendedRaise'
                                label='Recommended Raise'
                                inputType='number'
                                form={form}
                            />

                            <FormInputField
                                name='performanceRating'
                                label='Performance Rating (e.g. 4.5/10)'
                                inputType='number'
                                form={form} />

                            <FormInputField name='strengths'
                                label='Strengths By Reporting Manager'
                                inputType='number'
                                form={form} />

                            <FormTextArea
                                name='managerComments'
                                label='Manager Comments'
                                inputType='number'
                                form={form}
                                className='col-span-2' />

                            <FormTextArea
                                name='areasOfImprovement'
                                label='Areas Of Improvement'
                                form={form}
                                className='col-span-2' />

                            <FormTextArea
                                name='promotionRecommendation'
                                label='Promotion Recommendation'
                                form={form}
                                className='col-span-2' />

                        </div>
                        <div className=' ml-1 grid grid-cols-1 gap-6 md:grid-cols-1'>
                            <FormTextArea
                                name='promotionDetails'
                                label='Promotion Details'
                                form={form}
                                className='col-span-2' />

                        </div>


                        {/* Submit Button */}
                        <div className='mt-10 flex justify-end'>
                            <Button
                                type='submit'
                                variant='contained'
                                className='bg-[#B82025] text-white'
                                disabled={loader}
                            >
                                {loader ? <Loader className='animate-spin' /> : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default ReviewEditIncrement

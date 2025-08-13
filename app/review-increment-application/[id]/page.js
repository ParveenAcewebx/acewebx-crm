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
import { Separator } from '@radix-ui/react-select'
import FormSelectField from '@/components/share/form/FormSelect'
import { TenuretotalExperienceOptions } from '@/components/constants/StaticData'
import IncrementAPi from '@/services/increment/IncrementAPi'

function ReviewEditIncrement() {
    const { id } = useParams()
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [incrementsData, setIncrementData] = useState({})
    const [idForForm, setIdForForm] = useState("")
    const form = useForm({
        mode: 'onChange',
        // defaultValues: {
        //     eventDate: '',
        // },
    })

    const onSubmit = async (data) => {
        setLoader(true)
        const newData = { ...data, token: id }
        try {
            const response = await IncrementAPi.addIncrementReview(idForForm, newData)
            if (response?.data?.status === true) {
                setLoader(false)
                router.push('/feedback')
            } else {
                setLoader(false)
                errorMessage({ description: 'Failed to update event.' })
            }
        } catch (error) {
            setLoader(false)
            console.error('Submission Error:', error?.message)
            errorMessage({ description: error?.message || 'Something went wrong.' })
        }
    }

    const confirmIncremetData = async () => {
        try {
            const response = await IncrementAPi.IncrementGetByUUIDConfirm(id);


            if (response?.data) {
                setIncrementData(response?.data?.incrementData)
                setIdForForm(response?.data?.incrementData?.id)

            }
        } catch (error) {
            console.error("Fetch Error:", error);
            errorMessage({
                description: error?.message || "Something went wrong while fetching event data.",
            });
        }
    };




    useEffect(() => {
        confirmIncremetData()

    }, [id])




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

                <div className=" pt-2  !">
                    <div className="mb-4  grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Name</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.name}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Acewebx Tenure</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.acewebxTenure}</span>
                        </div>
                    </div>

                    <div className="mb-4  grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Total Experience</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.totalExperience}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Experience With Acewebx</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.experienceWithAcewebx}</span>
                        </div>
                    </div>

                    <div className="mb-4  grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Total Projects</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.totalProjects}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Rating On Projects</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.ratingOnProjects}</span>
                        </div>
                    </div>

                    <div className="mb-4  grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Client Calls</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.clientCalls}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Client Converted</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.clientConverted}</span>
                        </div>
                    </div>

                    <div className="mb-4  grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">New Skills</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.newSkills}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Improvement Areas</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.improvementAreas}</span>
                        </div>
                    </div>

                    <div className="mb-4  grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Current Salary</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.currentSalary}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Expected Salary</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.expectedSalary}</span>
                        </div>
                    </div>

                    <div className="mb-4  grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Raise Justified</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.raiseJustified}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Short Term Goals</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.ShortTermGoals}</span>
                        </div>
                    </div>

                    <div className="mb-4   grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Long Term Goals</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.longTermGoals}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Weaknesses</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.weaknesses}</span>
                        </div>
                    </div>

                    <div className="mb-4  grid grid-cols-2 gap-6 md:grid-cols-2 mt-2">
                        <div>
                            <h3 className="capitalize font-[500]">Key Achievements</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.keyAchievements}</span>
                        </div>
                        <div>
                            <h3 className="capitalize font-[500]">Suggestions</h3>
                            <span className="text-gray-600 text-[14px]">{incrementsData?.Suggestions}</span>
                        </div>
                    </div>


                </div>
                <Separator orientation="vertical" className="h-[1px] bg-black mt-5 mb-12" />

                <h2 className='walking mb-6 text-2xl font-semibold text-gray-800'>
                    Add your feedback
                </h2>
                <FormProvider {...form}>
                    <form
                        encType='multipart/form-data'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >

                        <div className='mb-4  mt-6 grid grid-cols-2 gap-6 md:grid-cols-2'>
                            <FormInputField
                                name='recommendedRaise'
                                label='Recommended Raise'
                                inputType='number'
                                form={form}
                            />

                            <FormSelectField
                                name='performanceRating'
                                label='Performance Rating'
                                options={TenuretotalExperienceOptions}
                                form={form}
                            />


                            <FormTextArea name='strengths'
                                label='Strengths By Reporting Manager'
                                inputType='text'
                                className='col-span-2'
                                form={form} />


                            <FormTextArea
                                name='managerComments'
                                label='Manager Comments'
                                inputType='text'
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
                        <div className='  grid grid-cols-1 gap-6 md:grid-cols-1'>
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

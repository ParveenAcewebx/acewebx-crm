'use client'
import {
    isHoliday
} from '@/components/constants/StaticData'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import Loader from '@/components/Loader'
import { errorMessage } from '@/components/ToasterMessage'
import FormInputField from '@/components/share/form/FormInputField'
import FormDatePicker from '@/components/share/form/datePicker'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import moment from 'moment'
import CommonLayout from '@/components/CommonLayouyt'
import TextEditor from '@/components/share/form/TextEditor'
import { MultiImageUploader } from '@/components/share/form/MultiFileUpload'
import EventApi from '@/services/cadidateApis/events/EventApi'
import FormSelectField from '@/components/share/form/FormSelect'
import { EventValidation } from '@/components/form-validations/EventValidation'
import CurrentAndNextYearDatepicker from '@/components/share/form/CurrentAndNextYearDatepicker'

function EditEvent() {
    const { id } = useParams()
    const [loader, setLoader] = useState(false)

    // image :
    const [imageUpload, setImageUpload] = useState(null)
    const [updateImage, setUpdateImage] = useState([])
    const [deletedOldImages, setDeletedOldImages] = useState([])
    const [files, setFiles] = useState([])


    const router = useRouter()
    const form = useForm({
        mode: 'onChange',
        defaultValues: {
            title: "",
            isHoliday: "",
            isExpired: "",
            description: "",
            from: new Date(),
            to: new Date()

        },
        resolver: yupResolver(EventValidation)
    })



    const onSubmit = async data => {
        try {
            const formData = new FormData()

            const existingImageFiles = await Promise.all(
                updateImage.map(async (img, index) => {
                    const response = await fetch(img.url)
                    const blob = await response.blob()
                    const fileName = img.url.split('/').pop() || `image_${index}.jpg`
                    return new File([blob], fileName, { type: blob.type })
                })
            )

            // Combine old and new image files
            const allImageFiles = [
                ...existingImageFiles,
                ...(Array.isArray(imageUpload)
                    ? imageUpload.filter(file => file instanceof File)
                    : [])
            ]

            // Append them to formData
            allImageFiles.forEach((file, index) => {
                formData.append(`banners${index}`, file)
            })

            // Append the rest of the form fields
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'fromDate' || key === 'toDate') {
                    formData.append(key, moment(value).format('YYYY-MM-DD'))
                } else {
                    formData.append(key, value)
                }
            })

            const response = await EventApi.editEvent(id, formData)
            if (response?.data?.status === true) {
                setLoader(false)
                router.back()
            }
        } catch (error) {
            setLoader(false)
            console.error('Submission Error:', error?.message)
            errorMessage({ description: error?.message })
        }
    }






    const candidateDataGetById = async (id, form) => {
        try {
            const response = await EventApi.getByIdEvent(id)
            if (response?.data?.status === true) {
                const data = response?.data?.data
                const fromDate = new Date(data?.fromDate + 'T00:00:00')
                const toDate = new Date(data?.toDate + 'T00:00:00')

                const dataForSet = {
                    title: data?.title,
                    isHoliday: data?.isHoliday,
                    // isExpired: data?.isExpired,
                    description: data?.description,
                    phone: data?.phone,
                    banners: data?.banners,
                    fromDate: fromDate,
                    toDate: toDate

                }

                const mappedImages = data.banners?.map(file => ({
                    url: `${process.env.NEXT_PUBLIC_API_URL}${file.filePath}`
                }))

                // Set form fields first
                setUpdateImage(mappedImages)
                form.reset(dataForSet)


            }
        } catch (error) {
            console.error('Submission Error:', error)
            errorMessage(
                { description: error?.message }
            );
        }
    }

    useEffect(() => {
        if (!id) return
        candidateDataGetById(id, form)
    }, [id])


    return (
        <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>

            <div className='flex justify-between'>
                <CommonLayout pageTitle={`Event Edit`} />
            </div>

            <div className='mt-2'>{/* <Separator /> */}</div>
            <div className=''>
                <FormProvider {...form}>
                    <form
                        encType='multipart/form-data'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className='mb-4 mt-2 grid grid-cols-1 gap-6 md:grid-cols-1'>
                            <FormInputField
                                name='title'
                                label='Title*'
                                form={form}
                                inputType='text'
                                className='colum-box-bg-change'
                            />
                        </div>

                        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-1'>
                            <TextEditor
                                name='description'
                                label='Description'
                                form={form}
                                multiline
                                className='col-span-2   !bg-white '

                            />
                        </div>


                        <div className='mb-4 mt-6 grid grid-cols-2 gap-6 md:grid-cols-3'>
                            <CurrentAndNextYearDatepicker
                                name='fromDate'
                                label='From Date'
                                form={form}
                                inputFormat='YYYY-MM-DD'
                                className='Date'
                                disabled={{ before: new Date('2024-12-31') }}
                                defaultM
                                onth={new Date()}
                            />
                            <CurrentAndNextYearDatepicker
                                name='toDate'
                                label='To Date'
                                form={form}
                                inputFormat='YYYY-MM-DD'
                                className='Date'
                                disabled={{ before: new Date('2024-12-31') }}
                                defaultM
                                onth={new Date()}
                            />
                            <FormSelectField
                                name='isHoliday'
                                label='Is Holiday?*'
                                form={form}
                                options={isHoliday}
                                className='colum-box-bg-change'
                            />
                        </div>



                        <div className='mb-4 grid grid-cols-1 gap-6 md:grid-cols-1 mt-7'>
                            <MultiImageUploader
                                setImageUpload={setImageUpload}
                                updateImage={updateImage}
                                setDeletedOldImages={setDeletedOldImages}
                                setFiles={setFiles}
                                files={files}
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
                </FormProvider>
            </div>
        </div>
    )
}

export default EditEvent

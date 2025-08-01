'use client'
import {
    isHoliday,
    salesCandidateDefaultValue,
} from '@/components/constants/StaticData'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FormProvider, useForm } from 'react-hook-form'

// import Loader from '@/components/Loader'
import { errorMessage } from '@/components/ToasterMessage'
import { SalesCandidateValidation } from '@/components/form-validations/SalesCandidateValidation'
import FormInputField from '@/components/share/form/FormInputField'
import FormDatePicker from '@/components/share/form/datePicker'
import { Button } from '@/components/ui/button'
import SalesCandidate from '@/services/cadidateApis/SalesCandidateApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import FormMultiSelectField from '@/components/share/form/FormMultiSelect'
import moment from 'moment'
import CommonLayout from '@/components/CommonLayouyt'
import TextEditor from '@/components/share/form/TextEditor'
import { MultiImageUploader } from '@/components/share/form/MultiFileUpload'
import EventApi from '@/services/cadidateApis/events/EventApi'
import FormSelectField from '@/components/share/form/FormSelect'
import { EventValidation } from '@/components/form-validations/EventValidation'

function AddEvent() {
    const [loader, setLoader] = useState(false)
    const [candEmail, setCandEmail] = useState("")
    const [recaptcha, setRecaptcha] = useState([])
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
            fromDate: new Date(),
            toDate: new Date()

        },
        resolver: yupResolver(EventValidation)
    })

    console.log("files", files)
    const onSubmit = async data => {
        console.log("dataa", data)
        try {
            const formData = new FormData()

            if (Array.isArray(files)) {
                files.forEach((file, index) => {
                    if (file instanceof File) {
                        formData.append(`banners${index}`, file)
                    }
                })
            }
            console.log("filefile", files)
            // if (Array.isArray(files)) {
            //     for (const file of files) {
            //         if (file instanceof File) {
            //             formData.append('banners', file);
            //         }
            //     }
            // }

            // const zip = new Blob(files, { type: 'application/octet-stream' });
            // formData.append('banners', zip);

            Object.entries(data).forEach(([key, value]) => {
                // Skip these keys entirely
                // if (['preferredShift', 'businessMethods', 'leadPlatforms'].includes(key)) return;
                // Format 'date', append everything else as-is
                if (key === 'fromDate' || key === 'toDate') {
                    formData.append(key, moment(value).format('YYYY-MM-DD'));
                } else {
                    formData.append(key, value);
                }
            });



            const response = await EventApi.addEvent(formData)
            if (response?.data?.status == true) {
                // form.reset()
                setLoader(false)
                router.push('/dashboard/event')
            }
        } catch (error) {
            setLoader(false)
            console.error('Submission Error:', error?.message)
            errorMessage({ description: error?.message })
        }
    }



  


    return (
        <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>

            <div className='flex justify-between'>
                <CommonLayout pageTitle={`Events`} />
            </div>

            <div className='mt-5'>{/* <Separator /> */}</div>
            <div className=''>
                <FormProvider {...form}>
                    <form
                        encType='multipart/form-data'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >

                        <div className='mb-4 mt-6 grid grid-cols-2 gap-6 md:grid-cols-2'>
                            <FormInputField
                                name='title'
                                label='Title'
                                form={form}
                                inputType='text'
                                className='colum-box-bg-change'
                            />
                            <FormDatePicker
                                name='fromDate'
                                label='From Date'
                                form={form}
                                inputFormat='YYYY-MM-DD'
                                className='Date'
                                disabled={{ before: new Date('2024-12-31') }}
                                defaultM
                                onth={new Date()}
                            />
                            <FormDatePicker
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
                                label='Is Holiday?'
                                form={form}
                                options={isHoliday}
                                className='colum-box-bg-change'
                            />
                            <FormSelectField
                                name='isExpired'
                                label='Is Expired?'
                                form={form}
                                options={isHoliday}
                                className='colum-box-bg-change'
                            />
                        </div>

                        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-1'>
                            <TextEditor
                                name='description'
                                label='Description'
                                form={form}
                                multiline
                                className='col-span-2 !h-[160px] border !bg-white '
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

export default AddEvent

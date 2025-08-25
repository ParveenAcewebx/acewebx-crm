'use client'
import {
    isHoliday,
    paymentMode,
    StatusData
} from '@/components/constants/StaticData'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { errorMessage } from '@/components/ToasterMessage'
import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader } from 'lucide-react'
import moment from 'moment'
import CommonLayout from '@/components/CommonLayouyt'
import TextEditor from '@/components/share/form/TextEditor'
import { MultiImageUploader } from '@/components/share/form/MultiFileUpload'
import EventApi from '@/services/events/EventApi'
import FormSelectField from '@/components/share/form/FormSelect'
import { EventValidation } from '@/components/form-validations/EventValidation'
import CurrentAndNextYearDatepicker from '@/components/share/form/CurrentAndNextYearDatepicker'
import ExpenseApi from '@/services/expenses/ExpenseApi'
import ExpenseCategoryApi from '@/services/expenses/ExpenseCategoryApi'

function EditEvent() {
    const { id } = useParams()
    const [loader, setLoader] = useState(false)
    const [categories, setCategories] = useState([])
    const [subcategories, setsubCategories] = useState([])

    const router = useRouter()
    const form = useForm({
        mode: 'onChange',
        defaultValues: {
            title: "",
            description: "",
            paymentMode: "",
            categoryId: "",
            subCategoryId: "",
            receiptNumber: "",
            invoice: "",
            status: ""

        },
    })



    const onSubmit = async data => {
        try {
            const response = await ExpenseApi.editExpense(id, data)
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
            const response = await ExpenseApi.getByIdExpense(id)
            console.log("responseresponse", response)
            if (response?.data?.status === true) {
                const data = response?.data?.data
              
                form.reset(data)


            }
            setTimeout(() => {
                form.setValue("categoryId", response?.data?.data?.category?.id)

            }, 1000)
            setTimeout(() => {

                form.setValue("subCategoryId", response?.data?.data?.subCategory?.id)
            }, 2000)
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

    // fetch options for category:-
    const fetchAllCategorysList = async () => {
        try {
            const response = await ExpenseCategoryApi.getAllCategoryforOption()
            if (response.status === 200) {
                const optionsforParent = response?.data?.data?.data
                    ?.filter((item) => item.parentId == null) // ✅ filter items first
                    ?.map((item) => ({
                        label: item?.name,
                        value: String(item?.id),
                    }));
                setCategories(optionsforParent)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(() => {
        fetchAllCategorysList()
    }, [])




    const categoryIdForSub = form.watch("categoryId")

    // fetch options for sub-category 

    const subcategoryOptions = async (checkValue) => {
        try {
            const response = await ExpenseCategoryApi.getAllCategoryforOption()
            if (response.status === 200) {
                const optionsforParent = response?.data?.data?.data
                    ?.filter((item) => item.parentId == checkValue) // ✅ filter items first
                    ?.map((item) => ({
                        label: item?.name,
                        value: String(item?.id),
                    }));
                setsubCategories(optionsforParent)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        if (categoryIdForSub) {
            subcategoryOptions(categoryIdForSub)
        }
    }, [categoryIdForSub])


    return (
        <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>

            <div className='flex justify-between'>
                <CommonLayout pageTitle={`Edit Expense`} />
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
                                label='Title'
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
                            <FormSelectField
                                inputType='text'
                                name='paymentMode'
                                label='Payment Mode (Cash/Card/UPI)'
                                form={form}
                                options={paymentMode}
                                className='colum-box-bg-change'
                            />
                            <FormSelectField
                                name='categoryId'
                                label='Category'
                                form={form}
                                options={categories}
                                className='colum-box-bg-change'
                            />
                            <FormSelectField
                                name='subCategoryId'
                                label='Sub Category'
                                form={form}
                                options={subcategories}
                                className='colum-box-bg-change'
                            />

                        </div>


                        <div className='mb-4 grid grid-cols-3 gap-6 md:grid-cols-3 mt-7'>
                            <FormInputField
                                name='invoice'
                                label='Invoice'
                                form={form}
                                inputType='text'
                                className='colum-box-bg-change'
                            />

                            <FormInputField
                                name='receiptNumber'
                                label='Receipt Number'
                                form={form}
                                inputType='text'
                                className='colum-box-bg-change'
                            />
                            <FormSelectField
                                name='status'
                                label='Status'
                                form={form}
                                options={StatusData}
                                className='colum-box-bg-change'
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

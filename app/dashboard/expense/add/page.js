'use client'
import {
    ExpenseStatusData,
    isHoliday,
    paymentMode,
    StatusData,

} from '@/components/constants/StaticData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
// import Loader from '@/components/Loader'
import { errorMessage } from '@/components/ToasterMessage'
import FormInputField from '@/components/share/form/FormInputField'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import CommonLayout from '@/components/CommonLayouyt'
import TextEditor from '@/components/share/form/TextEditor'
import FormSelectField from '@/components/share/form/FormSelect'
import ExpenseApi from '@/services/expenses/ExpenseApi'
import ExpenseCategoryApi from '@/services/expenses/ExpenseCategoryApi'
import FormMultiSelectField from '@/components/share/form/FormMultiSelect'
import FormDatePicker from '@/components/share/form/datePicker'
import moment from 'moment'

function AddExpense() {
    const [loader, setLoader] = useState(false)
    const [categories, setCategories] = useState([])
    const [subcategories, setsubCategories] = useState([])

    const router = useRouter()
    const form = useForm({
        mode: 'onChange',
        defaultValues: {
            title: "",
            description: "",

        },
    })

    const onSubmit = async data => {
        const newData = { ...data, date: moment(data?.date).format('YYYY-MM-DD') }
        try {


            const response = await ExpenseApi.addExpense(newData)
            if (response?.data?.status == true) {
                setLoader(false)
                router.push('/dashboard/expenses')
            }
        } catch (error) {
            setLoader(false)
            console.error('Submission Error:', error?.message)
            errorMessage({ description: error?.message })
        }
    }




    // fetch options for category  list
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


    //  localReportingManage :--
    const [paidByOptions, setPaidByOptions] = useState([])

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
                setPaidByOptions(candidateOptions);

            }
        }
    }, []);

    return (
        <div className='mobile-view items-right relative flex min-h-screen w-full flex-col justify-start'>

            <div className='flex justify-between'>
                <CommonLayout pageTitle={`Add Expense`} />
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
                                name='receiptUrl'
                                label='Receipt Url'
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
                            <FormInputField
                                name='amount'
                                label='Amount'
                                form={form}
                                inputType='number'
                                className='colum-box-bg-change'
                            />
                            <FormMultiSelectField
                                name='paidBy'
                                label='Paid By'
                                form={form}
                                options={paidByOptions}
                                className='colum-box-bg-change'
                            />
                            <FormDatePicker
                                name='date'
                                label='Date'
                                form={form}
                                inputFormat='YYYY-MM-DD'
                                className='datepickerouter'
                                disabled={{ before: new Date('2000-12-31') }}
                                defaultMonth={new Date()} />
                            <FormSelectField
                                name='status'
                                label='Status'
                                form={form}
                                options={ExpenseStatusData}
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

export default AddExpense

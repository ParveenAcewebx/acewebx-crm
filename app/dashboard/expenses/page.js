'use client'
import DialogBox from '@/components/modal/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Import, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import SkillForm from '@/components/skills/SkillForm'
import SkillSettingModal from '@/components/modal/SkillSettingModal'
import EventApi from '@/services/events/EventApi'
import { ExpenseColumn } from './expense-column'
import { useRouter } from 'next/navigation'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/constants/StaticData'
import ExpenseApi from '@/services/expenses/ExpenseApi'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import ExpenseCSVDownload from '@/components/modal/ExpenseCSVDownload'
import { Label } from '@/components/ui/label'
import { FormDateRangePicker } from '@/components/share/form/DateRangePicker'
import moment from 'moment'
import useLocalStorage from 'use-local-storage'
import { endOfMonth, startOfMonth, subDays, subMonths } from 'date-fns'

const ExpenseList = () => {
    const [getList, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalRecord, setTotalRecord] = useState()
    const [length, setLength] = useState(50)
    const [deleteOpenModal, setDeleteOpenModal] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [submitOpenModal, setSubmitOpenModal] = useState(false)
    const [editData, setEditData] = useState(null)
    const [expenseSearchParam, setExpenseSearchParam] = useLocalStorage("expenseSearchParam", {
        length: '50'
    });
    const methods = useForm({
        defaultValues: {
            length: '50'
        }
    })

    // filter

    const today = new Date()
    const startOfLastMonth = startOfMonth(subMonths(today, 1))
    const endOfLastMonth = endOfMonth(subMonths(today, 1))

    const form = useForm({
        mode: 'onChange', // or 'onBlur' or 'onChange'
        defaultValues: {
            date: {
                startDate: startOfLastMonth,
                endDate: endOfLastMonth,
                key: 'selection'
            },
        }
    });
    const search = form.watch('search')
    const date = form.watch('date')
    const router = useRouter()
    // fetch group list
    const fetchList = async (data) => {
        try {
            const response = await ExpenseApi.expenseListFilters(data)
            if (response.status === 200) {
                setList(response?.data?.data?.expenses)
                setTotalRecord(response?.data?.data?.pagination?.total)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchList()
    }, [page, length])

    // delete row
    const onDelete = async () => {
        if (deleteIndex !== null) {
            try {
                const res = await ExpenseApi.deleteExpense(deleteIndex)
                setDeleteOpenModal(false)
                if (res?.status === 200) {
                    fetchList()
                    successMessage({ description: res?.data?.message })
                }
            } catch (error) {
                errorMessage({
                    description: error?.response?.data?.message
                })
            }
        }
    }

    const handleDeleteExpense = row => {
        setDeleteOpenModal(true)
        setDeleteIndex(row?.original?.id)
    }
    const handleEditExpense = async (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/expense/edit/${row?.original?.id}`)

        }
    }
    const deleteHandleModalClose = () => {
        setDeleteOpenModal(false)
    }

    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            if (name === 'length') {
                const val = value.length
                setLength(val === 'all' ? totalRecord || 9999 : Number(val))
                setPage(1)
            }
        })
        return () => subscription.unsubscribe()
    }, [methods, totalRecord])

    const submitHandleModalClose = () => {
        setSubmitOpenModal(false)
    }



    // filter :--
    // const handleSimpleFilter = () => {
    //     setPage(1)
    //     fetchList()
    // }

    const [inrementCSVModalOpen, setInrementCSVModalOpen] = useState(false) // State for DCS modal


    const AddvanceOpenModal = row => {
        setInrementCSVModalOpen(true)
    }

    const handleInrementCSVDownloadCSV = async (data) => {
        const formData = new FormData()

        const file = data?.file
        if (file) {
            formData.append('file', file)
        }

        try {
            const response = await ExpenseApi.expenseCSVList(formData);
            fetchList()
            setInrementCSVModalOpen(false)
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    const handleDateChnage = (date) => {
        console.log("valuedate", date)
    }



    const romoveOldParams = () => {
        const newData = {
            search: "",
            length: 50,
        }
        methods.setValue("length", "50")
        form.setValue("search", "")
        setExpenseSearchParam(newData)
    }


    const handleSimpleFilter = () => {
        const newData = {
            search,
            page,
            length,
            startDate: date?.startDate == undefined ? "" : moment(date?.startDate).format('YYYY-MM-DD'),
            endDate: date?.endDate == undefined ? "" : moment(date?.endDate).format('YYYY-MM-DD')
        }
        setPage(1)
        setExpenseSearchParam(newData)
    }

    // old fileter code :--------
    useEffect(() => {
        const newData = {
            search: expenseSearchParam?.search,
            startDate: expenseSearchParam?.startDate
                ? new Date(expenseSearchParam.startDate)
                : startOfLastMonth,
            endDate: expenseSearchParam?.endDate
                ? new Date(expenseSearchParam.endDate)
                : endOfLastMonth,
            // currentShift :"",
            length,
        }
        setExpenseSearchParam(newData)
    }, [length])

    useEffect(() => {
        // for filters :-
        form.setValue("search", expenseSearchParam?.search)
        form.setValue("date", {
            startDate: expenseSearchParam?.startDate
                ? new Date(expenseSearchParam.startDate)
                : startOfLastMonth,
            endDate: expenseSearchParam?.endDate
                ? new Date(expenseSearchParam.endDate)
                : endOfLastMonth,
        },)
        // for length :-
        let { length } = expenseSearchParam
        if (length) {
            setLength(length)
        }
        methods.setValue("length", String(length))

    }, [])


    useEffect(() => {
        const handler = setTimeout(() => {
            const newData = {
                search,
                length,
                page,
                startDate: date?.startDate == undefined ? "" : moment(date?.startDate).format('YYYY-MM-DD'),
                endDate: date?.endDate == undefined ? "" : moment(date?.endDate).format('YYYY-MM-DD')
            }

            fetchList(newData)
        }, 500)

        // cleanup to avoid multiple triggers
        return () => clearTimeout(handler)
    }, [expenseSearchParam, page, length])







    return (
        <>
            <div>
                <LayoutHeader pageTitle='Expenses' />

                <div className='flex justify-between items-center mb-5 mt-2'>
                    <div>
                        <FormProvider {...methods}>
                            <FormSelectField
                                name='length'
                                className='h-12 w-28 btn-secondary'
                                form={methods}
                                options={LengthData}
                            />
                        </FormProvider>
                    </div>

                    <FormProvider {...form}>
                        <div className="flex justify-between items-center gap-4">
                            <div className='filters relative'>
                                <div className="flex items-center gap-4">
                                    <div className=' grid grid-cols-1 gap-6 md:grid-cols-1 '>
                                        {/* <Label className=''>Application Submitted Date</Label> */}
                                        <FormDateRangePicker
                                            name='date'
                                            label=' '
                                            onChange={handleDateChnage}
                                            form={form}
                                            inputFormat='YYYY-MM-DD'
                                            className='datepickerouterExprense'

                                        /></div>

                                    <div className="relative">
                                        <FormInputField
                                            name="search"
                                            placeholder="Search by Title"
                                            form={form}
                                            inputType="text"
                                            className="searchSizeChange "
                                            searchError="searchError"
                                        />

                                        <Search
                                            type="submit"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                            onClick={() => handleSimpleFilter()}
                                        />
                                    </div>
                                    <Button className="cursor-pointer h-12 rounded-[4px] text-[#b82025] hover:text-[#fff] hover:bg-[#b82025] bg-transparent border border-[#b82025] text-[11px]"
                                        onClick={romoveOldParams} >Clear serach</Button>

                                    {/* Import CSV for Employee Button */}
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={AddvanceOpenModal}
                                                className="cursor-pointer h-12 rounded-[4px] text-[#231f20] hover:text-[#fff] hover:bg-[#231f20] bg-transparent border border-[#231f20] flex gap-2 text-[11px]"
                                            >
                                                <Import /> Import
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="w-auto rounded-sm bg-[#b82025] text-sm">
                                            Import Expense CSV
                                        </TooltipContent>
                                    </Tooltip>
                                </div>


                            </div>
                        </div>
                    </FormProvider>
                </div>
                <div className='overflowX-auto pt-1'>

                    <DataTable
                        columns={ExpenseColumn(handleDeleteExpense, handleEditExpense, getList)}
                        data={getList}
                        totalRecord={totalRecord}
                        page={page}
                        setPage={setPage}
                        length={length}
                        loading={loading}
                    />
                </div>
                <DialogBox
                    onDelete={onDelete}
                    description='Are you certain you want to proceed with this deletion?'
                    deleteOpenModal={deleteOpenModal}
                    deleteHandleModalClose={deleteHandleModalClose}
                />

                <SkillSettingModal
                    submitOpenModal={submitOpenModal}
                    onOpenChange={isOpen => {
                        setSubmitOpenModal(isOpen)
                        if (!isOpen) {
                            setEditData(null) // clear form when modal closes
                        }
                    }}
                    submitHandleModalClose={submitHandleModalClose}
                    description={
                        <SkillForm
                            setSubmitOpenModal={setSubmitOpenModal}
                            fetchList={fetchList}
                            editData={editData}
                        />
                    }
                    message={editData ? 'Edit Skill' : 'Add Skill'}
                />
            </div>
            <ExpenseCSVDownload
                isOpen={inrementCSVModalOpen}
                onClose={() => setInrementCSVModalOpen(false)}
                handleDownloadCSV={handleInrementCSVDownloadCSV}
            />
        </>
    )
}

export default ExpenseList

'use client'
import DialogBox from '@/components/modal/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/constants/StaticData'
import { expenseCategoryColumn } from './expense-category-column'
import ExpenseCategorySettingModa from '@/components/modal/ExpenseCategorySettingModal'
import ExpenseCategoryForm from '@/components/category/ExpenseCategoryForm'
import ExpenseCategoryApi from '@/services/expenses/ExpenseCategoryApi'

const ExpenseCategory = () => {
    const [getList, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalRecord, setTotalRecord] = useState()
    const [length, setLength] = useState(50)
    const [deleteOpenModal, setDeleteOpenModal] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [submitOpenModal, setSubmitOpenModal] = useState(false)
    const [editData, setEditData] = useState(null)
    const [parentData, setParentData] = useState([])

    const methods = useForm({
        defaultValues: {
            length: '50'
        }
    })

    // filter :--
    const form = useForm({
        // resolver: yupResolver(SearchSkill),
        mode: 'onChange', // or 'onBlur' or 'onChange'
    });
    const search = form.watch('search')

    // fetch group  list
    const fetchSkillsList = async () => {
        const data = {}
        try {
            const response = await ExpenseCategoryApi.expenseCategoryListFilters({
                ...data,
                search,
                page,
                length
            })
            if (response.status === 200) {
                setList(response?.data?.data?.data)
                setTotalRecord(response?.data?.data?.data?.pagination?.total)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchSkillsList()
    }, [page, length])

    // delete row
    const onDelete = async () => {
        if (deleteIndex !== null) {
            try {
                const res = await ExpenseCategoryApi.deleteExpenseCategory(deleteIndex)
                setDeleteOpenModal(false)
                if (res?.status === 200) {
                    fetchSkillsList()
                    successMessage({ description: res?.data?.message })
                }
            } catch (error) {
                errorMessage({
                    description: error?.response?.data?.message
                })
            }
        }
    }

    const handleDeleteTaskTag = row => {
        setDeleteOpenModal(true)
        setDeleteIndex(row?.original?.id)
    }
    const handleEditTaskTag = async (row) => {
        if (row?.original?.id) {
            try {
                const response = await ExpenseCategoryApi.getByIdExpenseCategory(row?.original?.id)
                console.log("response------>", response)
                if (response.status === 200) {
                    setEditData(response.data.data)
                    fetchSkillsList()
                    successMessage({ description: response?.data?.message })
                }
            } catch (error) {
                console.log('error', error)
            }

            setSubmitOpenModal(true)
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
    const handleOpenTagModal = () => {
        setSubmitOpenModal(true)
        setEditData(null)
    }
    const submitHandleModalClose = () => {
        setSubmitOpenModal(false)
    }






    const handleSimpleFilter = () => {
        setPage(1)
        fetchSkillsList()
    }


    const getAllExpenseCategoryByType = async () => {

        try {
            const response = await ExpenseCategoryApi.getAllExpenseCategoryByType(null)
            if (response.status === 200) {
                const optionsforParent = response?.data?.data?.data
                    ?.filter((item) => item.parentId == null) // ✅ filter items first
                    ?.map((item) => ({
                        label: item?.name,
                        value: String(item?.id),
                    }));
                setParentData(optionsforParent)

                // setTotalRecord(response?.data?.data?.data?.pagination?.total)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getAllExpenseCategoryByType()

    }, [submitOpenModal])
    return (
        <>
            <div>
                <LayoutHeader pageTitle='Expense Category' />

                <div className='flex justify-between items-center mb-6 mt-2'>
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
                    <div className='flex items-center gap-4 '>
                        <FormProvider {...form}>
                            <div className="flex justify-between items-center gap-4">
                                <div className='filters relative'>
                                    <div>
                                        <FormInputField
                                            name="search"
                                            placeholder="Search...."
                                            form={form}
                                            inputType="text"
                                            className="searchSizeChange"
                                            searchError="searchError"
                                        />
                                        <div className='filttersSearch'>
                                            <Search
                                                type="submit"
                                                className="cursor-pointer "
                                                onClick={() => handleSimpleFilter()}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </FormProvider>

                        <Button className="cursor-pointer h-12 rounded-[4px] text-[#b82025] hover:text-[#fff] hover:bg-[#b82025] bg-transparent border border-[#b82025] text-[11px]" onClick={handleOpenTagModal}>
                            <Plus />
                            Add Category
                        </Button>
                    </div>

                </div>

                <DataTable
                    columns={expenseCategoryColumn(handleDeleteTaskTag, handleEditTaskTag)}
                    data={getList}
                    totalRecord={totalRecord}
                    page={page}
                    setPage={setPage}
                    length={length}
                    loading={loading}
                />
                <DialogBox
                    onDelete={onDelete}
                    description='Are you certain you want to proceed with this deletion?'
                    deleteOpenModal={deleteOpenModal}
                    deleteHandleModalClose={deleteHandleModalClose}
                />

                <ExpenseCategorySettingModa
                    submitOpenModal={submitOpenModal}
                    onOpenChange={isOpen => {
                        setSubmitOpenModal(isOpen)
                        if (!isOpen) {
                            setEditData(null) // clear form when modal closes
                        }
                    }}
                    submitHandleModalClose={submitHandleModalClose}
                    description={
                        <ExpenseCategoryForm
                            setSubmitOpenModal={setSubmitOpenModal}
                            fetchList={fetchSkillsList}
                            editData={editData}
                            parentData={parentData}
                        />
                    }
                    message={editData ? 'Edit Expense Category' : 'Add Expense Category'}
                />
            </div>
        </>
    )
}

export default ExpenseCategory
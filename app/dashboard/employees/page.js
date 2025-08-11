'use client'
import DialogBox from '@/components/modal/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import SkillForm from '@/components/skills/SkillForm'
import SkillSettingModal from '@/components/modal/SkillSettingModal'
import { useRouter } from 'next/navigation'
import EmployeesApi from '@/services/cadidateApis/employees/EmployeesApi'
import { EmployeeColumn } from './employee-column'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchEmployee, SearchValidation } from '@/components/form-validations/SearchValidation'
import { LengthData } from '@/components/constants/StaticData'

const EventList = () => {
    const [getList, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalRecord, setTotalRecord] = useState()
    const [length, setLength] = useState(10)
    const [deleteOpenModal, setDeleteOpenModal] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [submitOpenModal, setSubmitOpenModal] = useState(false)
    const [editData, setEditData] = useState(null)
    const methods = useForm({
        defaultValues: {
            length: '10'
        }
    })

    // fetch group tag list
    const fetchTagList = async () => {
        try {
            const response = await EmployeesApi.getAllEmployees(page, length)
            console.log("response", response)
            if (response.status === 200) {
                setList(response?.data?.data?.employees)
                setTotalRecord(response?.data?.data?.pagination?.total)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTagList()
    }, [page, length])

    // delete row
    const onDelete = async () => {
        if (deleteIndex !== null) {
            try {
                const res = await EmployeesApi.deleteEmployees(deleteIndex)
                setDeleteOpenModal(false)
                if (res?.status === 200) {
                    fetchTagList()
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
            router.push(`/dashboard/employee/${row?.original?.id}/detail`)

        }
    }
    const deleteHandleModalClose = () => {
        setDeleteOpenModal(false)
    }
    const router = useRouter()
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
        router.push('/dashboard/employee/add')
        // setSubmitOpenModal(true)
        // setEditData(null)
    }
    const submitHandleModalClose = () => {
        setSubmitOpenModal(false)
    }



    // filter :--
    const form = useForm({
        resolver: yupResolver(SearchEmployee),
        mode: 'onChange', // or 'onBlur' or 'onChange'
    });
    const search = form.watch('search')

    const handleClearSearch = () => {
        form.setValue('search', '')

        getListCadidate()
    }

    const handleSimpleFilter = async data => {

        const isValid = await form.trigger('search'); // only validate 'search'

        if (!isValid) return;
        try {
            const apiData = await EmployeesApi.employeesListFilters({
                ...data,
                search,
            })

            const candidates = apiData?.data?.data?.employees || []
            const paginationInfo = apiData?.data?.data?.pagination

            setList(candidates)
            setTotalRecord(paginationInfo?.total || 0)
        } catch (error) {
            console.error('Fetch error:', error)
        }
    }







    return (
        <>
            <div>
                <LayoutHeader pageTitle='Employees' />
                {/* <div className='mb-3 w-full flex justify-end items-center'>
                    <Button className='site-button' onClick={handleOpenTagModal}>
                        <Plus />
                        Add Employees
                    </Button>
                </div> */}

                <div className='flex justify-between items-center mb-5'>
                    <div>
                        <FormProvider {...methods}>
                            <FormSelectField
                                name='length'
                                className='h-10 w-28'
                                form={methods}
                                options={LengthData}
                            />
                        </FormProvider>
                    </div>

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
                </div>
                <div className='overflowX-auto'>

                <DataTable
                    columns={EmployeeColumn(handleDeleteTaskTag, handleEditTaskTag)}
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
                            fetchTagList={fetchTagList}
                            editData={editData}
                        />
                    }
                    message={editData ? 'Edit Skill' : 'Add Skill'}
                />
            </div>
        </>
    )
}

export default EventList

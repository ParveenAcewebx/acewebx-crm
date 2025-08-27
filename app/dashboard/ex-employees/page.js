'use client'
import DialogBox from '@/components/modal/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import SkillForm from '@/components/skills/SkillForm'
import SkillSettingModal from '@/components/modal/SkillSettingModal'
import { useRouter } from 'next/navigation'
import EmployeesApi from '@/services/employees/EmployeesApi'
import { InactiveEmployeeColumn } from './inactive-employees-column'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchEmployee } from '@/components/form-validations/SearchValidation'
import { LengthData } from '@/components/constants/StaticData'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import EmployeeCSVDownload from '@/components/modal/EmployeeCSVDownload'
import IncrementCSVDownload from '@/components/modal/IncrementCSVDownload'

const EventList = () => {
    const [getList, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalRecord, setTotalRecord] = useState()
    const [length, setLength] = useState(50)
    const [deleteOpenModal, setDeleteOpenModal] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [submitOpenModal, setSubmitOpenModal] = useState(false)
    const [status, setStatus] = useState(0)

    const [editData, setEditData] = useState(null)
    const methods = useForm({
        defaultValues: {
            length: '50'
        }
    })

    // filter :--
    const form = useForm({
        // resolver: yupResolver(SearchEmployee),
        mode: 'onChange', // or 'onBlur' or 'onChange'
    });
    const search = form.watch('search')

    // fetch group list
    const fetchList = async () => {
        const data = {}
        try {
            const response = await EmployeesApi.employeesListFilters({
                ...data,
                search,
                status,
                currentShiftValue: "",
                page,
                length
            })
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
        fetchList()
    }, [page, length])

    // delete row
    const onDelete = async () => {
        if (deleteIndex !== null) {
            try {
                const res = await EmployeesApi.deleteEmployees(deleteIndex)
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

    const handleDeleteEmployee = row => {
        setDeleteOpenModal(true)
        setDeleteIndex(row?.original?.id)
    }
    const handleEditEmployee = async (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/ex-employee/${row?.original?.id}/detail`)

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


    const submitHandleModalClose = () => {
        setSubmitOpenModal(false)
    }





    const handleClearSearch = () => {
        form.setValue('search', '')

        getListCadidate()
    }


    const handleSimpleFilter = () => {
        setPage(1)
        fetchList()

    }


    const [selectedDcsValue, setSelectedDcsValue] = useState(null) // Store DCS value for modal
    const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for CSV modal
    const [inrementCSVModalOpen, setInrementCSVModalOpen] = useState(false) // State for DCS modal





    const handleDownloadCSV = async (data) => {
        const formData = new FormData()

        const file = data?.file
        if (file) {
            formData.append('file', file)
        }

        try {
            const response = await EmployeesApi.employeeCSVList(formData);
            fetchList()
            setDcsModalOpen(false)
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    const handleInrementCSVDownloadCSV = async (data) => {
        const formData = new FormData()

        const file = data?.file
        if (file) {
            formData.append('file', file)
        }

        try {
            const response = await EmployeesApi.incrementCSVList(formData);
            fetchList()
            setInrementCSVModalOpen(false)
        } catch (error) {
            console.error("Download failed", error);
        }
    };




    const handleEdit = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/ex-employee/${row?.original?.id}/edit`)

        }
    };

    const handleBirthdays = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/ex-employee/${row?.original?.id}/birthdays`)

        }
    };

    const handleAnniversary = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/ex-employee/${row?.original?.id}/anniversaries`)

        }
    };

    const handleIncrement = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/ex-employee/${row?.original?.id}/increments`)

        }
    };



    return (
        <>
            <div>
                <LayoutHeader pageTitle='Ex Employees' />


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


                    {/* Right: Search + Advance Search + Export */}
                    <FormProvider {...form}>
                        <div className="flex items-center gap-4">
                            {/* Search Bar */}
                            <div className="relative">
                                <FormInputField
                                    name="search"
                                    placeholder="Email/Name/Phone"
                                    form={form}
                                    inputType="text"
                                    searchError="searchError !mt-41"
                                    className="searchSizeChange "
                                />
                                <Search
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={handleSimpleFilter}
                                />
                            </div>

                        </div>
                    </FormProvider>
                </div>
                <div className='overflowX-auto pt-1'>

                    <DataTable
                        columns={InactiveEmployeeColumn(handleDeleteEmployee, handleEditEmployee, handleEdit, handleBirthdays, handleAnniversary, handleIncrement)}
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
            <EmployeeCSVDownload
                isOpen={dcsModalOpen}
                CandidateType="candidateSales"
                skillsData={[]}
                onClose={() => setDcsModalOpen(false)}
                handleDownloadCSV={handleDownloadCSV}
            />

            <IncrementCSVDownload
                isOpen={inrementCSVModalOpen}
                CandidateType="candidateSales"
                skillsData={[]}
                onClose={() => setInrementCSVModalOpen(false)}
                handleDownloadCSV={handleInrementCSVDownloadCSV}
            />
        </>
    )
}

export default EventList
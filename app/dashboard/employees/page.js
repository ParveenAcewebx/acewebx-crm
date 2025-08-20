'use client'
import DialogBox from '@/components/modal/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Import, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import SkillForm from '@/components/skills/SkillForm'
import SkillSettingModal from '@/components/modal/SkillSettingModal'
import { useRouter } from 'next/navigation'
import EmployeesApi from '@/services/employees/EmployeesApi'
import { EmployeeColumn } from './employee-column'
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
    const [status, setStatus] = useState(1)
    const [editData, setEditData] = useState(null)
    const methods = useForm({
        defaultValues: {
            length: '50'
        }
    })

    // fetch group list
    const fetchList = async () => {
        try {
            const response = await EmployeesApi.getAllEmployees(page, length , status)
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
                status
            })

            const candidates = apiData?.data?.data?.employees || []
            const paginationInfo = apiData?.data?.data?.pagination

            setList(candidates)
            setTotalRecord(paginationInfo?.total || 0)
        } catch (error) {
            console.error('Fetch error:', error)
        }
    }


    const [selectedDcsValue, setSelectedDcsValue] = useState(null) // Store DCS value for modal
    const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for CSV modal
    const [inrementCSVModalOpen, setInrementCSVModalOpen] = useState(false) // State for DCS modal



    const InrementCSVOpenModal = row => {
        // setSelectedDcsValue(row)
        setInrementCSVModalOpen(true)
    }

    const AddvanceOpenModal = row => {
        setSelectedDcsValue(row)
        setDcsModalOpen(true)
    }

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




    return (
        <>
            <div>
                <LayoutHeader pageTitle='Employees' />


                <div className='flex justify-between items-center mb-5 mt-2'>
                    <div>
                        <FormProvider {...methods}>
                            <FormSelectField
                                name='length'
                                className='h-10 w-28 ace-employ'
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


                            {/* Import CSV for Employee Button */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={AddvanceOpenModal}
                                        className="cursor-pointer text-[#231f20] hover:text-[#fff] hover:bg-[#231f20] bg-transparent border border-[#231f20] flex gap-2 text-[11px]"
                                    >
                                        <Import /> Employee
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="w-auto rounded-sm bg-[#b82025] text-sm">
                                    Import Employee CSV
                                </TooltipContent>
                            </Tooltip>

                            {/* Import CSV for Increment Button */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={InrementCSVOpenModal}
                                        className="cursor-pointer text-[#231f20] hover:text-[#fff] hover:bg-[#231f20] bg-transparent border border-[#231f20] flex gap-2 text-[11px]"
                                    > <Import /> Increment
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="w-auto rounded-sm bg-[#b82025] text-sm">
                                    Import Increment CSV
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </FormProvider>
                </div>
                <div className='overflowX-auto pt-1'>

                    <DataTable
                        columns={EmployeeColumn(handleDeleteEmployee, handleEditEmployee)}
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

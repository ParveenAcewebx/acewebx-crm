'use client'
import DialogBox from '@/components/modal/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SkillForm from '@/components/skills/SkillForm'
import SkillSettingModal from '@/components/modal/SkillSettingModal'
import { SkillColumn } from './skill-column'
import SkillApi from '@/services/cadidateApis/settings/SkillApi'
import EventApi from '@/services/cadidateApis/events/EventApi'
import { useRouter } from 'next/navigation'
import EmployeesApi from '@/services/cadidateApis/employees/EmployeesApi'

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
            router.push(`/dashboard/employees/edit/${row?.original?.id}`)

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
        router.push('/dashboard/employees/add')
        // setSubmitOpenModal(true)
        // setEditData(null)
    }
    const submitHandleModalClose = () => {
        setSubmitOpenModal(false)
    }
    return (
        <>
            <div>
                <LayoutHeader pageTitle='Employees' />
                <div className='mb-3 w-full flex justify-end items-center'>
                    <Button className='site-button' onClick={handleOpenTagModal}>
                        <Plus />
                        Add Employees
                    </Button>
                </div>

                <DataTable
                    columns={SkillColumn(handleDeleteTaskTag, handleEditTaskTag)}
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

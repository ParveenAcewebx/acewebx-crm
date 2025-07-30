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

const Skills = () => {
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
            const response = await SkillApi.getAllSkill(page, length)
            if (response.status === 200) {
                setList(response?.data?.data)
                setTotalRecord(response?.data?.meta?.total)
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
                const res = await SkillApi.deleteSkill(deleteIndex)
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
            try {
                const response = await SkillApi.getByIdSkill(row?.original?.id)
                if (response.status === 200) {
                    setEditData(response.data.data)
                    fetchTagList()
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
    return (
        <>
            <div>
                <LayoutHeader pageTitle='Skills' />
                <div className='mb-3 w-full flex justify-end items-center'>
                    <Button className='site-button' onClick={handleOpenTagModal}>
                        <Plus />
                        Add Skills
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

export default Skills

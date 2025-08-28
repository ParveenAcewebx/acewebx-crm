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
import { SkillColumn } from './skill-column'
import SkillApi from '@/services/settings/SkillApi'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchSkill } from '@/components/form-validations/SearchValidation'
import { LengthData } from '@/components/constants/StaticData'
import useLocalStorage from 'use-local-storage'

const Skills = () => {
    const [getList, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalRecord, setTotalRecord] = useState()
    const [length, setLength] = useState(50)
    const [deleteOpenModal, setDeleteOpenModal] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)
    const [submitOpenModal, setSubmitOpenModal] = useState(false)
    const [editData, setEditData] = useState(null)
    const [skillSearchParam, setSkillSearchParam] = useLocalStorage("skillSearchParam", {
        length: '50'
    });
    const methods = useForm({
        defaultValues: {
            length: '10'
        }
    })

    // filter :--
    const form = useForm({
        // resolver: yupResolver(SearchSkill),
        mode: 'onChange', // or 'onBlur' or 'onChange'
    });
    const search = form.watch('search')

    // fetch group  list
    const fetchSkillsList = async (data) => {
        try {
            const response = await SkillApi.skillListFilters(data)
            if (response.status === 200) {
                setList(response?.data?.data?.skills)
                setTotalRecord(response?.data?.data?.pagination?.total)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }


    // delete row
    const onDelete = async () => {
        if (deleteIndex !== null) {
            try {
                const res = await SkillApi.deleteSkill(deleteIndex)
                setDeleteOpenModal(false)
                if (res?.status === 200) {
                    fetchSkillsList()
                    localStorage.removeItem("skills");

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
                    localStorage.removeItem("skills");
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




    const romoveOldParams = () => {
        const newData = {
            search: "",
            length: 50,
        }
        methods.setValue("length", "50")
        form.setValue("search", "")
        setSkillSearchParam(newData)
    }


    const handleSimpleFilter = () => {
        const newData = {
            search,
            page,
            length,
        }
        setPage(1)
        setSkillSearchParam(newData)
    }

    // old fileter code :--------
    useEffect(() => {
        const newData = {
            search: skillSearchParam?.search,
            length,
        }
        setSkillSearchParam(newData)
    }, [length])

    useEffect(() => {
        // for filters :-
        form.setValue("search", skillSearchParam?.search)

        // for length :-
        let { length } = skillSearchParam
        if (length) {
            setLength(length)
        }
        methods.setValue("length", String(length))

    }, [])


    useEffect(() => {
        const handler = setTimeout(() => {
            const newData = {
                search,
                page,
                length
            }

            fetchSkillsList(newData)
        }, 500)

        // cleanup to avoid multiple triggers
        return () => clearTimeout(handler)
    }, [skillSearchParam, page, length])



    return (
        <>
            <div>
                <LayoutHeader pageTitle='Skills' />

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
                        <Button className="cursor-pointer h-12 rounded-[4px] text-[#b82025] hover:text-[#fff] hover:bg-[#b82025] bg-transparent border border-[#b82025] text-[11px]"
                            onClick={romoveOldParams} >Clear serach</Button>
                        <Button className="cursor-pointer h-12 rounded-[4px] text-[#b82025] hover:text-[#fff] hover:bg-[#b82025] bg-transparent border border-[#b82025] text-[11px]" onClick={handleOpenTagModal}>
                            <Plus />
                            Add Skills
                        </Button>
                    </div>

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
                            fetchList={fetchSkillsList}
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
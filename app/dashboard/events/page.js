'use client'
import DialogBox from '@/components/modal/DialogBox'
import LayoutHeader from '@/components/layoutHeader'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import EventApi from '@/services/events/EventApi'
import { EventColumn } from './event-column'
import { useRouter } from 'next/navigation'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/constants/StaticData'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchEvent, SearchValidation } from '@/components/form-validations/SearchValidation'

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

    // filter :--
    const form = useForm({
        // resolver: yupResolver(SearchEvent),
        mode: 'onChange', // or 'onBlur' or 'onChange'
    });
    const search = form.watch('search')

    const router = useRouter()
    // fetch group list
    const fetchList = async () => {
        const data = {}
        try {
            const response = await EventApi.eventListFilters({
                ...data,
                search,
                page,
                length
            })
            if (response.status === 200) {
                setList(response?.data?.data?.events)
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
                const res = await EventApi.deleteEvent(deleteIndex)
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

    const handleDeleteEvent = row => {
        setDeleteOpenModal(true)
        setDeleteIndex(row?.original?.id)
    }
    const handleEditEvent = async (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/event/edit/${row?.original?.id}`)

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
        router.push('/dashboard/event/add')

    }
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


    return (
        <>
            <div>
                <LayoutHeader pageTitle='Events' />

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
                                <div>
                                    <FormInputField
                                        name="search"
                                        placeholder="Search by Title/Description"
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
                <div className='overflowX-auto pt-1'>

                    <DataTable
                        columns={EventColumn(handleDeleteEvent, handleEditEvent)}
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
            </div>
        </>
    )
}

export default EventList

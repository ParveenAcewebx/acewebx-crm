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
import SkillApi from '@/services/cadidateApis/settings/SkillApi'
import EventApi from '@/services/cadidateApis/events/EventApi'
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

    const router = useRouter()
    // fetch group tag list
    const fetchTagList = async () => {
        try {
            const response = await EventApi.getAllEvent(page, length)
            console.log("response",response)
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
        fetchTagList()
    }, [page, length])

    // delete row
    const onDelete = async () => {
        if (deleteIndex !== null) {
            try {
                const res = await EventApi.deleteEvent(deleteIndex)
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
            // router.push(`events/edit/${row?.original?.id}`)
            router.push(`/dashboard/events/edit/${row?.original?.id}`)

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
        router.push('/dashboard/events/add')
      
    }
    const submitHandleModalClose = () => {
        setSubmitOpenModal(false)
    }



  // filter :--
  const form = useForm({
    resolver: yupResolver(SearchEvent),
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
      const apiData = await EventApi.eventListFilters({
        ...data,
        search,
      })

      const candidates = apiData?.data?.data?.events || []
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
                <LayoutHeader pageTitle='Events' />
              
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
                  placeholder="Search by Title/Description"
                  form={form}
                  inputType="text"
                  className="colum-box-bg-change col-span-2"
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
                <DataTable
                    columns={EventColumn(handleDeleteTaskTag, handleEditTaskTag)}
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

'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import DcsModal from '@/components/modal/dscForm'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { LengthData } from '@/components/static-Values'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/components/utils/dateFormat'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import Candidate from '@/services/cadidateApis/CandidateApi'
import { GetFilterData } from '@/services/Leads/lead'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CandidColumns } from './candid-columns'

const AllCandidates = () => {
  useDocumentTitle('Leads')
  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal
  const [selectedDcsValue, setSelectedDcsValue] = useState(null) // Store DCS value for modal
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [viewFilesOpenModal, setViewFilesOpenModal] = useState(false)
  const [accordionValue, setAccordionValue] = useState(false)

  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [length, setLength] = useState(10)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [searchFilter, setSearchFilter] = useState(null)
  const [searchFormData, setSearchFormData] = useState(null)
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  const getListLeads = async () => {
    try {
      setLoading(true)
      const res = await Candidate.candidateList(page, length)
      if (res.data?.status == true) {
        setList(res?.data?.data)
        setTotalRecord(res?.data?.data?.pagination?.total)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearchWithFormData = async () => {
    const params = {
      page,
      length,
      contact_id: Number(searchFormData.contact_id) || '',
      company_id: Number(searchFormData.company_id) || '',
      engineer_id: Number(searchFormData.engineer_id) || '',
      lead_status_id: Number(searchFormData.lead_status_id) || '',
      project_id: Number(searchFormData.project_id) || '',
      sale_person_id: Number(searchFormData.sale_person_id) || '',
      dcs: searchFormData.dcs || '',
      tags: searchFormData.tags || '',
      from_date_record: formatDate(searchFormData.from_date_record || '') || '',
      to_date_record: formatDate(searchFormData.to_date_record || '') || '',
      from_due_date: formatDate(searchFormData.from_due_date || '') || '',
      to_due_date: formatDate(searchFormData.to_due_date || '') || ''
    }
    try {
      const res = await GetFilterData.getleads(params)
      if (res?.status === 200) {
        setSearchFilter(res?.data?.data)
        setTotalRecord(res?.data?.meta?.total)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (searchFormData) {
      handleSearchWithFormData()
    } else {
      getListLeads()
    }
  }, [page, length])

  // delete table row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await Candidate.romoveCandidate(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getListLeads()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }
  const handleDeleteCand = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditCand = row => {
    router.push(`/job-app-edit/${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handlePreviewCand = row => {
    router.push(`/dashboard/candidate-details/preview?id=${row?.original?.id}`)
  }
  const DCSOpenModal = row => {
    setSelectedDcsValue(row)
    setDcsModalOpen(true)
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

  // filter :--

  const name = methods.watch('name')
  const email = methods.watch('email')
  const currentSalary = methods.watch('currentSalary')

  const handleClearSearch = () => {
    methods.setValue('name', '')
    methods.setValue('email', '')
    methods.setValue('currentSalary', '')
    // if (pipelineStatus) {
    //   handlePipelineStatus(pipelineStatus)
    // }
  }

  const handlePipeLineFilter = async data => {
    try {
      const apiData = await Candidate.candidateListFilters({
        ...data,
        page,
        length,
        name,
        email,
        currentSalary
      })

      const candidates = apiData?.data?.data || []
      const paginationInfo = apiData?.data?.data?.pagination

      setList(candidates)
      setTotalRecord(paginationInfo?.total || 0)
      handleClearSearch()
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }
  console.log('getList', getList)
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Candidate List' />
      </div>
      {/* Filters */}
      <Accordion
        type='single'
        collapsible
        className='theme-bg-light-rgba mb-4 rounded px-4'
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger className='py-2 text-xl'>Filter</AccordionTrigger>
          <AccordionContent className='pt-4'>
            <div className='flex grid grid-cols-4 gap-4'>
              <FormProvider {...methods}>
                <FormInputField
                  name='name'
                  label='Full Name'
                  form={methods}
                  inputType='text'
                  className='colum-box-bg-change'
                />
                <FormInputField
                  name='email'
                  label='Email'
                  form={methods}
                  inputType='email'
                  className='colum-box-bg-change'
                />
                <FormInputField
                  name='currentSalary'
                  label='Current Salary (Monthly)'
                  form={methods}
                  inputType='number'
                  className='colum-box-bg-change'
                />
                <div className='mt-5 flex justify-end gap-4'>
                  <Button
                    type='Submit'
                    className='site-button-small bg-white'
                    onClick={() => handlePipeLineFilter()}
                  >
                    Search
                  </Button>
                  <Button
                    type='button'
                    className='site-button-small text-white'
                    onClick={handleClearSearch}
                  >
                    Clear
                  </Button>
                </div>
              </FormProvider>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <FormProvider {...methods}>
        <FormSelectField
          name='length'
          className='h-10 w-28'
          form={methods}
          options={LengthData}
        />
      </FormProvider>
      <DataTable
        data={getList?.candidates}
        loading={loading}
        columns={CandidColumns(
          handleDeleteCand,
          handleEditCand,
          handlePreviewCand,
          DCSOpenModal
        )}
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />

      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
      <DcsModal
        getListLeads={getListLeads}
        isOpen={dcsModalOpen}
        onClose={() => setDcsModalOpen(false)}
        dcsValue={selectedDcsValue}
      />
    </>
  )
}

export default AllCandidates

'use client'
import LayoutHeader from '@/components/layoutHeader'
import LeadSearchFilter from '@/components/LeadsModule/LeadSearchFilter'
import DialogBox from '@/components/modal/DialogBox'
import DcsModal from '@/components/modal/dscForm'
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
import LeadsServices, { GetFilterData } from '@/services/Leads/lead'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LeadsColumns } from './leads-columns'
import Candidate from '@/services/cadidateApis/CandidateApi'

const AllLeads = () => {
  useDocumentTitle('Leads')
  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal
  const [selectedDcsValue, setSelectedDcsValue] = useState(null) // Store DCS value for modal
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [viewFilesOpenModal, setViewFilesOpenModal] = useState(false)

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
      const res = await Candidate.candidateList(page, length);
        console.log("res", res)
      if (res?.status === 200) {
        setList(res?.data?.data)
        setTotalRecord(res?.data?.meta?.total)
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
        const res = await LeadsServices.deleteLead(deleteIndex)
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
  const handleDeleteLeads = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }
  // edit table row
  const handleEditLeads = row => {
    router.push(`/dashboard/leads/edit?id=${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handlePreviewLeads = row => {
    router.push(`/dashboard/leads/preview?id=${row?.original?.id}`)
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

  console.log("getList", getList)
  return (
    <>
  

      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Candidate List' />
    
      </div>
      <FormProvider {...methods}>
        <FormSelectField
          name='length'
          className='h-10 w-28'
          form={methods}
          options={LengthData}
        />
      </FormProvider>

      <DataTable
        data={getList.candidates}
        loading={loading}
        columns={LeadsColumns(
          handleDeleteLeads,
          handleEditLeads,
          handlePreviewLeads,
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

export default AllLeads

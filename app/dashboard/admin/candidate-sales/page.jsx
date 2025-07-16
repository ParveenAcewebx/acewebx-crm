'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import DcsModal from '@/components/modal/dscForm'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import SalesCandidate from '@/services/cadidateApis/SalesCandidateApi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SalesCandidColumns } from './sales-candid-columns'
import { LengthData } from '@/components/constants/StaticData'

const AllSalesCandidates = () => {
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
      const res = await SalesCandidate.salesCandidateList(page, length)
      console.log('res', res)
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

  useEffect(() => {
    if (searchFormData) {
      handleClearSearch()
    } else {
      getListLeads()
    }
  }, [page, length])

  // delete table row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await SalesCandidate.romoveSalesCandidate(deleteIndex)
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
    router.push(`/dashboard/admin/sales-walk-in/${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handlePreviewCand = row => {
    // router.push(`/dashboard/candidate-details/preview?id=${row?.original?.id}`)
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

  const search = methods.watch('search')
  const maxSalary = methods.watch('maxSalary')
  const minSalary = methods.watch('minSalary')

  const handleClearSearch = () => {
    methods.setValue('search', '')
    methods.setValue('maxSalary', '')
    methods.setValue('minSalary', '')
    getListLeads()
  }

  const handlePipeLineFilter = async data => {
    try {
      const apiData = await SalesCandidate.candidateListFilters({
        ...data,
        search,
        maxSalary,
        minSalary
      })
      const candidates = apiData?.data?.data || []
      const paginationInfo = apiData?.data?.data?.pagination
      setList(candidates)
      setTotalRecord(paginationInfo?.total || 0)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const handleSendWalkInForm = async row => {
    try {
      const sendEmailLin = await SalesCandidate.sendSalesWalkInLink(
        row.original.id
      )

      if (sendEmailLin?.data?.status == true) {
        successMessage({
          description: 'Link sent successfully to the mail.'
        })
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: 'Something Went Wrong!'
      })
    }
  }
  console.log('getList', getList)
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Sales Candidate List' />
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
                  name='search'
                  label='Email/Name/Phone'
                  form={methods}
                  inputType='text'
                  className='colum-box-bg-change'
                />
                <FormInputField
                  name='minSalary'
                  label='Min Salary'
                  form={methods}
                  inputType='number'
                  className='colum-box-bg-change'
                />
                <FormInputField
                  name='maxSalary'
                  label='Max Salary'
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
        columns={SalesCandidColumns(
          handleDeleteCand,
          handleEditCand,
          handlePreviewCand,
          handleSendWalkInForm
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
      {/* <DcsModal
        getListLeads={getListLeads}
        isOpen={dcsModalOpen}
        onClose={() => setDcsModalOpen(false)}
        dcsValue={selectedDcsValue}
      /> */}
    </>
  )
}

export default AllSalesCandidates

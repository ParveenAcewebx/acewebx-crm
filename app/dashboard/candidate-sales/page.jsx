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
import AddvanceFilterDeveloper from '@/components/modal/AddvanceFilterDeveloper'
import { Search } from 'lucide-react'

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  const getListLeads = async () => {
    try {

      const newData = {
        page, 
        length,
        startDate,
        endDate,
        minSalary,
        maxSalary,
      }
      setLoading(true)
      const res = await SalesCandidate.salesCandidateList(newData)
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
    router.push(`/dashboard/sales-walk-in/${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handlePreviewCand = row => {
    router.push(`/dashboard/sales-candidate-details?id=${row?.original?.id}`)
  }
  const AddvanceOpenModal = row => {
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
        search
      
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

//Addvance search :-
const handleAddvanceSearch = async data => {
  const newData= {
    startDate : data.dob.startDate,
    endDate : data.dob.endDate,
    minSalary : data.salary[0],
    maxSalary:data.salary[1],
    search:search
  }
  setStartDate(newData.startDate)
  setEndDate(newData.endDate)
  setMinSalary(newData.minSalary)
  setMaxSalary(newData.maxSalary)
  try {
    const response = await SalesCandidate.candidateSaleListAddvanceFilters(newData)
    if (response?.status === 200) {
      successMessage({ description: response?.data?.message })
      setDcsModalOpen(false)
      const candidates = response?.data?.data || []
      const paginationInfo = response?.data?.data?.pagination

      setList(candidates)
      setTotalRecord(paginationInfo?.total || 0)    }
  } catch (error) {
    console.log('error', error)
    
  }
}
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Sales Candidate List' />
      </div>
         {/* Filters */}
 
         <div className='flex justify-between items-center'>
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
        <div className='flex justify-between items-center gap-4'>
          <FormProvider {...methods}>
            {/* Input Field */}
            <div>
              <FormInputField
                name="search"
                placeholder="Email/Name/Phone"
                form={methods}
                inputType="text"
                className="colum-box-bg-change col-span-2"
              />
            </div>
            <div>
              {/* Search Button */}
              <Search
                type="submit"
                className="cursor-pointer"
                onClick={() => handlePipeLineFilter()}
              />
            </div>

          </FormProvider>
          {/* <Button
            type="submit"
            className="site-button-small bg-white ml-2"
            onClick={() => AddvanceOpenModal()}
          > */}
            <p onClick={() => AddvanceOpenModal()} className='cursor-pointer text-red-400 hover:text-red-500'>Advance Search</p>
          {/* </Button> */}
        </div>

      </div>
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
    <AddvanceFilterDeveloper
        getListLeads={getListLeads}
        isOpen={dcsModalOpen}
        onClose={() => setDcsModalOpen(false)}
        dcsValue={selectedDcsValue}
        handleAddvanceSearch={handleAddvanceSearch}
      />
    </>
  )
}

export default AllSalesCandidates

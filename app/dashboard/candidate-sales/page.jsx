'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SalesCandidColumns } from './sales-candid-columns'
import { LengthData } from '@/components/constants/StaticData'
import AddvanceFilterDeveloper from '@/components/modal/AddvanceFilterDeveloper'
import { Search } from 'lucide-react'
import { SearchValidation } from '@/components/form-validations/SearchValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import SalesCandidate from '@/services/salesCandidates/SalesCandidateApi'

const AllSalesCandidates = () => {
  useDocumentTitle('Sales Candidate')
  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal
  const [selectedDcsValue, setSelectedDcsValue] = useState(null) // Store DCS value for modal
  const router = useRouter()
  const [getList, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalRecord, setTotalRecord] = useState()
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [length, setLength] = useState(10)
  const [searchFormData, setSearchFormData] = useState(null)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [preferredShift, setPreferredShift] = useState("");
  const [skill, setSkill] = useState("");
  const [minExperience, setMinExperience] = useState('');
  const [maxExperience, setMaxExperience] = useState('');
  const [connectStartDate, setConnectStartDate] = useState('');
  const [connectEndDate, setConnectEndDate] = useState('');
  const [skillsData, setSkillsData] = useState([])

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  // filter :--
  const form = useForm({
    // resolver: yupResolver(SearchValidation),
    mode: 'onChange',
  });
  const search = form.watch('search')

  //  get all sales candidates :-
  const getListSales = async () => {
    try {

      const newData = {
        page,
        length,
        startDate,
        endDate,
        minSalary,
        maxSalary,
        minExperience,
        maxExperience,
        preferredShift,
        connectStartDate,
        connectEndDate,
        skill,
        search
      }
      setLoading(true)
      const res = await SalesCandidate.salesCandidateList(newData)
      if (res.data?.status == true) {
        setList(res?.data?.data)
        setTotalRecord(res?.data?.data?.pagination?.total)
      }
    } catch (error) {
      console.log("error",error)
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
      getListSales()
    }
  }, [page, length])

  // delete table row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await SalesCandidate.romoveSalesCandidate(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getListSales()
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
    router.push(`/dashboard/sales-candidate/${row?.original?.id}/detail`)
  }

  const handleEdit = row => {
    router.push(`/dashboard/sales-candidate/${row?.original?.id}/edit`)
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



  const handleClearSearch = () => {
    form.setValue('search', '')

    getListSales()
  }

  const handleSimpleFilter = () => {
    setPage(1)
    getListSales()
  }

  // send form by email link :-
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
    setPage(1)
    const newData = {
      startDate: moment(data?.dob?.startDate).format('YYYY-MM-DD'),
      endDate: moment(data?.dob?.endDate).format('YYYY-MM-DD'),
      minSalary: data?.salary[0],
      maxSalary: data?.salary[1],
      search: search,
      minExperience: data?.totalExperience[0],
      maxExperience: data?.totalExperience[1],
      preferredShift: data?.preferredShift,
      connectStartDate: data?.lastContected?.startDate
        ? moment(data.lastContected.startDate).format('YYYY-MM-DD')
        : "",
      connectEndDate: data?.lastContected?.endDate
        ? moment(data.lastContected.endDate).format('YYYY-MM-DD')
        : "",
      skill: data?.skill,
      page,
      length
    }
    setConnectStartDate(newData.connectStartDate)
    setConnectEndDate(newData.connectEndDate)
    setMinExperience(newData.minExperience)
    setMaxExperience(newData.maxExperience)
    setStartDate(newData.startDate)
    setEndDate(newData.endDate)
    setMinSalary(newData.minSalary)
    setMaxSalary(newData.maxSalary)
    setPreferredShift(newData.preferredShift)
    setSkill(newData.skill)
    try {
      const response = await SalesCandidate.candidateSaleListAddvanceFilters(newData)
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        setDcsModalOpen(false)
        const candidates = response?.data?.data || []
        const paginationInfo = response?.data?.data?.pagination

        setList(candidates)
        setTotalRecord(paginationInfo?.total || 0)
      }
    } catch (error) {
      console.log('error', error)

    }
  }

  const handleDownloadCSV = async () => {
    const newData = {
      startDate,
      endDate,
      minSalary,
      maxSalary,
      minExperience,
      maxExperience,
      preferredShift,
      connectStartDate,
      connectEndDate,
      skill,
    };

    try {
      const response = await SalesCandidate.salesCandidateCSVList(newData, {
        responseType: 'blob', // ✅ Correct response type for CSV
      });

      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'filtered_users.csv';
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };



  useEffect(() => {
    // This code runs only on the client side
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData = localStorage.getItem("globalSettings");
      const skillDataOption = JSON.parse(storedData)
      if (skillDataOption?.skills) {
        const candidateOptions = skillDataOption?.skills?.salesCandidate?.map((item) => ({
          label: item,
          value: item?.toLowerCase(), // assuming you meant to use lowercase
        }));
        setSkillsData(candidateOptions);

      }
    }
  }, []);

  return (
    <>
      <div className=''>
        <LayoutHeader pageTitle='Sales Candidate List' />
      </div>

      {/* Filters */}
      {/* Toolbar Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Left: Length Selector */}
        <div>
          <FormProvider {...methods}>
            <FormSelectField
              name="length"
              className="h-12 w-28 btn-secondary"
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
                searchError="searchError"
                className="searchSizeChange"
              />
              <Search
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handleSimpleFilter}
              />
            </div>

            {/* Advance Search */}
            <Button
              onClick={() => AddvanceOpenModal()}
              className="cursor-pointer h-12 rounded-[4px] text-[#b82025] hover:text-[#fff] hover:bg-[#b82025] bg-transparent border border-[#b82025] text-[11px]"

            >
              Advance Search
            </Button>

            {/* Export Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleDownloadCSV}
                  className="cursor-pointer h-12 rounded-[4px] text-[#231f20] hover:text-[#fff] hover:bg-[#231f20] bg-transparent border border-[#231f20] flex gap-2 text-[11px]"
                >
                  {/* <Import /> */} Export
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-auto rounded-sm bg-[#b82025] text-sm">
                Download CSV
              </TooltipContent>
            </Tooltip>
          </div>
        </FormProvider>
      </div>

      {/* Table Section - starts clearly below */}
      <div className='overflowX-auto'>
        <DataTable
          data={getList?.candidates}
          loading={loading}
          columns={SalesCandidColumns(
            handleDeleteCand,
            handleEditCand,
            handlePreviewCand,
            handleSendWalkInForm,
            handleEdit
          )}
          totalRecord={totalRecord}
          page={page}
          setPage={setPage}
          length={length}
        />
      </div>




      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />
      <AddvanceFilterDeveloper
        isOpen={dcsModalOpen}
        CandidateType="candidateSales"
        skillsData={skillsData}
        onClose={() => setDcsModalOpen(false)}
        handleAddvanceSearch={handleAddvanceSearch}
      />
    </>
  )
}

export default AllSalesCandidates
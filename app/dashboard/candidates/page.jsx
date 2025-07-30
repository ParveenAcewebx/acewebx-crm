'use client'
import LayoutHeader from '@/components/layoutHeader'
import DialogBox from '@/components/modal/DialogBox'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import Candidate from '@/services/cadidateApis/CandidateApi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CandidColumns } from './candid-columns'
import { LengthData } from '@/components/constants/StaticData'
import AddvanceFilterDeveloper from '@/components/modal/AddvanceFilterDeveloper'
import { Import, Search } from 'lucide-react'
import { SearchValidation } from '@/components/form-validations/SearchValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import moment from 'moment'

const AllCandidates = () => {
  useDocumentTitle('Dev Candidate')
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [skill, setSkill] = useState("");
  const [getList, setList] = useState([])
  const [length, setLength] = useState(10)
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true)
  const [maxSalary, setMaxSalary] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [startDate, setStartDate] = useState('');
  const [totalRecord, setTotalRecord] = useState()
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [minExperience, setMinExperience] = useState('');
  const [maxExperience, setMaxExperience] = useState('');
  const [dcsModalOpen, setDcsModalOpen] = useState(false) // State for DCS modal
  const [preferredShift, setPreferredShift] = useState("");
  const [searchFormData, setSearchFormData] = useState(null)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [selectedDcsValue, setSelectedDcsValue] = useState(null) // Store DCS value for modal
  const [connectStartDate, setConnectStartDate] = useState('');
  const [connectEndDate, setConnectEndDate] = useState('');

  const methods = useForm({
    defaultValues: {
      length: '10'
    }
  })

  // get all candidate list :-
  const getListCadidate = async () => {
    try {
      const newData = {
        page,
        length,
        startDate,
        endDate,
        minSalary,
        maxSalary,
        preferredShift,
        minExperience,
        maxExperience,
        connectStartDate,
        connectEndDate,
        skill
      }
      setLoading(true)
      const res = await Candidate.candidateList(newData)
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
      getListCadidate()
    }
  }, [page, length])

  // delete table row
  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await Candidate.romoveCandidate(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getListCadidate()
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
    router.push(`/dashboard/walk-in/${row.original.id}`)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handlePreviewCand = row => {
    router.push(`/dashboard/candidate/${row?.original?.id}/detail`)
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
  const form = useForm({
    resolver: yupResolver(SearchValidation),
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
      const apiData = await Candidate.candidateListFilters({
        ...data,
        search,
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
      const sendEmailLin = await Candidate.sendWalkInLink(row.original.id)

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
    const newData = {
      startDate: moment(data?.dob?.startDate).format('YYYY-MM-DD'),
      endDate: moment(data?.dob?.endDate).format('YYYY-MM-DD'),
      minSalary: data?.salary[0],
      maxSalary: data?.salary[1],
      search: search,
      minExperience: data?.totalExperience[0],
      maxExperience: data?.totalExperience[1],
      connectStartDate: data?.lastContected?.startDate
        ? moment(data.lastContected.startDate).format('YYYY-MM-DD')
        : "",
      connectEndDate: data?.lastContected?.endDate
        ? moment(data.lastContected.endDate).format('YYYY-MM-DD')
        : "",
      skill: data?.skill,
      preferredShift : data?.preferredShift
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
      const response = await Candidate.candidateListAddvanceFilters(newData)
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
      preferredShift,
      minExperience,
      maxExperience,
      connectStartDate,
      connectEndDate,
      skill
    }

    try {
      const response = await Candidate.candidateCSVList(newData, {
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
  }


  const [skillsData, setSkillsData] = useState([])

  
 useEffect(() => {

    // This code runs only on the client side
    if (typeof window !== "undefined" && window.localStorage) {
      const storedData = localStorage.getItem("candidates");
      if (storedData) {
        const candidateData = JSON.parse(storedData); // Parse if storing JSON
        const candidateOptions = candidateData?.candidate
        ?.map((item) => ({
          label: item,
          value: item?.toLowerCase(), // assuming you meant to use lowercase
        }));
        console.log("candidateData",)
        setSkillsData(candidateOptions);
  
      }
    }
  }, []);

  return (
    <>
      <div className=''>
        <LayoutHeader pageTitle='Developers List' />
      </div>
      {/* Filters */}
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
                  placeholder="Email/Name/Phone"
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
              <div className='flex advanceSearchOuter'>
                <p
                  onClick={() => AddvanceOpenModal()}
                  className="cursor-pointer text-red-400 hover:text-red-500 "
                >
                  Advance Search
                </p>
                <Tooltip>
                  <TooltipTrigger>
                    <p
                      onClick={handleDownloadCSV}
                      className="cursor-pointer text-red-400 hover:text-red-500 text-center flex gap-2 "
                    >
                      <Import />
                    </p>
                    <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>Download CSV</TooltipContent>

                  </TooltipTrigger>

                </Tooltip>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>

      <DataTable
        data={getList?.candidates}
        loading={loading}
        columns={CandidColumns(
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
        isOpen={dcsModalOpen}
        CandidateType="candidate"
        skillsData={skillsData}
        onClose={() => setDcsModalOpen(false)}
        handleAddvanceSearch={handleAddvanceSearch}
      />
    </>
  )
}

export default AllCandidates

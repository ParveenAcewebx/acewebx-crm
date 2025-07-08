'use client'
import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import Candidate from '@/components/services/CandidateApi'
import { columns } from './CandidateColumns'
import { useRouter } from 'next/navigation'
import FormInput from '@/components/FormInput'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
// import { useSession } from 'next-auth/react'
import AddvanceCandiateFilter from '@/components/filters/AddvanceCandiateFilter'
import { SearchIcon } from 'lucide-react'
import Loader from '@/components/Loader'
// import SearchIcon from '@mui/icons-material/Search';

export default function DataTable() {
  const [candidateData, setCandiDateData] = React.useState([])
  const [rowCount, setRowCount] = React.useState(0)
  const [loader, setLoader] = React.useState(false)

  const [openFilter, setOpenFilter] = React.useState(false)

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10
  })

  const router = useRouter()
  const form = useForm()
  // const session = useSession()

  const fetchCandidateList = async (page = 0, pageSize = 10) => {
    setLoader(true)
    try {
      const apiData = await Candidate.candidateList({ page: page + 1, limit: pageSize })
      const candidates = apiData?.data?.data?.candidates || []
      const paginationInfo = apiData?.data?.data?.pagination

      setCandiDateData(candidates)
      setRowCount(paginationInfo?.total || 0)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.error('Fetch error:', error)
    }
  }

  React.useEffect(() => {
    fetchCandidateList(paginationModel.page, paginationModel.pageSize)
  }, [paginationModel.page, paginationModel.pageSize])

  const handleView = row => router.push(`/candidates/view/${row?.id}`)

  const handleEdit = () => alert('Edit clicked')
  const handleRemove = () => alert('Delete clicked')

  const onSubmit = async data => {
    setLoader(true)
    try {
      const apiData = await Candidate.candidateListFilters({
        ...data,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize
      })
      const candidates = apiData?.data?.data?.candidates || []
      const paginationInfo = apiData?.data?.data?.pagination

      setCandiDateData(candidates)
      setRowCount(paginationInfo?.total || 0)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.error('Fetch error:', error)
    }
  }

  const formm = useForm({
    defaultValues: {
      minSalary: '',
      maxSalary: '',
      preferredShift: '',
      startDate: '',
      endDate: '',
      Skill: ''
    }
  })

  //advance filter:-

  const handleClickFilteOpen = () => {
    setOpenFilter(true)
  }

  const handleFilteClose = () => {
    setOpenFilter(false)
  }

  // addvance filter search handler:)
  const handleFilters = async data => {
    setLoader(true)
    try {
      const apiData = await Candidate.candidateListAddvanceFilters({
        ...data,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize
      })

      const candidates = apiData?.data?.data?.candidates || []
      const paginationInfo = apiData?.data?.data?.pagination

      setCandiDateData(candidates)
      setRowCount(paginationInfo?.total || 0)
      formm.reset()

      setOpenFilter(false)
      setLoader(false)
    } catch (error) {
      setLoader(false)

      console.error('Fetch error:', error)
    }
  }
  return (
    <>
      {/* Header Section */}
      <div className='flex justify-between items-center bg-white px-6 py-4 rounded-t-xl shadow-sm mb-4'>
        <h2 className='text-2xl font-semibold text-[#8c57ff]'>Candidate List</h2>

        <Button
          variant='contained'
          startIcon={<SearchIcon />}
          onClick={handleClickFilteOpen}
          className='!bg-gradient-to-r !from-[#8C57FF] !to-[#b580ff] !text-white !px-6 !py-2 !rounded-xl shadow-md hover:!from-[#7945e6] hover:!to-[#9b63ff] transition-all text-sm md:text-base'
        >
          Advance Search
        </Button>
      </div>

      {/* Filter Form Section */}
      <div className='bg-white  py-5 px-5 '>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <FormInput name='name' label='Name' control={form.control} errors={form.errors} inputType='text' />
            <FormInput
              name='currentSalary'
              label='Current Salary'
              control={form.control}
              errors={form.errors}
              inputType='text'
            />
            <FormInput name='email' label='Email' control={form.control} errors={form.errors} inputType='email' />
            <Button
              type='submit'
              variant='contained'
              className='!bg-[#8C57FF] !text-white !w-full !rounded-md hover:!bg-[#7945e6] transition-all'
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      {/* Data Grid */}

      <Paper sx={{ height: '75%', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
        {loader ? (
          <div className='mt-36 px-96'>
            <Loader />
          </div>
        ) : (
          <DataGrid
            rows={candidateData}
            columns={columns(handleView, handleEdit, handleRemove)}
            rowCount={rowCount}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            paginationMode='server'
            sx={{
              border: 0,
              backgroundColor: '#f9fafb',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f1f5f9',
                fontWeight: 600
              }
            }}
          />
        )}
      </Paper>

      {/* Advance Filter Dialog */}
      <AddvanceCandiateFilter
        onSubmit={handleFilters}
        handleClickOpen={handleClickFilteOpen}
        handleClose={handleFilteClose}
        form={formm}
        open={openFilter}
      />
    </>
  )
}

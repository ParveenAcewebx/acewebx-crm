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
import { useSession } from 'next-auth/react'
import AddvanceCandiateFilter from '@/components/filters/AddvanceCandiateFilter'

export default function DataTable() {
  const [candidateData, setCandiDateData] = React.useState([])
  const [rowCount, setRowCount] = React.useState(0)
 
  const [openFilter, setOpenFilter] = React.useState(false)

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10
  })

  const router = useRouter()
  const form = useForm()
  const session = useSession()

  const fetchCandidateList = async (page = 0, pageSize = 10) => {
    try {
      const apiData = await Candidate.candidateList({ page: page + 1, limit: pageSize })
      const candidates = apiData?.data?.data?.candidates || []
      const paginationInfo = apiData?.data?.data?.pagination

      setCandiDateData(candidates)
      setRowCount(paginationInfo?.total || 0)
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }
  return (
    <>
      {' '}
      <div>
        <Button onClick={handleClickFilteOpen}>Addvance Search</Button>
      </div>
      <div>
        <form encType='multipart/form-data' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-4 md:grid-cols-4 gap-6 mb-8'>
            <FormInput name='name' label='Name' control={form.control} errors={form.errors} inputType='text' />
            {/* <FormInputSelect
              name='designationApplyingFor'
              label='Skill'
              control={form.control}
              errors={form.errors}
              options={designationOptions}
            /> */}
            <FormInput
              name='currentSalary'
              label='Current Salary'
              control={form.control}
              errors={form.errors}
              inputType='text'
            />
            <FormInput name='email' label='Email' control={form.control} errors={form.errors} inputType='email' />
            <Button type='submit' variant='contained' className='!text-white bg-[#8C57FF]'>
              Submit
            </Button>
          </div>
        </form>
      </div>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={candidateData}
          columns={columns(handleView, handleEdit, handleRemove)}
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          paginationMode='server'
          sx={{ border: 0 }}
        />
      </Paper>
   
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

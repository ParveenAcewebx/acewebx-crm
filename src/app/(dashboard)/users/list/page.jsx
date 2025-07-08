'use client'
import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/navigation'
import FormInput from '@/components/FormInput'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import Loader from '@/components/Loader'
import { UsersColumns } from './UsersColumns'
import UsersApi from '@/components/services/UsersApi'
import { errorMsg, successMsg } from '@/components/toaster/Toaster'
import TitleForPage from '@/components/TitleForPage'

export default function DataTable() {
  const [candidateData, setCandiDateData] = React.useState([])
  const [rowCount, setRowCount] = React.useState(0)
  const [loader, setLoader] = React.useState(false)
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10
  })

  const router = useRouter()
  const form = useForm()

  const fetchCandidateList = async (page = 0, pageSize = 10) => {
    setLoader(true)
    try {
      const apiData = await UsersApi.getAllUsers({ page: page + 1, limit: pageSize })
      const users = apiData?.data?.data.users || []
      const paginationInfo = apiData?.data?.data

      setCandiDateData(users)
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

  const handleView = row => router.push(`/users/view/${row?.id}`)

  const handleEdit = row => {
    router.push(`/users/edit/${row?.id}`)
  }
  const handleRemove = async row => {
    try {
      const removeUser = await UsersApi.deleteUser(row?.id)
      if (removeUser.status) {
        fetchCandidateList(paginationModel.page, paginationModel.pageSize)
        successMsg('User Delete successfully!')
      }
    } catch (error) {
      errorMsg(error?.message || 'Something went wrong!')
      console.log('error', error)
    }
  }

  const onSubmit = async data => {
    setLoader(true)
    try {
      const apiData = await UsersApi.getUsersByFilter({
        ...data,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize
      })
      const users = apiData?.data?.data?.users || []
      const paginationInfo = apiData?.data?.data?.pagination

      setCandiDateData(users)
      setRowCount(paginationInfo?.total || 0)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.error('Fetch error:', error)
    }
  }

  return (
    <>
      {/* Header Section */}
      <TitleForPage title='User List' />
      {/* Filter Form Section */}
      {/* <div className='bg-white  py-5 '>
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
      </div> */}

      {/* Data Grid */}

      <Paper sx={{ height: '75%', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
        {loader ? (
          <div className='mt-36 px-96'>
            <Loader />
          </div>
        ) : (
          <DataGrid
            rows={candidateData}
            columns={UsersColumns({ handleView, handleEdit, handleRemove })}
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
    </>
  )
}

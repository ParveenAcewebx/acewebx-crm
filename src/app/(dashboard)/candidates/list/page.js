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




export default function DataTable() {
  const [candidateData, setCandiDateData] = React.useState([])
  const [pagination,setPagination]= React.useState({})
  const router = useRouter()



  const form = useForm()
  const fetchCandidateList = async () => {
    try {
      const apiData = await Candidate.candidateList()
      console.log('apiData', apiData?.data?.data)
      setCandiDateData(apiData?.data?.data?.candidates)
      const data=  apiData?.data?.data?.pagination
      const paginationModel = { page: data?.totalPages, pageSize:data?.limit }
      setPagination(paginationModel)
    } catch (error) {
      console.log('error', error)
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchCandidateList()
    }

    fetchData()
  }, [])

  const handleView = row => {
    router.push(`/candidates/view/${row?.id}`)
  }
  const session = useSession()
  console.log('session', session)
  const handleEdit = () => {
    alert('kkkkkkkk')

    console.log('Testing:------Edit')
  }

  const handleRemove = () => {
    alert('kkkkkkkk')
    console.log('Testing:------Delete')
  }
  const searchByNameValue = form.watch('searchByName')
  console.log('searchByNameValue', searchByNameValue)
  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      {/* <div className='mb-8'>
        <FormInput inputType='text' label='Search by Name' name='searchByName' control={form.control} />
        <Button>Search</Button>
      </div> */}
      <DataGrid
        rows={candidateData}
        columns={columns(handleView, handleEdit, handleRemove)}
        initialState={{ pagination: { pagination } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  )
}

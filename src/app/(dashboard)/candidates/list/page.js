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

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
]

const paginationModel = { page: 0, pageSize: 5 }

export default function DataTable() {
  const [candidateData, setCandiDateData] = React.useState([])
  const router = useRouter()

  const form = useForm()
  const fetchCandidateList = async () => {
    try {
      const apiData = await Candidate.candidateList()
      console.log('apiData', apiData?.data)
      setCandiDateData(apiData?.data?.candidates)
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
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  )
}

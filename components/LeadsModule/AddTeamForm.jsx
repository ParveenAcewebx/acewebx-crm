
import LeadsServices from '@/services/Leads/lead'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import useDocumentTitle from '../utils/useDocumentTitle'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

const AddTeamForm = ({ id, fetchTeamMembers,handleCloseDialog }) => {
  useDocumentTitle('Add Team Member')
  const form = useForm()
  const [userData, setUserData] = useState([])
  const fetchLeadsById = async () => {
    try {
      const response = await LeadsServices.getleadById(id)
      if (response?.status === 200) {
        const leadData = response.data.data
        // Pre-fill form values
        const formattedData = {
          members:
            leadData?.leadTeamMembers?.map(item => String(item?.user_id)) || []
        }
        form.reset(formattedData)
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  useEffect(() => {
    fetchLeadsById()
  }, [id])

  // get all internal user data
  const getUserData = async () => {
    try {
      const response = await api.get(`/users?type=internal`)
      if (response.status === 200) {
        setUserData(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }
  useEffect(() => {
    getUserData()
  }, [])

  
  const router = useRouter()
  const handleTeamSubmit = async data => {
    try {
      // Submit to API
      const response = await api.put(`update-lead-team-member/${id}`, data)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        if (id) {
          router.push(`/dashboard/leads/edit?id=${id}`)
        } else {
          router.push('/dashboard/leads/add')
        }
        form.reset()
        handleCloseDialog(false)
        fetchTeamMembers()
      }
    } catch (error) {
      console.error('Lead submission error:', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }
  return (
    <>
      <div className='text-center !text-xl font-semibold'>Add Team Member</div>
      <FormProvider {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(handleTeamSubmit)()
          }}
        >
          <div className='mt-5'>
            <FormMultiSelectField
              form={form}
              placeholder='Select Team Member'
              name='members'
              label='Team Member'
              options={
                userData.length > 0
                  ? userData.map(data => ({
                      label: data.name,
                      value: String(data.id)
                    }))
                  : []
              }
            />
          </div>

          <div className='mt-4 flex justify-end'>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddTeamForm

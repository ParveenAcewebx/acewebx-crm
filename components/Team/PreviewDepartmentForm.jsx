'use client'
import LeadsServices from '@/services/Leads/lead'
import { useEffect, useState } from 'react'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import { errorMessage } from '../ToasterMessage'
import api from '@/lib/api'

export default function PreviewDepartmentForm({ form, editData }) {
  const [userData, setUserData] = useState([])

  const fetchLeadsById = async () => {
    try {
      const response = await LeadsServices.getleadById(editData)
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
  }, [editData])

  const getUserData = async () => {
 if(editData){
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
  }
  useEffect(() => {
    getUserData()
  }, [editData])

  return (
    <div className='mt-4 grid grid-cols-1 gap-4'>
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
  )
}

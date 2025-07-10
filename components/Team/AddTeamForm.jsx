'use client'
import api from '@/lib/api'
import { useEffect, useState } from 'react'
import FormInputField from '../share/form/FormInputField'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import FormSelectField from '../share/form/FormSelect'
import { DepartmentStatus } from '../static-Values'
import { errorMessage } from '../ToasterMessage'

export default function AddTeamForm({ form, editData }) {
  const [userData, setUserData] = useState([])

  // get all company data
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

  return (
    <>
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <FormInputField
          name='name'
          className=''
          label='Name'
          placeholder='Enter Name'
        />
        <FormMultiSelectField
          name='contact'
          className=''
          label='Users'
          placeholder='Select Users'
          options={
            userData.length > 0
              ? userData
                  .filter(data => data.status === 'active') // show only active users
                  .map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
              : []
          }
        />

        <FormSelectField
          name='status'
          className=''
          form={form}
          label='Status'
          placeholder='Select Status'
          options={DepartmentStatus}
        />
      </div>
    </>
  )
}

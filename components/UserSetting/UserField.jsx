'use client'

import api from '@/lib/api'
import { useEffect, useState } from 'react'
import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'

const UserField = ({ form, editData }) => {
  const [role, setRole] = useState([])
  const [department, setDepartment] = useState([])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [roleRes, departmentRes] = await Promise.all([
          api.get(`/roles`),
          api.get('/departments')
        ])

        if (roleRes.status === 200) {
          setRole(
            roleRes.data.data.map(item => ({
              label: item.name,
              value: String(item.id)
            }))
          )
        }

        if (departmentRes.status === 200) {
          setDepartment(
            departmentRes.data.data.data
            .filter(data => data.status === 'active') // show only active data
            .map(item => ({
              label: item.name,
              value: String(item.id)
            }))
          )
        }
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }

    fetchAllData()
  }, [])

  // Set default values once options & editData are ready
  useEffect(() => {
    if (editData && department.length > 0 && role.length > 0) {
      form.reset({
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        password: editData.password,
        password_confirmation: editData.password_confirmation,
        address: editData.address,
        role_id: String(editData.role_id),
        userType: editData.userType,
        status: editData.status,

        department_id: String(editData?.departments?.id)
      })
    }
  }, [editData, department, role])

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <FormInputField
        form={form}
        name='name'
        label='Name'
        placeholder='Enter Name'
      />
      <FormInputField
        form={form}
        name='email'
        label='Email'
        placeholder='Enter Email'
        type='email'
      />
      <FormInputField
        form={form}
        name='phone'
        label='Phone'
        placeholder='Enter Phone'
      />
          <FormInputField
        form={form}
        name='address'
        label='Address'
        placeholder='Enter Address'
      />
      <FormInputField
        form={form}
        name='password'
        label='Password'
        placeholder='Enter Password'
      />
      <FormInputField
        form={form}
        name='password_confirmation'
        label='Confirmation Password'
        placeholder='Confirmation Password'
      />
  
      <FormSelectField
        form={form}
        name='role_id'
        label='Role'
        placeholder='Select Role'
        options={role}
      />
      <FormSelectField
        form={form}
        name='status'
        label='Status'
        placeholder='Select Status'
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ]}
      />
      <FormSelectField
        form={form}
        name='department_id'
        label='Department'
        placeholder='Select Department'
        options={department}
      />
      <FormSelectField
        form={form}
        name='userType'
        label='User Type'
        placeholder='Select User Type'
        options={[
          { label: 'External', value: 'external' },
          { label: 'Internal', value: 'internal' },
        ]}
      />
      <FileUpload label='File Upload' form={form} name='avatar' />
    </div>
  )
}

export default UserField

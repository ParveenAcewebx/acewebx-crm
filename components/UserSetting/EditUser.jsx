'use client'

import { UserValidation } from '@/components/form-validations/userValidation'
import { Button } from '@/components/ui/button'
import UserField from '@/components/UserSetting/UserField'
import UserServices from '@/services/Settings/UserSetting'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { errorMessage, successMessage } from '../ToasterMessage'

const EditUser = ({ setSubmitOpenModal, fetchUser, editData }) => {
  console.log("editData",editData)
  const form = useForm({ resolver: yupResolver(UserValidation) })
  const editId = editData ? editData.id : ''

  const onSubmitUser = async data => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('password', data.password)
    formData.append('password_confirmation', data.password_confirmation)
    formData.append('address', data.address)
    formData.append('role_id', data.role_id)
    formData.append('status', data.status)
    formData.append('department_id', data.department_id)
    formData.append('userType', data.userType)

    formData.append('_method', 'PUT')

    try {
      const response = await UserServices.EditUser(editId, formData)
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        fetchUser()
        setSubmitOpenModal(false)
      }
    } catch (error) {
      console.error('Error updating user:', error)
      errorMessage({ description: error?.response?.data?.message })
      form.setValue('password', '')
    } finally {
      form.reset()
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmitUser)}>
        <UserField form={form} editData={editData} />
        <div className='mt-4 flex justify-end'>
          <Button type='submit' className='site-button'>
            Update
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default EditUser

'use client'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import UserServices from '../../services/Settings/UserSetting'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import RoleFields from './RoleFields'

const EditUserRole = ({ setSubmitOpenModal, fetchUser, editData }) => {
  const form = useForm()
  useEffect(() => {
    if (editData) {
      const resetData = {
        ...editData,
        permissions: editData?.permission?.data?.map(item => item?.id)
      }
      console.log('resetData', resetData)
      form.reset(resetData)
    }
  }, [])
  const editId = editData?.id
  const onSubmit = async data => {
    console.log('data', data)
    const formData = { ...data, _method: 'PUT', id: editData?.id }
    try {
      const response = await UserServices.EditUserRole(editId, formData)
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        fetchUser()
        setSubmitOpenModal(false)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
      <div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <RoleFields form={form} />
            <div className='mt-4 flex justify-end'>
              <Button type='submit' className='site-button'>
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default EditUserRole

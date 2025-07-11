'use client'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { LeadsSettingInteracationFormSchema } from '../form-validations/LeadsSettingValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { TaskGroupServices } from '@/services/Settings/TaskSetting'

const AddTaskGroup = ({ setSubmitOpenModal, fetchGroupList, editData }) => {
  const form = useForm({

       defaultValues: {},
          resolver: yupResolver(LeadsSettingInteracationFormSchema)
  })
  useEffect(() => {
    if (editData) {
      form.reset(editData)
    }
  }, [editData])
  const editId = editData ? editData?.id : ''
  const onSubmit = async data => {
    const formData = {
      ...data,
      id: editData ? editData?.id : null,
      _method: editData ? 'PUT' : 'POST'
    }

    try {
      const response = editData
        ? await TaskGroupServices.EditGroup(editId, formData)
        : await TaskGroupServices.AddGroup(formData)
      if (response.status === 200) {
        setSubmitOpenModal(false)
        fetchGroupList()
        successMessage({ description: response?.data?.message })
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInputField
            form={form}
            name='name'
            label='Name'
            placeholder='Enter Name'
          />
          <div className='mt-4 flex justify-end gap-4'>
            <Button type='submit' className='site-button'>
              {editData ? 'update' : 'Submit'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddTaskGroup

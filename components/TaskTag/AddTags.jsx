'use client'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { LeadsSettingFormSchema } from '../form-validations/LeadsSettingValidation'
import { TaskTagServices } from '@/services/Settings/TaskSetting'

const AddTags = ({ setSubmitOpenModal, fetchTagList, editData }) => {
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(LeadsSettingFormSchema)
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
        ? await TaskTagServices.EditTags(editId, formData)
        : await TaskTagServices.AddTags(formData)
      if (response.status === 200) {
        setSubmitOpenModal(false)
        fetchTagList()
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
          <div className='grid grid-cols-2 gap-4'>
            <FormInputField
              form={form}
              name='title'
              label='Title'
              placeholder='Enter Title'
            />
             <div>
            <label className="block mb-1">Color</label>
              <div className='flex items-center gap-2 border rounded px-1 py-0'>
              <FormInputField
                form={form}
                name='color'
                type='color'
                className="w-12 h-12 border-none p-0 !rounded-xl"
              />
              <FormInputField
                form={form}
                name='color'
                type='text'
                className="w-full border-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                placeholder="#000000"
              />
            </div>
          </div>
          </div>
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

export default AddTags

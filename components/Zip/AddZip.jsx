'use client'
import { ZipCodeServices } from '@/services/Settings/ZipCode'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'

const AddZipCode = ({ setSubmitOpenModal, fetchZipCode, editData }) => {
  const form = useForm({
    defaultValues: {}
    //   resolver: yupResolver(LeadsSettingInteracationFormSchema)
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
        ? await ZipCodeServices.EditZipCode(editId, formData)
        : await ZipCodeServices.AddZipCode(formData)
      if (response.status === 200) {
        setSubmitOpenModal(false)
        fetchZipCode()
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
              name='name'
              label='Tax Region Name'
              placeholder='Enter Tax Region Name'
            />
            <FormInputField
              form={form}
              name='rate'
              label='Estimated Combined Rate'
              type='number'
              placeholder='Enter Estimated Combined Rate'
            />
            <FormInputField
              form={form}
              name='zipcode'
              label='Zip Code'
              type='number'
              placeholder='Enter Zip Code'
            />
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

export default AddZipCode

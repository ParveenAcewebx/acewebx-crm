'use client'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import BudgetScopeService from '@/services/BudgetBook/Budget-scope-api'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditCategory = ({ handleModalClose, getAllList, editData }) => {
  const id = editData?.id
  const form = useForm({
    defaultValues: {}
    //  resolver:yupResolver(LeadsSettingFormSchema)
  })

  useEffect(() => {
    if (editData) {
      form.reset(editData)
    }
  }, [id])

  const handleBrandSubmit = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('name', data.name || '')
      formData.append('order', data.order || '')

      // Submit to API
      const response = await BudgetScopeService.UpdateCategoryById(id, formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        form.reset()
        getAllList()
      }
      handleModalClose()
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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleBrandSubmit)}>
          <div className='mt-4 grid grid-cols-2 gap-4'>
            <FormInputField
              name='name'
              label='Title'
              placeholder='Enter Title'
            />
            <FormInputField name='order' label='Order' type='number' />
          </div>
          <div className='mt-4 flex justify-end gap-4'>
            <Button type='submit' className='site-button'>
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default EditCategory

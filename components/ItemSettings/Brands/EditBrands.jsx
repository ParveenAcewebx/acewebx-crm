'use client'
import { LeadsSettingFormSchema } from '@/components/form-validations/LeadsSettingValidation'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LeadsSettingServices from '@/services/Settings/LeadSetting'
import ItemSettingsServices from '@/services/Settings/ItemSettings'

const EditBrand = ({handleModalClose,getAllList,editData}) => {
  const id = editData?.id
  const form = useForm({
    defaultValues: {},
    //  resolver:yupResolver(LeadsSettingFormSchema)
  })

  useEffect(() => {
    if (editData) {
    form.reset(editData)
    }
  }, [id])

  const handleBrandSubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('name', data.name || '')

      // Submit to API
      const response = await ItemSettingsServices.updateBrandsById(
        id,
        formData
      )
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
          <FormInputField name='name' label='Name' placeholder='Enter Name' />
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

export default EditBrand

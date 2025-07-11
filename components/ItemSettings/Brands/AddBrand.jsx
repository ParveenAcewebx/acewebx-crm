'use client'

import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import ItemSettingsServices from '@/services/Settings/ItemSettings'
import { FormProvider, useForm } from 'react-hook-form'

const AddBrand = ({ handleModalClose, getAllList }) => {
  const form = useForm({
    defaultValues: {}
    // resolver: yupResolver(LeadsSettingFormSchema)
  })

  const handleBrandSubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()
      formData.append('name', data.name || '')

      // Submit to API
      const response = await ItemSettingsServices.AddBrands(formData)
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
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddBrand

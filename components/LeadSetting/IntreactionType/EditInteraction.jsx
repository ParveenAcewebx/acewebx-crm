'use client'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LeadsSettingServices from '@/services/Settings/LeadSetting'

const EditInteractionType = ({ setOpenModal, getListLeads, editData }) => {
  const id = editData?.id
  const form = useForm({
    defaultValues: {}
  })

  useEffect(() => {
    if (editData) {
      form.reset(editData)
    }
  }, [id])

  const handleInteractionTypeSubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('name', data.name || '')

      // Submit to API
      const response = await LeadsSettingServices.UpdateInteractionType(
        id,
        formData
      )
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        form.reset()
        getListLeads()
        setOpenModal(false)
      }
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
        <form
          onSubmit={form.handleSubmit(handleInteractionTypeSubmit)}
          className='mt-5'
        >
          <FormInputField
            form={form}
            name='name'
            label='Name'
            placeholder='Enter Name'
          />
          <div className='mt-4 flex justify-end'>
            <Button type='submit' className='site-button'>
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default EditInteractionType

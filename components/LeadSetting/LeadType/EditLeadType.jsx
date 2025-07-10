'use client'
import { LeadsSettingFormSchema } from '@/components/form-validations/LeadsSettingValidation'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LeadsSettingServices from '@/services/Settings/LeadSetting'

const EditLeadType = ({handleModalClose,getListLeads,editData}) => {
  const id = editData?.id
  const form = useForm({
    defaultValues: {},
     resolver:yupResolver(LeadsSettingFormSchema)
  })

  useEffect(() => {
    if (editData) {
    form.reset(editData)
    }
  }, [id])

  const handleLeadTypeSubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('title', data.title || '')
      formData.append('color', data.color || '')

      // Submit to API
      const response = await LeadsSettingServices.UpdateLeadTypesById(
        id,
        formData
      )
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        form.reset()
        getListLeads()
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
        <form
          onSubmit={form.handleSubmit(handleLeadTypeSubmit)}
        >
            <div className='mt-5 grid grid-cols-2 gap-4'>
          <FormInputField
            form={form}
            name='title'
            label='Title'
            placeholder='Enter title'
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
          <div className='mt-4 flex justify-center'>
            <Button type='submit' className='site-button'>
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default EditLeadType

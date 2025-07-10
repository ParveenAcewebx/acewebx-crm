'use client'
import { LeadsSettingInteracationFormSchema } from '@/components/form-validations/LeadsSettingValidation'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import LeadsSettingServices from '@/services/Settings/LeadSetting'

const AddInteraction = ({ getListLeads, setOpenModal }) => {
  const form = useForm({
    defaultValues: {},
    resolver: yupResolver(LeadsSettingInteracationFormSchema)
  })

  const handleLeadsTagSubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()
      formData.append('name', data.name || '')

      // Submit to API
      const response = await LeadsSettingServices.AddInteractionTyp(formData)
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
          onSubmit={form.handleSubmit(handleLeadsTagSubmit)}
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
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddInteraction

'use client'
import AddContactForm from '@/components/Contact/AddContactForm'
import { ContactSchema } from '@/components/form-validations/ContactFormValidation'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { ContactServices } from '@/services/Crm/project'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddContact() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      zip: '',
      address: '',
      company_id: '',
      notes: ''

    },
    resolver: yupResolver(ContactSchema)
  })
  const handlePipelineSubmit = async data => {
    console.log('data-pipeeline', data)
    try {
      const formData = new FormData()

      formData.append('name', `${data.firstName} ${data.lastName || ''}`.trim())
      formData.append('email', data.email || '')
      formData.append('phone', data.phone || '')
      formData.append('city', data.city || '')
      formData.append('state', data.state || '')
      formData.append('zip', data.zip || '')
      formData.append('company_id', data.company_id || '')
      formData.append('notes', data.notes || '')


      formData.append('address', data.address || '')
      const response = await ContactServices.AddContacts(formData)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/crm/contact')
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Contact'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handlePipelineSubmit)}>
          <AddContactForm form={form} />
          <div className='mt-4 flex justify-end gap-4'>
            <Button
              onClick={handleBack}
              type='button'
              className='site-button bg-white'
            >
              Back
            </Button>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

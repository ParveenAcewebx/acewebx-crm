'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import FormInputField from '../share/form/FormInputField'
import { errorMessage, successMessage } from '../ToasterMessage'
import CompaniesServices from '@/services/Crm/company'

const AddCompanyForm = ({id,handleCloseDialog,getCompanies}) => {
  const form = useForm({
    defaultValues: {}
  })
  const router = useRouter()

  const handleCompanySubmit = async data => {
    console.log('data--submit', data)
    try {
      const formData = new FormData()
      formData.append('name', data.name || '')
 

      // Submit to API
      const response = await CompaniesServices.AddCompanies(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        if (id) {
          router.push(`/dashboard/leads/edit?id=${id}`)
        } else {
          router.push('/dashboard/leads/add')
        }
        form.reset()
         handleCloseDialog()
         getCompanies()
      } else {
        errorMessage({
          description: response?.data?.message || 'Something went wrong.'
        })
      }
      // handleCloseDialog(false)
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
      <div className='text-center !text-xl font-semibold'>Add Company</div>
      <FormProvider {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(handleCompanySubmit)()
          }}
          className='mt-5'
        >
          <FormInputField
            form={form}
            name='name'
            label='Name'
            placeholder='Enter title'
          />
          <div className='mt-4 flex justify-end'>
            <Button type='submit' className='site-button'>Submit</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddCompanyForm

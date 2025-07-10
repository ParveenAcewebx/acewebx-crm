'use client'
import AddCompanyTypeForm from '@/components/CompanyType/AddCompanyTypeForm'
import { CompanyTypeSchema } from '@/components/form-validations/CompanyForm'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { CompanyTypeServices } from '@/services/Crm/company'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddCompanyType() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      backgroundColor: '',
      sortOrder: ''
    },
    resolver: yupResolver(CompanyTypeSchema)
  })
  const handleCompanyTypeSubmit = async data => {
    console.log('data', data)
    try {
      const formData = new FormData()

      formData.append('name', data.name || '')
      formData.append('backgroundColor', data.backgroundColor || '')
      formData.append('sortOrder', data.sortOrder || '')

      const response = await CompanyTypeServices.AddCompaniesType(formData)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/settings/company-type')
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
    router.push('/dashboard/settings/company-type')
  }
  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Company Type'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleCompanyTypeSubmit)}>
          <AddCompanyTypeForm form={form} />
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

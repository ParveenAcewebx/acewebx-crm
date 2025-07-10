'use client'
import AddCompanyForm from '@/components/Company/AddCompanyForm'
import { CompanySchema } from '@/components/form-validations/CompanyForm'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import CompaniesServices from '@/services/Crm/company'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddCompany() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      companyType: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      tax:'',
      companyNotes: '',
      companyLeadScore: ''
    },
    resolver: yupResolver(CompanySchema)
  })
  
  const handleCompanySubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('name', data.name || '')
      formData.append('companyType', data.companyType || '')
      formData.append('address', data.address || '')
      formData.append('city', data.city || '')
      formData.append('state', data.state || '')
      formData.append('zip', data.zip || '')
      formData.append('tax', data.tax || '')

      formData.append('companyNotes', data.companyNotes || '')
      formData.append('companyLeadScore', data.companyLeadScore || '')

      const response = await CompaniesServices.AddCompanies(formData)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/crm/company')
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
        <LayoutHeader pageTitle={'Add Company'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleCompanySubmit)}>
          <AddCompanyForm form={form} />
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

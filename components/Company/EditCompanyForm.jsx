'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import CompaniesServices from '@/services/Crm/company'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddCompanyForm from './AddCompanyForm'
// import AttributeTableData from './attribute-tableData'

const EditCompanyForm = ({ editLeadId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editLeadId

  const form = useForm({
    defaultValues: {
      name: '',
      companyType: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      tax: '',
      companyNotes: '',
      companyLeadScore: ''
    }
  })
  useDocumentTitle('Edit Company')
  const router = useRouter()

  // Fetch the lead by Id To update the Id
  const fetchCompanyById = async () => {
    try {
      const response = await CompaniesServices.getCompaniesById(id)
      if (response?.status === 200) {
        const companyData = response.data.data
        // Pre-fill form values
        const formattedData = {
          ...companyData,
          companyType: String(companyData.companyType),
          tax: companyData.tax
        }
        form.reset(formattedData)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (id) {
      fetchCompanyById()
    }
  }, [id])

  // handle to edit
  const handleCompanyUpdate = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id || '')
      formData.append('name', data.name || '')
      formData.append('companyType', data.companyType || '')
      formData.append('address', data.address || '')
      formData.append('city', data.city || '')
      formData.append('state', data.state || '')
      formData.append('zip', data.zip || '')
      formData.append('tax', data.tax || '')

      formData.append('companyNotes', data.companyNotes || '')
      formData.append('companyLeadScore', data.companyLeadScore || '')

      const responseEdit = await CompaniesServices.updateCompaniesById(
        id,
        formData
      )
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        router.push('/dashboard/crm/company')
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Edit Company'} />
      </div>

      <div className=''>
        <FormProvider {...form}>
          <form className='' onSubmit={form.handleSubmit(handleCompanyUpdate)}>
            <AddCompanyForm form={form} />
            <div className='mt-4 flex justify-end gap-4'>
              <Button
                onClick={handleBack}
                type='button'
                className='site-button bg-cyan-400'
              >
                Back
              </Button>
              <Button type='submit' className='site-button'>
                Update
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default EditCompanyForm

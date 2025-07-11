'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddCompanyTypeForm from './AddCompanyTypeForm'
import { CompanyTypeServices } from '@/services/Crm/company'
// import AttributeTableData from './attribute-tableData'

const EditCompanyTypeForm = ({ editLeadId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editLeadId
  console.log('iddd', id)

  const form = useForm({
     defaultValues: {
      name: '',
      backgroundColor: '',
      sortOrder: ''
    },
  })
  useDocumentTitle('Edit Company')
  const router = useRouter()

  // Fetch the lead by Id To update the Id
  const fetchCompanyById = async () => {
    try {
      const response = await CompanyTypeServices.getCompaniesTypeById(id)
      if (response?.status === 200) {
        const contactData = response.data.data

        // Pre-fill form values
        const formattedData = {
          ...contactData
        }
        form.setValue('contact_id', contactData.contact?.id?.toString())
        console.log('formattedData', formattedData)
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
  const handleCompanyTypeUpdate = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id || '')
      formData.append('name', data.name || '')
      formData.append('backgroundColor', data.backgroundColor || '')
      formData.append('sortOrder', data.sortOrder || '')

      const responseEdit = await CompanyTypeServices.updateCompaniesTypeById(
        id,
        formData
      )
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        router.push('/dashboard/settings/company-type')
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const handleBack=()=>{
    router.back()
  }

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Edit Company Type'} />
      </div>

      <div className=''>
        <FormProvider {...form}>
          <form className='' onSubmit={form.handleSubmit(handleCompanyTypeUpdate)}>
            <AddCompanyTypeForm form={form} id={id} />
            <div className='mt-4 flex justify-end gap-4'>
              {/* <Link href='/dashboard/crm/contact'> */}
                <Button onClick={handleBack} type='button' className='site-button bg-white'>
                  Back
                </Button>
              {/* </Link> */}

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

export default EditCompanyTypeForm

'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { TermsCodesServices } from '@/services/Settings/TermsCodes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddTermsCodesForm from './AddTermsCodesForm'
// import AttributeTableData from './attribute-tableData'

const EditTermsCodesForm = ({ editId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editId

  const form = useForm({
    defaultValues: {
      code: '',
      customers: '',
      vendor: '',
      description: '',
      days_due: '',
      due_type: '',
      is_cod: false,
      is_prepay: false,
      active: false,

      discount_days: '',
      discount_percent: ''
    }
  })
  useDocumentTitle('Edit Terms Codes')
  const router = useRouter()

  // Fetch the lead by Id To update the Id
  const fetchTermsCodesById = async () => {
    try {
      const response = await TermsCodesServices.getTermsCodesById(id)
      if (response?.status === 200) {
        const termsCodesData = response.data.data
        const formattedData = {
          ...termsCodesData,
          is_cod: Boolean(termsCodesData.is_cod),
          is_prepay: Boolean(termsCodesData.is_prepay),
          active: Boolean(termsCodesData.active)
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
      fetchTermsCodesById()
    }
  }, [id])

  // handle to edit
  const handleTermsCodesUpdate = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id || '')
      formData.append('code', data.code || '')
      formData.append('term_type', data.term_type || '')
      formData.append('description', data.description || '')
      formData.append('days_due', data.days_due || '')
      formData.append('due_type', data.due_type || '')
      formData.append('discount_days', data.discount_days || '')
      formData.append('discount_percent', data.discount_percent || '')
      formData.append('is_cod', data.is_cod || '')
      formData.append('is_prepay', data.is_prepay || '')
      formData.append('active', data.active || '')

      const responseEdit = await TermsCodesServices.EditTermsCodes(id, formData)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        router.push('/dashboard/settings/terms-codes')
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
        <LayoutHeader pageTitle={'Edit Terms Codes'} />
      </div>

      <div className=''>
        <FormProvider {...form}>
          <form
            className=''
            onSubmit={form.handleSubmit(handleTermsCodesUpdate)}
          >
            <AddTermsCodesForm form={form} />
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

export default EditTermsCodesForm

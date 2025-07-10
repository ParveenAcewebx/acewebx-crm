'use client'
import { CompanySchema } from '@/components/form-validations/CompanyForm'
import { TermsCodesSchema } from '@/components/form-validations/termsCodes'
import LayoutHeader from '@/components/layoutHeader'
import AddTermsCodesForm from '@/components/TermsCodes/AddTermsCodesForm'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { TermsCodesServices } from '@/services/Settings/TermsCodes'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddTermsCodes() {
  const router = useRouter()
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
    },
    resolver: yupResolver(TermsCodesSchema)
  })

  const handleTermsCodesSubmit = async data => {
    try {
      const formData = new FormData()

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

      const response = await TermsCodesServices.AddTermsCodes(formData)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/settings/terms-codes')
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
        <LayoutHeader pageTitle={'Add Terms Codes'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleTermsCodesSubmit)}>
          <AddTermsCodesForm form={form} />
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

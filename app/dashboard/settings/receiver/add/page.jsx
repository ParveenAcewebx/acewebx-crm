'use client'
import { ReceiverSchema } from '@/components/form-validations/receiver'
import { TermsCodesSchema } from '@/components/form-validations/termsCodes'
import LayoutHeader from '@/components/layoutHeader'
import AddReceiverForm from '@/components/receiverForm/AddTermsCodesForm'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { ReceiverServices } from '@/services/Settings/receiver'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddReceiverCodes() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      purchaseOrder: '',
      receivedBy: '',
      receivedDate: '',
      receivedQty: '',
      orderedQty: '',
      lineItem:""
    },
    resolver: yupResolver(ReceiverSchema)
  })

  const handleReceiverSubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('purchaseOrder', data.purchaseOrder || '')
      formData.append('receivedBy', data.receivedBy || '')
      formData.append('receivedDate', data.receivedDate || '')
      formData.append('receivedQty', data.receivedQty || '')
      formData.append('orderedQty', data.orderedQty || '')
      formData.append('lineItem', data.lineItem || '')


      const response = await ReceiverServices.AddReceiver(formData)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/settings/receiver')
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
        <LayoutHeader pageTitle={'Add Receiver'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleReceiverSubmit)}>
          <AddReceiverForm form={form} />
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

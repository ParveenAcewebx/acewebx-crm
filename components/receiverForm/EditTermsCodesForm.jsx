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
import { ReceiverServices } from '@/services/Settings/receiver'
import AddReceiverForm from './AddTermsCodesForm'
// import AttributeTableData from './attribute-tableData'

const EditReceiverForm = ({ editId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editId

  const form = useForm({
    defaultValues: {
      purchaseOrder: '',
      receivedBy: '',
      receivedDate: '',
      receivedQty: '',
      orderedQty: '',
      lineItem:''
    }
  })
  useDocumentTitle('Edit Receiver')
  const router = useRouter()

  // Fetch the lead by Id To update the Id
  const fetchReceiverById = async () => {
    try {
      const response = await ReceiverServices.getReceiverById(id)
      if (response?.status === 200) {
        const ReceiverData = response.data.data
        // const formattedData = {
        //   ...ReceiverData,
        //   is_cod: Boolean(termsCodesData.is_cod),
        //   is_prepay: Boolean(termsCodesData.is_prepay),
        //   active: Boolean(termsCodesData.active)
        // }

        form.reset(ReceiverData)
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
      fetchReceiverById()
    }
  }, [id])

  // handle to edit
  const handleReceiverUpdate = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id || '')
      formData.append('purchaseOrder', data.purchaseOrder || '')
      formData.append('receivedBy', data.receivedBy || '')
      formData.append('receivedDate', data.receivedDate || '')
      formData.append('receivedQty', data.receivedQty || '')
      formData.append('orderedQty', data.orderedQty || '')
      formData.append('lineItem', data.lineItem || '')


      const responseEdit = await ReceiverServices.EditReceiver(id, formData)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        router.push('/dashboard/settings/receiver')
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
        <LayoutHeader pageTitle={'Edit Receiver'} />
      </div>

      <div className=''>
        <FormProvider {...form}>
          <form
            className=''
            onSubmit={form.handleSubmit(handleReceiverUpdate)}
          >
            <AddReceiverForm form={form} />
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

export default EditReceiverForm

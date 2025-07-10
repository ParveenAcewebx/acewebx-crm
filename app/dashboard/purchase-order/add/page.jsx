'use client'
import { PurchaseOrderDefaultVlaue } from '@/components/DefaultValues/PurchaseOrder'
import LayoutHeader from '@/components/layoutHeader'
import PurchaseFormFields from '@/components/PurchaseOrder/PurchaseFormFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import PurchaseOrderService from '@/services/PurchaseOrder/purchase-order'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const AddPurchaseOrder = () => {
  const form = useForm({ defaultValues: PurchaseOrderDefaultVlaue })
  const [removelinetab, setRemovelinetab] = useState([])
  const [removeOrderTab, setRemovedOrderTab] = useState([])
  const router = useRouter()

  const onSubmitPurchaseOrder = async data => {
    const formData = {
      ...data,
      dateOrdered: formatDateForMySQL(data?.dateOrdered || ''),
      wanted: formatDateForMySQL(data?.wanted || ''),

      headerTab: {
        ...data?.headerTab,
        lastChange: formatDateForMySQL(data?.headerTab?.lastChange || ''),
        dateExpected: formatDateForMySQL(data?.headerTab?.dateExpected || ''),
        followUpDate: formatDateForMySQL(data?.headerTab?.followUpDate || ''),
        receiptDate: formatDateForMySQL(data?.headerTab?.receiptDate || ''),
        shipped: formatDateForMySQL(data?.headerTab?.shipped || '')
      },
      lineTab: data?.lineTab?.map(item => ({
        ...item,
        exptDate: item?.exptDate ? formatDateForMySQL(item?.exptDate) : '',
        date: item?.date ? formatDateForMySQL(item?.date) : '',
        receToDate: item?.receToDate
          ? formatDateForMySQL(item?.receToDate)
          : '',
        reqDate: item?.reqDate ? formatDateForMySQL(item?.reqDate) : ''
      })),
      orderTab: data?.orderTab?.map(item => ({
        ...item,
        dateWanted: item?.dateWanted ? formatDateForMySQL(item?.dateWanted) : ''
      }))
    }
    console.log('formDataformDataformData', formData)
    // Here you would typically send the data to your API or service
    // For example:
    try {
      const response = await PurchaseOrderService.addPurchaseOrder(formData)
      if (response?.status == 200) {
        successMessage({ description: response?.data?.message })
        // Redirect or perform any other action after successful submission
        router.push('/dashboard/purchase-order')
      }
    } catch (error) {
      console.error('Error submitting purchase order:', error)
      // Handle error, show message to user, etc.
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <LayoutHeader pageTitle='Add Purchase Order' />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitPurchaseOrder)}>
          <div className='mt-4 flex justify-end gap-4'>
            <Button
              type='button'
              className='site-button bg-white'
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
          <div className='p-4'>
            <PurchaseFormFields
              form={form}
              setRemovelinetab={setRemovelinetab}
              setRemovedOrderTab={setRemovedOrderTab}
            />
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddPurchaseOrder

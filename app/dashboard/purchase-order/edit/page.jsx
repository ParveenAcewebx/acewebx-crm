'use client'

import { PurchaseOrderDefaultVlaue } from '@/components/DefaultValues/PurchaseOrder'
import LayoutHeader from '@/components/layoutHeader'
import PurchaseFormFields from '@/components/PurchaseOrder/PurchaseFormFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import PurchaseOrderService from '@/services/PurchaseOrder/purchase-order'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditPurchaseOrder = () => {
  const searchParams = useSearchParams()
  const purchaseOrderId = searchParams.get('id')
  const [removelinetab, setRemovelinetab] = useState([])
  const [removeOrderTab, setRemovedOrderTab] = useState([])
  const form = useForm({ defaultValues: PurchaseOrderDefaultVlaue })
  const router = useRouter()
  useEffect(() => {
    const fetchPurchaseOrderById = async () => {
      try {
        const response =
          await PurchaseOrderService.getPurchaseorderById(purchaseOrderId)
        const data = response?.data?.data
        const purchaseData = {
          ...data,
          vendor_id: String(data?.vendor_id),
          lineTab: data?.line_tab,
          headerTab: data?.header_tab,
          totalTab: {
            ...data?.total_tab[0],
            totalAdditionalFields: data?.additional_fields
          },
          orderTab: data?.order_tab
        }
        form.reset({ ...purchaseData })
      } catch (error) {}
    }
    fetchPurchaseOrderById()
  }, [])

  const onSubmitPurchaseOrder = async data => {
    const formData = {
      ...data,
      dateOrdered: formatDateForMySQL(data?.dateOrdered || ''),
      wanted: formatDateForMySQL(data?.wanted || ''),
      lineDelete: removelinetab,
      orderDelete: removeOrderTab,
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
    console.log('formDataformDataformDataformData', formData)
    try {
      const response = await PurchaseOrderService.updatePurchaseorder(
        purchaseOrderId,
        formData
      )
      if (response?.status == 200) {
        successMessage({ description: response?.data?.message })
        router.push(`/dashboard/purchase-order`)
      }
    } catch (error) {}
  }

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Update Purchase Order' />
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
              Update
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

export default EditPurchaseOrder

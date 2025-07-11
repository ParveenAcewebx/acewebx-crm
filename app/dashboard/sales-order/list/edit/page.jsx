'use client'
import { SalesOrderDefault } from '@/components/DefaultValues/SalesOrder'
import { MaterialQuotesValidation } from '@/components/form-validations/material-quotesValidation'
import LayoutHeader from '@/components/layoutHeader'
import SalesOrderFields from '@/components/MaterialQuotes/SalesOrderFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import MaterialQuotesService from '@/services/Leads/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditSalesOrder = () => {
  const form = useForm({
    resolver: yupResolver(MaterialQuotesValidation),
    defaultValues: SalesOrderDefault
  })
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')
  const router = useRouter()
  const [leadName, setLeadName] = useState([])
  const lead = leadName?.lead?.name
  const fetchSalesOrderById = async () => {
    const response = await MaterialQuotesService.GetMaterialStatusBYId(editId)
    console.log("response",response)
    if (response?.status === 200) {
      const materilData = response?.data?.data
      setLeadName(materilData)  

      const formattedData = {
        ...materilData,
        customer_id: String(materilData?.customers?.id),
        status: String(materilData?.status?.id),
        customerDetails: String(materilData?.customers?.address)
        // priceBy:  String(materilData?.headerTab?.priceBy),
      }
      // form.reset(formattedData)
    }
  }
  useEffect(() => {
    fetchSalesOrderById()
  }, [])
//  Function to update the SalesOrder
  const onEditSalesOrder = async data => {
    const formData = { ...data, _method: 'PUT', id: editId }
    try {
      const response = await MaterialQuotesService.UpdateMaterialQuotesById(
        editId,
        formData
      )
      if (response) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/sales-order/list')
      }
    } catch (error) {
      console.log('errorerror', error)
    }
  }
  const handleBack = () => {
    router.push('/dashboard/sales-order/list')
  }
  const pageTitle = (
    <>
      Edit Sales Order{' '}
      <span className='text-xl font-normal'>{lead && <> ({lead}) </>}</span>
    </>
  )
  return (
    <>
      <div>
        <div className='mb-3 flex items-center justify-between'>
          <LayoutHeader pageTitle={pageTitle} />
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/sales-order/list`)}
          >
            All Sales Order
          </Button>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onEditSalesOrder)}>
            <SalesOrderFields form={form} editId={editId} />
            <div className='mt-4 flex justify-end gap-4'>
              <Button
                onClick={handleBack}
                type='button'
                className='site-button bg-white'
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

export default EditSalesOrder

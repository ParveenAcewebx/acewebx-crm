'use client'
import { SalesOrderDefault } from '@/components/DefaultValues/SalesOrder'
import { MaterialQuotesValidation } from '@/components/form-validations/material-quotesValidation'
import LayoutHeader from '@/components/layoutHeader'
import SalesOrderFields from '@/components/MaterialQuotes/SalesOrderFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import MaterialQuotesService from '@/services/Leads/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

const AddSalesOrder = () => {
  const form = useForm({
    resolver: yupResolver(MaterialQuotesValidation),
    defaultValues: SalesOrderDefault
  })
  const router = useRouter()
  // Function to submit the Sales Order
  const onSubmitSalesOrder = async data => {
    console.log("datadata",data)
    try {
      const response = await MaterialQuotesService.AddMaterial(data)
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
  return (
    <>
      <div>
        <div className='mb-3 flex items-center justify-between'>
          <LayoutHeader pageTitle='Add Sales Order' />
          <Button
            className='site-button'
            onClick={() => router.push(`/dashboard/sales-order/list`)}
          >
            All Sales Order
          </Button>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitSalesOrder)}>
            <SalesOrderFields form={form} />
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
      </div>
    </>
  )
}

export default AddSalesOrder

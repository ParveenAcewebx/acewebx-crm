'use client'
import { InventorySchema } from '@/components/form-validations/inventory'
import AddVendorForm from '@/components/Inventories/vendor/AddVendorForm'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import InventoryServices from '@/services/Inventory/Inventory'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddVendor() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      billTo: '',
      shipTo: ''
    },
    resolver: yupResolver(InventorySchema),
  })
  const handleVendorSubmit = async data => {
    console.log('data', data)
    try {
      const formData = new FormData()

      formData.append('name', data.name || '')
      formData.append('email', data.email || '')
      formData.append('phone', data.phone || '')
      formData.append('billTo', data.billTo || '')
      formData.append('shipTo', data.shipTo || '')

      const response = await InventoryServices.AddVendors(formData)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/inventory/vendor')
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
    router.push('/dashboard/inventory/vendor')
  }
  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Vendor'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleVendorSubmit)}>
          <AddVendorForm form={form} />
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

'use client'
import { InventorySchema } from '@/components/form-validations/inventory'
import AddWarehouseForm from '@/components/Inventories/warehouse/AddWarehouseForm'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import InventoryServices from '@/services/Inventory/Inventory'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddWarehouse() {
  const router = useRouter()
  const form = useForm({
    resolver: yupResolver(InventorySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
  })
  const handleWarehouseSubmit = async data => {
    console.log('data', data)
    try {
      const formData = new FormData()

      formData.append('name', data.name || '')
      formData.append('email', data.email || '')
      formData.append('phone', data.phone || '')
      formData.append('address', data.address || '')
      formData.append('city', data.city || '')
      formData.append('state', data.state || '')
      formData.append('zip', data.zip || '')

      const response = await InventoryServices.AddWarehouse(formData)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/inventory/warehouse')
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
    router.push('/dashboard/inventory/warehouse')
  }
  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Warehouse'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleWarehouseSubmit)}>
          <AddWarehouseForm form={form} />
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

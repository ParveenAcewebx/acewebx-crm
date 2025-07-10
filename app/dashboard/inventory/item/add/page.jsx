'use client'
import { MaterialValidation } from '@/components/form-validations/materialValidation'
import LayoutHeader from '@/components/layoutHeader'
import MaterialFields from '@/components/Material/MaterialFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { MaterialService } from '@/services/Leads/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

const AddMaterial = () => {
  const form = useForm({resolver:yupResolver((MaterialValidation))})
  const router = useRouter()
  const onSubmit = async data => {
    console.log('data', data)
    try {
      const response = await MaterialService.AddMaterial(data)
      if (response) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/inventory/item/list')
      }
    } catch (error) {}
  }
  const handleBack = () => {
    router.push('/dashboard/inventory/item/list')
  }
  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <LayoutHeader pageTitle='Add Item' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/inventory/item/list`)}
        >
          All Item
        </Button>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MaterialFields form={form} />
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

export default AddMaterial

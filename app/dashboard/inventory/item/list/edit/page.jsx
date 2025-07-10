'use client'
import LayoutHeader from '@/components/layoutHeader'
import MaterialFields from '@/components/Material/MaterialFields'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { MaterialService } from '@/services/Leads/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const AddMaterial = () => {
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')
  const form = useForm()
  const router = useRouter()

  const fetchMaterialById = async () => {
    const response = await MaterialService.GetMaterialBYId(editId)
    if (response?.status === 200) {
      const materilData = response?.data?.data
      const formattedData = {
        ...materilData,
        customer_id: String(materilData?.customer?.id)
      }
      form.reset(formattedData)
    }
  }
  useEffect(() => {
    fetchMaterialById()
  }, [])

  const onSubmit = async data => {
    const formData = { ...data, _method: 'PUT', id: editId }
    try {
      const response = await MaterialService.UpdateMaterialById(editId, formData)
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
        <LayoutHeader pageTitle='Edit Item' />
        <Button
          className='site-button'
          onClick={() => router.push(`/dashboard/inventory/material/list`)}
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

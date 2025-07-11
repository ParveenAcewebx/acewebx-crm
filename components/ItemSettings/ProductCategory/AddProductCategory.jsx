'use client'
import LayoutHeader from '@/components/layoutHeader'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import ItemSettingsServices from '@/services/Settings/ItemSettings'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddProductCategory({handleModalClose,getAllList}) {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: ''
    }
    // resolver: yupResolver(CompanySchema)
  })
  const handleCategorySubmit = async data => {
    console.log('data', data)
    try {
      const formData = new FormData()

      formData.append('name', data.name || '')

      const response = await ItemSettingsServices.AddProductCategories(formData)
      successMessage({ description: response?.data?.message })
      getAllList()
      handleModalClose()
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
    router.push('/dashboard/settings/item-settings/product-category')
  }
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleCategorySubmit)}>
          <FormInputField name='name' label='Name' placeholder='Enter Name' />
          <div className='mt-4 flex justify-end gap-4'>
            {/* <Button
              onClick={handleBack}
              type='button'
              className='site-button bg-white'
            >
              Back
            </Button> */}
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

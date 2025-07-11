'use client'
import FormInputField from '@/components/share/form/FormInputField'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import ItemSettingsServices from '@/services/Settings/ItemSettings'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditProductCategory = ({ handleModalClose, getAllList, editData }) => {
  const id = editData?.id
  const form = useForm({
    defaultValues: {}
    //  resolver:yupResolver(LeadsSettingFormSchema)
  })
  useDocumentTitle('Edit Product Category')
  const router = useRouter()

  useEffect(() => {
    if (editData) {
      form.reset(editData)
    }
  }, [id])

  // handle to edit
  const handleCategoryUpdate = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id || '')
      formData.append('name', data.name || '')

      const responseEdit =
        await ItemSettingsServices.updateProductCategoriesById(id, formData)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        getAllList()
      }
      handleModalClose()
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <>
      <div className=''>
        <FormProvider {...form}>
          <form className='' onSubmit={form.handleSubmit(handleCategoryUpdate)}>
            <FormInputField name='name' label='Name' placeholder='Enter Name' />
            <div className='mt-4 flex justify-end gap-4'>
              {/* <Link href='/dashboard/settings/item-settings/product-category'>
                <Button type='button' className='site-button bg-cyan-400'>
                  Back
                </Button>
              </Link> */}

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

export default EditProductCategory

'use client'
import { DepartmentSchema } from '@/components/form-validations/department'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { DepartmentStatus } from '@/components/static-Values'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import NewDepartmentServices from '@/services/Settings/department'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddDepartment({ getListDepartment, handleModalClose }) {
  useDocumentTitle('Add Department')
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      status: ''
    },
    resolver: yupResolver(DepartmentSchema)
  })

  const handleDepartmentSubmit = async data => {
    try {
      const formData = {
        name: data?.name,
        status: data?.status
      }

      const response = await NewDepartmentServices.AddNewDeapartment(formData)
      successMessage({ description: response?.data?.message })
      getListDepartment()
      form.reset()
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
  const handleBackButton = () => {
    router.back()
  }
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleDepartmentSubmit)}>
          <div className='grid grid-cols-2 gap-3'>
            <FormInputField
              form={form}
              name='name'
              placeholder='Department Name'
              label='Deartment Name'
            />
            <FormSelectField
              name='status'
              className=''
              form={form}
              label='Status'
              placeholder='Select Status'
              options={DepartmentStatus}
            />
          </div>

          <div className='mt-4 flex justify-end gap-4'>
            <Button
              onClick={handleBackButton}
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

'use client'
import FormInputField from '@/components/share/form/FormInputField'
import FormSelectField from '@/components/share/form/FormSelect'
import { DepartmentStatus } from '@/components/static-Values'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import NewDepartmentServices from '@/services/Settings/department'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const EditDepartment = ({ id, handleModalClose, getListDepartment }) => {
  const form = useForm({
    defaultValues: {
      name: '',
      status: ''
    }
  })
  useDocumentTitle('Edit Department')
  const router = useRouter()

  // Fetch the department by Id To update the Id
  const fetchDepartmentById = async () => {
    try {
      const response = await NewDepartmentServices.getNewDeapartment(id)
      if (response?.status === 200) {
        const departmentData = response?.data?.data
        form.reset(departmentData)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  useEffect(() => {
    if (id) {
      fetchDepartmentById()
    }
  }, [id])

  // handle to edit
  const handleDepartmentUpdate = async data => {
    try {
      const formData = {
        name: data?.name,
        status: data?.status
      }

      const responseEdit = await NewDepartmentServices.updateNewDeapartment(
        id,
        formData
      )
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        form.reset()
        getListDepartment()
      }
      handleModalClose()
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  const handleBackButton = () => {
    router.back()
  }

  return (
    <>
      <div className=''>
        <FormProvider {...form}>
          <form
            className=''
            onSubmit={form.handleSubmit(handleDepartmentUpdate)}
          >
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
                className='site-button bg-cyan-400'
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

export default EditDepartment

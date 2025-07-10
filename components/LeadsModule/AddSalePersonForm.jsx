'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FileUpload from '../share/form/FileUpload'
import FormInputField from '../share/form/FormInputField'
import FormSelectField from '../share/form/FormSelect'
import { errorMessage, successMessage } from '../ToasterMessage'
import { yupResolver } from '@hookform/resolvers/yup'
import UserServices, { RolesServices } from '@/services/Settings/UserSetting'
import { SalePersonSchema } from '../form-validations/userValidation'

const AddSalePersonForm = ({ handleCloseDialog,getUsers,editId }) => {
  const [roles, setRoles] = useState([])

  const form = useForm({
    resolver:yupResolver(SalePersonSchema),
    defaultValues: {}
  })
  const router = useRouter()

  const handleSalePersonSubmit = async data => {
    try {
      const formData = new FormData()
      formData.append('name', data.name || '')
      formData.append('email', data.email || '')
      formData.append('phone', data.phone || '')
      formData.append('address', data.address || '')
      formData.append('role_id', data.role_id || '')
      formData.append('avatar', data.avatar || '')
      formData.append('status', data.status || '')
      formData.append('password', data.password || '')
      formData.append('password_confirmation', data.password_confirmation || '')

      // Submit to API
      const response = await UserServices.AddUser(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        if (editId) {
          router.push(`/dashboard/leads/edit?editId=${editId}`)
        } else {
          router.push('/dashboard/leads/add')
        }
        form.reset()
        handleCloseDialog(false)
        getUsers()
      }
    } catch (error) {
      console.error('submission error:', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  const getRoles = async () => {
    try {
      const response = await RolesServices.roles()
      if (response.status === 200) {
        setRoles(response?.data?.data)
      }
    } catch (error) {
      console.log('err', error)
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }

  useEffect(() => {
    getRoles()
  }, [])
  return (
    <>
      <div className='text-center !text-xl font-semibold'>Add user</div>
      <FormProvider {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(handleSalePersonSubmit)()
          }}
        >
          <FormInputField
            form={form}
            name='name'
            label='Name'
            placeholder='Enter Title'
          />
          <div className='mt-3'>
          <FormInputField
            form={form}
            name='email'
            label='Email'
            placeholder='Enter Email'
          />
          </div>
          <div className='mt-3'>
          <FormInputField
            form={form}
            name='phone'
            label='Phone'
            placeholder='Enter Phone'
             type='tel'
          />
          </div>
          <div className='mt-3'>
          <FormInputField
            form={form}
            name='password'
            label='Password'
            placeholder='Enter Password'
            type='password'
          />
          </div>
          <div className='mt-3'>
          <FormInputField
            form={form}
            name='password_confirmation'
            label='Confirm Password'
            placeholder='Enter Confirm Password'
            type='password'
          />
          </div>
          <div className='mt-3'>
          <FormInputField
            form={form}
            name='address'
            label='Address'
            placeholder='Enter address'
          />
          </div>
          <div className='mt-3'>
          <FormSelectField
            form={form}
            name='role_id'
            label='Role'
            placeholder='Select role'
            options={
              roles.length > 0
                ? roles.map(data => ({
                    label: data.name,
                    value: String(data.id)
                  }))
                : []
            }
          />
          </div>
          <div className='mt-3'>
          <FormSelectField
            form={form}
            name='status'
            label='Status'
            placeholder='Select status'
            options={[
              { label: 'In Active', value: '1' },
              { label: 'Active', value: '2' }
            ]}
          />
          </div>
          <div className='mt-3'>
          <FileUpload form={form} name='avatar' label='File Upload' />
          </div>
          <div className='mt-4 flex justify-end gap-4'>
            <Button type='submit' className='site-button'>Submit</Button>
            <Button onClick={() => handleCloseDialog(false)} type='button' className='site-button bg-white'>
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddSalePersonForm

'use client'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import LayoutHeader from '../layoutHeader'
import UserServices from '../../services/Settings/UserSetting'
import { successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import RoleFields from './RoleFields'

const AddUserRole = () => {
  const form = useForm()
  const router = useRouter()
  const onSubmit = async data => {
    console.log('data', data)
    const formData = { ...data }
    try {
      const response = await UserServices.AddUserRole(formData)
      if (response?.status === 200) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/settings/user-setting/rolelist')
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
      <div>
        <div className='mb-3 flex items-center justify-between'>
          <LayoutHeader pageTitle='Add Role' />
          <Button
            className='site-button'
            onClick={() =>
              router.push(`/dashboard/settings/user-setting/rolelist`)
            }
          >
            All Role
          </Button>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <RoleFields form={form} />
            <div className='mt-4 flex justify-end'>
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

export default AddUserRole

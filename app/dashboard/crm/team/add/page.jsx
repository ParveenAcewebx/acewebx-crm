'use client'
import { TeamSchema } from '@/components/form-validations/Team'
import LayoutHeader from '@/components/layoutHeader'
import AddTeamForm from '@/components/Team/AddTeamForm'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import TeamServices from '@/services/Crm/team'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddTeam() {
  useDocumentTitle('Add Team')
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      contact: [],
      status: ''
    },
    resolver: yupResolver(TeamSchema)
  })

  const handleTeamSubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('name', data.name || '')
      formData.append('contact', JSON.stringify(data.contact) || [])
      formData.append('status', data.status || '')

      const response = await TeamServices.AddTeam(formData)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/crm/team')
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
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Team'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleTeamSubmit)}>
          <AddTeamForm form={form} />
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

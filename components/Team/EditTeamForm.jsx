'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import TeamServices from '@/services/Crm/team'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddTeamForm from './AddTeamForm'

const EditTeamForm = ({ editId }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editId

  const form = useForm({
    defaultValues: {
      name: '',
      contact: [],
      status: ''
    }
  })
  useDocumentTitle('Edit Team')
  const router = useRouter()

  // Fetch the team by Id To update the Id
  const fetchTeamById = async () => {
    try {
      const response = await TeamServices.getTeamById(id)
      if (response?.status === 200) {
        const teamData = response?.data?.data
        form.reset(teamData)
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
      fetchTeamById()
    }
  }, [id])

  // handle to edit
  const handleTeamUpdate = async data => {
    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', id || '')
      formData.append('name', data.name || '')
      formData.append('contact', JSON.stringify(data.contact) || [])
      formData.append('status', data.status || '')

      const responseEdit = await TeamServices.updateTeamById(id, formData)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        router.push('/dashboard/crm/team')
      }
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
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Edit Team'} />
      </div>

      <div className=''>
        <FormProvider {...form}>
          <form className='' onSubmit={form.handleSubmit(handleTeamUpdate)}>
            <AddTeamForm form={form} />
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

export default EditTeamForm

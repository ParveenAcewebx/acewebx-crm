'use client'
import { pipelineSchema } from '@/components/form-validations/pipelineValidation'
import LayoutHeader from '@/components/layoutHeader'
import AddPipelineStatusForm from '@/components/pipeline-status-group/AddPipelineStatusForm'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import PipelineStatusServices from '@/services/Pipeline/pipeline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function AddPipelineStatusGroup() {
  const [removedIds, setRemovedIds] = useState([])
  const [removeRuleIds, setRemoveRuleIds] = useState([])
  const [removedDayIds, setRemovedDayIds] = useState([])
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      materialType: '',
      statusGroup: {
        pipelineStatus: [
          {
            id: '',
            order: '',
            status: '',
            expectedDays: '',
            statusColor: '',
            percentage: ''
          }
        ]
      }
    },
    resolver: yupResolver(pipelineSchema)
  })
  const handlePipelineStatusSubmit = async data => {
    console.log('datadatadata', data)
    try {
      const response = await PipelineStatusServices.addPipelineStatus(data)
      successMessage({ description: response?.data?.message })
      router.push('/dashboard/settings/pipelinesettings/pipeline')
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
    router.push('/dashboard/settings/pipelinesettings/pipeline')
  }
  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Pipeline'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handlePipelineStatusSubmit)}>
          <AddPipelineStatusForm
            form={form}
            setRemovedIds={setRemovedIds}
            setRemoveRuleIds={setRemoveRuleIds}
            removedDayIds={removedDayIds}
            setRemovedDayIds={setRemovedDayIds}
          />
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

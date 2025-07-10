'use client'
import { pipelineSchema } from '@/components/form-validations/pipelineValidation'
import LayoutHeader from '@/components/layoutHeader'
import AddPipelineStatusForm from '@/components/pipeline-status-group/AddPipelineStatusForm'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import PipelineStatusServices from '@/services/Pipeline/pipeline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function EditPipelineStatusGroup() {
  const router = useRouter()
  const [removedIds, setRemovedIds] = useState([])
  const [removeRuleIds, setRemoveRuleIds] = useState([])
  const [removedDayIds, setRemovedDayIds] = useState([])

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

  const [editData, setEditData] = useState()
  const searchParams = useSearchParams()
  const Id = searchParams.get(`id`)

  useEffect(() => {
    form.reset(editData)
  }, [editData])

  const fetchPipeLineStatusById = async () => {
    try {
      const response = await PipelineStatusServices.getPipelineStatusBYId(Id)
      if (response.status === 200) {
        setEditData(response?.data?.data)
        const statusId = response?.data?.data.statusGroup.pipelineStatus.map(
          item => item.status
        )
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    fetchPipeLineStatusById()
  }, [Id])

  const handlePipelineStatusSubmit = async data => {
    try {
      const updatedData = {
        ...data,
        delete: removedIds,
        deleteRule: removeRuleIds,
        deleteIndicator: removedDayIds
      }
      const response = await PipelineStatusServices.updatePipelineStatusById(
        updatedData,
        Id
      )
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
        <LayoutHeader pageTitle={'Edit Pipeline'} />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handlePipelineStatusSubmit)}>
          <AddPipelineStatusForm
            form={form}
            setRemovedIds={setRemovedIds}
            setRemovedDayIds={setRemovedDayIds}
            editData={editData}
            setRemoveRuleIds={setRemoveRuleIds}
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
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

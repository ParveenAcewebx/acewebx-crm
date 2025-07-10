'use client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LeadsServices from '../../services/Leads/lead'
import FormSelectField from '../share/form/FormSelect'
import { DealConfidenceScore } from '../static-Values'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'

const DcsModal = ({ isOpen, onClose, dcsValue, getListLeads }) => {
  const editId = dcsValue?.original?.id || dcsValue?.id
  const form = useForm()

  // Fetch the lead by Id To update the Id
  const fetchLeadsById = async () => {
    try {
      const response = await LeadsServices.getleadById(editId)
      if (response?.status === 200) {
        const leadData = response.data.data
        form.reset(leadData)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (editId) {
      fetchLeadsById()
    }
  }, [editId])

  const handleScoreUpdate = async data => {
    console.log('data--update', data)
    try {
      const formData = new FormData()
      formData.append('id', editId)
      formData.append('dcs', data.dcs)
      const response = await LeadsServices.updateLeadDcsById(editId, formData)
      console.log('response', response)
      if (response?.status === 200) {
        await getListLeads()
        successMessage({ description: response?.data?.message })
        onClose()
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogTitle>Edit DCS</DialogTitle>
        <div>
          <FormProvider {...form}>
            <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit(handleScoreUpdate)()
              }}
            >
              <FormSelectField
                name='dcs'
                label='Deal Confidence Score'
                placeholder='Select Deal Confidence Score'
                options={DealConfidenceScore}
              />
              <Button type='submit' className='site-button mt-4'>Update</Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DcsModal

'use client'
import { LeadFormSchema } from '@/components/form-validations/LeadForm'
import LayoutHeader from '@/components/layoutHeader'
import AddLeadForm from '@/components/LeadsModule/AddLeadForm'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import LeadsServices from '@/services/Leads/lead'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

const AddLead = () => {
  useDocumentTitle('Add lead')
  const form = useForm({
    defaultValues: {
      dcs: '0%',
      project_id: '',
      company_id: '',
      contact_id: '',
      sale_person_id: '',
      engineer_id: '',
      lead_status_id: '',
      amount: '',
      pipelineStatus: '',
      leadTeamId: '',
      leadTags: [],
      date_record: new Date(),
      due_date: new Date(),
      defaultAssignTeam: '',
      secondary_contact:[],
    },
    resolver: yupResolver(LeadFormSchema)
  })
  const router = useRouter()
  // Funtion to Submit the Lead
  const handleLeadSubmit = async data => {
    console.log('data9090', data)
    const isDelayedValue =
      Array.isArray(data.isDelayed) && data.isDelayed.includes('true')
        ? 'true'
        : 'false'
    try {
      const formData = new FormData()

      // Format date fields
      formData.append('date_record', formatDateForMySQL(data.date_record))
      formData.append('due_date', formatDateForMySQL(data.due_date))
      formData.append('nextStepDate', formatDateForMySQL(data.nextStepDate))
      // Direct fields
      formData.append('dcs', data.dcs || '')
      formData.append('isDelayed', isDelayedValue)
      formData.append('project_id', data.project_id || '')
      formData.append('company_id', data.company_id || '')
      formData.append('contact_id', data.contact_id || '')
      formData.append('sale_person_id', data.sale_person_id || '')
      formData.append('engineer_id', data.engineer_id || '')
      formData.append('pipelineType', data.pipelineType || '')
      formData.append('nextAction', data.nextAction || '')
      formData.append('priority', data.priority || '')
      formData.append('pipelineStatus', Number(data.pipelineStatus) || '')
      // formData.append('secondary_contact', data.secondary_contact || '')
      formData.append('lead_status_id', data.lead_status_id || '')
      formData.append('amount', data.amount || '')
      formData.append('leadTeamId', data.leadTeamId || '')
      formData.append('defaultAssignTeam', data.defaultAssignTeam || '')


      // Handle multi-select array
      if (data.leadTags?.length > 0) {
        data.leadTags.forEach((tag, index) => {
          formData.append(`leadTags[${index}]`, tag)
        })
      }
      if (data.emails?.length > 0) {
        data.emails.forEach((emails, index) => {
          formData.append(`emails[${index}]`, emails)
        })
      }
      if (data.teamLead?.length > 0) {
        data.teamLead.forEach((team, index) => {
          formData.append(`teamLead[${index}]`, team)
        })
      } 
      if (data.secondary_contact?.length > 0) {
        data.secondary_contact.forEach((secondaryContact, index) => {
          formData.append(`secondary_contact[${index}]`, secondaryContact)
        })
      }
     
      const response = await LeadsServices.addLeads(formData)
      if (response.status === 200) {
        successMessage({ description: response?.data?.message })
        router.push('/dashboard/leads')
        form.reset()
      } else {
        errorMessage({
          description: response?.data?.message || 'Something went wrong.'
        })
      }
    } catch (error) {
      console.error('Lead submission error:', error)
      errorMessage({
        description:
          error?.response?.data?.message ||
          'Submission failed. Please try again.'
      })
    }
  }

  const handleBack = () => {
    router.push('/dashboard/leads')
  }

  return (
    <>
      <div className='flex justify-between'>
        <LayoutHeader pageTitle={'Add Lead'} />
      </div>
      <div className='mt-3'>
        <div className='pb-2 text-xl'>Leads Details</div>
        <Separator />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleLeadSubmit)}>
          <AddLeadForm form={form} />
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

export default AddLead

'use client'
import LayoutHeader from '@/components/layoutHeader'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import LeadsServices from '@/services/Leads/lead'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { formatDateForMySQL } from '../utils/dateFormat'
import AddLeadForm from './AddLeadForm'
// import AttributeTableData from './attribute-tableData'

const EditLeads = ({
  editLeadId,
  setOpenDialog,
  fetchLeadById,
  handleModalClose
}) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || editLeadId

  const pathName = usePathname()

  const dashBoard = pathName === `/dashboard/leads/preview`

  const form = useForm()
  useDocumentTitle('Edit Leads')
  const router = useRouter()

  // Fetch the lead by Id To update the Id
  const fetchLeadsById = async () => {
    try {
      const response = await LeadsServices.getleadById(id)
      if (response?.status === 200) {
        const leadData = response.data.data
        console.log('leadData', leadData)
        // Pre-fill form values
        const formattedData = {
          ...leadData,
          date_record: new Date(leadData.date_record),
          due_date: new Date(leadData.due_date),
          nextStepDate: new Date(leadData.nextStepDate),
          dcs: leadData.dcs?.toString() || '',
          amount: leadData.amount || '',
          project_id: leadData.project?.id?.toString() || '',
          isDelayed: leadData.isDelayed === 'true' ? ['true'] : [],
          company_id: leadData?.company?.id?.toString() || '',
          contact_id: leadData?.contact?.id?.toString() || '',
          sale_person_id: leadData?.salePerson?.id?.toString() || '',
          engineer_id: leadData.engineer?.id?.toString() || '',
          lead_status_id: leadData.leadStatus?.id?.toString() || '',
          pipelineType: leadData.pipelineType?.id?.toString() || '',
          pipelineStatus: leadData.pipelineStatus?.id?.toString() || '',
          leadTeamId: leadData.leadTeam?.id?.toString() || '',
          defaultAssignTeam: leadData.defaultAssignTeam?.id?.toString() || '',
          selectdefaultAssignTeam:
            leadData.selectdefaultAssignTeam?.id?.toString() || '',
          nextAction: leadData.nextAction || '',
          priority: leadData.priority || '',
          leadTeamMembers: leadData?.leadTeamMembers?.map(item =>
            String(item?.user_id)
          ),
          leadTags:
            leadData.leadTags?.map(item => item.tag.id.toString()) || [],
          secondary_contact: leadData.secondary_contact
            ? JSON.parse(leadData.secondary_contact)
            : []
        }
        form.setValue('leadTeamId', leadData.leadTeam?.id?.toString() || '')
        form.setValue('contact_id', leadData.contact?.id?.toString())
        form.setValue('pipelineStatus', String(leadData.pipelineStatus))
        form.reset(formattedData)
      }
    } catch (error) {
      console.log('errorerrorerrorerrorerrorerror', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  useEffect(() => {
    if (id) {
      fetchLeadsById()
    }
  }, [id])

  // handle to edit
  const handleLeadUpdateSubmit = async data => {
    const isDelayedValue =
      Array.isArray(data.isDelayed) && data.isDelayed.includes('true')
        ? 'true'
        : 'false'
    try {
      const formData = new FormData()

      formData.append('_method', 'PUT')
      formData.append('id', id)
      formData.append('date_record', formatDateForMySQL(data.date_record))
      formData.append('due_date', formatDateForMySQL(data.due_date))
      formData.append('nextStepDate', formatDateForMySQL(data.nextStepDate))
      formData.append('dcs', data.dcs || '')
      formData.append('project_id', data.project_id || '')
      formData.append('dcs', data.dcs || '')
      formData.append('isDelayed', isDelayedValue)
      formData.append('company_id', data.company_id || '')
      // formData.append('secondary_contact', data.secondary_contact || '')
      formData.append('contact_id', data.contact_id || '')
      formData.append('sale_person_id', data.sale_person_id || '')
      formData.append('pipelineType', data.pipelineType || '')
      formData.append('nextAction', data.nextAction || '')
      formData.append('priority', data.priority || '')
      formData.append('pipelineStatus', Number(data.pipelineStatus) || '')
      formData.append('engineer_id', data.engineer_id || '')
      formData.append('lead_status_id', data.lead_status_id || '')
      formData.append('amount', data.amount || '')
      formData.append('leadTeamId', data.leadTeamId || '')
      formData.append('defaultAssignTeam', data.defaultAssignTeam || '')
      formData.append(
        'leadTeamMembers',
        JSON.stringify(data?.leadTeamMembers || [])
      )
      // Handle multi-select leadTags array
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
      const responseEdit = await LeadsServices.updateLeadById(id, formData)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        if (!dashBoard) {
          router.push('/dashboard/leads')
        } else {
          setOpenDialog(false)
          fetchLeadById()
        }
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }

  return (
    <>
      {!dashBoard && (
        <div className='flex justify-between'>
          <LayoutHeader pageTitle={'Edit Lead'} />
        </div>
      )}
      <div className='mt-5'>
        <div className='pb-2 text-xl font-medium'>Leads Details</div>
        <Separator />
      </div>
      <div className=''>
        <FormProvider {...form}>
          <form
            className=''
            onSubmit={form.handleSubmit(handleLeadUpdateSubmit)}
          >
            <AddLeadForm form={form} dashBoard={dashBoard} editId={id} />
            <div className='mt-4 flex justify-end gap-4'>
              {dashBoard ? (
                <Button
                  type='button'
                  className='site-button bg-white'
                  onClick={handleModalClose}
                >
                  Close
                </Button>
              ) : (
                <Link href='/dashboard/leads'>
                  <Button type='button' className='site-button bg-white'>
                    Back
                  </Button>
                </Link>
              )}

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

export default EditLeads

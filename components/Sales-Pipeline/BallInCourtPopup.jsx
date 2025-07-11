'use client'
import api from '@/lib/api'
import { useEffect, useState } from 'react'
import FormDatePicker from '../share/form/datePicker'
import FormSelectField from '../share/form/FormSelect'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { Form } from '../ui/form'
import UpdateAssignUser from './UpdateAssignUser'

function BallInCourtPopup({
  openDialog,
  setOpenDialog,
  form,
  finalDragEnd,
  leadId
}) {
  const [OpenUserModal, setOpenUserModal] = useState(false)
  const [teamMembers, setTeamMeambers] = useState([])
  const [resetData, setResetData] = useState([])
  const [departmentsId, setDepartmentsId] = useState()

  console.log('departmentsId', departmentsId)
  const fetchData = async () => {
    try {
      if (leadId !== undefined) {
        const response = await api.get(`/get-lead-team-members/${leadId}`)

        if (response.status === 200) {
          if (teamMembers?.length !== 0) {
            setResetData([])
          } else {
            setResetData(response?.data?.data)
          }
          const modifyProjectData =
            response?.data?.data?.map(item => ({
              label: item.name,
              value: String(item.id)
            })) || []

          console.log('modifyProjectData', modifyProjectData)
          setTeamMeambers(modifyProjectData)
          const ids = response?.data?.data?.map(item => item.id).join(',') || ''
          setDepartmentsId(ids)
        }
      }
    } catch (error) {
      console.log('errorerrorerrorerror', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [leadId])

  useEffect(() => {
    if (OpenUserModal == false) {
      setResetData([])
      form?.setValue('teamLead', '')
    }
  }, [OpenUserModal])

  return (
    <>
      <div>
        {' '}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className='max-h-[90vh] overflow-y-auto transition-all duration-300'>
            <DialogHeader>
              <DialogTitle>
                <div className='mt-8 flex items-center justify-between'>
                  <span>Assign User</span>
                  <Button
                    variant='ghost'
                    type='button'
                    className='site-button-small bg-white'
                    onClick={() => setOpenUserModal(true)}
                  >
                    Add User
                  </Button>
                </div>
              </DialogTitle>

              <DialogDescription>
                {/* Add notes or interactions related to this customer. */}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(finalDragEnd)}>
                <FormSelectField
                  form={form}
                  name='assigned_user'
                  label=''
                  placeholder='Select User'
                  options={teamMembers}
                />
                <FormDatePicker
                  form={form}
                  name='nextStepDate'
                  label='Next Step Date '
                />

                <div className='mt-4 flex justify-end'>
                  <Button type='submit' className='site-button'>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <UpdateAssignUser
        departmentsId={departmentsId}
        OpenUserModal={OpenUserModal}
        setOpenUserModal={setOpenUserModal}
        form={form}
        leadId={leadId}
        fetchData={fetchData}
        resetData={resetData}
      />
    </>
  )
}

export default BallInCourtPopup

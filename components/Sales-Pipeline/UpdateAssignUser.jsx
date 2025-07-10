'use client'
import api from '@/lib/api'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormMultiSelectField from '../share/form/FormMultiSelect'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { Form } from '../ui/form'

function UpdateAssignUser({
  departmentsId,
  OpenUserModal,
  setOpenUserModal,
  leadId,
  fetchData,
  resetData
}) {
  const form = useForm()
  const [salePerson, setSalePerson] = useState([])

  const getUsers = async () => {
    try {
      if (leadId !== undefined) {
        const response = await api.get(`/users?type=internal`)
        if (response.status === 200) {
          setSalePerson(response?.data.data)
        }
      }
    } catch (error) {
      errorMessage({
        description: error?.response?.data?.message || 'Something went wrong.'
      })
    }
  }
  useEffect(() => {
    getUsers()
  }, [leadId])

  const handleUserSubmit = async data => {
    console.log('leadId', leadId)
    try {
      if (leadId !== undefined) {
        const responseEdit = await api.put(
          `/update-lead-team-member/${leadId}`,
          {
            ...data,
            leadId: leadId
          }
        )
        if (responseEdit?.status === 200) {
          form.reset()
          successMessage({ description: responseEdit?.data?.message })
          fetchData()
          setOpenUserModal(false)
        }
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  useEffect(() => {
    if (resetData) {
      const resetFormfield = resetData
        .filter(item => item?.id !== null && item?.id !== undefined)
        .map(item => String(item.id))
      form?.setValue('members', resetFormfield)
    }
  }, [resetData])
  

  return (
    <>
      <div>
        {' '}
        <Dialog open={OpenUserModal} onOpenChange={setOpenUserModal}>
          <DialogContent className='max-h-[90vh] overflow-visible transition-all duration-300'>
            <DialogHeader>
              <DialogTitle>Add User </DialogTitle>
              <DialogDescription>
                {/* Add notes or interactions related to this customer. */}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUserSubmit)}>
                <FormMultiSelectField
                  form={form}
                  name='members'
                  label='Assign Team'
                  placeholder='Select Assign Team Members'
                  options={
                    salePerson.length > 0
                      ? salePerson.map(data => ({
                          label: data.name,
                          value: String(data.id)
                        }))
                      : []
                  }
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
    </>
  )
}

export default UpdateAssignUser

'use client'

import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import LeadsServices from '@/services/Leads/lead'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import TaskFormField from './TaskFormField'

const EditTask = ({
  editId,
  getTaskList,
  setOpenDialog,
  taskId,
  setTaskId
}) => {
  // Taskalidation
  // { resolver: yupResolver(Taskalidation) }
  const form = useForm()

  const fetchTaskData = async () => {
    try {
      const response = await LeadsServices.getTicketsById(taskId)
      console.log('responsetaskkk', response)

      const task = response?.data?.data

      form.reset({
        requiredToMoveStatus: task?.requiredToMoveStatus || '',
        ticketStatus: task?.ticketStatus !== undefined ? task.ticketStatus : '',
        ticketGroupId: task?.ticketGroupId ? String(task.ticketGroupId) : '',
        ticketSubjectId: task?.ticketSubjectId
          ? String(task.ticketSubjectId)
          : task?.taskSubjects?.id
            ? String(task.taskSubjects.id)
            : '',
        projectId: task?.project?.id ? String(task.project.id) : '',
        ticketUrgencyId: task?.ticketUrgencyId
          ? String(task.ticketUrgencyId)
          : task?.taskUrgencies?.id
            ? String(task.taskUrgencies.id)
            : '',
        companyId: String(task.company.id) || '',
        ticketUsers:
          task?.ticketUsers
            ?.map(user => user?.id?.toString())
            .filter(Boolean) || [],

        leadTags:
          task?.leadTags?.map(tag => tag?.id?.toString()).filter(Boolean) || [],
        checklist: task?.checklist || '',
        description: task?.description || '',
        file: task?.file || '',
        dueDate: task?.dueDate ? new Date(task.dueDate) : '' // make sure field name matches API
      })
    } catch (error) {
      console.error('Failed to fetch task data:', error)
    }
  }

  useEffect(() => {
    fetchTaskData()
  }, [])

  const onSubmit = async data => {
    console.log('mydata', data)
    const payload = {
      ...data,
      requiredToMoveStatus: data.requiredToMoveStatus,
      leadId: editId,
      dueDate: formatDateForMySQL(data.dueDate)
    }

    try {
      const response = await LeadsServices.editTickets(taskId, payload)
      if (response?.status === 200) {
        successMessage({
          description: response?.data?.message
        })
        setOpenDialog(false)
        getTaskList()
        setTaskId(null)
        form.reset()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TaskFormField form={form} />
          <div className='mt-4 flex justify-end'>
            <Button type='submit' className='site-button'>
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default EditTask

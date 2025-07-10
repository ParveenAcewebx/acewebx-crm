'use client'

import { TaskValidation } from '@/components/form-validations/dashboardtaskValidation'
import { successMessage } from '@/components/ToasterMessage'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { formatDateForMySQL } from '@/components/utils/dateFormat'
import LeadsServices from '@/services/Leads/lead'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import TaskFormField from './TaskFormField'

const TaskForm = ({ editId, getTaskList, setOpenDialog }) => {
  const form = useForm({ resolver: yupResolver(TaskValidation) })

  const onSubmit = async data => {
    console.log('mydata', data)

    const formData = new FormData()
    formData.append('lead_id', editId)
    formData.append('checklist', data.checklist)
    formData.append('company_id', Number(data.company_id))
    formData.append('description', data.description)
    formData.append('project_id', Number(data.project_id))

    if (data.taskUsers?.length > 0) {
      data.taskUsers?.forEach((tag, index) => {
        formData.append(`taskUsers[${index}]`, tag)
      })
    }
    if (data.taskTags?.length > 0) {
      data.taskTags?.forEach((tag, index) => {
        formData.append(`taskTags[${index}]`, tag)
      })
    }
    formData.append('task_group_id', data.task_group_id)
    formData.append('task_status_id', Number(data.task_status_id))
    formData.append('task_subject_id', Number(data.task_subject_id))
    formData.append('task_urgency_id', Number(data.task_urgency_id))
    formData.append('file', data.file)
    formData.append('due_date', formatDateForMySQL(data.dueDate))
    try {
      const response = await LeadsServices.addTask(formData)
      if (response?.status === 200) {
        successMessage({
          description: response?.data?.message
        })
        setOpenDialog(false)

        getTaskList()
        getActivities()
        form.reset()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TaskFormField form={form} />
          <div className='mt-4 flex justify-end'>
            <Button type='submit' className='site-button'>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default TaskForm

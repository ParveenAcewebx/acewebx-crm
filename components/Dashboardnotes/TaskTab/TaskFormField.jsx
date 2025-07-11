'use client'
import FormCheckBox from '@/components/share/form/CheckBox'
import FormDatePicker from '@/components/share/form/datePicker'
import FormInputField from '@/components/share/form/FormInputField'
import FormMultiSelectField from '@/components/share/form/FormMultiSelect'
import SelectFilter from '@/components/share/form/SelectFilter'
import FormTextArea from '@/components/share/form/TextArea'
import TextEditor from '@/components/share/form/TextEditor'
import api from '@/lib/api'
import BudgetBooksServices from '@/services/BudgetBook/budgetBook'
import { useEffect, useState } from 'react'

const TaskFormField = ({ form }) => {
  const [allTask, setAllTask] = useState([])
  const [taskGroup, setTaskGroup] = useState([])
  const [taskSubject, setTaskSubject] = useState([])
  const [company, setCompany] = useState([])
  const [taskUrgency, setTaskUrgency] = useState([])
  const [taskUser, setTaskUser] = useState([])
  const [taskTag, setTaskTag] = useState([])
  const [budgetBook, setBudgetBook] = useState([])
  /// get project
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          groupRes,
          subjectRes,
          companyRes,
          urgencyRes,
          userRes,
          tagRes,
          budgetRes
        ] = await Promise.all([
          api.get('/task-groups'),
          api.get('/task-subjects'),
          api.get('/companies'),
          api.get('/task-urgencies'),
          api.get(`/users?type=internal`),
          api.get('/task-tags'),
          BudgetBooksServices.budgetBooks()
        ])

        if (groupRes.status === 200) setTaskGroup(groupRes.data.data)
        if (subjectRes.status === 200) setTaskSubject(subjectRes.data.data)
        if (companyRes.status === 200) setCompany(companyRes.data.data)
        if (urgencyRes.status === 200) setTaskUrgency(urgencyRes.data.data)
        if (userRes.status === 200) setTaskUser(userRes.data.data)
        if (tagRes.status === 200) setTaskTag(tagRes.data.data)
        if (budgetRes.status === 200) setBudgetBook(budgetRes.data.data)
      } catch (error) {
        console.log('Fetch error', error)
      }
    }

    fetchAllData()
  }, [])

  return (
    <>
      <div className='grid grid-cols-2 gap-5'>
        <div className='item-center flex gap-4'>
          <div>
            <FormCheckBox
              name='requiredToMoveStatus'
              className='mx-2 my-5 w-[20x] !text-base'
              form={form}
              items={[
                {
                  value: true,
                  label: 'Required to Move Status'
                }
              ]}
            />
          </div>
        </div>

        <SelectFilter
          form={form}
          name='ticketStatus'
          label='Status'
          placeholder='Select Ticket Status'
          options={[
            {
              value: true,
              label: 'Open'
            },
            {
              value: false,
              label: 'Close'
            }
          ]}
        />
        <SelectFilter
          form={form}
          name='ticketGroupId'
          label='Group'
          placeholder='Select Ticket Group'
          options={
            taskGroup.length > 0
              ? taskGroup.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
        <SelectFilter
          form={form}
          name='ticketSubjectId'
          label='Subject'
          placeholder='Select Ticket Subject'
          options={
            taskSubject.length > 0
              ? taskSubject.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
        <SelectFilter
          form={form}
          name='projectId'
          label='Project'
          placeholder='Select Project'
          options={
            budgetBook.length > 0
              ? budgetBook.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />
        <SelectFilter
          form={form}
          name='ticketUrgencyId'
          label='Urgency'
          placeholder='Select Ticket Urgency'
          options={
            taskUrgency.length > 0
              ? taskUrgency.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />

        <SelectFilter
          form={form}
          name='companyId'
          label='Company'
          placeholder='Select Company'
          options={
            company.length > 0
              ? company.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />

        <FormMultiSelectField
          form={form}
          name='ticketUsers'
          label='User'
          placeholder='Select Ticket User'
          options={
            taskUser.length > 0
              ? taskUser.map(data => ({
                  label: data.name,
                  value: String(data.id)
                }))
              : []
          }
        />

        <FormMultiSelectField
          form={form}
          name='leadTags'
          label='Tags'
          placeholder='Select Ticket Tags'
          options={
            taskTag.length > 0
              ? taskTag.map(data => ({
                  label: data.title,
                  value: String(data.id)
                }))
              : []
          }
        />
        <FormDatePicker
          form={form}
          name='dueDate'
          label='Due Date'
          placeholder='Select Due Date'
        />
        <FormInputField
          form={form}
          name='file'
          placeholder='File Link'
          label='File'
        />
      </div>
      <FormTextArea
        className='rounded-6 !h-12 !max-h-28 !min-h-12 w-full bg-white !pr-7 pt-3 !shadow-[0_0_15px_-13px_black] shadow-slate-100'
        form={form}
        name='checklist'
        label='Check List'
        placeholder='Enter Check List'
        type='text'
      />
      <TextEditor
        name='description'
        form={form}
        label='Description'
        className='text-editor'
      />
    </>
  )
}

export default TaskFormField

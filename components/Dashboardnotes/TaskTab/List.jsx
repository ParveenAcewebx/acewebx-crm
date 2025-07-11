'use client'

import DialogBox from '@/components/modal/DialogBox'
import { DataTable } from '@/components/Table'
import { errorMessage, successMessage } from '@/components/ToasterMessage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import LeadsServices from '@/services/Leads/lead'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import EditTask from './EditTask'
import { ticketColumn } from './taskColumn'
import TaskForm from './TaskForm'

const TaskList = ({ editId, editData }) => {
  console.log('editData11', editData)

  const taskList = [
    {
      id: '1',
      requiredToMoveStatus: true,
      task_status_id: '2',
      taskStatus: { title: 'In Progress' },
      task_group_id: '7',
      taskGroup: { name: 'Frontend' },
      task_subject_id: '9',
      taskSubject: { name: 'UI Design' },
      project_id: '104',
      project: { name: 'Project Alpha' },
      task_urgency_id: '8',
      taskUrgency: { name: 'High' },
      company_id: '106',
      company: { name: 'OpenAI Inc' },
      taskUsers: [{ user: { name: 'Alice' } }],
      taskTags: [{ tag: { title: 'Urgent' } }],
      dueDate: '2025-07-20T18:30:00.000Z',
      file: 'File link example 1',
      checklist: 'Checklist item 1, item 2',
      description: '<p>Description for first task</p>',
      defaultNotes: 'Default note 1',
      defaultListsPerStatus: ['item1', 'item2'],
      leadTeamUsers: ['73', '74'],
      defaultBasedOnTicketConfig: '1',
      additionalInfoOnStatusChange: 'Extra info for first task',
      updated_at: '2025-07-10T10:00:00.000Z'
    },
    {
      id: '2',
      requiredToMoveStatus: false,
      task_status_id: '3',
      taskStatus: { title: 'Review' },
      task_group_id: '8',
      taskGroup: { name: 'Backend' },
      task_subject_id: '10',
      taskSubject: { name: 'API Development' },
      project_id: '105',
      project: { name: 'Project Beta' },
      task_urgency_id: '9',
      taskUrgency: { name: 'Medium' },
      company_id: '107',
      company: { name: 'Example Corp' },
      taskUsers: [{ user: { name: 'Bob' } }],
      taskTags: [{ tag: { title: 'Feature' } }],
      dueDate: '2025-07-21T18:30:00.000Z',
      file: 'File link example 2',
      checklist: 'Checklist item A, item B',
      description: '<p>Description for second task</p>',
      defaultNotes: 'Default note 2',
      defaultListsPerStatus: ['item3', 'item4'],
      leadTeamUsers: ['74', '75'],
      defaultBasedOnTicketConfig: '2',
      additionalInfoOnStatusChange: 'Extra info for second task',
      updated_at: '2025-07-11T11:00:00.000Z'
    },
    {
      id: '3',
      requiredToMoveStatus: true,
      task_status_id: '4',
      taskStatus: { title: 'Completed' },
      task_group_id: '9',
      taskGroup: { name: 'Testing' },
      task_subject_id: '11',
      taskSubject: { name: 'Unit Tests' },
      project_id: '106',
      project: { name: 'Project Gamma' },
      task_urgency_id: '10',
      taskUrgency: { name: 'Low' },
      company_id: '108',
      company: { name: 'Tech Solutions' },
      taskUsers: [{ user: { name: 'Charlie' } }],
      taskTags: [{ tag: { title: 'QA' } }],
      dueDate: '2025-07-22T18:30:00.000Z',
      file: 'File link example 3',
      checklist: 'Checklist item X, item Y',
      description: '<p>Description for third task</p>',
      defaultNotes: 'Default note 3',
      defaultListsPerStatus: ['item5', 'item6'],
      leadTeamUsers: ['75', '76'],
      defaultBasedOnTicketConfig: '1',
      additionalInfoOnStatusChange: 'Extra info for third task',
      updated_at: '2025-07-12T12:00:00.000Z'
    },
    {
      id: '4',
      requiredToMoveStatus: false,
      task_status_id: '5',
      taskStatus: { title: 'Pending' },
      task_group_id: '10',
      taskGroup: { name: 'Deployment' },
      task_subject_id: '12',
      taskSubject: { name: 'Release' },
      project_id: '107',
      project: { name: 'Project Delta' },
      task_urgency_id: '11',
      taskUrgency: { name: 'Critical' },
      company_id: '109',
      company: { name: 'AI Labs' },
      taskUsers: [{ user: { name: 'Dave' } }],
      taskTags: [{ tag: { title: 'Release' } }],
      dueDate: '2025-07-23T18:30:00.000Z',
      file: 'File link example 4',
      checklist: 'Checklist item M, item N',
      description: '<p>Description for fourth task</p>',
      defaultNotes: 'Default note 4',
      defaultListsPerStatus: ['item7', 'item8'],
      leadTeamUsers: ['76', '77'],
      defaultBasedOnTicketConfig: '2',
      additionalInfoOnStatusChange: 'Extra info for fourth task',
      updated_at: '2025-07-13T13:00:00.000Z'
    }
  ]

  // const [taskList, setTaskList] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteOpenModal, setDeleteOpenModal] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const [taskData, setTaskData] = useState([])
  const [totalRecord, setTotalRecord] = useState()
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(10)
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm({
    defaultValues: {
      length: '10'
    }
  })
  useEffect(() => {
    const ticketId = searchParams.get('ticket')

    if (ticketId) {
      setTaskId(ticketId)
      setOpenDialog(true)
    } else {
      setTaskId(null)
      setOpenDialog(false)
    }
  }, [searchParams])

  const getTaskList = async () => {
    try {
      setLoading(true)
      const res = await LeadsServices.tasksAll(editId, length, page)
      if (res?.status === 200) {
        setTaskList(res?.data?.data)
        setTotalRecord(res?.data?.meta?.total)
      }
    } catch (error) {
      console.log(error)
      // errorMessage({
      //   description: error?.response?.data?.message
      // })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getTaskList()
  }, [page, length])

  const onDelete = async () => {
    if (deleteIndex !== null) {
      try {
        const res = await LeadsServices.deleteTask(deleteIndex)
        setDeleteOpenModal(false)
        if (res?.status === 200) {
          getTaskList()
          successMessage({ description: res?.data?.message })
        }
      } catch (error) {
        console.log('errorerror', error)
        errorMessage({
          description: error?.response?.data?.message
        })
      }
    }
  }

  const handleDeleteTask = row => {
    setDeleteOpenModal(true)
    setDeleteIndex(row?.original?.id)
  }

  const handleEditTask = row => {
    const ticketId = row.original.id
    setTaskId(ticketId)
    setTaskData(taskList)

    const current = new URLSearchParams(searchParams.toString())
    current.set('ticket', ticketId)

    router.push(`?${current.toString()}`)
    setOpenDialog(true)
  }
  const deleteHandleModalClose = () => {
    setDeleteOpenModal(false)
  }
  const handleAddTask = () => {
    setOpenDialog(true)
  }
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'length') {
        const val = value.length
        setLength(val === 'all' ? totalRecord || 9999 : Number(val))
        setPage(1)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, totalRecord])
  return (
    <div>
      <DataTable
        data={editData?.tickets}
        loading={loading}
        columns={ticketColumn(handleDeleteTask, handleEditTask)}
        totalRecord={totalRecord}
        page={page}
        setPage={setPage}
        length={length}
      />

      <DialogBox
        onDelete={onDelete}
        description='Are you certain you want to proceed with this deletion?'
        deleteOpenModal={deleteOpenModal}
        deleteHandleModalClose={deleteHandleModalClose}
      />

      <Dialog
        open={openDialog}
        onOpenChange={isOpen => {
          setOpenDialog(isOpen)
          if (!isOpen) {
            setTaskId(null)
            setTaskData([])
          }
        }}
      >
        <DialogContent className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'>
          <DialogHeader>
            <DialogTitle>{taskId !== null ? 'Edit Ticket' : ''}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {taskId !== null ? (
            <>
              <EditTask
                editId={editId}
                getTaskList={getTaskList}
                setOpenDialog={setOpenDialog}
                taskId={taskId}
                setTaskId={setTaskId}
              />
            </>
          ) : (
            <>
              <TaskForm
                editId={editId}
                getTaskList={getTaskList}
                setOpenDialog={setOpenDialog}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TaskList

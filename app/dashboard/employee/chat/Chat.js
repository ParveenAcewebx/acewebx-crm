'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ActionsDots from '@/components/ActionsDots'
import { Separator } from '@/components/ui/separator'
import EmployeesApi from '@/services/cadidateApis/employees/EmployeesApi'

function EmployeeChatCompo({ id }) {
  const form = useForm({ defaultValues: { chat: '' } })
  const [allChat, setAllChat] = useState([])
  const [isEditMsg, setIsEditMsg] = useState(false)
  const [editMsgId, setEditMsgId] = useState(null)
  const message = form.watch('chat')
  const bottomRef = useRef(null)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const messageSendHandler = async () => {
    if (!message?.trim()) return
    const data = {
      message,
      employeeId: id
    }

    try {
      await EmployeesApi.addMessageEmployee(data)
      form.reset()
      await getAllChats()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const editMsgHandler = async () => {
    if (!message?.trim() || !editMsgId) return
    try {
      await EmployeesApi.editMessageEmployee(editMsgId, message)
      form.reset()
      setIsEditMsg(false)
      setEditMsgId(null)
      await getAllChats()
    } catch (error) {
      console.error('Error editing message:', error)
    }
  }

  const getByIdMsgHandler = async id => {
    try {
      setIsEditMsg(true)
      setEditMsgId(id)
      const oldMsg = await EmployeesApi.getByIdMessageEmployee(id)
      form.setValue('chat', oldMsg?.data?.data?.message || '')
    } catch (error) {
      console.error('Error fetching message by ID:', error)
    }
  }

  const deleteMsgHandler = async id => {
    try {
      await EmployeesApi.deleteMessageEmployee(id)
      await getAllChats()
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const getAllChats = async () => {
    try {
      const allMsg = await EmployeesApi.getAllMessagesEmployee(id)
      setAllChat(allMsg?.data?.data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const cancelEditHandler = () => {
    setIsEditMsg(false)
    setEditMsgId(null)
    form.reset()
  }

  useEffect(() => {
    getAllChats()
  }, [])

  return (
    <Card className='w-full  border rounded-lg shadow-sm'>
      <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
        <CardTitle className='flex justify-between'>
          <div className='!text-lg '>Notes</div>

        </CardTitle>
      </CardHeader>
      <CardContent className='flex !p-4 flex-col gap-2 h-[360px] overflow-y-auto'>
        {allChat.length > 0 ? (
          allChat.map(item => {
            const createdTime = new Date(item?.createdAt)
            const updatedTime = new Date(item?.updatedAt)
            const formattedTime = createdTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })

            const isEdited =
              item?.message !== 'This message was deleted' &&
              createdTime.toLocaleTimeString() !== updatedTime.toLocaleTimeString()

            return (
              <Card className='mb-0 p-3 bg-muted rounded-md shadow-sm' key={item?.id}>
                {/* Message and action dots */}
                <div className='flex justify-between items-start'>
                  <p className='text-base text-muted-foreground !text-black mt-1 mb-2 flex-1'>
                    {item?.message}
                  </p>
                  {item?.message !== 'This message was deleted' && (
                    <ActionsDots
                      id={item?.id}
                      deleteMsgHandler={deleteMsgHandler}
                      getByIdMsgHandler={getByIdMsgHandler}
                    />
                  )}
                </div>

                {/* Edited flag if applicable */}
                {isEdited && (
                  <div className='text-xs italic text-gray-500 mb-1'>
                    Edited
                  </div>
                )}

                {/* User and timestamp */}
                <div className="text-xs flex ">
                  <span className='mr-2 text-gray-500'>{item?.userName ?? 'Unknown User'}</span>
                  <Separator orientation="vertical" className="h-5 bg-gray-300" />
                  <span className='ml-2 text-gray-500'>{formattedTime}</span>
                </div>
              </Card>

            )
          })
        ) : (
          <p className='text-sm text-muted-foreground'>No Messages Found!</p>
        )}
        <div ref={bottomRef} />

      </CardContent>
      <CardContent>
        <div className='mt-4 flex items-start gap-2'>
          {isEditMsg && (
            <Button
              variant='destructive'
              size='sm'
              onClick={cancelEditHandler}
              className='shrink-0'
            >
              X
            </Button>
          )}

          <Textarea
            {...form.register('chat')}
            placeholder='Type your message here...'
            className='flex-1 resize-none max-h-[150px] overflow-y-auto'
          />

          {message?.trim() && (
            <Button
              onClick={isEditMsg ? editMsgHandler : messageSendHandler}
              size='icon'
              variant='outline'
              className='shrink-0 border-gray-400 hover:bg-accent'
            >
              <svg
                viewBox='0 0 24 24'
                fill='none'
                stroke='#8C57FF'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-5 h-5'
              >
                <path d='M22 2L11 13' />
                <path d='M22 2L15 22L11 13L2 9L22 2Z' />
              </svg>
            </Button>
          )}
        </div>
      </CardContent>

    </Card>
  )
}

export default EmployeeChatCompo

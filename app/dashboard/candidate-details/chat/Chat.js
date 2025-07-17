'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import ChatApis from '@/services/cadidateApis/ChatApis'
import ActionsDots from '@/components/ActionsDots'

function ChatCompo() {
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
    try {
      await ChatApis.addMessage(message)
      form.reset()
      await getAllChats()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const editMsgHandler = async () => {
    if (!message?.trim() || !editMsgId) return
    try {
      await ChatApis.editMessage(editMsgId, message)
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
      const oldMsg = await ChatApis.getByIdMessage(id)
      form.setValue('chat', oldMsg?.data?.data?.message || '')
    } catch (error) {
      console.error('Error fetching message by ID:', error)
    }
  }

  const deleteMsgHandler = async id => {
    try {
      await ChatApis.deleteMessage(id)
      await getAllChats()
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const getAllChats = async () => {
    try {
      const allMsg = await ChatApis.getAllMessages()
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
    <Card className='w-full p-4 border rounded-lg shadow-sm'>
      <CardContent className='flex flex-col gap-4 h-[360px] overflow-y-auto'>
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
              <div className='mb-4 p-3 bg-muted rounded-md shadow-sm' key={item?.id}>
                <div className='flex justify-between items-center'>
                  <p className='text-sm font-medium text-foreground'>
                    {item?.userName ?? 'Unknown User'}
                  </p>

                  {item?.message !== 'This message was deleted' && (
                    <ActionsDots
                      id={item?.id}
                      deleteMsgHandler={deleteMsgHandler}
                      getByIdMsgHandler={getByIdMsgHandler}
                    />
                  )}
                </div>

                <p className='text-base text-muted-foreground mt-1 mb-2'>{item?.message}</p>

                <div className='flex items-center justify-between text-xs text-gray-500'>
                  {isEdited && <span className='italic'>Edited</span>}
                  <span>{formattedTime}</span>
                </div>
              </div>
            )
          })
        ) : (
          <p className='text-sm text-muted-foreground'>No Messages Found!</p>
        )}
        <div ref={bottomRef} />
      </CardContent>

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
    </Card>
  )
}

export default ChatCompo

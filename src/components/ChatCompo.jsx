'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Card, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import FormInput from './forminputs/FormInput'
import ChatApis from './services/ChatApis'
import ActionsDots from './ActionsDots'

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

  // useEffect(() => {
  //   scrollToBottom()
  // }, [allChat])

  return (
    <Card className='message-box'>
      <div className='chat-messages'>
        {allChat?.length > 0 ? (
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
              <div className='message-content' key={item?.id}>
                <div className='message-header'>
                  <Typography variant='subtitle2' className='username'>
                    {item?.userName ?? 'Unknown User'}
                  </Typography>

                  {item?.message !== 'This message was deleted' && (
                    <ActionsDots
                      id={item?.id}
                      deleteMsgHandler={deleteMsgHandler}
                      getByIdMsgHandler={getByIdMsgHandler}
                    />
                  )}
                </div>

                <Typography className='message-text mb-3'>{item?.message}</Typography>

                {isEdited && (
                  <Typography variant='caption' className='timestampedited'>
                    Edited
                  </Typography>
                )}

                <Typography variant='caption' className='timestamp'>
                  {formattedTime}
                </Typography>
              </div>
            )
          })
        ) : (
          <Typography>No Messages Found!</Typography>
        )}
        <div ref={bottomRef} />
      </div>

      <div className='chat-input'>
        {isEditMsg && (
          <button onClick={cancelEditHandler} className='bg-blue-500 text-white px-2 rounded mr-2 dont-edit'>
            X
          </button>
        )}

        <FormInput
          control={form.control}
          name='chat'
          placeholder='Type your message here...'
          multiline
          minRows={1}
          maxRows={6}
          sx={{
            '& .MuiInputBase-root': {
              maxHeight: '150px',
              overflowY: 'auto'
            }
          }}
        />

        {message?.trim() && (
          <button onClick={isEditMsg ? editMsgHandler : messageSendHandler} className='send-button'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='#8C57FF'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M22 2L11 13' />
              <path d='M22 2L15 22L11 13L2 9L22 2Z' />
            </svg>
          </button>
        )}
      </div>
    </Card>
  )
}

export default ChatCompo

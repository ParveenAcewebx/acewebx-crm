'use client'
import React, { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import FormInput from './forminputs/FormInput'
import ChatApis from './services/ChatApis'
import ActionsDots from './ActionsDots'

function ChatCompo() {
  const form = useForm({ defaultValues: { chat: '' } })
  const [allChat, setAllChat] = useState([])
  const message = form.watch('chat')
  const bottomRef = useRef(null)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const messageSendHandler = async () => {
    try {
      await ChatApis.addMessage(message)
      form.reset()
      await getAllChats()
    } catch (error) {
      console.error('Error sending message:', error)
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

  useEffect(() => {
    getAllChats()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [allChat])

  return (
    <Card className='message-box'>
      <div className='chat-messages'>
        {allChat?.length > 0 ? (
          allChat.map((item, index) => {
            const formattedTime = new Date(item?.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })

            return (
                <div className='message-content' key={index}>
                <div className='message-header'>
                  <Typography variant='subtitle2' className='username'>
                    {item?.userName ?? 'Unknown User'}
                  </Typography>
                  <ActionsDots />
                </div>
              
                <Typography className='message-text mb-3'>{item?.message}</Typography>
              
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
        <FormInput
          control={form.control}
          name='chat'
          placeholder='Type your message here...'
          multiline
          minRows={1}
          maxRows={6} // this works with MUI TextField
          sx={{
            '& .MuiInputBase-root': {
              maxHeight: '150px',
              overflowY: 'auto'
            }
          }}
        />
        <button onClick={messageSendHandler} className='send-button'>
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
      </div>
    </Card>
  )
}

export default ChatCompo

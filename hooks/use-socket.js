
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { io, Socket } from 'socket.io-client'

let socket = null

export function useSocket(userId) {
  useEffect(() => {
    socket = io('wss://api.seatsplit.com')

    socket.on('connect', () => {
      socket?.emit('user-login', userId)
    })

    socket.on('notification', (data) => {
      if (data?.message) toast(data.message)
    })

    return () => {
      socket?.disconnect()
    }
  }, [userId])

  return socket
}

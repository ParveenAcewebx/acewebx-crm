'use client'

import {
  isServer,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        onError: error => {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || 'Something went wrong')
            return
          }
          toast.error('Something went wrong')
        },
        onSuccess: response => {
          if (hasDataWithMessage(response)) {
            toast.success(response.data.message)
          }
        }
      }
    }
  })
}

let browserQueryClient= undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function QueryProvider({ children }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

function hasDataWithMessage(
  obj
) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'data' in obj &&
    typeof obj.data === 'object' &&
    obj.data !== null &&
    'message' in obj.data &&
    typeof obj.data.message === 'string'
  )
}

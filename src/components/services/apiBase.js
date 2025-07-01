import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

const ApiClient = axios.create({
  baseURL: `${baseURL}/api/v1`
})

// By using Context

ApiClient.interceptors.request.use(
  async config => {
    try {
      // loaderProxy.startLoading()
      const session = await getSession()
      if (session?.accessToken) {
        config.headers['x-access-token'] = session?.accessToken
      }

      return config
    } catch (error) {
      // loaderProxy.stopLoading()
      console.error('Error fetching session:', error)
      return Promise.reject(error)
    }
  },
  error => {
    // loaderProxy.stopLoading()

    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

ApiClient.interceptors.response.use(
  response => {
    if (response.data.errorCode === 601) {
      signOut()
    }

    return response
  },
  error => {
    // loaderProxy.stopLoading()

    return Promise.reject(error)
  }
)

export default ApiClient

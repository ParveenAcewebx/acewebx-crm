'use client'
import Login from '@/components/auth/login'
import useDocumentTitle from '@/components/utils/useDocumentTitle'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()
  
  if (session?.user) router.replace('/dashboard')
  useDocumentTitle('Login')

  return <Login />
    }

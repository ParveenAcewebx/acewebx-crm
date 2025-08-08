'use client'
import { useEffect } from 'react'
import Login from '@/components/auth/login'
import useDocumentTitle from '@/components/utils/useDocumentTitle'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useDocumentTitle('Login')

  useEffect(() => {
    if (session?.user) {
      router.replace('/dashboard')
    }
  }, [session, router])

  return <Login />
}

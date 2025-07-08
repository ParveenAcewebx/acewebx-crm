'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function page() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session?.user) {
    router?.push('/admin/candidates/list')  
  } else router?.push('/login')

  return <div>Admin</div>
}

export default page

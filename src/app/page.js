"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function Home() {

    const router = useRouter()
    // useDocumentTitle('Home')
    router.replace('/walk-in')
  return (
    <div>Home</div>
  )
}

export default Home
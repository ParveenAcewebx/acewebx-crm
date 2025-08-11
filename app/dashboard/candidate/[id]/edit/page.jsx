
'use client'
import React from 'react'
import {usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CommonLayout from '@/components/CommonLayouyt'
import EditCandidate from '../../EditCandidate'

function Page({ params }) {
  const router = useRouter()
  const id = params?.id
  const editId = id
  const pathname = usePathname()
  const currentTab = pathname?.endsWith('edit') ? 'edit' : 'detail'
  const handleTabChange = (value) => {
    router.replace(value)
  }
  return (
    <>
      <CommonLayout pageTitle='Candidate Detail' />
      <Tabs value={currentTab} onValueChange={handleTabChange} className='mt-3'>
      <TabsList className='inline-flex h-9 items-center p-1 text-muted-foreground custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b'>
        <TabsList>
          <TabsTrigger  className='rounded-none px-4 py-1.5 !shadow-none' value="detail">Details</TabsTrigger>
          <TabsTrigger  className='rounded-none p-1.5 px-4 !shadow-none' value="edit">Edit</TabsTrigger>
        </TabsList>
      </TabsList>
        <TabsContent value="detail">
        </TabsContent>
        <TabsContent value='edit'>
          <EditCandidate editId={editId} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Page
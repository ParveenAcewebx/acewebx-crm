
'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import LayoutHeader from '@/components/layoutHeader'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import EditSalesJobApplication from '../../SalesCandidateEdit'

function Page({ params }) {
  const router = useRouter()
  // useDocumentTitle('View Lead Dashboard')
  const id = params?.id
  const editId = id
  const pathname = usePathname()
  const currentTab = pathname?.endsWith('edit') ? 'edit' : 'detail'
  const handleTabChange = (value) => {
    router.replace(value)
  }
  return (
    <>
      <LayoutHeader pageTitle='Sales Candidate Deatils' />
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className='inline-flex h-9 items-center p-1 text-muted-foreground custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b'>
          <TabsList>
            <TabsTrigger className='rounded-none px-4 py-1.5 !shadow-none' value="detail">Details</TabsTrigger>
            <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="edit">Edit</TabsTrigger>
          </TabsList>
        </TabsList>
        <TabsContent value='detail'>
          {/* Top Section */}

        </TabsContent>
        <TabsContent value='edit'>
          <EditSalesJobApplication editId={editId} />
        </TabsContent>
      </Tabs>

    </>
  )
}

export default Page

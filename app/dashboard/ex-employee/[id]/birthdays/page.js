
'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BirthdaysDetails from './BirthdaysDetails'

function Page({ params }) {
    const router = useRouter()
    const id = params?.id
    const editId = id
    const pathname = usePathname()
    // const currentTab = pathname?.endsWith('edit') ? 'edit' : 'detail'
    // const handleTabChange = (value) => {
    //   router.replace(value)
    // }

    // Get last part of the path
    const currentTab = pathname?.split('/').pop() || 'detail'

    const handleTabChange = (value) => {
        // Replace current route with new tab route (assuming same base path)
        const basePath = pathname?.split('/').slice(0, -1).join('/')
        router.replace(`${basePath}/${value}`)
    }

    return (
        <>
            {/* <CommonLayout pageTitle='Event Detail' /> */}
            <Tabs value={currentTab} onValueChange={handleTabChange} className='mt-2'>
                <TabsList className='inline-flex h-9 items-center p-1 text-muted-foreground custom-tabs mb-3 w-full justify-start gap-2 rounded-none border-b'>
                    <TabsList>

                        <TabsTrigger className='rounded-none px-4 py-1.5 !shadow-none' value="detail">Details</TabsTrigger>
                        <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="edit">Edit</TabsTrigger>
                        <TabsTrigger className='rounded-none px-4 py-1.5 !shadow-none' value="birthdays">Birthdays</TabsTrigger>
                        <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="anniversaries">Anniversaries</TabsTrigger>
                        <TabsTrigger className='rounded-none p-1.5 px-4 !shadow-none' value="increments">Increments</TabsTrigger>
                    </TabsList>
                </TabsList>
                <TabsContent value="detail">
                </TabsContent>
                <TabsContent value='edit'>
                </TabsContent>
                <TabsContent value='birthdays'>
                    <BirthdaysDetails />
                </TabsContent>
                <TabsContent value='anniversaries'>
                </TabsContent>
                <TabsContent value='increments'>
                </TabsContent>
            </Tabs>
        </>
    )
}

export default Page
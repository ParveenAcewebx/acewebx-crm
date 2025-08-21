'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommonLayout from '@/components/CommonLayouyt'
import { Edit } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/Table'
import AnniversariesApi from '@/services/employees/AnniversariesApi'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

function AnniversariesDetail() {
    const { id } = useParams()
    let eventId = id
    const [upcomingAnniversaries, setUpcomingAnniversaries] = useState([])
    const [upPastAnniversaries, setPastAnniversaries] = useState([]);


    const router = useRouter()

    const handleGetApi = async () => {
        try {
            const res = await AnniversariesApi.getAllPastAnniversaries(eventId)
            const data = res?.data?.data || {}
            setUpcomingAnniversaries(data?.anniversary?.upcoming || [])
            setPastAnniversaries(data?.anniversary?.past || [])
        } catch (error) {
            console.error('API error', error)
        }
    }

    useEffect(() => {
        handleGetApi()
    }, [])

    // Anniversaries handler:)
    const handleForupcomingAnniversaries = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/ex-employee/${eventId}/anniversaries/${row?.original?.id}`)

        }
    }


    const getDaysLeft = (dateString) => {
        const eventDate = new Date(dateString)
        const today = new Date()

        eventDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))

        return diff === 0 ? 'Today' : `${diff}`
    }
    // upcomingAnniversaries:)

    const columnForupcomingAnniversaries = [
        {
            accessorKey: 'eventDate',
            header: 'Days Left',
            id: 'eventDate',
            cell: ({ row }) => getDaysLeft(row?.original?.eventDate+ 'T00:00:00')

        },

        {
            accessorKey: 'eventDate',
            header: 'Anniversary Date',
            id: 'eventDate',
            cell: ({ row }) => row.original.eventDate == undefined ? "NA" : row.original.eventDate
        },

        {
            accessorKey: 'meta',
            header: 'Banner',
            id: 'meta',
            cell: ({ row }) => row.original?.meta?.isBannerCreated == undefined ? "NA" : row.original?.meta?.isBannerCreated
        },
        {
            accessorKey: 'meta',
            header: () => (
                <>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>S. M. Post</span>
                        </TooltipTrigger>
                        <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
                            Social Media Post
                        </TooltipContent>
                    </Tooltip>

                </>
            ),
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.isSocialMediaPost == undefined ? "NA" : row?.original?.meta?.isSocialMediaPost
        },
        {
            accessorKey: 'meta',
            header: 'Gift Voucher',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.isGiftVoucherCreated == undefined ? "NA" : row?.original?.meta?.isGiftVoucherCreated
        },

        {
            accessorKey: 'action',
            header: 'Action',
            id: 'action',
            size: 50,
            cell: ({ row }) => (
                <div className="w-full flex justify-left">
                    <Edit
                        className="text-blue-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleForupcomingAnniversaries(row)} // You may want to use handleForupcomingIncrements
                    />
                </div>
            )
        }
    ];


    // upcomingOld :-
    const columnForPastAnniversaries = [


        {
            accessorKey: 'eventDate',
            header: 'Anniversary Date',
            id: 'eventDate',
            cell: ({ row }) => row.original.eventDate == undefined ? "NA" : row.original.eventDate
        },

        {
            accessorKey: 'meta',
            header: 'Banner',
            id: 'meta',
            cell: ({ row }) => row.original?.meta?.isBannerCreated == undefined ? "NA" : row.original?.meta?.isBannerCreated
        },
        {
            accessorKey: 'meta',
            header: () => (
                <>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>S. M. Post</span>
                        </TooltipTrigger>
                        <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
                            Social Media Post
                        </TooltipContent>
                    </Tooltip>

                </>
            ),
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.isSocialMediaPost == undefined ? "NA" : row?.original?.meta?.isSocialMediaPost
        },
        {
            accessorKey: 'meta',
            header: 'Gift Voucher',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.isGiftVoucherCreated == undefined ? "NA" : row?.original?.meta?.isGiftVoucherCreated
        },

        {
            accessorKey: 'action',
            header: 'Action',
            id: 'action',
            size: 50,
            cell: ({ row }) => (
                <div className="w-full flex justify-left">
                    <Edit
                        className="text-blue-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleForupcomingAnniversaries(row)} // You may want to use handleForupcomingIncrements
                    />
                </div>
            )
        }
    ];

    return (
        <>
            <CommonLayout pageTitle='Ex Employee Anniversaries' />
            {/* Up Birthdays */}
            <div className='grid grid-cols-1 gap-6 mt-2'>
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Upcoming Anniversary</div>

                        </CardTitle>
                    </CardHeader>

                    <CardContent className='p-4 events-table'>
                        {upcomingAnniversaries?.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingAnniversaries}
                                data={upcomingAnniversaries}
                            />
                        ) : (
                            <div className=''>No Upcoming Anniversary</div>
                        )}
                    </CardContent>
                </Card>



            </div>
            {/* Old Birthdays */}
            <div className='grid grid-cols-1 gap-6 mt-7'>
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Past Anniversaries</div>

                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4 events-table'>
                        {upPastAnniversaries?.length > 0 ? (
                            <DataTable
                                columns={columnForPastAnniversaries}
                                data={upPastAnniversaries}
                            />
                        ) : (
                            <div className=''>No Past Anniversaries</div>
                        )}
                    </CardContent>
                </Card>


            </div>


        </>
    )
}

export default AnniversariesDetail

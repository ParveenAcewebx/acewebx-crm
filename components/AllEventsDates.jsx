'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommonLayout from '@/components/CommonLayouyt'
import EventApi from '@/services/cadidateApis/events/EventApi'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, EllipsisVertical, Eye, Trash2 } from 'lucide-react'
import { DataTable } from './Table'
import { useRouter } from 'next/navigation'

function AllEventsDates() {
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
    const [upcomingIncrements, setUpcomingIncrements] = useState([
    ])

    const router = useRouter()

    const handleGetApi = async () => {
        try {
            const res = await EventApi.upComingEventList()
            const data = res?.data?.data || {}

            setUpcomingEvents(data.upcomingEvents || [])
            setUpcomingBirthdays(data.upcomingBirthdays || [])
            setUpcomingIncrements(data.upcomingIncrements || [])
        } catch (error) {
            console.error('API error', error)
        }
    }

    useEffect(() => {
        handleGetApi()
    }, [])




    const handleForupcomingEvents = (row) => {
        router.push(`/dashboard/events/edit/${row?.original?.id}`)

    }
    const columnForupcomingEvents = [

        // {
        //     accessorKey: 'id',
        //     header: '#ID',
        //     id: 'id', // ✅ optional but clear
        //     size: 80,
        //     cell: ({ row }) => (
        //         <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        //             {`#${row.original.id}`}
        //         </div>
        //     )
        // },
        {
            accessorKey: 'title',
            header: 'Title',
            id: 'title',
            cell: ({ row }) => row?.original?.title
        },
        {
            accessorKey: 'fromDate',
            header: 'Days Left',
            id: 'fromDate',
            cell: ({ row }) => {
                const fromDate = new Date(row.original?.fromDate + 'T00:00:00') || ''
                const today = new Date();

                // Clear time part for accurate day difference
                fromDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                const diffTime = fromDate - today;
                const dayLeftFromToday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                    <span>
                        {dayLeftFromToday > 0
                            ? `${dayLeftFromToday}`
                            : dayLeftFromToday === 0
                                ? 'Today'
                                : `${Math.abs(dayLeftFromToday)}`}
                    </span>
                );
            }
        },
        {
            accessorKey: 'fromDate',
            header: 'Event Date',
            id: 'fromDate',
            cell: ({ row }) => {

                return (
                    <span>
                        {row?.original?.fromDate}
                    </span>
                );
            }
        },
        {
            accessorKey: 'action',
            header: 'Action',
            id: 'action',
            size: 50,
            cell: ({ row }) => {
                return (
                    <div className='grid grid-cols-3 w-2 text-center'>
                        <Eye className='text-blue-500 h-4 w-4' onClick={() => handleForupcomingEvents(row)} />
                    </div>
                );
            }
        },


    ]
    // For birthday event:-

    const handleForupcomingBirthdays = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/employees/${row?.original?.id}/detail`)

        }
    }
    const columnForupcomingBirthdays = [

        // {
        //     accessorKey: 'id',
        //     header: '#ID',
        //     id: 'id',
        //     size: 80,
        //     cell: ({ row }) => (
        //       <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        //         {`#${row.original.id}`}
        //       </div>
        //     )
        //   },
        {
            accessorKey: 'name',
            header: 'Name',
            id: 'name',
            cell: ({ row }) => row.original.name
        },
        {
            accessorKey: 'dobCelebration',
            header: 'Days Left',
            id: 'dobCelebration',
            cell: ({ row }) => {
                const celebrationDate = new Date(row.original?.dobCelebration + 'T00:00:00');
                const today = new Date();

                // Set both to midnight for accurate date diff
                celebrationDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                const diffTime = celebrationDate.getTime() - today.getTime();
                const dayLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                    <span>
                        {dayLeft > 0 ? `${dayLeft}` : dayLeft === 0 ? 'Today' : `${Math.abs(dayLeft)}`}
                    </span>
                );
            }
        },

        {
            accessorKey: 'dobCelebration',
            header: 'Birthday Date',
            id: 'dobCelebration',
            cell: ({ row }) => row.original?.dobCelebration
        },
        {
            accessorKey: 'action',
            header: 'Action',
            id: 'action',
            size: 50,
            cell: ({ row }) => (
                <div className="w-full flex justify-center">
                    <Eye className="text-blue-500 h-4 w-4 cursor-pointer" onClick={() => handleForupcomingBirthdays(row)} />
                </div>
            )
        }

    ]

    // upcomingIncrements :-

    const handleForupcomingIncrements = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/employees/${row?.original?.id}/detail`)

        }
    }
    const columnForupcomingIncrements = [
        // {
        //   accessorKey: 'id',
        //   header: '#ID',
        //   id: 'id',
        //   size: 80,
        //   cell: ({ row }) => (
        //     <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        //       {`#${row.original.id}`}
        //     </div>
        //   )
        // },
        {
            accessorKey: 'name',
            header: 'Name',
            id: 'name',
            cell: ({ row }) => row.original.name
        },
        {
            accessorKey: 'incrementDate',
            header: 'Days Left',
            id: 'incrementDate',
            cell: ({ row }) => {
                const meta = row.original.meta || [];
                const incrementDateStr = meta.find(m => m.metaKey === '_lastIncrementDate')?.metaValue;

                if (!incrementDateStr) return <span className="">N/A</span>;

                const incrementDate = new Date(incrementDateStr + 'T00:00:00');
                const today = new Date();

                incrementDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                const diffTime = incrementDate.getTime() - today.getTime();
                const dayLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                    <span>
                        {dayLeft > 0 ? `${dayLeft}` : dayLeft === 0 ? 'Today' : `${Math.abs(dayLeft)}`}
                    </span>
                );
            }
        },

        {
            accessorKey: 'incrementDate',
            header: 'Increment Date',
            id: 'incrementDate',
            cell: ({ row }) => {
                const meta = row.original.meta || [];
                const incrementDateStr = meta.find(m => m.metaKey === '_lastIncrementDate')?.metaValue;


                return (
                    <span>
                        {incrementDateStr}
                    </span>
                );
            }
        },
        {
            accessorKey: 'action',
            header: 'Action',
            id: 'action',
            size: 50,
            cell: ({ row }) => (
                <div className="w-full flex justify-center">
                    <Eye
                        className="text-blue-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleForupcomingIncrements(row)} // You may want to use handleForupcomingIncrements
                    />
                </div>
            )
        }
    ];


    return (
        <>
            <CommonLayout pageTitle='Dashboard' />

            {/* Events */}
            <div className='grid grid-cols-2 gap-6 mt-7'>
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Upcoming Events</div>

                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4'>
                        {upcomingEvents.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingEvents}
                                data={upcomingEvents}
                            />
                        ) : (
                            <div className=''>No upcoming events</div>
                        )}
                    </CardContent>
                </Card>

                {/* Birthdays */}
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Upcoming Birthdays</div>

                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4'>
                        {upcomingBirthdays.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingBirthdays}
                                data={upcomingBirthdays}
                            />
                        ) : (
                            <div className=''>No upcoming birthdays</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Increments */}
            <div className='grid grid-cols-2 gap-6 mt-6'>
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Upcoming Increments</div>

                        </CardTitle>
                    </CardHeader>

                    <CardContent className='p-4'>
                        {upcomingIncrements.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingIncrements}
                                data={upcomingIncrements}
                            />
                        ) : (
                            <div className=''>No upcoming increments</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AllEventsDates

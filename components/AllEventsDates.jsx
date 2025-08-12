'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommonLayout from '@/components/CommonLayouyt'
import EventApi from '@/services/cadidateApis/events/EventApi'
import { Eye } from 'lucide-react'
import { DataTable } from './Table'
import { useRouter } from 'next/navigation'

function AllEventsDates() {
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([])
    const [upcomingIncrements, setUpcomingIncrements] = useState([])
    const [upcomingAnniversaries, setUpcomingAnniversaries] = useState([])

    const router = useRouter()

    // Get All Data :)
    const handleGetApi = async () => {
        try {
            const res = await EventApi.upComingEventList()
            const data = res?.data?.data || {}

            setUpcomingEvents(data.upcomingEvents || [])
            setUpcomingBirthdays(data.upcomingBirthdays || [])
            setUpcomingIncrements(data.upcomingIncrements || [])
            setUpcomingAnniversaries(data.upcomingAnniversary || [])
        } catch (error) {
            console.error('API error', error)
        }
    }

    useEffect(() => {
        handleGetApi()
    }, [])

    // BirthdaysHandlers:)
    const handleForupcomingBirthdays = (row) => {
        const id = row?.original?.employee?.id
        if (id) {
            router.push(`/dashboard/employee/${id}/detail`)
        }
    }

    // IncrementsHandlers:)
    const handleForupcomingIncrements = (row) => {
        const id = row?.original?.employee?.id
        if (id) {
            router.push(`/dashboard/employee/${id}/detail`)
        }
    }
    // AnniversariesHandlers:)
    const handleForupcomingAnniversaries = (row) => {
        const id = row?.original?.employee?.id
        if (id) {
            router.push(`/dashboard/employee/${id}/detail`)
        }
    }
    // EventsHandlers:)
    const handleForupcomingEvents = (row) => {
        router.push(`/dashboard/event/edit/${row?.original?.id}`)
    }

    // DaysLeft  function :)
    const getDaysLeft = (dateString) => {
        const eventDate = new Date(dateString)
        const today = new Date()

        eventDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))

        return diff === 0 ? 'Today' : `${diff}`
    }

    // Date Format  function :)
    const formatDate = (dateString) => {
        if (!dateString) return '—'
        const date = new Date(dateString)
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString()
    }

    // BirthdaysColumns:)
    const columnForupcomingBirthdays = [
        {
            accessorKey: 'name',
            header: 'Name',
            id: 'name',
            cell: ({ row }) => row.original.employee?.name ?? '—'
        },
        {
            accessorKey: 'eventDate',
            header: 'Birthday Date',
            id: 'eventDate',
            cell: ({ row }) => row.original.eventDate ?? ''

        },
        {
            accessorKey: 'daysLeft',
            header: 'Days Left',
            id: 'daysLeft',
            cell: ({ row }) => getDaysLeft(row.original.eventDate) ?? ''

        },
        {
            accessorKey: 'actions',
            header: 'Action',
            id: 'actions',
            cell: ({ row }) => (
                <Eye
                    className="text-blue-500 h-4 w-4 cursor-pointer"
                    onClick={() => handleForupcomingBirthdays(row)}
                />
            )
        }
    ]

    // IncrementsColumns:)
    const columnForupcomingIncrements = [
        {
            accessorKey: 'name',
            header: 'Name',
            id: 'name',
            cell: ({ row }) => row.original.employee?.name ?? '—'
        },
        {
            accessorKey: 'eventDate',
            header: 'Increment Date',
            id: 'eventDate',
            cell: ({ row }) => <span>{formatDate(row.original.eventDate)}</span>
        },
        {
            accessorKey: 'daysLeft',
            header: 'Days Left',
            id: 'daysLeft',
            cell: ({ row }) => <span>{getDaysLeft(row.original.eventDate)}</span>
        },
        {
            accessorKey: 'actions',
            header: 'Action',
            id: 'actions',
            cell: ({ row }) => (
                <Eye
                    className="text-blue-500 h-4 w-4 cursor-pointer"
                    onClick={() => handleForupcomingIncrements(row)}
                />
            )
        }
    ]

    // AnniversariesColumns:)
    const columnForupcomingAnniversaries = [
        {
            accessorKey: 'name',
            header: 'Name',
            id: 'name',
            cell: ({ row }) => row.original.employee?.name ?? '—'
        },
        {
            accessorKey: 'eventDate',
            header: 'Anniversary Date',
            id: 'eventDate',
            cell: ({ row }) => <span>{row.original.eventDate}</span>
        },
        {
            accessorKey: 'daysLeft',
            header: 'Days Left',
            id: 'daysLeft',
            cell: ({ row }) => <span>{getDaysLeft(row.original.eventDate)}</span>
        },
        {
            accessorKey: 'actions',
            header: 'Action',
            id: 'actions',
            cell: ({ row }) => (
                <Eye
                    className="text-blue-500 h-4 w-4 cursor-pointer"
                    onClick={() => handleForupcomingAnniversaries(row)}
                />
            )
        }
    ]

    // EventsColumns:)
    const columnForupcomingEvents = [


        {
            accessorKey: 'title',
            header: 'Title',
            id: 'title',
            cell: ({ row }) => row?.original?.title

        },
        {
            accessorKey: 'daysLeft',
            header: 'Days Left',
            id: 'daysLeft',
            cell: ({ row }) => getDaysLeft(row.original.fromDate) ?? ''

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
                    <div className='grid grid-cols-3 w-2 text-center cursor-pointer '>
                        <Eye className='text-blue-500 h-4 w-4' onClick={() => handleForupcomingEvents(row)} />
                    </div>
                );
            }
        },


    ]
    return (
        <>
            <CommonLayout pageTitle="Dashboard" />
            {/* Events */}
            <div className="grid grid-cols-2 gap-6 mt-6">
                <Card className="box">
                    <CardHeader className="theme-bg-white-rgba border-color-grey min-h-14 border-b p-3">
                        <CardTitle className="flex justify-between">
                            <div className="!text-lg">Upcoming Events</div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 events-table">
                        {upcomingEvents?.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingEvents}
                                data={upcomingEvents}
                            />
                        ) : (
                            <div className="">No upcoming Events</div>
                        )}
                    </CardContent>
                </Card>
                {/* Birthdays */}
                <Card className="box">
                    <CardHeader className="theme-bg-white-rgba border-color-grey min-h-14 border-b p-3">
                        <CardTitle className="flex justify-between">
                            <div className="!text-lg">Upcoming Birthdays</div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 events-table">
                        {upcomingBirthdays.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingBirthdays}
                                data={upcomingBirthdays}
                            />
                        ) : (
                            <div className="">No upcoming birthdays</div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Anniversaries */}
            <div className="grid grid-cols-2 gap-6 mt-7">
                <Card className="box">
                    <CardHeader className="theme-bg-white-rgba border-color-grey min-h-14 border-b p-3">
                        <CardTitle className="flex justify-between">
                            <div className="!text-lg">Upcoming Anniversaries</div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 events-table">
                        {upcomingAnniversaries.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingAnniversaries}
                                data={upcomingAnniversaries}
                            />
                        ) : (
                            <div className="">No upcoming anniversaries</div>
                        )}
                    </CardContent>
                </Card>

                {/* Increments */}
                <Card className="box">
                    <CardHeader className="theme-bg-white-rgba border-color-grey min-h-14 border-b p-3">
                        <CardTitle className="flex justify-between">
                            <div className="!text-lg">Upcoming Increments</div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-4 events-table">
                        {upcomingIncrements.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingIncrements}
                                data={upcomingIncrements}
                            />
                        ) : (
                            <div className="">No upcoming increments</div>
                        )}
                    </CardContent>
                </Card>
            </div>


        </>
    )
}

export default AllEventsDates
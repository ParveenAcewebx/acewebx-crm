'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommonLayout from '@/components/CommonLayouyt'
import EventApi from '@/services/events/EventApi'
import { Check, Eye, X } from 'lucide-react'
import { DataTable } from './Table'
import { useRouter } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

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
        const empId = row?.original?.empId
        const bithId = row?.original?.id
        if (empId) {
            router.push(`/dashboard/employee/${empId}/birthdays/${bithId}`)
        }
    }

    // IncrementsHandlers:)
    const handleForupcomingIncrements = (row) => {
        const empId = row?.original?.empId
        const incremId = row?.original?.id
        if (empId) {
            router.push(`/dashboard/employee/${empId}/increments/${incremId}`)
        }
    }
    // AnniversariesHandlers:)
    const handleForupcomingAnniversaries = (row) => {
        const empId = row?.original?.empId
        const annivId = row?.original?.id
        if (empId) {
            router.push(`/dashboard/employee/${empId}/anniversaries/${annivId}`)
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
            cell: ({ row }) => getDaysLeft(row.original.eventDate + 'T00:00:00') ?? ''

        },
        // new rows :-
        {
            accessorKey: 'meta',
            header: 'Banner',
            id: 'meta',
            cell: ({ row }) => row.original?.meta?.isBannerCreated == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row.original?.meta?.isBannerCreated}
                </TooltipContent>
            </Tooltip>
            )

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
            cell: ({ row }) => row?.original?.meta?.isSocialMediaPost == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.isSocialMediaPost}
                </TooltipContent>
            </Tooltip>
            )
        },
        {
            accessorKey: 'meta',
            header: 'Gift Voucher',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.isGiftVoucherCreated == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.isGiftVoucherCreated}
                </TooltipContent>
            </Tooltip>
            )
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
            cell: ({ row }) => <span>{getDaysLeft(row.original.eventDate + 'T00:00:00')}</span>
        },

        // meta---------------------------------------start
        {
            accessorKey: 'meta',
            header: () => (
                <>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>I.F.S.</span>
                        </TooltipTrigger>
                        <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
                            Increment Form Sent
                        </TooltipContent>
                    </Tooltip>

                </>
            ),
            id: 'meta',
            cell: ({ row }) => row.original?.meta?.incrementFormSent == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row.original?.meta?.incrementFormSent}
                </TooltipContent>
            </Tooltip>
            )
        },
        {
            accessorKey: 'meta',
            header: () => (
                <>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>E.S.I.F.</span>
                        </TooltipTrigger>
                        <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
                            Employee Submitted Increment Form
                        </TooltipContent>
                    </Tooltip>

                </>
            ),
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.employeeSubmittedIncrementForm == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.employeeSubmittedIncrementForm}
                </TooltipContent>
            </Tooltip>
            )
        },
        {
            accessorKey: 'meta',
            header: '',
            header: () => (
                <>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>R.B.H</span>
                        </TooltipTrigger>
                        <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
                            Reviewed By Hod
                        </TooltipContent>
                    </Tooltip>

                </>
            ),
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.reviewedByHod == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.reviewedByHod}
                </TooltipContent>
            </Tooltip>
            )
        },

        {
            accessorKey: 'meta',
            header: 'One To One Meeting',
            header: () => (
                <>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>O.T.O.M</span>
                        </TooltipTrigger>
                        <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
                            One To One Meeting
                        </TooltipContent>
                    </Tooltip>

                </>
            ),
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.oneToOneMeeting == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.oneToOneMeeting}
                </TooltipContent>
            </Tooltip>
            )
        },

        {
            accessorKey: 'meta',
            header: 'HR Meeting',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.hrMeeting == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.hrMeeting}
                </TooltipContent>
            </Tooltip>
            )
        },

        {
            accessorKey: 'meta',
            header: 'Final Discussion',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.finalDiscussion == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.finalDiscussion}
                </TooltipContent>
            </Tooltip>
            )
        },

        // meta end

        {
            accessorKey: 'daysLeft',
            header: 'Next Step',
            id: 'daysLeft',
            cell: ({ row }) => {
                const meta = row?.original?.meta || {};

                const getNextStep = () => {
                    if (meta?.incrementFormSent === undefined) return "Increment Form Sent";
                    if (meta?.employeeSubmittedIncrementForm === undefined) return "Employee Submitted Increment Form";
                    if (meta?.reviewedByHod === undefined) return "Reviewed By Hod";
                    if (meta?.oneToOneMeeting === undefined) return "One To One Meeting";
                    if (meta?.hrMeeting === undefined) return "Hr Meeting";
                    if (meta?.finalDiscussion === undefined) return "Final Discussion";
                    return ""; // all steps done
                };

                return <span>{getNextStep()}</span>;
            }
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
            cell: ({ row }) => <span>{getDaysLeft(row.original.eventDate + 'T00:00:00')}</span>
        },

        // new rows :-
        {
            accessorKey: 'meta',
            header: 'Banner',
            id: 'meta',
            cell: ({ row }) => row.original?.meta?.isBannerCreated == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row.original?.meta?.isBannerCreated}
                </TooltipContent>
            </Tooltip>
            )

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
            cell: ({ row }) => row?.original?.meta?.isSocialMediaPost == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.isSocialMediaPost}
                </TooltipContent>
            </Tooltip>
            )
        },
        {
            accessorKey: 'meta',
            header: 'Gift Voucher',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.isGiftVoucherCreated == undefined ? <X className='text-red-600' /> : (<Tooltip>
                <TooltipTrigger asChild>
                    <Check className='text-green-600' />
                </TooltipTrigger>
                <TooltipContent className='w-auto rounded-sm bg-green-500 text-sm'>
                    {row?.original?.meta?.isGiftVoucherCreated}
                </TooltipContent>
            </Tooltip>
            )
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
            cell: ({ row }) => getDaysLeft(row.original.fromDate + 'T00:00:00') ?? ''

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
            accessorKey: 'isHoliday',
            header: 'Is Holiday',
            cell: ({ row }) =>
                row?.original?.isHoliday
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
            <div className="grid grid-cols-1 gap-6 mt-6">
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
            </div>

            {/* Birthdays */}
            <div className="grid grid-cols-1 gap-6 mt-6">
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
            <div className="grid grid-cols-1 gap-6 mt-7">
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


            </div>
            <div className="grid grid-cols-1 gap-6 mt-7">
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
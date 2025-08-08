'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommonLayout from '@/components/CommonLayouyt'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/Table'
import { Edit } from 'lucide-react'
import AnniversariesApi from '@/services/cadidateApis/employees/AnniversariesApi'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import IncrementAPi from '@/services/cadidateApis/increment/IncrementAPi'
import { errorMessage, successMessage } from '@/components/ToasterMessage'

function IncrementsDetail() {
    const { id } = useParams()
    let eventId = id

    const [upcomingIncrement, setUpcomingIncrement] = useState([])
    const [pastIncrement, setPastIncrement] = useState([]);


    const router = useRouter()

    const handleGetApi = async () => {
        try {
            const res = await AnniversariesApi.getAllPastAnniversaries(eventId)
            const data = res?.data?.data || {}
            setUpcomingIncrement(data?.increment?.upcoming || [])
            setPastIncrement(data?.increment?.past || [])
        } catch (error) {
            console.error('API error', error)
        }
    }

    useEffect(() => {
        handleGetApi()
    }, [])

    // upcomingIncrements :-

    const handleSendWalkInForm = async (eventID) => {
        try {
            const sendEmailLin = await IncrementAPi.sendIncrementInLink(id, eventID)
            console.log("sendEmailLin", sendEmailLin)
            if (sendEmailLin?.data?.status == true) {
                successMessage({
                    description: 'Link sent successfully to the mail.'
                })
            }
        } catch (error) {
            console.log('error', error)
            errorMessage({
                description: 'Something Went Wrong!'
            })
        }
    }



    const handleForupcomingIncrements = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/employee/${eventId}/increments/${row?.original?.id}`)

        }
    }
    const columnForupcomingIncrements = [
        {
            accessorKey: 'eventDate',
            header: 'Days Left',
            id: 'eventDate',
            cell: ({ row }) => {

                const originalDate = new Date(row.original.eventDate);
                if (isNaN(originalDate.getTime())) return <span>Invalid Date</span>; // Handle invalid date string

                function getNextIncrementDate(startDate, cycleInYears = 1) {
                    const today = new Date();
                    let nextDate = new Date(startDate);

                    while (nextDate <= today) {
                        nextDate.setFullYear(nextDate.getFullYear() + cycleInYears);
                    }

                    return nextDate.toISOString().split('T')[0];
                }

                const finalDate = getNextIncrementDate(originalDate);

                // if (!incrementDateStr) return <span className="">N/A</span>;

                const incrementDate = new Date(finalDate + 'T00:00:00');
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
            accessorKey: 'eventDate',
            header: 'Increment Date',
            id: 'eventDate',
            cell: ({ row }) => {
                //   const meta = row.original?.meta ?? [];
                //   const incrementDateStr = meta.find(m => m.metaKey === '_lastIncrementDate')?.metaValue;

                //   if (!incrementDateStr) return <span>—</span>; // Gracefully handle missing date

                //   const originalDate = new Date(row.original?.eventDate);
                //   if (isNaN(originalDate.getTime())) return <span>Invalid Date</span>; // Handle invalid date string

                //   function getNextIncrementDate(startDate, cycleInYears = 1) {
                //     const today = new Date();
                //     let nextDate = new Date(startDate);

                //     while (nextDate <= today) {
                //       nextDate.setFullYear(nextDate.getFullYear() + cycleInYears);
                //     }

                //     return nextDate.toISOString().split('T')[0];
                //   }

                //   const finalDate = getNextIncrementDate(originalDate);

                return <span>{row.original?.eventDate}</span>;
            }
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
            cell: ({ row }) => row.original?.meta?.incrementFormSent
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
            cell: ({ row }) => row?.original?.meta?.employeeSubmittedIncrementForm
        }, {
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
            cell: ({ row }) => row?.original?.meta?.reviewedByHod
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
            cell: ({ row }) => row?.original?.meta?.oneToOneMeeting
        },

        {
            accessorKey: 'meta',
            header: 'HR Meeting',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.hrMeeting
        },

        {
            accessorKey: 'meta',
            header: 'Final Discussion',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.finalDiscussion
        },

        // meta---------------------------------------end



        // {
        //     accessorKey: 'status',
        //     header: 'Status',
        //     id: 'status',
        //     cell: ({ row }) => row.original.status
        // },
        {
            accessorKey: 'eventDate',
            header: 'Action',
            id: 'action',
            size: 50,
            cell: ({ row }) => {


                const originalDate = new Date(row?.original?.eventDate);
                if (isNaN(originalDate.getTime())) return <span>Invalid Date</span>; // Handle invalid date string

                function getNextIncrementDate(startDate, cycleInYears = 1) {
                    const today = new Date();
                    let nextDate = new Date(startDate);

                    while (nextDate <= today) {
                        nextDate.setFullYear(nextDate.getFullYear() + cycleInYears);
                    }

                    return nextDate.toISOString().split('T')[0];
                }

                const finalDate = getNextIncrementDate(originalDate);

                // if (!incrementDateStr) return <span className="">N/A</span>;

                const incrementDate = new Date(finalDate + 'T00:00:00');
                const today = new Date();

                incrementDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                const diffTime = incrementDate.getTime() - today.getTime();
                const dayLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                console.log("dayLeftdayLeft", dayLeft)

                return (
                    <div className="w-full flex justify-left">


                        <div className=' resume-btn'>
                            <Edit
                                className="text-blue-500 h-4 w-4 cursor-pointer"
                                onClick={() => handleForupcomingIncrements(row)} // You may want to use handleForupcomingIncrements
                            />
                            {dayLeft <= 20 ? (
                                <div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={() => handleSendWalkInForm(row?.original?.id)}
                                                size='icon'
                                                variant='outline'
                                                className='shrink-0  hover:bg-accent sendIcon'
                                            >
                                                <svg
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='#C21E56'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    className='w-5 h-5'
                                                >
                                                    <path d='M22 2L11 13' />
                                                    <path d='M22 2L15 22L11 13L2 9L22 2Z' />
                                                </svg>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className='w-auto rounded-sm bg-[#b82025] text-sm'>
                                            Send Increment Form
                                        </TooltipContent>
                                    </Tooltip>


                                </div>
                            ) : ''}

                        </div>
                    </div>
                )
            }


        }
    ];



    const columnForOldIncrements = [
        {
            accessorKey: 'eventDate',
            header: 'Increment Date',
            id: 'eventDate',
            cell: ({ row }) => row.original.eventDate
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
            cell: ({ row }) => row.original?.meta?.incrementFormSent
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
            cell: ({ row }) => row?.original?.meta?.employeeSubmittedIncrementForm
        }, {
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
            cell: ({ row }) => row?.original?.meta?.reviewedByHod
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
            cell: ({ row }) => row?.original?.meta?.oneToOneMeeting
        },

        {
            accessorKey: 'meta',
            header: 'HR Meeting',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.hrMeeting
        },

        {
            accessorKey: 'meta',
            header: 'Final Discussion',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.finalDiscussion
        },

        // meta---------------------------------------end

        // {
        //     accessorKey: 'status',
        //     header: 'Status',
        //     id: 'status',
        //     cell: ({ row }) => row.original.status
        // },
        {
            accessorKey: 'action',
            header: 'Action',
            id: 'action',
            size: 50,
            cell: ({ row }) => (
                <div className="w-full flex justify-left">
                    <Edit
                        className="text-blue-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleForupcomingIncrements(row)} // You may want to use handleForupcomingIncrements
                    />
                </div>
            )
        }
    ];

    return (
        <>
            <CommonLayout pageTitle='Employee Increments' />
            {/* Up Birthdays */}
            <div className='grid grid-cols-1 gap-6 mt-6'>
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Upcoming Increment</div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className='p-4 events-table'>
                        {upcomingIncrement?.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingIncrements}
                                data={upcomingIncrement}
                            />
                        ) : (
                            <div className=''>No Upcoming Increments</div>
                        )}
                    </CardContent>
                </Card>



            </div>
            {/* Old Birthdays */}
            <div className='grid grid-cols-1 gap-6 mt-7'>
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Past Increments</div>

                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4 events-table'>
                        {pastIncrement?.length > 0 ? (
                            <DataTable
                                columns={columnForOldIncrements}
                                data={pastIncrement}
                            />
                        ) : (
                            <div className=''>No Past Increments</div>
                        )}
                    </CardContent>
                </Card>


            </div>


        </>
    )
}

export default IncrementsDetail

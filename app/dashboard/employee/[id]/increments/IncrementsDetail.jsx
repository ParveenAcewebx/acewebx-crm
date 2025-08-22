'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommonLayout from '@/components/CommonLayouyt'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/Table'
import { Edit, Eye, EyeOff } from 'lucide-react'
import AnniversariesApi from '@/services/employees/AnniversariesApi'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import IncrementAPi from '@/services/increment/IncrementAPi'
import { errorMessage, successMessage } from '@/components/ToasterMessage'

function IncrementsDetail() {
    const { id } = useParams()
    let eventId = id

    const [upcomingIncrement, setUpcomingIncrement] = useState([])
    const [pastIncrement, setPastIncrement] = useState([]);
    const [hiddenRows, setHiddenRows] = useState({}); // store row-wise hidden state

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
    const handleSendIncrementForm = async (eventID) => {
        try {
            const sendEmailLin = await IncrementAPi.sendIncrementInLink(id, eventID)
            if (sendEmailLin?.data?.status == true) {
                successMessage({
                    description: 'Link sent successfully to the mail.'
                })
                handleGetApi()

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

    const getDaysLeft = (dateString) => {
        const eventDate = new Date(dateString)
        const today = new Date()

        eventDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)

        const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))

        return diff === 0 ? 'Today' : `${diff}`
    }
    // comingIncrements:)
    const columnForupcomingIncrements = [
        {
            accessorKey: 'eventDate',
            header: 'Days Left',
            id: 'eventDate',
            cell: ({ row }) => getDaysLeft(row?.original?.eventDate + 'T00:00:00')
        },
        {
            accessorKey: 'eventDate',
            header: 'Increment Date',
            id: 'eventDate',
            cell: ({ row }) => {

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
            cell: ({ row }) => row.original?.meta?.incrementFormSent == undefined ? "NA" : row.original?.meta?.incrementFormSent
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
            cell: ({ row }) => row?.original?.meta?.employeeSubmittedIncrementForm == undefined ? "NA" : row?.original?.meta?.employeeSubmittedIncrementForm
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
            cell: ({ row }) => (row?.original?.meta?.reviewedByHod == undefined ? "NA" : row?.original?.meta?.reviewedByHod)
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
            cell: ({ row }) => row?.original?.meta?.oneToOneMeeting == undefined ? "NA" : row?.original?.meta?.oneToOneMeeting
        },

        {
            accessorKey: 'meta',
            header: 'HR Meeting',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.hrMeeting == undefined ? "NA" : row?.original?.meta?.hrMeeting
        },

        {
            accessorKey: 'meta',
            header: 'Final Discussion',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.finalDiscussion == undefined ? "NA" : row?.original?.meta?.finalDiscussion
        },

        // meta---------------------------------------end


        {
            accessorKey: 'eventDate',
            header: 'Action',
            id: 'action',
            size: 50,
            cell: ({ row }) => {



                const dayLeft = getDaysLeft(row?.original?.eventDate)


                const isIncrementFormSend = row.original?.meta?.incrementFormSent
                return (
                    <div className="w-full flex justify-left">


                        <div className=' resume-btn'>
                            <Edit
                                className="text-blue-500 h-4 w-4 cursor-pointer"
                                onClick={() => handleForupcomingIncrements(row)} // You may want to use handleForupcomingIncrements
                            />
                            {isIncrementFormSend !== "yes" && dayLeft <= 20 ? (
                                <div>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={() => handleSendIncrementForm(row?.original?.id)}
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


    // OldIncrements
    const columnForOldIncrements = [
        {
            accessorKey: 'eventDate',
            header: 'Increment Date',
            id: 'eventDate',
            cell: ({ row }) => row.original.eventDate == undefined ? "NA" : row.original.eventDate
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
            cell: ({ row }) => row.original?.meta?.incrementFormSent == undefined ? "NA" : row.original?.meta?.incrementFormSent
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
            cell: ({ row }) => row?.original?.meta?.employeeSubmittedIncrementForm == undefined ? "NA" : row?.original?.meta?.employeeSubmittedIncrementForm
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
            cell: ({ row }) => (row?.original?.meta?.reviewedByHod == undefined ? "NA" : row?.original?.meta?.reviewedByHod)
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
            cell: ({ row }) => row?.original?.meta?.oneToOneMeeting == undefined ? "NA" : row?.original?.meta?.oneToOneMeeting
        },

        {
            accessorKey: 'meta',
            header: 'HR Meeting',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.hrMeeting == undefined ? "NA" : row?.original?.meta?.hrMeeting
        },

        {
            accessorKey: 'meta',
            header: 'Final Discussion',
            id: 'meta',
            cell: ({ row }) => row?.original?.meta?.finalDiscussion == undefined ? "NA" : row?.original?.meta?.finalDiscussion
        },

          // New Salary Column
    {
      header: "New Salary",
      id: "newSalary",
      cell: ({ row }) => {
        const isHidden = hiddenRows[row.id]?.salary ?? true;

        return row?.original?.meta?.newSalary == undefined ? (
          "NA"
        ) : isHidden ? (
          <div className="flex gap-2 cursor-pointer items-center">
            *****
            <EyeOff
              size={16}
              onClick={() =>
                setHiddenRows((prev) => ({
                  ...prev,
                  [row.id]: { ...prev[row.id], salary: false },
                }))
              }
            />
          </div>
        ) : (
          <div className="flex gap-2 cursor-pointer items-center">
            {row?.original?.meta?.newSalary}

            <Eye
              size={16}
              onClick={() =>
                setHiddenRows((prev) => ({
                  ...prev,
                  [row.id]: { ...prev[row.id], salary: true },
                }))
              }
            />
          </div>
        );
      },
    },
       {
      header: "Increment Amount",
      id: "incrementAmount",
      cell: ({ row }) => {
        const nreSalary = row?.original?.meta?.newSalary || 0;
        const lastIncrement = row?.original?.meta?.incrementAmount || 0;

        const oldSalary = nreSalary - lastIncrement;
        const hikePercent = oldSalary ? (lastIncrement / oldSalary) * 100 : 0;

        const isHidden = hiddenRows[row.id]?.increment ?? true;

        return row?.original?.meta?.incrementAmount == undefined ? (
          "NA"
        ) : isHidden ? (
          <div className="flex gap-2 cursor-pointer items-center">
            *****
            <EyeOff
              size={16}
              onClick={() =>
                setHiddenRows((prev) => ({
                  ...prev,
                  [row.id]: { ...prev[row.id], increment: false },
                }))
              }
            />
          </div>
        ) : (
          <div className="flex gap-2 cursor-pointer items-center">
            {row?.original?.meta?.incrementAmount} (
            {row?.original?.meta?.newSalary == undefined
              ? "NA"
              : `${parseFloat(hikePercent).toFixed(0)}%`}
            )
            <Eye
              size={16}
              onClick={() =>
                setHiddenRows((prev) => ({
                  ...prev,
                  [row.id]: { ...prev[row.id], increment: true },
                }))
              }
            />
          </div>
        );
      },
    },

  
        // meta---------------------------------------end

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

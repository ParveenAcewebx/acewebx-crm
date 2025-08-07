'use client'
import React, { useEffect, useState } from 'react'
import { Edit, Eye } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/Table'
import CommonLayout from '@/components/CommonLayouyt'
import EventApi from '@/services/cadidateApis/events/EventApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AnniversariesApi from '@/services/cadidateApis/employees/AnniversariesApi'

function BirthdaysDetails() {
    const { id } = useParams()
    let eventId = id

    const [upcomingBirthdays, setUpBirthdayss] = useState([])
    const [PastBirthdays, setPastBirthdays] = useState([]);
  

    const router = useRouter()

    const handleGetApi = async () => {
        try {
            const res = await AnniversariesApi.getAllPastAnniversaries(eventId)
            const data = res?.data?.data || {}
            setUpBirthdayss(data?.upcomingBirthday || [])
            setPastBirthdays(data?.pastBirthday || [])
        } catch (error) {
            console.error('API error', error)
        }
    }

    useEffect(() => {
        handleGetApi()
    }, [])




 

    // upcomingIncrements :-

    const handleForupcomingIncrements = (row) => {
        if (row?.original?.id) {
            router.push(`/dashboard/employee/${eventId}/birthdays/${row?.original?.id}`)

        }
    }
    const columnForupcomingBirthdays = [
        
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
            header: 'Birthday Date',
            id: 'eventDate',
            cell: ({ row }) => row.original.eventDate
        },

        {
            accessorKey: 'status',
            header: 'Status',
            id: 'status',
            cell: ({ row }) => row.original.status
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
                        onClick={() => handleForupcomingIncrements(row)} // You may want to use handleForupcomingIncrements
                    />
                </div>
            )
        }
    ];



    const columnForPastBirthdays = [
       

        {
            accessorKey: 'eventDate',
            header: 'Birthday Date',
            id: 'eventDate',
            cell: ({ row }) => row.original.eventDate
        },

        {
            accessorKey: 'status',
            header: 'Status',
            id: 'status',
            cell: ({ row }) => row.original.status
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
                        onClick={() => handleForupcomingIncrements(row)} // You may want to use handleForupcomingIncrements
                    />
                </div>
            )
        }
    ];

    return (
        <>
            <CommonLayout pageTitle='Employee Birthdays' />
            {/* Up Birthdays */}
            <div className='grid grid-cols-1 gap-6 mt-6'>
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Upcoming Birthday</div>

                        </CardTitle>
                    </CardHeader>

                    <CardContent className='p-4'>
                        {upcomingBirthdays?.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingBirthdays}
                                data={upcomingBirthdays}
                            />
                        ) : (
                            <div className=''>No Upcoming Birthday</div>
                        )}
                    </CardContent>
                </Card>


      
            </div>
            {/* Old Birthdays */}
            <div className='grid grid-cols-1 gap-6 mt-7'>
                <Card className='box'>
                    <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                        <CardTitle className='flex justify-between'>
                            <div className='!text-lg '>Past Birthdays</div>

                        </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4'>
                        {PastBirthdays?.length > 0 ? (
                            <DataTable
                                columns={columnForPastBirthdays}
                                data={PastBirthdays}
                            />
                        ) : (
                            <div className=''>No Past Birthdays</div>
                        )}
                    </CardContent>
                </Card>

        
            </div>

          
        </>
    )
}

export default BirthdaysDetails

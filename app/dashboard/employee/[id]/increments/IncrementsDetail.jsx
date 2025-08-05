'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CommonLayout from '@/components/CommonLayouyt'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/Table'
import IncrementAPi from '@/services/cadidateApis/increment/IncrementAPi'

function IncrementsDetail() {
    const [loading, setLoading] = useState(true)
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
    const [upcomingIncrements, setUpcomingIncrements] = useState([])

    const router = useRouter()

    // const handleGetApi = async () => {
    //     try {
    //         const res = await EventApi.upComingEventList()
    //         const data = res?.data?.data || {}

    //         setUpcomingEvents(data.upcomingEvents || [])
    //         setUpcomingBirthdays(data.upcomingBirthdays || [])
    //         setUpcomingIncrements(data.upcomingIncrements || [])
    //     } catch (error) {
    //         console.error('API error', error)
    //     }
    // }

    // useEffect(() => {
    //     handleGetApi()
    // }, [])



    const fetchTagList = async () => {
        try {
          const response = await IncrementAPi.getAllIncrementAPi()
          if (response.status === 200) {
            setUpcomingIncrements(response?.data?.data?.increments)
            // setTotalRecord(response?.data?.data?.pagination?.total)
          }
        } catch (error) {
          console.log('error', error)
        } finally {
          setLoading(false)
        }
      }



      useEffect(() => {
        fetchTagList()
      }, [])
  

    // upcomingIncrements :-

    // const handleForupcomingIncrements = (row) => {
    //     if (row?.original?.id) {
    //         router.push(`/dashboard/employees/${row?.original?.id}/detail`)

    //     }
    // }

    const columnForupcomingIncrements = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => row.original.name
          },
          {
            accessorKey: 'currentSalary',
            header: 'Current Salary',
            cell: ({ row }) =>
              row?.original?.currentSalary
          },
          {
            accessorKey: 'expectedSalary',
            header: 'Expected Salary',
            cell: ({ row }) =>
              row?.original?.expectedSalary
          },
          {
            accessorKey: 'incrementDate',
            header: 'Days Left',
            id: 'incrementDate',
            cell: ({ row }) => {
                const meta = row.original.meta || [];


                const incrementDateStr = meta.find(m => m.metaKey === '_lastIncrementDate')?.metaValue || row?.original?.dateOfJoining

                if (!incrementDateStr) return <span>—</span>; // Gracefully handle missing date

                const originalDate = new Date(incrementDateStr);
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

                if (!incrementDateStr) return <span className="">N/A</span>;

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
            accessorKey: 'incrementDate',
            header: 'Increment Date',
            id: 'incrementDate',
            cell: ({ row }) => {
                const meta = row.original?.meta ?? [];
                const incrementDateStr = meta.find(m => m.metaKey === '_lastIncrementDate')?.metaValue;

                if (!incrementDateStr) return <span>—</span>; // Gracefully handle missing date

                const originalDate = new Date(incrementDateStr);
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

                return <span>{finalDate}</span>;
            }
        },
    ];

    const columnForOldIncrements = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => row.original.name
          },
         
          {
            accessorKey: 'currentSalary',
            header: 'Current Salary',
            cell: ({ row }) =>
              row?.original?.currentSalary
          },
          {
            accessorKey: 'expectedSalary',
            header: 'Expected Salary',
            cell: ({ row }) =>
              row?.original?.expectedSalary
          },
        {
            accessorKey: 'incrementDate',
            header: 'Increment Date',
            id: 'incrementDate',
            cell: ({ row }) => {
                const meta = row.original?.meta ?? [];
                const incrementDateStr = meta.find(m => m.metaKey === '_lastIncrementDate')?.metaValue;

                // if (!incrementDateStr) return <span>—</span>; // Gracefully handle missing date

                // const originalDate = new Date(incrementDateStr);
                // if (isNaN(originalDate.getTime())) return <span>Invalid Date</span>; // Handle invalid date string

                // function getNextIncrementDate(startDate, cycleInYears = 1) {
                //     const today = new Date();
                //     let nextDate = new Date(startDate);

                //     while (nextDate <= today) {
                //         nextDate.setFullYear(nextDate.getFullYear() + cycleInYears);
                //     }

                //     return nextDate.toISOString().split('T')[0];
                // }

                // const finalDate = getNextIncrementDate(originalDate);

                return <span>{incrementDateStr}</span>;
            }
        },
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

                    <CardContent className='p-4'>
                        {upcomingIncrements?.length > 0 ? (
                            <DataTable
                                columns={columnForupcomingIncrements}
                                data={upcomingIncrements}
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
                    <CardContent className='p-4'>
                        {upcomingIncrements?.length > 0 ? (
                            <DataTable
                                columns={columnForOldIncrements}
                                data={upcomingIncrements}
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

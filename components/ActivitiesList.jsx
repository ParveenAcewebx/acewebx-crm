


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

const ActivitiesList = ({ activitiesData }) => {
  return (
    <>
      <Card className='w-full  border rounded-lg shadow-sm '>
      <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
                  <CardTitle className='flex justify-between'>
                    <div className='!text-lg '>Candidate Activities</div>

                  </CardTitle>
                </CardHeader> 
        <div className='h-96 overflow-auto p-4'>
          {activitiesData?.length ?
            <Card className='w-full rounded-none shadow-none'>
              {activitiesData?.map(item => (
                <>
                  <Card className='inner flex grid-cols-2 gap-2 shadow-none !mb-0'>
                    <div className='flex'>
                      <Card className='relative shadow-none'>
                        <div
                          style={{ backgroundColor: '#b82025' }}
                          className='relative z-10 flex h-3 w-3 items-center justify-center rounded-full'
                        ></div>
                        <Separator
                          className='line absolute ml-1.5'
                          orientation='vertical'
                        />
                      </Card>
                    </div>
                    <CardContent className='pl-3 pr-0 p-0'>
                      <CardDescription className='text-color text-[14px] font-[600]'>
                        {item?.updateColumn
                          ?.replace(/_/g, ' ')                             // Replace underscores with spaces
                          ?.replace(/([a-z])([A-Z])/g, '$1 $2')            // Add space between camelCase
                          ?.replace(/\b\w/g, char => char.toUpperCase())}                     </CardDescription>
                     <p className='text-black'>{item?.oldValue} &gt; {item?.newValue}</p>

                      <p className='text-sm text-gray-500'>
                         at{' '}
                        {new Date(item?.updatedAt).toISOString().slice(0, 10) +
                          ' -' +
                          new Date(item?.updatedAt).toTimeString().slice(0, 8)}
                      </p>
                      <span className='right-2 top-2 text-xs font-medium text-gray-400'></span>
                    </CardContent>
                  </Card>
                </>
              ))}
            </Card> : "No Activity Found!"}


        </div></Card>
    </>
  )
}

export default ActivitiesList

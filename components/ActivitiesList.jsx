


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

const ActivitiesList = ({ activitiesData }) => {
  const formatValue = (val) => {
    try {
      const parsed = typeof val === 'string' ? JSON.parse(val) : val;
      return Array.isArray(parsed) ? parsed.join(', ') : parsed;
    } catch {
      return val; // If parsing fails, return the original value
    }
  };

  return (
    <Card className='w-full border rounded-lg shadow-sm'>
      <CardHeader className='theme-bg-white-rgba border-color-grey min-h-14 border-b p-3'>
        <CardTitle className='flex justify-between'>
          <div className='!text-lg'>Activities</div>
        </CardTitle>
      </CardHeader>

      <div className='h-96 overflow-auto p-4'>
        {activitiesData?.length ? (
          activitiesData.map((item) => (
            <Card
              className='inner flex grid-cols-2 gap-2 shadow-none !mb-0'
              key={item.id} // use id instead of index
            >
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
                    ?.replace(/_/g, ' ')
                    ?.replace(/([a-z])([A-Z])/g, '$1 $2')
                    ?.replace(/\b\w/g, (char) => char.toUpperCase())}
                </CardDescription>

                <p className='text-black'>
                  {formatValue(item?.oldValue)} {' > '} {formatValue(item?.newValue)}
                </p>

                <p className='text-sm text-gray-500'>
                  at{' '}
                  {new Date(item?.updatedAt).toISOString().slice(0, 10) +
                    ' - ' +
                    new Date(item?.updatedAt).toTimeString().slice(0, 8)}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No Activity Found!</p>
        )}
      </div>
    </Card>
  );
};


export default ActivitiesList

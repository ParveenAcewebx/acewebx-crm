import ActivitiesList from '../Dashboardnotes/ActivitiesList'
import NotesList from '../Dashboardnotes/NotesList'
import Notes from '../Dashboardnotes/Notex'
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card'

const NotesActivies = ({
  editId,
  activitiesData,
  getActivities,
  notesData,
  getNotesApi,
  editData
}) => {
  return (
    <>
      <div className='mt-5 grid grid-cols-2 gap-4 rounded'>
        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <ActivitiesList
            activitiesData={activitiesData}
            editId={editId}
            getActivities={getActivities}
          />
        </Card>

        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <CardHeader className='theme-bg-light-rgba border-color-grey min-h-14 border-b p-3'>
            <CardTitle className='flex justify-between'>
              <div className='!text-lg'>Message</div>
            </CardTitle>
          </CardHeader>
          <div className='h-96 p-4'>
            <Card className='h-64 w-full overflow-auto rounded-none shadow-none'>
              <NotesList notesData={notesData} getNotesApi={getNotesApi}editData={editData} />
            </Card>
            <CardFooter className='bottom-0 left-0 w-full px-0 pb-3'>
              <Notes
                moduleId={editId}
                moduleName='contractObj'
                getNotesApi={getNotesApi}
              />
            </CardFooter>
          </div>
        </Card>
        <Card>
        </Card>
      </div>
    </>
  )
}

export default NotesActivies

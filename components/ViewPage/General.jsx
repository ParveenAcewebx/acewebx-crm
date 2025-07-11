import { Pencil } from 'lucide-react'
import ProjectData from '../Dashboardnotes/ProjectData'
import TeamList from '../Dashboardnotes/Teams'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../ui/card'

const General = ({ handleEdit, editData, editId, fetchLeadById }) => {
  return (
    <>
      <div className='mt-5 grid grid-cols-3 gap-4 rounded'>
        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <CardHeader className='theme-bg-light-rgba min-h-14 border-b p-3'>
            <CardTitle className='flex justify-between'>
              <div className='!text-lg'>Lead Details</div>
              <div className='light-yellow-bg flex h-8 w-8 items-center justify-center rounded-full'>
                <Button onClick={handleEdit} className='h-8 w-8 rounded-full'>
                  <Pencil className='h-5 w-5 text-white' />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className='h-96 overflow-auto p-0'>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>
                Project Name
              </CardDescription>
              <CardContent className='text-dark-color p-0 text-sm font-medium'>
                {editData?.project?.name}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>Address</CardDescription>
              <CardContent className='text-dark-color p-0 text-sm font-medium'>
                {editData?.project?.address}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>City</CardDescription>
              <CardContent className='text-dark-color p-0 text-sm font-medium'>
                {editData?.project?.city}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>State</CardDescription>
              <CardContent className='text-dark-color p-0 text-sm font-medium'>
                {editData?.project?.state}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>Zip</CardDescription>
              <CardContent className='text-dark-color p-0 text-sm font-medium'>
                {editData?.project?.zip}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>Company</CardDescription>
              <CardContent className='text-dark-color p-0 text-sm font-medium'>
                {editData?.company?.name}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>Contact</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {editData?.contact?.name}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>Phone</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {editData?.contact?.phone}
              </CardContent>
            </div>
            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>Email</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {editData?.contact?.email}
              </CardContent>
            </div>
      

            <div className='flex justify-between border-b border-solid p-3'>
              <CardDescription className='text-sm'>Engineer</CardDescription>
              <CardContent className='text-dark-color truncate p-0 pl-6 text-end text-sm font-medium'>
                {editData?.engineer?.name}
              </CardContent>
            </div>
          </CardContent>
        </Card>
        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <ProjectData editData={editData} fetchLeadById={fetchLeadById} />
        </Card>

        <Card className='border-color-grey w-full overflow-hidden rounded border'>
          <TeamList editId={editId} editData={editData}fetchLeadById={fetchLeadById} />
        </Card>
      </div>
    </>
  )
}

export default General

import TeamServices from '@/services/Crm/team'
import { Edit, Mail, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PreviewDepartmentForm from '../Team/PreviewDepartmentForm'
import { errorMessage, successMessage } from '../ToasterMessage'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import api from '@/lib/api'

const TeamList = ({ editData, fetchLeadById }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const form = useForm()
  // const activitiesData = editData?.leadTeam || []
  const id = editData?.id
  const activitiesData = editData?.departments?.contacts || []

  // const id = 39
  const handleUpdateTeamDialog = () => {
    setOpenDialog(true)
  }




  const handleDepartmentUpdate = async data => {
    try {
      const responseEdit = await api.put(`update-lead-team-member/${id}`, data)
      if (responseEdit?.status === 200) {
        form.reset()
        successMessage({ description: responseEdit?.data?.message })
        fetchLeadById()
        setOpenDialog(false)
      }
    } catch (error) {
      console.log('error', error)
      errorMessage({
        description: error?.response?.data?.message
      })
    }
  }
  return (
    <>
      <CardHeader className='theme-bg-light-rgba min-h-14 !p-0'>
        <CardTitle className='border-color-grey flex justify-between gap-4 border-b p-3'>
          <div className='!text-lg'>Teams</div>
          <Button
            onClick={handleUpdateTeamDialog}
            className='h-8 w-8 rounded-full'
          >
            <Edit className='h-5 w-5 text-white' />
          </Button>
        </CardTitle>
      </CardHeader>
      <div className='h-96 overflow-auto bg-slate-200 p-4'>
        {activitiesData?.length > 0 ? (
          activitiesData.map((item, index) => (
            <>
              <Card
                key={index}
                className={
                  editData?.assigned_user === item?.user_id
                    ? 'mb-4 flex items-center justify-between rounded-xl bg-green-200 px-4 py-3 shadow-sm'
                    : 'mb-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm'
                }
              >
                <div className='item-image flex items-start'>
                  <Image
                    src='/images/avatar-new.png'
                    alt='Avatar'
                    width={40}
                    height={40}
                    className='mt-1 rounded-full'
                  />
                  <div className='ml-3 space-y-1 text-sm'>
                    <p className='text-base font-semibold'>
                      {item?.name || 'Unknown'}
                    </p>

                    <div className='flex gap-4'>
                      {/* <div className='flex items-center text-xs text-gray-600'>
                      <Building className='mr-1 h-4 w-4' />
                      <span className='truncate'>
                        {item?.companyName || 'N/A'}
                      </span>
                    </div> */}

                      <div className='flex items-center text-xs text-gray-600'>
                        <Mail className='mr-1 h-4 w-4' />
                        <span className='truncate'>{item?.email || 'N/A'}</span>
                      </div>

                      <div className='flex items-center text-xs text-gray-600'>
                        {/* <MapPin className='mr-1 h-4 w-4' />
                        <span>{item?.userDetails?.phone || 'N/A'}</span> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-end justify-center'>
                  <div className='mt-2'>
                    <button className='flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 transition hover:bg-blue-600'>
                      <PhoneCall
                        className='h-4 w-4 text-white'
                        onClick={() => {
                          const phone = item?.userDetails?.phone
                          if (phone) {
                            window.location.href = `tel:${phone}`
                          }
                        }}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            </>
          ))
        ) : (
          <div className='py-4 text-center text-gray-500'>No Teams found.</div>
        )}
      </div>

      <Dialog
        open={openDialog}
        onOpenChange={isOpen => {
          setOpenDialog(isOpen)
        }}
      >
        <DialogContent className='max-h-[90vh] max-w-[40%] overflow-y-auto transition-all duration-300'>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form
              className=''
              onSubmit={form.handleSubmit(handleDepartmentUpdate)}
            >
              {editData ? (
                <>
                  <PreviewDepartmentForm form={form} editData={id} />
                </>
              ) : (
                <>
                  <PreviewDepartmentForm form={form} editData={null} />
                </>
              )}

              <div className='mt-4 flex justify-end'>
                <Button type='submit' className='site-button'>
                  Update
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TeamList

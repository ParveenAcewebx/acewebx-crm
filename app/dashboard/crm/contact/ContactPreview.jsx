'use client'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const ContactPreview = ({ previewData, openPreview, handleOpenPreview }) => {
  console.log('previewData', previewData)
  return (
    <>
      <Dialog open={openPreview} onOpenChange={handleOpenPreview}>
        <DialogContent
          DialogContent
          className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'
        >
          {previewData?.map(item => (
            <>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl'>{item?.name}</DialogTitle>
          </DialogHeader>
              <div className='grid grid-cols-2 gap-4'>
                {/* <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold'>Name</span>
                  <p>{item?.name}</p>
                </div> */}
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold'>Email</span>
                  <p>{item?.email}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold'>Address</span>
                  <p>{item?.address}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold'>City</span>
                  <p>{item?.city}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold'>State</span>
                  <p>{item?.state}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold'>Zip</span>
                  <p>{item?.zip}</p>
                </div>

                <div className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold'>Company</span>
                  <p>{item?.company?.name}</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-semibold'>Notes</span>
                <div dangerouslySetInnerHTML={{ __html: item?.notes || '' }} />
              </div>
            </>
          ))}

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ContactPreview

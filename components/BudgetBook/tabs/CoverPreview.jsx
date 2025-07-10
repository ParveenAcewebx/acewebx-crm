'use client'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const CoverPreview = ({
  previewData,
  deleteOpenModal,
  deleteHandleModalClose
}) => {
  console.log("previewData",previewData)
  return (
    <>
      <Dialog open={deleteOpenModal} onOpenChange={deleteHandleModalClose}>
        <DialogContent
          DialogContent
          className='max-h-[90vh] max-w-[60%] overflow-y-auto transition-all duration-300'
        >
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold'>Project Name</span>
              <p>{previewData?.project_name}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold'>Customer Name</span>
              <p>{previewData?.customerName}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold'>Contact Name</span>
              <p>{previewData?.contactName}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold'>Engineer Name</span>
              <p>{previewData?.engineerName}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold'>Quote Date</span>
              <p>{previewData?.quote_date}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold'>Plan Date</span>
              <p>{new Date(previewData?.plan_date).toLocaleDateString()}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold'>Plan Note</span>
              <p>{previewData?.plan_note}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-semibold'>Address</span>
              <p>{previewData?.log?.address}</p>
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CoverPreview

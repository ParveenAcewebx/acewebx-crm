'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'

const FileAttechmentsModal = ({
  description,
  submitHandleModalClose,
  submitOpenModal,
  message,
  className
}) => {
  return (
    <Dialog open={submitOpenModal} onOpenChange={submitHandleModalClose}>
      <DialogContent
        className={`max-h-[90vh] max-w-[40%] overflow-y-auto transition-all duration-300 ${className}`}
      >
        <DialogHeader>
          <DialogTitle className='text-center !text-2xl'>{message}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default FileAttechmentsModal

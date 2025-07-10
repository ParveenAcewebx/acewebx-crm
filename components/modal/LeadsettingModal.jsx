import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'

const LeadSettingModal = ({
  description,
  submitHandleModalClose,
  submitOpenModal,
  message,
  className
}) => {
  return (
    <Dialog open={submitOpenModal} onOpenChange={submitHandleModalClose}>
      <DialogContent className={`max-h-[90vh] max-w-[40%] overflow-y-auto transition-all duration-300 ${className}`}>
        <DialogHeader>
          <DialogTitle className='!text-2xl text-center'>{message}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LeadSettingModal
